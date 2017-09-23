package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 工作日志dao
 */
@MapperScan
@Repository
public interface WorkLogMapper extends BaseMapper<WorkLogEntity> {

    List<WorkLogEntity> getWorkLogList(Map<String, Object> params);

    List<Map> getWorkHoursList(Map<String, Object> params);

    void insertWorkLog(Map<String, Object> params);

    void updateWorkLog(Map<String, Object> params);
}
