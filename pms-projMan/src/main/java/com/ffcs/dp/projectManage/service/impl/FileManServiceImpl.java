package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.FileManEntity;
import com.ffcs.dp.projectManage.manager.FileManManager;
import com.ffcs.dp.projectManage.service.FileManService;
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
    public int saveFileMan(Map<String, Object> params) {
        return fileManManager.saveFileMan(params);
    }

    @Override
    public int deleteFileMan(Map<String, Object> params) {
        return fileManManager.deleteFileMan(params);
    }
}