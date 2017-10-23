package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.*;

import java.util.List;
import java.util.Map;

public interface ProjDetailManager {

    Map getProjInfo(Map<String, Object> params);

    Map getProjectInfo(Map<String, Object> params);

    Map getTaskInfo(Map<String, Object> params);

    List<StepEntity> getStepList(Map<String, Object> params);

    List<TaskEntity> getTaskList(Map<String, Object> params);

    List<ScheduleEntity> getScheduleList(Map<String, Object> params);

    List<CheckItemEntity> getCheckItemList(Map<String, Object> params);

    List<TaskLogEntity> getTaskLogList(Map<String, Object> params);

    int getSubTaskCount(Map<String, Object> params);

    int saveTask(Map<String, Object> params);

    int saveSchedule(Map<String, Object> params);

    int deleteTask(Map<String, Object> params);

    int deleteSchedule(Map<String, Object> params);

    int updateStepState(Map<String, Object> params);

    int updateTaskState(Map<String, Object> params);

    int saveCheckItem(Map<String, Object> params);

    int saveTaskLog(Map<String, Object> params);

    int saveTaskInfo(Map<String, Object> params);

}
