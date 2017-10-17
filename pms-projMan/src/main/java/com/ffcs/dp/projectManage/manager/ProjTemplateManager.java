package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;

import java.util.List;

public interface ProjTemplateManager {

    List<ProjTemplateEntity> listTemplate();

    Long saveTemplate(ProjTemplateEntity projTemplateEntity);

    void saveTemplateStep(ProjTemplateStepEntity projTemplateStepEntity);


}
