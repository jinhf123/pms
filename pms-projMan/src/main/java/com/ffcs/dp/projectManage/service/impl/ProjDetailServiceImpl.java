package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
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


}