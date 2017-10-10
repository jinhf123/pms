package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.List;

public class CheckItemEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;//检查项编号
    private Long taskId;//任务编号
    private String checkItemName;//检查项名称
    private String state;//状态

    public CheckItemEntity() {
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

    public String getCheckItemName() {
        return checkItemName;
    }

    public void setCheckItemName(String checkItemName) {
        this.checkItemName = checkItemName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}