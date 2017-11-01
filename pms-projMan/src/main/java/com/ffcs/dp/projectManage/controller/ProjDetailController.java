package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.*;
import com.ffcs.dp.projectManage.service.ProjDetailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Iterator;
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
        result.put("taskId",params.get("taskId"));
        result.put("msg",msg);
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
        result.put("msg",msg);
        return result;
    }

    //删除任务
    @RequestMapping("/deleteTask")
    public JSON deleteTask(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        boolean success = true;
        params.put("userId", getUserId());
        try{

            int count = projDetailService.getSubTaskCount(params);
            if(count==0){
                projDetailService.deleteTask(params);
            }else{
                success=false;
                msg="该任务存在子任务,请先删除子任务!";
            }
        }catch (Exception e){
            e.printStackTrace();
            success=false;
            msg=e.getMessage();
        }
        result.put("success",success);
        result.put("msg",msg);
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
        result.put("msg",msg);
        return result;
    }

    //完成本阶段
    @RequestMapping("/finishStage")
    public JSON finishStage(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg="";
        params.put("userId", getUserId());
        params.put("state", "2");//已完成
        System.out.print("完成步骤ID："+params.get("stepId"));
        try{
            projDetailService.updateStepState(params);

            //获取下一步骤ID更新状态为开始
            List<StepEntity> list = projDetailService.getStepList(params);
            Iterator<StepEntity> it = list.iterator();
            while(it.hasNext()){
                StepEntity s = it.next();
                if(s.getStepId().toString().equals(params.get("stepId").toString())&&it.hasNext()){
                    StepEntity ss = it.next();
                    params.put("stepId",ss.getStepId());
                    params.put("state","1");
                    System.out.print("开始步骤ID："+params.get("stepId"));
                    projDetailService.updateStepState(params);
                    break;
                }
            }

        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("msg",msg);
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
        result.put("msg",msg);
        return result;
    }




    //获取项任务信息
    @RequestMapping("/getTaskInfo")
    public JSON getTaskInfo(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        Map map = projDetailService.getTaskInfo(params);
        JSONObject result = (JSONObject) JSON.toJSON(map);
        return result;
    }

    //保存任务信息
    @RequestMapping("/saveTaskInfo")
    public JSON saveTaskInfo(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        boolean success = true;
        String msg = "";
        params.put("userId", getUserId());
        try{
            projDetailService.saveTaskInfo(params);
        }catch (Exception e){
            e.printStackTrace();
            success=false;
            msg=e.getMessage().toString();
        }
        result.put("success",success);
        result.put("msg",msg);
        return result;
    }

    //获取检查项列表
    @RequestMapping("/getCheckItemList")
    public List<CheckItemEntity> getCheckItemList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projDetailService.getCheckItemList(params);
    }

    //获取任务操作日志列表
    @RequestMapping("/getTaskLogList")
    public List<TaskLogEntity> getTaskLogList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projDetailService.getTaskLogList(params);
    }


    //保存检查项信息
    @RequestMapping("/saveCheckItem")
    public JSON saveCheckItem(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg = "";
        params.put("userId", getUserId());
        try{
            projDetailService.saveCheckItem(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("msg",msg);
        return result;
    }

    //保存任务日志信息
    @RequestMapping("/saveTaskLog")
    public JSON saveTaskLog(@RequestBody Map<String, Object> params){
        JSONObject result = new JSONObject();
        String msg = "";
        params.put("userId", getUserId());
        params.put("username", getUser().getUsername());
        try{
            projDetailService.saveTaskLog(params);
        }catch (Exception e){
            e.printStackTrace();
            msg=e.getMessage();
        }
        result.put("success",true);
        result.put("msg",msg);
        return result;
    }








    /*********************风险问题*********************/





    /*********************文档管理*********************/




}