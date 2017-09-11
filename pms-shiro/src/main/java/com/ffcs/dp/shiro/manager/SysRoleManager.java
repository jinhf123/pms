package com.ffcs.dp.shiro.manager;

import java.util.List;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.shiro.entity.SysRoleEntity;

/**
 * 系统角色
 */
public interface SysRoleManager {

	List<SysRoleEntity> listRole(Page<SysRoleEntity> page, Query search);
	
	int saveRole(SysRoleEntity role);
	
	SysRoleEntity getRoleById(Long id);
	
	int updateRole(SysRoleEntity role);
	
	int batchRemove(Long[] id);
	
	List<SysRoleEntity> listRole();
	
	int updateRoleAuthorization(SysRoleEntity role);
	
}
