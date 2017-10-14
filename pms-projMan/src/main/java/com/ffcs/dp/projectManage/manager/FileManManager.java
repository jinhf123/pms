package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.FileManEntity;

import java.util.List;
import java.util.Map;

public interface FileManManager {


    List<FileManEntity> getFileManList(Map<String, Object> params);

    int saveFileMan(Map<String, Object> params);

    int deleteFileMan(Map<String, Object> params);
}
