package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;

public class ProjManEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 项目id
     */

    private Long projId;
    private Long tempId;
    private Long projScaleId;
    private String projName;
    private String projType;
    private Long beloProjGroup;
    private String projLevel;
    private String consMode;
    private String undertakeMode;
    private String isCompletYear;
    private Date startDate;
    private Date endDate;
    private Long projStakeholderId;
    private Long taskId;
    private String state;
    private Long creator;
    private String year;

    private String riskItem;
    private String unFinishTask;
    private String completRate;


    public ProjManEntity() {
        super();
    }


    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Long getTempId() {
        return tempId;
    }

    public void setTempId(Long tempId) {
        this.tempId = tempId;
    }

    public Long getProjScaleId() {
        return projScaleId;
    }

    public void setProjScaleId(Long projScaleId) {
        this.projScaleId = projScaleId;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getProjType() {
        return projType;
    }

    public void setProjType(String projType) {
        this.projType = projType;
    }

    public Long getBeloProjGroup() {
        return beloProjGroup;
    }

    public void setBeloProjGroup(Long beloProjGroup) {
        this.beloProjGroup = beloProjGroup;
    }

    public String getProjLevel() {
        return projLevel;
    }

    public void setProjLevel(String projLevel) {
        this.projLevel = projLevel;
    }

    public String getConsMode() {
        return consMode;
    }

    public void setConsMode(String consMode) {
        this.consMode = consMode;
    }

    public String getUndertakeMode() {
        return undertakeMode;
    }

    public void setUndertakeMode(String undertakeMode) {
        this.undertakeMode = undertakeMode;
    }

    public String getIsCompletYear() {
        return isCompletYear;
    }

    public void setIsCompletYear(String isCompletYear) {
        this.isCompletYear = isCompletYear;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getProjStakeholderId() {
        return projStakeholderId;
    }

    public void setProjStakeholderId(Long projStakeholderId) {
        this.projStakeholderId = projStakeholderId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getRiskItem() {
        return riskItem;
    }

    public void setRiskItem(String riskItem) {
        this.riskItem = riskItem;
    }

    public String getUnFinishTask() {
        return unFinishTask;
    }

    public void setUnFinishTask(String unFinishTask) {
        this.unFinishTask = unFinishTask;
    }

    public String getCompletRate() {
        return completRate;
    }

    public void setCompletRate(String completRate) {
        this.completRate = completRate;
    }
}