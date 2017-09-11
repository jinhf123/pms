package com.ffcs.dp.common.service;

import java.util.Map;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.SysLogEntity;

/**
 * 系统日志
 *
 */
public interface SysLogService {

	Page<SysLogEntity> listLog(Map<String, Object> params);
	
	R batchRemove(Long[] id);
	
	R batchRemoveAll();
	
}
