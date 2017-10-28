package com.ffcs.dp.base.service;

import java.util.List;
import java.util.Map;

import com.ffcs.dp.base.entity.SysMacroEntity;
import com.ffcs.dp.common.entity.R;

/**
 * 通用字典
 *
 */
public interface SysMacroService {

	List<SysMacroEntity> listMacro();
	
	List<SysMacroEntity> listNotMacro();
	
	R saveMacro(SysMacroEntity macro);
	
	R getObjectById(Long id);
	
	R updateMacro(SysMacroEntity macro);
	
	R batchRemove(Long[] id);

	Map<String, List<SysMacroEntity>> listMacroByCatalog(Map<String, Object> params);
}
