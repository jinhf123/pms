package com.ffcs.dp.shiro.service;

import java.util.List;
import java.util.Map;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.shiro.entity.SysMenuEntity;

/**
 * 系统菜单
 */
public interface SysMenuService {
	
	R listUserMenu(Long userId);
	
	List<SysMenuEntity> listMenu(Map<String, Object> params);
	
	R listNotButton();
	
	R saveMenu(SysMenuEntity menu);

	R getMenuById(Long id);
	
	R updateMenu(SysMenuEntity menu);
	
	R batchRemove(Long[] id);

}
