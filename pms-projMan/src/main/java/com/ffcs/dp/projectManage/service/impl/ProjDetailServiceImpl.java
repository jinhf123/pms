package com.ffcs.dp.projectManage.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.ffcs.dp.projectManage.entity.*;
import com.ffcs.dp.projectManage.manager.ProjAddManager;
import com.ffcs.dp.projectManage.manager.ProjDetailManager;
import com.ffcs.dp.projectManage.service.ProjDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 项目管理
 */
@Service("projDetailService")
public class ProjDetailServiceImpl implements ProjDetailService {


    @Autowired
    private ProjDetailManager projDetailManager;

    @Autowired
    private ProjAddManager projAddManager;


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
    public int saveTask(Map<String, Object> params) {
        return projDetailManager.saveTask(params);
    }

    @Override
    public int saveSchedule(Map<String, Object> params) {
        return projDetailManager.saveSchedule(params);
    }

    @Override
    public int deleteTask(Map<String, Object> params) {
        return projDetailManager.deleteTask(params);
    }

    @Override
    public int deleteSchedule(Map<String, Object> params) {
        return projDetailManager.deleteSchedule(params);
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
    public int saveTaskInfo(Map<String, Object> params) {
        return projDetailManager.saveTaskInfo(params);
    }

    @Override
    public List<CheckItemEntity> getCheckItemList(Map<String, Object> params) {
        return projDetailManager.getCheckItemList(params);
    }

    @Override
    public List<TaskLogEntity> getTaskLogList(Map<String, Object> params) {
        return projDetailManager.getTaskLogList(params);
    }

    @Override
    public int saveCheckItem(Map<String, Object> params) {
        return projDetailManager.saveCheckItem(params);
    }

    @Override
    public int saveTaskLog(Map<String, Object> params) {
        JSONArray noticeUser = (JSONArray) params.get("noticeUser");
        for (int i = 0; i < noticeUser.size(); i++) {
            NoticeEntity noticeEntity = new NoticeEntity();
            noticeEntity.setNoticeCreator((Long) params.get("userId"));
            noticeEntity.setNoticeReceiverName(noticeUser.getLong(1));
            noticeEntity.setNoticeType("1");
            noticeEntity.setNoticeContent((String) params.get("username") + "添加了评论并通知了您");
            noticeEntity.setCreateDate(new Date());
            noticeEntity.setTaskId(Long.parseLong((String) params.get("taskId")) );
            noticeEntity.setIsRead("0");
            projAddManager.saveProjNotice(noticeEntity);
        }

        return projDetailManager.saveTaskLog(params);
    }


}