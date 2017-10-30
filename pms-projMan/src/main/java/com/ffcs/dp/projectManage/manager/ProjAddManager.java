package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.*;

import java.util.List;

public interface ProjAddManager {

    List<UserCostEntity> listUserCost(List<Long> ids);

    UserCostEntity listUserCostById(Long id);

    void saveProjInfo(ProjManEntity projManEntity);
    void saveProjStep(StepEntity stepEntity);
    void saveProjStakeholder(StakeholderEntity stakeholderEntity);
    void saveProjCost(ProjCostEntity projCostEntity);

    void saveProjUserWorktime(WorktimeEntity worktimeEntity);

}
