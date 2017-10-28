package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface ProjManManager {

    List<ProjManEntity> listProject(Map<String, Object> params);

    List<ProjManEntity> listArchiveProject(Map<String, Object> params);
}
