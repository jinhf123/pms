package com.ffcs.dp.base.service;

import java.util.List;
import java.util.Map;

import com.ffcs.dp.base.entity.SysAreaEntity;
import com.ffcs.dp.common.entity.R;

/**
 * 行政区域
 *
 */
public interface SysAreaService {

	List<SysAreaEntity> listAreaByParentCode(String areaCode);
	
	R listAreaByParentCode(Map<String, Object> params);
	
	R saveArea(SysAreaEntity area);
	
	R getAreaById(Long areaId);
	
	R updateArea(SysAreaEntity area);
	
	R batchRemoveArea(Long[] id);
	
}
