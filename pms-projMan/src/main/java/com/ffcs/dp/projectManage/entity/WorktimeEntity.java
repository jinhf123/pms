package com.ffcs.dp.projectManage.entity;

import java.util.Date;

public class WorktimeEntity {
    private Long worktimeId;
    private Long projId;
    private Long userId;
    private Date startDate;
    private Date endDate;
    private Long useRate;

    public Long getWorktimeId() {
        return worktimeId;
    }

    public void setWorktimeId(Long worktimeId) {
        this.worktimeId = worktimeId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Long getUseRate() {
        return useRate;
    }

    public void setUseRate(Long useRate) {
        this.useRate = useRate;
    }
}
