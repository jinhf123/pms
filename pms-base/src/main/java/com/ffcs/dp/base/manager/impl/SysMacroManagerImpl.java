package com.ffcs.dp.base.manager.impl;

import java.util.*;

import com.ffcs.dp.base.entity.SysMacroEntity;
import com.ffcs.dp.base.manager.SysMacroManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ffcs.dp.base.dao.SysMacroMapper;
import com.ffcs.dp.common.utils.CommonUtils;

/**
 * 通用字典
 *
 */
@Component("sysMacroManager")
public class SysMacroManagerImpl implements SysMacroManager {

	@Autowired
	private SysMacroMapper sysMacroMapper;
	
	@Override
	public List<SysMacroEntity> listMacro() {
		return sysMacroMapper.list();
	}

	@Override
	public List<SysMacroEntity> listNotMacro() {
		return sysMacroMapper.listNotMacro();
	}

	@Override
	public int saveMacro(SysMacroEntity macro) {
		return sysMacroMapper.save(macro);
	}

	@Override
	public SysMacroEntity getObjectById(Long id) {
		return sysMacroMapper.getObjectById(id);
	}

	@Override
	public int updateMacro(SysMacroEntity macro) {
		return sysMacroMapper.update(macro);
	}

	@Override
	public int batchRemove(Long[] id) {
		return sysMacroMapper.batchRemove(id);
	}
	
	@Override
	public boolean hasChildren(Long[] id) {
		for(Long parentId : id) {
			int count = sysMacroMapper.countMacroChildren(parentId);
			if(CommonUtils.isIntThanZero(count)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public Map<String, List<SysMacroEntity>> listMacroByCatalog(Map<String, Object> params) {
		Map<String,List<SysMacroEntity>> map = new HashMap<>();
		List<SysMacroEntity> list = sysMacroMapper.listMacroByCatalog(params);
		Iterator<SysMacroEntity> it = list.iterator();
		while(it.hasNext()){
			SysMacroEntity x = it.next();
			if(x.getTypeCode()!=null&&!"".equals(x.getTypeCode())){
				List<SysMacroEntity> tmp;
				if(map.containsKey(x.getTypeCode())){
					tmp = map.get(x.getTypeCode());
				}else{
					tmp = new ArrayList<>();
				}
				tmp.add(x);
				map.put(x.getTypeCode(),tmp);
			}
		}
		return map;
	}

}
