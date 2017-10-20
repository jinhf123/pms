package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;

public class StepEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long stepId;//步骤编号
    private Long projId;//项目编号
    private Long stepMod;//步骤模版
    private String defaultDate;//默认完成日期
    private String trueDate;//实际完成日期
    private String state;//状态
    private Long finishStaff;//完成人员编号
    private Long finishStaffName;//完成人员名称


    private String stepName;//
    private String stepSort;//
    private String stepContent;//
    private String unCompTask;//
    private String allTask;//
    private String date;//




    public StepEntity() {
        super();
    }


    public Long getStepId() {
        return stepId;
    }

    public void setStepId(Long stepId) {
        this.stepId = stepId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Long getStepMod() {
        return stepMod;
    }

    public void setStepMod(Long stepMod) {
        this.stepMod = stepMod;
    }

    public String getDefaultDate() {
        return defaultDate;
    }

    public void setDefaultDate(String defaultDate) {
        this.defaultDate = defaultDate;
    }

    public String getTrueDate() {
        return trueDate;
    }

    public void setTrueDate(String trueDate) {
        this.trueDate = trueDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getFinishStaff() {
        return finishStaff;
    }

    public void setFinishStaff(Long finishStaff) {
        this.finishStaff = finishStaff;
    }

    public Long getFinishStaffName() {
        return finishStaffName;
    }

    public void setFinishStaffName(Long finishStaffName) {
        this.finishStaffName = finishStaffName;
    }


    public String getStepName() {
        return stepName;
    }

    public void setStepName(String stepName) {
        this.stepName = stepName;
    }

    public String getStepSort() {
        return stepSort;
    }

    public void setStepSort(String stepSort) {
        this.stepSort = stepSort;
    }

    public String getStepContent() {
        return stepContent;
    }

    public void setStepContent(String stepContent) {
        this.stepContent = stepContent;
    }

    public String getUnCompTask() {
        return unCompTask;
    }

    public void setUnCompTask(String unCompTask) {
        this.unCompTask = unCompTask;
    }

    public String getAllTask() {
        return allTask;
    }

    public void setAllTask(String allTask) {
        this.allTask = allTask;
    }
}