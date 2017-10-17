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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


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

    @Transactional
    @Override
    public void saveTemplate(ProjTemplateEntity projTemplateEntity) {
        projTemplateManager.saveTemplate(projTemplateEntity);
        List<ProjTemplateStepEntity> projTemplateStepEntities = projTemplateEntity.getProjTemplateStepEntities();
        for (ProjTemplateStepEntity projTemplateStepEntitie : projTemplateStepEntities) {
            projTemplateStepEntitie.setTempleId(projTemplateEntity.getTempId());
            projTemplateManager.saveTemplateStep(projTemplateStepEntitie);
        }
    }


}