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
import java.util.HashMap;
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
        JSONObject json = (JSONObject) JSON.toJSON(map);
        return json;
    }

    /*********************进度任务*********************/
    //获取项目信息
    @RequestMapping("/getProjectInfo")
    public Map getProjectInfo(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        return projDetailService.getProjectInfo(params);
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
    public Map saveTask(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());
        projDetailService.saveTask(params);
        result.put("success","true");
        return result;
    }

    //保存日程信息
    @RequestMapping("/saveSchedule")
    public Map saveSchedule(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());
        projDetailService.saveSchedule(params);
        result.put("success","true");
        return result;
    }

    //删除任务
    @RequestMapping("/deleteTask")
    public void deleteTask(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        projDetailService.deleteTask(params);
    }

    //删除日程
    @RequestMapping("/deleteSchedule")
    public void deleteSchedule(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());
        projDetailService.deleteSchedule(params);
    }

    //完成本阶段
    @RequestMapping("/finishStage")
    public Map finishStage(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());
        params.put("state", "2");//已完成
        System.out.print(params.get("stepId"));
//        int count = projDetailService.updateStepState(params);
        result.put("success","true");
        return result;
    }

    //修改任务状态
    @RequestMapping("/updateTaskState")
    public Map updateTaskState(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());

        if("start".equals(params.get("operation"))){
            params.put("state", "1");
        }else if("finish".equals(params.get("operation"))){
            params.put("state", "2");
        }else{
            return result;
        }
        if(1==1)return result;
        int count =  projDetailService.updateTaskState(params);
        result.put("success","true");
        return result;
    }


    /*********************风险问题*********************/





    /*********************文档管理*********************/




}