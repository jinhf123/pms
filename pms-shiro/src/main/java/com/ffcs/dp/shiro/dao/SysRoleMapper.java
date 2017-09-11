package com.ffcs.dp.shiro.dao;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.shiro.entity.SysRoleEntity;
import org.springframework.stereotype.Repository;

/**
 * 系统角色dao
 */
@MapperScan
@Repository
public interface SysRoleMapper extends BaseMapper<SysRoleEntity> {
	
	List<String> listUserRoles(Long userId);
	
}
