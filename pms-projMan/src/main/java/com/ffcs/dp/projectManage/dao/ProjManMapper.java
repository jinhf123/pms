package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 项目管理dao
 */
@MapperScan
@Repository
public interface ProjManMapper extends BaseMapper<ProjManEntity> {

    List<ProjManEntity> listProject(Map<String, Object> params);

}
