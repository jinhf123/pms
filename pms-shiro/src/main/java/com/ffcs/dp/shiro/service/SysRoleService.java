package com.ffcs.dp.shiro.service;

import java.util.Map;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.shiro.entity.SysRoleEntity;

/**
 * 系统角色
 */
public interface SysRoleService {

	Page<SysRoleEntity> listRole(Map<String, Object> params);
	
	R saveRole(SysRoleEntity role);
	
	R getRoleById(Long id);
	
	R updateRole(SysRoleEntity role);
	
	R batchRemove(Long[] id);
	
	R listRole();
	
	R updateRoleAuthorization(SysRoleEntity role);
	
}
