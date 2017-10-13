package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.FileManEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.service.FileManService;
import com.ffcs.dp.projectManage.service.WorkLogService;
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


    //保存文件管理
    @RequestMapping("/saveFileMan")
    public JSON saveWorkLog(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
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








}