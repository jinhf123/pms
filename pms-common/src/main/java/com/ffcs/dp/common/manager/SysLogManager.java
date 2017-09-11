package com.ffcs.dp.common.manager;

import java.util.List;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.common.entity.SysLogEntity;

/**
 * 系统日志
 */
public interface SysLogManager {

	void saveLog(SysLogEntity log);
	
	List<SysLogEntity> listLog(Page<SysLogEntity> page, Query query);
	
	int batchRemove(Long[] id);
	
	int batchRemoveAll();
	
}
