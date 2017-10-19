package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;

import java.util.List;
import java.util.Map;

public interface RiskIssueManager {


    List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params);

    int saveRiskIssue(Map<String, Object> params);

    int deleteRiskIssue(Map<String, Object> params);
}
