package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.FileManMapper;
import com.ffcs.dp.projectManage.entity.FileManEntity;
import com.ffcs.dp.projectManage.manager.FileManManager;
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
        return fileManMapper.getFileManList(params);
    }

    @Override
    public int saveFileMan(Map<String, Object> params) {
        return fileManMapper.insertFileMan(params);
    }

    @Override
    public int deleteFileMan(Map<String, Object> params) {
        return fileManMapper.deleteFileMan(params);
    }
}
