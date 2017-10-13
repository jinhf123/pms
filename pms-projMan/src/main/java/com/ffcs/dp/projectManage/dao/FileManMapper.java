package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.FileManEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 工作日志dao
 */
@MapperScan
@Repository
public interface FileManMapper extends BaseMapper<FileManEntity> {

    List<FileManEntity> getFileManList(Map<String, Object> params);

    int insertFileMan(Map<String, Object> params);
}
