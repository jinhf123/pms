package com.ffcs.dp.shiro.service;

import java.util.Map;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.common.entity.SysUserEntity;

/**
 * 系统用户
 */
public interface SysUserService {

	Page<SysUserEntity> listUser(Map<String, Object> params);

	Page<SysUserEntity> staffSelectList(Map<String, Object> params);
	
	R saveUser(SysUserEntity user);
	
	R getUserById(Long userId);
	
	R updateUser(SysUserEntity user);
	
	R batchRemove(Long[] id);
	
	R listUserPerms(Long userId);
	
	R updatePswdByUser(SysUserEntity user);
	
	R updateUserEnable(Long[] id);
	
	R updateUserDisable(Long[] id);
	
	R updatePswd(SysUserEntity user);
	
}
