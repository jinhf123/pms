package com.ffcs.dp.base.dao;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.base.entity.SysAreaEntity;
import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.common.entity.Query;
import org.springframework.stereotype.Repository;

/**
 * 行政区域dao
 *
 */
@MapperScan
@Repository
public interface SysAreaMapper extends BaseMapper<SysAreaEntity> {

	List<SysAreaEntity> listAreaByParentCode(Query query);
	
	int countAreaChildren(Long areaId);
	
}
