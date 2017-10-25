package com.ffcs.dp.base.manager;

import java.util.List;
import java.util.Map;

import com.ffcs.dp.base.entity.SysMacroEntity;

/**
 * 通用字典
 *
 */
public interface SysMacroManager {

	List<SysMacroEntity> listMacro();
	
	List<SysMacroEntity> listNotMacro();
	
	int saveMacro(SysMacroEntity macro);
	
	SysMacroEntity getObjectById(Long id);
	
	int updateMacro(SysMacroEntity macro);
	
	int batchRemove(Long[] id);
	
	boolean hasChildren(Long[] id);

    List<SysMacroEntity> listMacroByCatalog(Map<String, Object> params);
}
