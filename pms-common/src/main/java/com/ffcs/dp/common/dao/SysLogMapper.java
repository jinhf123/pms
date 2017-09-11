package com.ffcs.dp.common.dao;

import com.ffcs.dp.common.entity.SysLogEntity;
import org.mybatis.spring.annotation.MapperScan;

import org.springframework.stereotype.Repository;

/**
 * 系统日志 
 *
 */
@MapperScan
@Repository
public interface SysLogMapper extends BaseMapper<SysLogEntity> {

	int batchRemoveAll();
	
}
