package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.projectManage.entity.*;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@MapperScan
@Repository
public interface ProjAddMapper {
    List<UserCostEntity> listUserCost(List<Long> ids);
    UserCostEntity listUserCostById(Long id);
    void saveProjInfo(ProjManEntity projManEntity);
    void saveProjStep(StepEntity stepEntity);
    void saveProjStakeholder(StakeholderEntity stakeholderEntity);
    void saveProjCost(ProjCostEntity projCostEntity);
    void saveProjUserWorktime(WorktimeEntity worktimeEntity);

}
