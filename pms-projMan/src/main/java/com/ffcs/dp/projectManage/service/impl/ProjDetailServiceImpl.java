package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.*;
import com.ffcs.dp.projectManage.manager.ProjDetailManager;
import com.ffcs.dp.projectManage.service.ProjDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 项目管理
 *
 */
@Service("projDetailService")
public class ProjDetailServiceImpl implements ProjDetailService {


    @Autowired
    private ProjDetailManager projDetailManager;


    @Override
    public Map getProjInfo(Map<String, Object> params) {
        return projDetailManager.getProjInfo(params);
    }



    @Override
    public Map getProjectInfo(Map<String, Object> params) {
        return projDetailManager.getProjectInfo(params);
    }

    @Override
    public List<StepEntity> getStepList(Map<String, Object> params) {
        return projDetailManager.getStepList(params);
    }

    @Override
    public List<TaskEntity> getTaskList(Map<String, Object> params) {
        return projDetailManager.getTaskList(params);
    }

    @Override
    public List<ScheduleEntity> getScheduleList(Map<String, Object> params) {
        return projDetailManager.getScheduleList(params);
    }

    @Override
    public void saveTask(Map<String, Object> params) {
        projDetailManager.saveTask(params);
    }

    @Override
    public void saveSchedule(Map<String, Object> params) {
        projDetailManager.saveSchedule(params);
    }

    @Override
    public void deleteTask(Map<String, Object> params) {
        projDetailManager.deleteTask(params);
    }

    @Override
    public void deleteSchedule(Map<String, Object> params) {
        projDetailManager.deleteSchedule(params);
    }

    @Override
    public int updateStepState(Map<String, Object> params) {
        return projDetailManager.updateStepState(params);
    }

    @Override
    public int updateTaskState(Map<String, Object> params) {
        return projDetailManager.updateTaskState(params);
    }

    @Override
    public int getSubTaskCount(Map<String, Object> params) {
        return projDetailManager.getSubTaskCount(params);
    }

    @Override
    public Map getTaskInfo(Map<String, Object> params) {
        return projDetailManager.getTaskInfo(params);
    }

    @Override
    public void saveTaskInfo(Map<String, Object> params) {
        projDetailManager.saveTaskInfo(params);
    }

    @Override
    public List<CheckItemEntity> getCheckItemList(Map<String, Object> params) {
        return  projDetailManager.getCheckItemList(params);
    }

    @Override
    public List<TaskLogEntity> getTaskLogList(Map<String, Object> params) {
        return  projDetailManager.getTaskLogList(params);
    }

    @Override
    public void saveCheckItem(Map<String, Object> params) {
        projDetailManager.saveCheckItem(params);
    }

    @Override
    public void saveTaskLog(Map<String, Object> params) {
        projDetailManager.saveTaskLog(params);
    }


}