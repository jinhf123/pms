package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjAddMapper;
import com.ffcs.dp.projectManage.dao.ProjTemplateMapper;
import com.ffcs.dp.projectManage.entity.*;
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

    @Override
    public void saveProjInfo(ProjManEntity projManEntity) {
        projAddMapper.saveProjInfo(projManEntity);
    }

    @Override
    public void saveProjStep(StepEntity stepEntity) {
        projAddMapper.saveProjStep(stepEntity);
    }

    @Override
    public void saveProjStakeholder(StakeholderEntity stakeholderEntity) {
        projAddMapper.saveProjStakeholder(stakeholderEntity);
    }

    @Override
    public void saveProjCost(ProjCostEntity projCostEntity) {
        projAddMapper.saveProjCost(projCostEntity);
    }

    @Override
    public void saveProjUserWorktime(WorktimeEntity worktimeEntity) {
        projAddMapper.saveProjUserWorktime(worktimeEntity);
    }

    @Override
    public void saveProjNotice(NoticeEntity noticeEntity) {
        projAddMapper.saveProjNotice(noticeEntity);
    }
}
