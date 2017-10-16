package com.ffcs.dp.common.utils;

import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.service.FileManService;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.ffcs.dp.common.utils.ShiroUtils.getUserId;

/**
 * @ClassName UploadHandleServlet
 * @Description 上传文件
 * @author jhf
 * @date 2017-10-13 下午11:35:50
 *
 */
public class UploadHandleServlet extends HttpServlet {

    private FileManService getFileManService() {
        return SpringUtil.getBean(FileManService.class);
    }


    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    /**
     * @Method makeFileName
     * @Description 生成上传文件的文件名，文件名以：uuid+"_"+文件的原始名称
     * @Anthor jhf
     * @param filename 文件的原始名称
     * @return uuid+"_"+文件的原始名称
     */
    private String makeFileName(String filename){  //2.jpg
        //为防止文件覆盖的现象发生，要为上传文件产生一个唯一的文件名
        return UUID.randomUUID().toString() + "_" + filename;
    }

    /**
     * 为防止一个目录下面出现太多文件，要使用hash算法打散存储
     * @Method makePath
     * @Description
     * @Anthor jinhf
     *
     * @param filename 文件名，要根据文件名生成存储目录
     * @param savePath 文件存储路径
     * @return 新的存储目录
     */
    private String makePath(String filename,String savePath, String projId, String folderName){
        String dir;
        if(!"".equals(projId)){
            dir = savePath + "\\" + projId;
            if(!"".equals(folderName)){
                dir = dir + "\\" + folderName;
            }
        }else{
            //得到文件名的hashCode的值，得到的就是filename这个字符串对象在内存中的地址
            int hashcode = filename.hashCode();
            int dir1 = hashcode&0xf;  //0--15
            int dir2 = (hashcode&0xf0)>>4;  //0-15
            //构造新的保存目录
            dir = savePath + "\\Other\\" + dir1 + "\\" + dir2;  //upload\2\3  upload\3\5
        }
        //File既可以代表文件也可以代表目录
        File file = new File(dir);
        if(!file.exists()){
            file.mkdirs();
        }
        return dir;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String savePath = this.getServletContext().getRealPath("/WEB-INF/upload");//得到上传文件的保存目录，将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全
        String tempPath = this.getServletContext().getRealPath("/WEB-INF/temp");//上传时生成的临时文件保存目录

        String projId = request.getParameter("projId");
        String folderId = request.getParameter("folderId");
        String folderName2 = request.getParameter("folderName");//new String(value.getBytes("iso8859-1"),"UTF-8");.getString("UTF-8");
        String folderName = new String(request.getParameter("folderName").getBytes("ISO-8859-1"),"UTF-8");



        File tmpFile = new File(tempPath);
        if (!tmpFile.exists()) {
            //创建临时目录
            tmpFile.mkdir();
        }
        //消息提示
        String message = "";
        try{
            //使用Apache文件上传组件处理文件上传步骤：
            //1、创建一个DiskFileItemFactory工厂
            DiskFileItemFactory factory = new DiskFileItemFactory();
            //设置工厂的缓冲区的大小，当上传的文件大小超过缓冲区的大小时，就会生成一个临时文件存放到指定的临时目录当中。
            factory.setSizeThreshold(1024*100);//设置缓冲区的大小为100KB，如果不指定，那么缓冲区的大小默认是10KB
            //设置上传时生成的临时文件的保存目录
            factory.setRepository(tmpFile);
            //2、创建一个文件上传解析器
            ServletFileUpload upload = new ServletFileUpload(factory);
            //监听文件上传进度
            upload.setProgressListener(new ProgressListener(){
                public void update(long pBytesRead, long pContentLength, int arg2) {
//                    System.out.println("文件大小为：" + pContentLength + "B,当前已处理：" + pBytesRead+"B");
                }
            });
            //解决上传文件名的中文乱码
            upload.setHeaderEncoding("UTF-8");
            //3、判断提交上来的数据是否是上传表单的数据
            if(!ServletFileUpload.isMultipartContent(request)){
                //按照传统方式获取数据
                return;
            }

            //设置上传单个文件的大小的最大值，目前是设置为1024*1024*10字节，也就是20MB
            upload.setFileSizeMax(1024*1024*20);
            //设置上传文件总量的最大值，最大值=同时上传的多个文件的大小的最大值的和，目前设置为20MB
            upload.setSizeMax(1024*1024*20);
            //4、使用ServletFileUpload解析器解析上传数据，解析结果返回的是一个List<FileItem>集合，每一个FileItem对应一个Form表单的输入项
            List<FileItem> list = upload.parseRequest(request);

            for(FileItem item : list){
                //如果fileitem中封装的是普通输入项的数据
                if(item.isFormField()){
                    String name = item.getFieldName();
                    //解决普通输入项的数据的中文乱码问题
                    String value = item.getString("UTF-8");
                    //value = new String(value.getBytes("iso8859-1"),"UTF-8");
                    System.out.println(name + "=" + value);
                }else{//如果fileitem中封装的是上传文件
                    //得到上传的文件名称，
                    String filename = item.getName();
                    System.out.println(filename);
                    if(filename==null || filename.trim().equals("")){
                        continue;
                    }
                    //注意：不同的浏览器提交的文件名是不一样的，有些浏览器提交上来的文件名是带有路径的，
                    //     如：c:\a\b\1.txt，而有些只是单纯的文件名，如：1.txt
                    //处理获取到的上传文件的文件名的路径部分，只保留文件名部分
                    filename = filename.substring(filename.lastIndexOf("\\")+1);
                    //得到上传文件的扩展名
                    String fileExtName = filename.substring(filename.lastIndexOf(".")+1);
                    //如果需要限制上传的文件类型，那么可以通过文件的扩展名来判断上传的文件类型是否合法
                    System.out.println("上传的文件的扩展名是："+fileExtName);
                    //获取item中的上传文件的输入流
                    InputStream in = item.getInputStream();
                    //得到文件保存的名称
                    String saveFilename = filename;//makeFileName(filename);//文件名添加随机数前缀
                    //得到文件的保存目录
                    String realSavePath = makePath(saveFilename, savePath, projId, folderName);
                    //创建一个文件输出流
                    FileOutputStream out = new FileOutputStream(realSavePath + "\\" + saveFilename);
                    //创建一个缓冲区
                    byte buffer[] = new byte[1024];
                    //判断输入流中的数据是否已经读完的标识
                    int len;
                    //循环将输入流读入到缓冲区当中，(len=in.read(buffer))>0就表示in里面还有数据
                    while((len=in.read(buffer))>0){
                        //使用FileOutputStream输出流将缓冲区的数据写入到指定的目录(savePath + "\\" + filename)当中
                        out.write(buffer, 0, len);
                    }
                    //关闭输入流
                    in.close();
                    //关闭输出流
                    out.close();
                    //删除处理文件上传时生成的临时文件
                    item.delete();
                    message = "文件上传成功！";
                    //TODO 在数据库中插入记录
                    if(!"".equals(projId)){
                        try{
                            Map params = new HashMap();
                            Long fileId = getFileManService().getFileManKey();
                            params.put("fileId",fileId);
                            params.put("projId",projId);
                            params.put("folderId",folderId);
                            params.put("userId", getUserId());
                            params.put("fileName",saveFilename);
                            params.put("filePath",realSavePath+"\\"+saveFilename);
                            params.put("fileType","1");
                            getFileManService().insertFileInfo(params);
                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                }
            }
        }catch (FileUploadBase.FileSizeLimitExceededException e) {
            e.printStackTrace();
//            request.setAttribute("message", "单个文件超出最大值！！！");
//            request.getRequestDispatcher("/message.jsp").forward(request, response);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("result", "ok");
            jsonObject.put("message","单个文件超出最大值！！！");
            response.getWriter().write(jsonObject.toString());
            return;
        }catch (FileUploadBase.SizeLimitExceededException e) {
            e.printStackTrace();
//            request.setAttribute("message", "上传文件的总的大小超出限制的最大值！！！");
//            request.getRequestDispatcher("/message.jsp").forward(request, response);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("result", "ok");
            jsonObject.put("message","上传文件的总的大小超出限制的最大值！！！");
            response.getWriter().write(jsonObject.toString());
            return;
        }catch (Exception e) {
            message= "文件上传失败！";
            e.printStackTrace();
        }
//        request.setAttribute("message",message);
//        request.getRequestDispatcher("/message.jsp").forward(request, response);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("result", "ok");
        jsonObject.put("message",message);
        response.getWriter().write(String.valueOf(jsonObject.toString().getBytes("UTF-8")));
    }
}