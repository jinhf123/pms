package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface ProjManService {

    List<ProjManEntity> listProject(Map<String, Object> params);

    List<ProjManEntity> listArchiveProject(Map<String, Object> params);
}
