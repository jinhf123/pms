package com.ffcs.dp.projectManage.entity;

public class StakeholderEntity {
    private Long projStakeholderId;
    private Long projId;
    private String projGroupManager;
    private String bigProjManager;
    private String projManager;
    private String demaManager;
    private String techManager;
    private String projMembers;

    public Long getProjStakeholderId() {
        return projStakeholderId;
    }

    public void setProjStakeholderId(Long projStakeholderId) {
        this.projStakeholderId = projStakeholderId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public String getProjGroupManager() {
        return projGroupManager;
    }

    public void setProjGroupManager(String projGroupManager) {
        this.projGroupManager = projGroupManager;
    }

    public String getBigProjManager() {
        return bigProjManager;
    }

    public void setBigProjManager(String bigProjManager) {
        this.bigProjManager = bigProjManager;
    }

    public String getProjManager() {
        return projManager;
    }

    public void setProjManager(String projManager) {
        this.projManager = projManager;
    }

    public String getDemaManager() {
        return demaManager;
    }

    public void setDemaManager(String demaManager) {
        this.demaManager = demaManager;
    }

    public String getTechManager() {
        return techManager;
    }

    public void setTechManager(String techManager) {
        this.techManager = techManager;
    }

    public String getProjMembers() {
        return projMembers;
    }

    public void setProjMembers(String projMembers) {
        this.projMembers = projMembers;
    }
}
