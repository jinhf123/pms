package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface ProjManService {

    R listProject(Long userId);

    List<ProjManEntity> listProject(Map<String, Object> params);

    R saveProject(ProjManEntity project);

    R getProjectById(Long id);

    R updateProject(ProjManEntity project);

    R batchRemove(Long[] id);


}
