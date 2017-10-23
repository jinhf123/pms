package com.ffcs.dp.common.dao;

import com.ffcs.dp.common.entity.FileManEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 文档管理dao
 */
@MapperScan
@Repository
public interface FileManMapper extends BaseMapper<FileManEntity> {

    List<FileManEntity> getFileList(Map<String, Object> params);

    List<FileManEntity> getFolderListByProjId(Map<String, Object> params);

    int insertFolderInfo(Map<String, Object> params);

    int deleteFileMan(Map<String, Object> params);

    Long getFileManKey();

    int insertFileInfo(Map<String, Object> params);

}
