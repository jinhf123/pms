package com.ffcs.dp.projectManage.entity;

public class ProjTemplateStepEntity {
    private Long tempStepId;
    private Long tempId;
    private String stepName;
    private String stepSort;
    private String defaultMoveDate;
    private String finishNoticeDate;
    private String noticeStaff;
    private String noticeStaffId;
    private String taskChangeStaff;
    private String taskChangeStaffId;
    private String finishScheduleNoticeDate;
    private String finishScheduleStaff;
    private String isAttach;
    private Long attachWord;
    private Long attachExcel;
    private Long attachPdf;
    private String attachContent;
    private String state;

    public Long getTempId() {
        return tempId;
    }

    public void setTempId(Long tempId) {
        this.tempId = tempId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Long getTempStepId() {
        return tempStepId;
    }

    public void setTempStepId(Long tempStepId) {
        this.tempStepId = tempStepId;
    }

    public Long getTempleId() {
        return tempId;
    }

    public void setTempleId(Long templeId) {
        this.tempId = templeId;
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

    public String getDefaultMoveDate() {
        return defaultMoveDate;
    }

    public void setDefaultMoveDate(String defaultMoveDate) {
        this.defaultMoveDate = defaultMoveDate;
    }

    public String getFinishNoticeDate() {
        return finishNoticeDate;
    }

    public void setFinishNoticeDate(String finishNoticeDate) {
        this.finishNoticeDate = finishNoticeDate;
    }

    public String getNoticeStaff() {
        return noticeStaff;
    }

    public void setNoticeStaff(String noticeStaff) {
        this.noticeStaff = noticeStaff;
    }

    public String getNoticeStaffId() {
        return noticeStaffId;
    }

    public void setNoticeStaffId(String noticeStaffId) {
        this.noticeStaffId = noticeStaffId;
    }

    public String getTaskChangeStaff() {
        return taskChangeStaff;
    }

    public void setTaskChangeStaff(String taskChangeStaff) {
        this.taskChangeStaff = taskChangeStaff;
    }

    public String getTaskChangeStaffId() {
        return taskChangeStaffId;
    }

    public void setTaskChangeStaffId(String taskChangeStaffId) {
        this.taskChangeStaffId = taskChangeStaffId;
    }

    public String getFinishScheduleNoticeDate() {
        return finishScheduleNoticeDate;
    }

    public void setFinishScheduleNoticeDate(String finishScheduleNoticeDate) {
        this.finishScheduleNoticeDate = finishScheduleNoticeDate;
    }

    public String getFinishScheduleStaff() {
        return finishScheduleStaff;
    }

    public void setFinishScheduleStaff(String finishScheduleStaff) {
        this.finishScheduleStaff = finishScheduleStaff;
    }

    public String getIsAttach() {
        return isAttach;
    }

    public void setIsAttach(String isAttach) {
        this.isAttach = isAttach;
    }

    public Long getAttachWord() {
        return attachWord;
    }

    public void setAttachWord(Long attachWord) {
        this.attachWord = attachWord;
    }

    public Long getAttachExcel() {
        return attachExcel;
    }

    public void setAttachExcel(Long attachExcel) {
        this.attachExcel = attachExcel;
    }

    public Long getAttachPdf() {
        return attachPdf;
    }

    public void setAttachPdf(Long attachPdf) {
        this.attachPdf = attachPdf;
    }

    public String getAttachContent() {
        return attachContent;
    }

    public void setAttachContent(String attachContent) {
        this.attachContent = attachContent;
    }
}
