package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;

import java.util.List;
import java.util.Map;

public interface ProjDetailManager {

    Map getProjectInfo(Map<String, Object> params);

    List<StepEntity> getStepList(Map<String, Object> params);

    List<TaskEntity> getTaskList(Map<String, Object> params);

    List<ScheduleEntity> getScheduleList(Map<String, Object> params);

    void saveTask(Map<String, Object> params);

    void saveSchedule(Map<String, Object> params);

    void deleteTask(Map<String, Object> params);

    void deleteSchedule(Map<String, Object> params);

    int updateStepState(Map<String, Object> params);

    int updateTaskState(Map<String, Object> params);

}
