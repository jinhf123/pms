package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.List;

public class TaskEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long taskId;//任务编号
    private Long projId;//项目编号
    private Long stepId;//步骤编号
    private Long parentTask;//父级任务
    private String taskTitle;//任务标题
    private String taskStaff;//任务负责人
    private String taskStaffId;//任务负责人编号
    private String taskDate;//任务日期
    private String state;//任务状态
    private String taskContent;//任务内容
    private String rate;//完成率
    private String finishDate;//任务结束时间
    private Long cteateStaff;//人物创建人

    private Boolean expand;//是否展开

    private List<TaskEntity> subTaskList;

    public TaskEntity() {
        super();
    }


    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Long getStepId() {
        return stepId;
    }

    public void setStepId(Long stepId) {
        this.stepId = stepId;
    }

    public Long getParentTask() {
        return parentTask;
    }

    public void setParentTask(Long parentTask) {
        this.parentTask = parentTask;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskStaff() {
        return taskStaff;
    }

    public void setTaskStaff(String taskStaff) {
        this.taskStaff = taskStaff;
    }

    public String getTaskStaffId() {
        return taskStaffId;
    }

    public void setTaskStaffId(String taskStaffId) {
        this.taskStaffId = taskStaffId;
    }

    public String getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(String taskDate) {
        this.taskDate = taskDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTaskContent() {
        return taskContent;
    }

    public void setTaskContent(String taskContent) {
        this.taskContent = taskContent;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(String finishDate) {
        this.finishDate = finishDate;
    }

    public Long getCteateStaff() {
        return cteateStaff;
    }

    public void setCteateStaff(Long cteateStaff) {
        this.cteateStaff = cteateStaff;
    }

    public List<TaskEntity> getSubTaskList() {
        return subTaskList;
    }

    public void setSubTaskList(List<TaskEntity> subTaskList) {
        this.subTaskList = subTaskList;
    }

    public Boolean getExpand() {
        return expand;
    }

    public void setExpand(Boolean expand) {
        this.expand = expand;
    }
}