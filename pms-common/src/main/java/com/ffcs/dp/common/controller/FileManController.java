package com.ffcs.dp.common.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.entity.FileManEntity;
import com.ffcs.dp.common.service.FileManService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 工作日志
 *
 */
@Controller
@ResponseBody
@RequestMapping("/FileMan")
public class FileManController extends AbstractController {


    @Resource
    private FileManService fileManService;

    //获取文件管理列表
    @RequestMapping("/getFileManList")
    public List<FileManEntity> getFileManList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return fileManService.getFileManList(params);
    }


    //保存文件管理（添加文件夹）
    @RequestMapping("/saveFileMan")
    public JSON saveFileMan(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        params.put("fileType","0");//文件夹
        try{
            fileManService.saveFileMan(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("message",msg);
        return json;
    }



    //删除文件管理
    @RequestMapping("/deleteFileMan")
    public JSON deleteFileMan(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "删除成功！";
        params.put("userId", getUserId());
        try{
            fileManService.deleteFileMan(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "删除失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("message",msg);
        return json;
    }




}