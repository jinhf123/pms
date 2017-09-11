package com.ffcs.dp.shiro.dao;

import java.util.List;

import com.ffcs.dp.shiro.entity.SysMenuEntity;
import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * 系统菜单dao
 */
@MapperScan
@Repository
public interface SysMenuMapper extends BaseMapper<SysMenuEntity> {
	
	List<SysMenuEntity> listParentId(Long parentId);
	
	List<SysMenuEntity> listNotButton();
	
	List<String> listUserPerms(Long userId);
	
	int countMenuChildren(Long parentId);

}
