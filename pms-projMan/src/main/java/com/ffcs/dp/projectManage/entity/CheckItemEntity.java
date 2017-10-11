package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.List;

public class CheckItemEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long checkItemId;//检查项编号
    private Long taskId;//任务编号
    private String content;//检查项名称
    private String state;//状态

    public CheckItemEntity() {
        super();
    }

    public Long getCheckItemId() {
        return checkItemId;
    }

    public void setCheckItemId(Long checkItemId) {
        this.checkItemId = checkItemId;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}