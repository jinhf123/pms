package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 项目日程dao
 */
@MapperScan
@Repository
public interface ProjScheMapper extends BaseMapper<ScheduleEntity> {

    List<ScheduleEntity> getProjScheList(Map<String, Object> params);

    int updateProjSche(Map<String, Object> params);

    int insertProjSche(Map<String, Object> params);

    int deleteProjSche(Map<String, Object> params);
}
