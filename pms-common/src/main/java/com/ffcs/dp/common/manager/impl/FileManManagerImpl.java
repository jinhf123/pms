package com.ffcs.dp.common.manager.impl;

import com.ffcs.dp.common.dao.FileManMapper;
import com.ffcs.dp.common.entity.FileManEntity;
import com.ffcs.dp.common.manager.FileManManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component("fileManManager")
public class FileManManagerImpl implements FileManManager {

    @Autowired
    private FileManMapper fileManMapper;


    @Override
    public List<FileManEntity> getFileManList(Map<String, Object> params) {
        return fileManMapper.getFileList(params);
    }

    @Override
    public List<FileManEntity> getFolderListByProjId(Map<String, Object> params) {
        return fileManMapper.getFolderListByProjId(params);
    }

    @Override
    public int addFolderInfo(Map<String, Object> params) {
        return fileManMapper.insertFolderInfo(params);
    }

    @Override
    public int deleteFileMan(Map<String, Object> params) {
        return fileManMapper.deleteFileMan(params);
    }

    @Override
    public Long getFileManKey() {
        return fileManMapper.getFileManKey();
    }

    @Override
    public int insertFileInfo(Map<String, Object> params) {
        return fileManMapper.insertFileInfo(params);
    }
}
