package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.entity.UserCostEntity;

import java.util.List;

public interface ProjAddManager {

    List<UserCostEntity> listUserCost(List<Long> ids);

    UserCostEntity listUserCostById(Long id);


}
