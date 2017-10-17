package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;

import java.util.List;
import java.util.Map;

public interface ProjTemplateService {



    List<ProjTemplateEntity> listTemplate();


    void saveTemplate(ProjTemplateEntity projTemplateEntity);

}
