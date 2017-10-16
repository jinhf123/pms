package com.ffcs.dp.common.manager;


import com.ffcs.dp.common.entity.FileManEntity;

import java.util.List;
import java.util.Map;

public interface FileManManager {


    List<FileManEntity> getFileManList(Map<String, Object> params);

    int saveFileMan(Map<String, Object> params);

    int deleteFileMan(Map<String, Object> params);

    Long getFileManKey();

    int insertFileInfo(Map<String, Object> params);
}
