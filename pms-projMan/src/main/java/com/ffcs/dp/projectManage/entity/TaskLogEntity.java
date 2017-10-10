package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class TaskLogEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;//任务操作日志编号
    private Long taskId;//任务编号
    private String content;//任务操作日志内容
    private Long operator;//操作者
    private Date operateDate;//操作时间

    public TaskLogEntity() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getOperator() {
        return operator;
    }

    public void setOperator(Long operator) {
        this.operator = operator;
    }

    public Date getOperateDate() {
        return operateDate;
    }

    public void setOperateDate(Date operateDate) {
        this.operateDate = operateDate;
    }
}