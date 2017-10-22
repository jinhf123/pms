package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.projectManage.dao.ProjScheMapper;
import com.ffcs.dp.projectManage.dao.RiskIssueMapper;
import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.manager.ProjScheManager;
import com.ffcs.dp.projectManage.manager.RiskIssueManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component("riskIssueManager")
public class RiskIssueManagerImpl implements RiskIssueManager {

    @Autowired
    private RiskIssueMapper riskIssueMapper;

    @Override
    public List<RiskIssueEntity> list(Page<RiskIssueEntity> page, Query search) {
        List<RiskIssueEntity> list = riskIssueMapper.listForPage(page, search);
        List<RiskIssueEntity> result = new ArrayList<>();
        for(RiskIssueEntity entity : list){
            String userId = search.getObj("userId").toString();
            entity.setUserId(Long.parseLong(userId));
            result.add(entity);
        }
        return result;
    }

    @Override
    public List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params) {
        return riskIssueMapper.getRiskIssueList(params);
    }

    @Override
    public int saveRiskIssue(Map<String, Object> params) {
        int count;
        if (!"".equals(params.get("riskId"))&&params.get("riskId")!=null){
            count = riskIssueMapper.updateRiskIssue(params);
        }else{
            count = riskIssueMapper.insertRiskIssue(params);
        }
        return count;
    }

    @Override
    public int deleteRiskIssue(Map<String, Object> params) {
        return riskIssueMapper.deleteRiskIssue(params);
    }
}
