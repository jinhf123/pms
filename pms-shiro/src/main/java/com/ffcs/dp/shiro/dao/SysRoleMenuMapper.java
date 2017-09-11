package com.ffcs.dp.shiro.dao;

import java.util.List;

import com.ffcs.dp.shiro.entity.SysRoleMenuEntity;
import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * 系统角色与菜单关系dao
 */
@MapperScan
@Repository
public interface SysRoleMenuMapper extends BaseMapper<SysRoleMenuEntity> {

	int batchRemoveByMenuId(Long[] id);
	
	int batchRemoveByRoleId(Long[] id);
	
	List<Long> listMenuId(Long id);
	
}
