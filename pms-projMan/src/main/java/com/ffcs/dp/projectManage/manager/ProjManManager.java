package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface ProjManManager {

    List listProject(Long userId) ;

    List<ProjManEntity> listProject(Map<String, Object> params);

    ProjManEntity getProjectById(Long id);

    int saveProject(ProjManEntity project);


    int updateProject(ProjManEntity project);

    int batchRemove(Long[] id);

}
