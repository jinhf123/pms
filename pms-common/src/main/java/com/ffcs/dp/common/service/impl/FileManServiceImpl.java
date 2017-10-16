package com.ffcs.dp.common.service.impl;

import com.ffcs.dp.common.entity.FileManEntity;
import com.ffcs.dp.common.manager.FileManManager;
import com.ffcs.dp.common.service.FileManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 文档管理
 *
 */
@Service("fileManService")
public class FileManServiceImpl implements FileManService {


    @Autowired
    private FileManManager fileManManager;

    @Override
    public List<FileManEntity> getFileManList(Map<String, Object> params) {
        return fileManManager.getFileManList(params);
    }

    @Override
    public int addFolderInfo(Map<String, Object> params) {
        return fileManManager.addFolderInfo(params);
    }

    @Override
    public int deleteFileMan(Map<String, Object> params) {
        return fileManManager.deleteFileMan(params);
    }

    @Override
    public Long getFileManKey() {
        return fileManManager.getFileManKey();
    }

    @Override
    public int insertFileInfo(Map<String, Object> params) {
        return fileManManager.insertFileInfo(params);
    }
}