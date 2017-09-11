package com.ffcs.dp.shiro.dao;

import java.util.List;

import com.ffcs.dp.shiro.entity.SysUserRoleEntity;
import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * 用户与角色关系dao
 */
@MapperScan
@Repository
public interface SysUserRoleMapper extends BaseMapper<SysUserRoleEntity> {

	List<Long> listUserRoleId(Long userId);
	
	int batchRemoveByUserId(Long[] id);
	
	int batchRemoveByRoleId(Long[] id);
	
}
