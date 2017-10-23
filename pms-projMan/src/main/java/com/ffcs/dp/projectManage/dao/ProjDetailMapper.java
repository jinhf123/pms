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


    int insertTask(Map<String, Object> params);

    int insertSchedule(Map<String, Object> params);

    int deleteTask(Map<String, Object> params);

    int deleteSchedule(Map<String, Object> params);

    int updateStepState(Map<String, Object> params);

    int updateTaskState(Map<String, Object> params);

    int getSubTaskCount(Map<String, Object> params);

    Map getTaskInfo(Map<String, Object> params);

    int updateTaskInfo(Map<String, Object> params);

    List<CheckItemEntity> getCheckItemList(Map<String, Object> params);

    List<TaskLogEntity> getTaskLogList(Map<String, Object> params);

    int updateCheckItem(Map<String, Object> params);

    int insertCheckItem(Map<String, Object> params);

    int insertTaskLog(Map<String, Object> params);

    int deleteTaskLog(Map<String, Object> params);

}
