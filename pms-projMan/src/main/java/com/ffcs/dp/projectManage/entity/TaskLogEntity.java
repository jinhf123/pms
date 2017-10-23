package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class TaskLogEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long taskLogId;//任务操作日志编号
    private Long taskId;//任务编号
    private String content;//任务操作日志内容
    private String staffName;//操作者名称
    private Long operator;//操作者
    private String operateDate;//操作时间
    private String operateType;//操作类型

    public TaskLogEntity() {
        super();
    }

    public Long getTaskLogId() {
        return taskLogId;
    }

    public void setTaskLogId(Long taskLogId) {
        this.taskLogId = taskLogId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public Long getOperator() {
        return operator;
    }

    public void setOperator(Long operator) {
        this.operator = operator;
    }

    public String getOperateDate() {
        return operateDate;
    }

    public void setOperateDate(String operateDate) {
        this.operateDate = operateDate;
    }

    public String getOperateType() {
        return operateType;
    }

    public void setOperateType(String operateType) {
        this.operateType = operateType;
    }
}