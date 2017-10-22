package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.projectManage.entity.RiskIssueEntity;

import java.util.List;
import java.util.Map;

public interface RiskIssueManager {

    List<RiskIssueEntity> list(Page<RiskIssueEntity> page, Query search);

    List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params);

    int saveRiskIssue(Map<String, Object> params);

    int deleteRiskIssue(Map<String, Object> params);

}
