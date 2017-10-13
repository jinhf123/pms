package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.projectManage.entity.FileManEntity;

import java.util.List;
import java.util.Map;

public interface FileManService {


    List<FileManEntity> getFileManList(Map<String, Object> params);

    int saveFileMan(Map<String, Object> params);
}
