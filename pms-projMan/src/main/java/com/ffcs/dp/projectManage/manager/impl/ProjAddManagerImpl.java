package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjAddMapper;
import com.ffcs.dp.projectManage.dao.ProjTemplateMapper;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.entity.UserCostEntity;
import com.ffcs.dp.projectManage.manager.ProjAddManager;
import com.ffcs.dp.projectManage.manager.ProjTemplateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("projAddManager")
public class ProjAddManagerImpl implements ProjAddManager {
    @Autowired
    private ProjAddMapper projAddMapper;

    @Override
    public List<UserCostEntity> listUserCost(List<Long> ids) {
        return projAddMapper.listUserCost(ids);
    }

    @Override
    public UserCostEntity listUserCostById(Long id) {
        return projAddMapper.listUserCostById(id);
    }
}
