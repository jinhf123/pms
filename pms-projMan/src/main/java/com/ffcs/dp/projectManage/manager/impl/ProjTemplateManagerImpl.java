package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjTemplateMapper;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;

import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.manager.ProjTemplateManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("projTemplateManager")
public class ProjTemplateManagerImpl implements ProjTemplateManager {

    @Autowired
    private ProjTemplateMapper projTemplateMapper;


    @Override
    public List<ProjTemplateEntity> listTemplate() {
        return projTemplateMapper.listTemplate();
    }

    @Override
    public Long saveTemplate(ProjTemplateEntity projTemplateEntity) {
        return projTemplateMapper.saveTemplate(projTemplateEntity);
    }

    @Override
    public void saveTemplateStep(ProjTemplateStepEntity projTemplateStepEntity) {
        projTemplateMapper.saveTemplateStep(projTemplateStepEntity);
    }

    @Override
    public void updateDefault() {
        projTemplateMapper.updateDefault();
    }

    @Override
    public void updateSetDefault(Long tempId) {
        projTemplateMapper.updateSetDefault(tempId);
    }

    @Override
    public void updateTemplate(ProjTemplateEntity projTemplateEntity) {
        projTemplateMapper.updateTemplate(projTemplateEntity);
    }

    @Override
    public void updateTemplateStep(ProjTemplateStepEntity projTemplateStepEntity) {
        projTemplateMapper.updateTemplateStep(projTemplateStepEntity);
    }

    @Override
    public void updateTemplateState(Long tempId) {
        projTemplateMapper.updateTemplateState(tempId);
    }

    @Override
    public void updateTemplateStepState(Long tempStepId) {
        projTemplateMapper.updateTemplateStepState(tempStepId);
    }

    @Override
    public List<Long> getTemplateInProj(Long tempId) {
        return projTemplateMapper.getTemplateInProj(tempId);
    }


}
