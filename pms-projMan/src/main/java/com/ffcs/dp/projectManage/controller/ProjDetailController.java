package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.service.ProjDetailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 项目详情
 *
 */
@Controller
@ResponseBody
@RequestMapping("/projMan/projDetail")
public class ProjDetailController extends AbstractController {


    @Resource
    private ProjDetailService projDetailService;


    /*********************项目信息*********************/
    @RequestMapping("/getProjInfo")
    public JSON getProjInfo(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        Map map = projDetailService.getProjInfo(params);
        JSONObject result = (JSONObject) JSON.toJSON(map);
        return result;
    }

    /*********************进度任务*********************/
    //获取项目信息
    @RequestMapping("/getProjectInfo")
    public JSON getProjectInfo(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        Map map = projDetailService.getProjectInfo(params);
        JSONObject result = (JSONObject) JSON.toJSON(map);
        return result;
    }

    //获取项目步骤列表信息
    @RequestMapping("/getStepList")
    public List<StepEntity> getStepList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projDetailService.getStepList(params);
    }

    //获取任务列表
    @RequestMapping("/getTaskList")
    public List<TaskEntity> getTaskList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projDetailService.getTaskList(params);
    }

    //获取日程列表
    @RequestMapping("/getScheduleList")
    public List<ScheduleEntity> getScheduleList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projDetailService.getScheduleList(params);
    }

    //保存任务信息
    @RequestMapping("/saveTask")
    public JSON saveTask(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg = "";
        params.put("userId", getUserId());
        try{
            projDetailService.saveTask(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }

    //保存日程信息
    @RequestMapping("/saveSchedule")
    public JSON saveSchedule(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());
        try{
            projDetailService.saveSchedule(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }

    //删除任务
    @RequestMapping("/deleteTask")
    public JSON deleteTask(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());
        try{
            projDetailService.deleteTask(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }

    //删除日程
    @RequestMapping("/deleteSchedule")
    public JSON deleteSchedule(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());
        try{
            projDetailService.deleteSchedule(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }

    //完成本阶段
    @RequestMapping("/finishStage")
    public JSON finishStage(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());
        params.put("state", "2");//已完成
        System.out.print(params.get("stepId"));
        try{
            projDetailService.updateStepState(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }

    //修改任务状态
    @RequestMapping("/updateTaskState")
    public JSON updateTaskState(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());

        if("start".equals(params.get("operation"))){
            params.put("state", "1");
        }else if("finish".equals(params.get("operation"))){
            params.put("state", "2");
        }else{
            return result;
        }
        try{
            projDetailService.updateTaskState(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("message",msg);
        return result;
    }


    /*********************风险问题*********************/





    /*********************文档管理*********************/




}