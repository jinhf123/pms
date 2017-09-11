package com.ffcs.dp.base.manager;

import java.util.List;

import com.ffcs.dp.base.entity.SysAreaEntity;
import com.ffcs.dp.common.entity.Query;

/**
 * 行政区域
 *
 */
public interface SysAreaManager {

	List<SysAreaEntity> listAreaByParentCode(Query query);
	
	int saveArea(SysAreaEntity area);
	
	SysAreaEntity getAreaById(Long areaId);
	
	int updateArea(SysAreaEntity area);
	
	int batchRemoveArea(Long[] id);
	
	boolean hasChildren(Long[] id);
	
}
