package com.ffcs.dp.projectManage.controller;

import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.service.ProjDetailService;
import com.ffcs.dp.projectManage.service.WorkLogService;
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


    //获取项目信息
    @RequestMapping("/getProjectInfo")
    public Map getProjectInfo(@RequestBody Map<String, Object> params) {
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

    //修改步骤状态
    @RequestMapping("/updateStepState")
    public Map updateStepState(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());
        int count = projDetailService.updateStepState(params);
        result.put("success","true");
        return result;
    }

    //修改任务状态
    @RequestMapping("/updateTaskState")
    public Map updateTaskState(@RequestBody Map<String, Object> params) throws Exception{
        Map result = new HashMap();
        params.put("userId", getUserId());
        int count =  projDetailService.updateTaskState(params);
        result.put("success","true");
        return result;
    }



}