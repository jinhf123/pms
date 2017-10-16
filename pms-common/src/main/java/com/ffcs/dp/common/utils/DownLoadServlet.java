package com.ffcs.dp.common.utils;

import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.entity.FileManEntity;
import com.ffcs.dp.common.service.FileManService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DownLoadServlet extends HttpServlet {

    private FileManService getFileManService() {
        return SpringUtil.getBean(FileManService.class);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {


        String fileId = request.getParameter("fileId");
        String fileName = request.getParameter("fileName");  //23239283-92489-阿凡达.avi

        Map params = new HashMap();
        params.put("fileId",fileId);
        List<FileManEntity> list = getFileManService().getFileManList(params);
        for(FileManEntity temp : list){

            fileName = temp.getFileName();//new String(fileName.getBytes("iso8859-1"),"UTF-8");
            String filePath;
            if(!"".equals(temp.getProjId())){
                filePath = temp.getFilePath();

            }else{
                //项目编号为空则上传的文件都是保存在/WEB-INF/upload/Other目录下的子目录当中
                String fileSaveRootPath=this.getServletContext().getRealPath("/WEB-INF/upload/Other");
                //通过文件名找出文件的所在目录
                String path = findFileSavePathByFileName(fileName,fileSaveRootPath);
                filePath = path + "\\" + fileName;
            }

            //得到要下载的文件
            File file = new File(filePath);

            //如果文件不存在
            if(!file.exists()){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("result", "error");
                jsonObject.put("message","您要下载的文件不存在！！");
                response.getWriter().write(jsonObject.toString());
                //request.setAttribute("message", "您要下载的资源已被删除！！");
                //request.getRequestDispatcher("/message.jsp").forward(request, response);
                return;
            }
            //处理文件名
            String realname = fileName.substring(fileName.indexOf("_")+1);
            //设置响应头，控制浏览器下载该文件
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(realname, "UTF-8"));
            //读取要下载的文件，保存到文件输入流
            FileInputStream in = new FileInputStream(filePath);
            //创建输出流
            OutputStream out = response.getOutputStream();
            //创建缓冲区
            byte buffer[] = new byte[1024];
            int len = 0;
            //循环将输入流中的内容读取到缓冲区当中
            while((len=in.read(buffer))>0){
                //输出缓冲区的内容到浏览器，实现文件下载
                out.write(buffer, 0, len);
            }
            //关闭文件输入流
            in.close();
            //关闭输出流
            out.close();
        }
    }

    /**
     * @Method findFileSavePathByFileName
     * @Description 通过文件名和存储上传文件根目录找出要下载的文件的所在路径
     * @Anthor jhf
     * @param filename 要下载的文件名
     * @param saveRootPath 上传文件保存的根目录，也就是/WEB-INF/upload目录
     * @return 要下载的文件的存储目录
     */
    public String findFileSavePathByFileName(String filename,String saveRootPath){
        int hashcode = filename.hashCode();
        int dir1 = hashcode&0xf;  //0--15
        int dir2 = (hashcode&0xf0)>>4;  //0-15
        String dir = saveRootPath + "\\" + dir1 + "\\" + dir2;  //upload\2\3  upload\3\5
        File file = new File(dir);
        if(!file.exists()){
            //创建目录
            file.mkdirs();
        }
        return dir;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}