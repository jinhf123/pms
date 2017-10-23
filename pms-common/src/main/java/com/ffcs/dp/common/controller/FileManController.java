package com.ffcs.dp.common.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.entity.FileManEntity;
import com.ffcs.dp.common.service.FileManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 文件管理
 *
 */
@Controller
@ResponseBody
@RequestMapping("/FileMan")
public class FileManController extends AbstractController {


    @Resource
    private FileManService fileManService;

    @Autowired
    private HttpServletRequest request;

    //获取文件管理列表
    @RequestMapping("/getFileManList")
    public List<FileManEntity> getFileManList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return fileManService.getFileManList(params);
    }



    //根据项目编号查找文件夹列表 （包含项目步骤文件夹）
    @RequestMapping("/getFolderList")
    public List<FileManEntity> getFolderList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return fileManService.getFolderListByProjId(params);
    }



    //添加文件夹
    @RequestMapping("/addFolderInfo")
    public JSON addFolderInfo(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        try{
            fileManService.addFolderInfo(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }



    //删除文件管理
    @RequestMapping("/deleteFileMan")
    public JSON deleteFileMan(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "删除成功！";
        params.put("userId", getUserId());
        try{

            Map params2 = new HashMap();
            params2.put("fileId",params.get("fileId"));
            List<FileManEntity> list = fileManService.getFileManList(params2);


            fileManService.deleteFileMan(params);


            for(FileManEntity tmp:list){
                String filePath = tmp.getFilePath();
                if("0".equals(tmp.getFileType())){
                    filePath = request.getServletContext().getRealPath("/WEB-INF/upload")+"\\"+tmp.getProjId()+"\\"+tmp.getFileName();
                }
                delete(tmp.getFileName(),filePath);//删除文件
            }
        }catch (Exception e){
            e.printStackTrace();
            msg = "删除失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }











    /**
     * 删除文件，可以是文件或文件夹
     *
     * @param fileName 要删除的文件的文件名
     * @param filePath 要删除的文件的文路径
     * @return 删除成功返回true，否则返回false
     */
    public static boolean delete(String fileName,String filePath) {
        File file = new File(filePath);
        if (!file.exists()) {
            System.out.println("删除文件失败:" + fileName + "不存在！");
            return false;
        } else {
            if (file.isFile())
                return deleteFile(fileName,filePath);
            else
                return deleteDirectory(fileName,filePath);
        }
    }

    /**
     * 删除单个文件
     * @param fileName 要删除的文件的文件名
     * @param filePath 要删除的文件的文路径
     * @return 单个文件删除成功返回true，否则返回false
     */
    public static boolean deleteFile(String fileName, String filePath) {
        File file = new File(filePath);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除文件:" + fileName + "成功！");
                return true;
            } else {
                System.out.println("删除文件:" + fileName + "失败！");
                return false;
            }
        } else {
            System.out.println("删除文件失败:" + fileName + "不存在！");
            return false;
        }
    }

    /**
     * 删除目录及目录下的文件
     * @param dirName 要删除的目录的名称
     * @param filePath 要删除的目录的文件路径
     * @return 目录删除成功返回true，否则返回false
     */
    public static boolean deleteDirectory(String dirName,String filePath) {
        // 如果dir不以文件分隔符结尾，自动添加文件分隔符
        if (!filePath.endsWith(File.separator))
            filePath = filePath + File.separator;
        File dirFile = new File(filePath);
        // 如果dir对应的文件不存在，或者不是一个目录，则退出
        if ((!dirFile.exists()) || (!dirFile.isDirectory())) {
            System.out.println("删除目录失败：" + dirName + "不存在！");
            return false;
        }
        boolean flag = true;
        // 删除文件夹中的所有文件包括子目录
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            // 删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath(),files[i].getAbsolutePath());
                if (!flag)
                    break;
            }
            // 删除子目录
            else if (files[i].isDirectory()) {
                flag = deleteDirectory(files[i].getAbsolutePath(),files[i].getAbsolutePath());
                if (!flag)
                    break;
            }
        }
        if (!flag) {
            System.out.println("删除目录失败！");
            return false;
        }
        // 删除当前目录
        if (dirFile.delete()) {
            System.out.println("删除目录" + dirName + "成功！");
            return true;
        } else {
            return false;
        }
    }

}