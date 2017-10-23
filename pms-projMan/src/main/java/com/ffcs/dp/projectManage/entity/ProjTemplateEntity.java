package com.ffcs.dp.projectManage.entity;


import java.util.List;

public class ProjTemplateEntity {
    private Long tempId;
    private Long projId;
    private String tempName;
    private String description;
    private String content;
    private String isDefault;
    private List<ProjTemplateStepEntity> projTemplateStepEntities;
    public List<ProjTemplateStepEntity> getProjTemplateStepEntities() {
        return projTemplateStepEntities;
    }

    public void setProjTemplateStepEntities(List<ProjTemplateStepEntity> projTemplateStepEntities) {
        this.projTemplateStepEntities = projTemplateStepEntities;
    }



    public Long getTempId() {
        return tempId;
    }

    public void setTempId(Long tempId) {
        this.tempId = tempId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public String getTempName() {
        return tempName;
    }

    public void setTempName(String tempName) {
        this.tempName = tempName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(String isDefault) {
        this.isDefault = isDefault;
    }

}
