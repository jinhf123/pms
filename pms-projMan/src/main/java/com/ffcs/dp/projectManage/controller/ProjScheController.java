package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.service.ProjScheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 项目日程
 */
@RestController
@RequestMapping("/schedule/projSche")
public class ProjScheController extends AbstractController {


    @Autowired
    private ProjScheService projScheService;

    //获取项目日程列表
    @RequestMapping("/getProjScheList")
    public List<ScheduleEntity> getProjScheList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projScheService.getProjScheList(params);
    }


    //保存项目日程
    @RequestMapping("/saveProjSche")
    public JSON saveProjSche(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        try{
            projScheService.saveProjSche(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }




    //删除项目日程
    @RequestMapping("/deleteProjSche")
    public JSON deleteProjSche(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "删除成功！";
        params.put("userId", getUserId());
        try{
            projScheService.deleteProjSche(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "删除失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }




}