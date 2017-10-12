package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.*;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 项目详情
 */
@MapperScan
@Repository
public interface ProjDetailMapper extends BaseMapper<WorkLogEntity> {

    Map getProjInfo(Map<String, Object> params);

    Map getProjectInfo(Map<String, Object> params);

    List<StepEntity> getStepList(Map<String, Object> params);

    List<TaskEntity> getTaskList(Map<String, Object> params);

    List<ScheduleEntity> getScheduleList(Map<String, Object> params);

//    void updateTask(Map<String, Object> params);
//    void updateSchedule(Map<String, Object> params);

    void insertTask(Map<String, Object> params);

    void insertSchedule(Map<String, Object> params);

    void deleteTask(Map<String, Object> params);

    void deleteSchedule(Map<String, Object> params);

    int updateStepState(Map<String, Object> params);

    int updateTaskState(Map<String, Object> params);

    int getSubTaskCount(Map<String, Object> params);

    Map getTaskInfo(Map<String, Object> params);

    void updateTaskInfo(Map<String, Object> params);

    List<CheckItemEntity> getCheckItemList(Map<String, Object> params);

    List<TaskLogEntity> getTaskLogList(Map<String, Object> params);

    void updateCheckItem(Map<String, Object> params);

    void insertCheckItem(Map<String, Object> params);

    void insertTaskLog(Map<String, Object> params);


}
