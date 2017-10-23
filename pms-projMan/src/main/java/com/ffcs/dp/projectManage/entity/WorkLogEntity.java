package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;

public class WorkLogEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;//工作日志编号
    private String workDate;//工作日志日期
    private String startTime;//开始时间
    private String endTime;//结束时间
    private String isProjectWork;//是否项目工作
    private Long projId;//项目编号
    private Long taskId;//任务编号
    private String workDetails;//工作详情
    private Long creator;//创建者

    public WorkLogEntity() {
        super();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getIsProjectWork() {
        return isProjectWork;
    }

    public void setIsProjectWork(String isProjectWork) {
        this.isProjectWork = isProjectWork;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getWorkDetails() {
        return workDetails;
    }

    public void setWorkDetails(String workDetails) {
        this.workDetails = workDetails;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }
}