package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;

public class NoticeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 通知
     */
    private Long noticeId;//通知编号
    private Long noticeCreator;//通知创建人
    private String creatorName;//通知创建人名称
    private Long noticeReceiverName;//通知接收人
    private String receiverName;//通知接收人名称
    private String noticeType;//通知类型
    private String noticeContent;//通知内容
    private Date createDate;//创建日期
    private String noticeDate;//通知日期
    private Long taskId;//任务编号
    private String isRead;//是否已读


    public NoticeEntity() {
        super();
    }


    public Long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
    }

    public Long getNoticeCreator() {
        return noticeCreator;
    }

    public void setNoticeCreator(Long noticeCreator) {
        this.noticeCreator = noticeCreator;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Long getNoticeReceiverName() {
        return noticeReceiverName;
    }

    public void setNoticeReceiverName(Long noticeReceiverName) {
        this.noticeReceiverName = noticeReceiverName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(String noticeType) {
        this.noticeType = noticeType;
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getNoticeDate() {
        return noticeDate;
    }

    public void setNoticeDate(String noticeDate) {
        this.noticeDate = noticeDate;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getIsRead() {
        return isRead;
    }

    public void setIsRead(String isRead) {
        this.isRead = isRead;
    }
}