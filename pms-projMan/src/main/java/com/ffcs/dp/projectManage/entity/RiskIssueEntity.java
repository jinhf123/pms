package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.Date;

public class RiskIssueEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long riskId;//风险问题编号
    private Long taskId;//任务编号
    private Long projId;//项目编号
    private String content;//风险内容
    private String remark;//备注
    private String resolvent;//解决方法
    private String state;//状态
    private Date proposeDate;//提出时间
    private Date resolventDate;//解决时间
    private Date realResoDate;//实际解决时间
    private Long proposeStaff;//提出人
    private String proposeName;//提出人名称
    private Long onChargeStaff;//负责人
    private String onChargeName;//负责人名称

    private Long userId;//用户编号
    private String operate;//操作

    public RiskIssueEntity() {
        super();
    }

    public Long getRiskId() {
        return riskId;
    }

    public void setRiskId(Long riskId) {
        this.riskId = riskId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getResolvent() {
        return resolvent;
    }

    public void setResolvent(String resolvent) {
        this.resolvent = resolvent;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getProposeDate() {
        return proposeDate;
    }

    public void setProposeDate(Date proposeDate) {
        this.proposeDate = proposeDate;
    }

    public String getProposeName() {
        return proposeName;
    }

    public void setProposeName(String proposeName) {
        this.proposeName = proposeName;
    }

    public Date getResolventDate() {
        return resolventDate;
    }

    public void setResolventDate(Date resolventDate) {
        this.resolventDate = resolventDate;
    }

    public Date getRealResoDate() {
        return realResoDate;
    }

    public void setRealResoDate(Date realResoDate) {
        this.realResoDate = realResoDate;
    }

    public Long getProposeStaff() {
        return proposeStaff;
    }

    public void setProposeStaff(Long proposeStaff) {
        this.proposeStaff = proposeStaff;
    }

    public Long getOnChargeStaff() {
        return onChargeStaff;
    }

    public void setOnChargeStaff(Long onChargeStaff) {
        this.onChargeStaff = onChargeStaff;
    }

    public String getOnChargeName() {
        return onChargeName;
    }

    public void setOnChargeName(String onChargeName) {
        this.onChargeName = onChargeName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOperate() {
        return operate;
    }

    public void setOperate(String operate) {
        this.operate = operate;
    }
}