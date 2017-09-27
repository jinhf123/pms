package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjDetailMapper;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.manager.ProjDetailManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component("projDetailManager")
public class ProjDetailManagerImpl implements ProjDetailManager {

    @Autowired
    private ProjDetailMapper projDetailMapper;


    @Override
    public Map getProjectInfo(Map<String, Object> params) {
        return projDetailMapper.getProjectInfo(params);
    }

    @Override
    public List<StepEntity> getStepList(Map<String, Object> params) {
        return projDetailMapper.getStepList(params);
    }

    @Override
    public List<TaskEntity> getTaskList(Map<String, Object> params) {
        return projDetailMapper.getTaskList(params);
    }

    @Override
    public List<ScheduleEntity> getScheduleList(Map<String, Object> params) {
        return projDetailMapper.getScheduleList(params);
    }

    @Override
    public void saveTask(Map<String, Object> params) {

        if (!"".equals(params.get("scheduleId"))&&params.get("scheduleId")!=null){
            projDetailMapper.updateTask(params);
        }else{
            projDetailMapper.insertTask(params);
        }
    }

    @Override
    public void saveSchedule(Map<String, Object> params) {
        if (!"".equals(params.get("scheduleId"))&&params.get("scheduleId")!=null){
            projDetailMapper.updateSchedule(params);
        }else{
            projDetailMapper.insertSchedule(params);
        }
    }

    @Override
    public void deleteTask(Map<String, Object> params) {
        projDetailMapper.deleteTask(params);
    }

    @Override
    public void deleteSchedule(Map<String, Object> params) {
        projDetailMapper.deleteSchedule(params);
    }

    @Override
    public int updateStepState(Map<String, Object> params) {
        return projDetailMapper.updateStepState(params);
    }

    @Override
    public int updateTaskState(Map<String, Object> params) {
        return projDetailMapper.updateTaskState(params);
    }


}
