package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 风险问题dao
 */
@MapperScan
@Repository
public interface RiskIssueMapper extends BaseMapper<ScheduleEntity> {


    List<RiskIssueEntity> getRiskIssueList(Map<String, Object> params);

    int updateRiskIssue(Map<String, Object> params);

    int insertRiskIssue(Map<String, Object> params);

    int deleteRiskIssue(Map<String, Object> params);

}