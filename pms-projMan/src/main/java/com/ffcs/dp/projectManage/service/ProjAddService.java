package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.UserCostEntity;

import java.util.List;

public interface ProjAddService {

    List<UserCostEntity> listUserCost(List<Long> ids);
    UserCostEntity listUserCostById(Long id);
}
