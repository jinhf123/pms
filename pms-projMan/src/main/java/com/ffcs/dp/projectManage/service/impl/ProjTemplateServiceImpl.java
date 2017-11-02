package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.dao.ProjTemplateMapper;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import com.ffcs.dp.projectManage.manager.ProjTemplateManager;
import com.ffcs.dp.projectManage.service.ProjManService;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;


/**
 * 项目管理
 */
@Service("projTemplateService")

public class ProjTemplateServiceImpl implements ProjTemplateService {

    @Autowired
    private ProjTemplateManager projTemplateManager;


    @Override
    public List<ProjTemplateEntity> listTemplate() {

        return projTemplateManager.listTemplate();
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    @Override
    public void saveTemplate(ProjTemplateEntity projTemplateEntity) {
        projTemplateManager.saveTemplate(projTemplateEntity);
        List<ProjTemplateStepEntity> projTemplateStepEntities = projTemplateEntity.getProjTemplateStepEntities();
        for (ProjTemplateStepEntity projTemplateStepEntitie : projTemplateStepEntities) {
            projTemplateStepEntitie.setTempleId(projTemplateEntity.getTempId());
            projTemplateManager.saveTemplateStep(projTemplateStepEntitie);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    @Override
    public void updateSetDefault(Long tempId) {
        projTemplateManager.updateDefault();
        projTemplateManager.updateSetDefault(tempId);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    @Override
    public void updateTemplate(ProjTemplateEntity projTemplateEntity) {
        projTemplateManager.updateTemplate(projTemplateEntity);
        List<ProjTemplateStepEntity> projTemplateStepEntities = projTemplateEntity.getProjTemplateStepEntities();
        for (ProjTemplateStepEntity projTemplateStepEntitie : projTemplateStepEntities) {
            if (Objects.equals(projTemplateStepEntitie.getState(), "0")) {
                projTemplateManager.updateTemplateStepState(projTemplateStepEntitie.getTempStepId());
            } else {
                if(projTemplateStepEntitie.getTempStepId() == null){
                    projTemplateManager.saveTemplateStep(projTemplateStepEntitie);
                }else{
                    projTemplateManager.updateTemplateStep(projTemplateStepEntitie);
                }

            }

        }
    }

    @Override
    public void updateTemplateState(Long tempId) {
        projTemplateManager.updateTemplateState(tempId);
    }

    @Override
    public List<Long> getTemplateInProj(Long tempId) {
        return projTemplateManager.getTemplateInProj(tempId);
    }

}