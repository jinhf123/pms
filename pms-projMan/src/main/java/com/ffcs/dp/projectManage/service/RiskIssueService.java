package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.SysUserEntity;
import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;

import java.util.List;
import java.util.Map;

public interface RiskIssueService {

    Page<RiskIssueEntity> list(Map<String, Object> params);

    List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params);

    int saveRiskIssue(Map<String, Object> params);

    int deleteRiskIssue(Map<String, Object> params);

}
