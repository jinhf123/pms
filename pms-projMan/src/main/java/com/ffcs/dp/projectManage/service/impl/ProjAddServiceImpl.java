package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.*;
import com.ffcs.dp.projectManage.manager.ProjAddManager;
import com.ffcs.dp.projectManage.manager.ProjTemplateManager;
import com.ffcs.dp.projectManage.service.ProjAddService;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


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

    @Transactional (propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    @Override
    public void saveProjInfo(Map<String, Object> projInfo) {
        ProjManEntity projManEntity = (ProjManEntity) projInfo.get("projInfo");
        List<StepEntity> stepEntities = (List<StepEntity>) projInfo.get("projStep");
        StakeholderEntity stakeholderEntity = (StakeholderEntity) projInfo.get("projStakeholder");
        ProjCostEntity projCostEntity = (ProjCostEntity) projInfo.get("projCost");
        List<WorktimeEntity> worktimeEntities = (List<WorktimeEntity>) projInfo.get("projUserWorkTime");

        projAddManager.saveProjInfo(projManEntity);

        stakeholderEntity.setProjId(projManEntity.getProjId());
        projAddManager.saveProjStakeholder(stakeholderEntity);

        projCostEntity.setProjId(projManEntity.getProjId());
        projAddManager.saveProjCost(projCostEntity);

        for (StepEntity stepEntity : stepEntities) {
            stepEntity.setProjId(projManEntity.getProjId());
            projAddManager.saveProjStep(stepEntity);
        }

        for (WorktimeEntity worktimeEntity : worktimeEntities) {
            worktimeEntity.setProjId(projManEntity.getProjId());
            projAddManager.saveProjUserWorktime(worktimeEntity);
        }
    }
}