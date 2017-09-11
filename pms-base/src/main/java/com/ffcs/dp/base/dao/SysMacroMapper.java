package com.ffcs.dp.base.dao;

import java.util.List;

import com.ffcs.dp.base.entity.SysMacroEntity;
import org.mybatis.spring.annotation.MapperScan;

import com.ffcs.dp.common.dao.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * 通用字典dao
 *
 */
@MapperScan
@Repository
public interface SysMacroMapper extends BaseMapper<SysMacroEntity> {

	List<SysMacroEntity> listNotMacro();
	
	int countMacroChildren(Long parentId);
	
}
