package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.manager.ProjScheManager;
import com.ffcs.dp.projectManage.manager.RiskIssueManager;
import com.ffcs.dp.projectManage.service.ProjScheService;
import com.ffcs.dp.projectManage.service.RiskIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 风险问题
 *
 */
@Service("riskIssueService")
public class RiskIssueServiceImpl implements RiskIssueService {


    @Autowired
    private RiskIssueManager riskIssueManager;

    @Override
    public List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params) {
        return riskIssueManager.getRiskIssueList(params);
    }

    @Override
    public int saveRiskIssue(Map<String, Object> params) {
        return riskIssueManager.saveRiskIssue(params);
    }

    @Override
    public int deleteRiskIssue(Map<String, Object> params) {
        return riskIssueManager.deleteRiskIssue(params);
    }



}