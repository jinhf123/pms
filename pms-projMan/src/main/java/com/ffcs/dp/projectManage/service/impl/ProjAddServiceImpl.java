package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.entity.UserCostEntity;
import com.ffcs.dp.projectManage.manager.ProjAddManager;
import com.ffcs.dp.projectManage.manager.ProjTemplateManager;
import com.ffcs.dp.projectManage.service.ProjAddService;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * 项目管理
 */
@Service("projAddService")

public class ProjAddServiceImpl implements ProjAddService {

    @Autowired
    private ProjAddManager projAddManager;


    @Override
    public List<UserCostEntity> listUserCost(List<Long> ids) {
        return projAddManager.listUserCost(ids);
    }

    @Override
    public UserCostEntity listUserCostById(Long id) {
        return projAddManager.listUserCostById(id);
    }
}