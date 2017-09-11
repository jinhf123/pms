package com.ffcs.dp.shiro.dao;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.common.entity.SysUserEntity;
import org.springframework.stereotype.Repository;

/**
 * 系统用户dao
 */
@MapperScan
@Repository
public interface SysUserMapper extends BaseMapper<SysUserEntity> {

	SysUserEntity getByUserName(String username);
	
	List<Long> listAllMenuId(Long userId);
	
	int updatePswdByUser(Query query);
	
	int updateUserStatus(Query query);
	
	int updatePswd(SysUserEntity user);
	
}
