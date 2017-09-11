package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjManMapper;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
@Component("projManManager")
public class ProjManManagerImpl implements ProjManManager {

    @Autowired
    private ProjManMapper projManMapper;

    @Override
    public List listProject(Long userId) {
        return null;
    }

    @Override
    public List<ProjManEntity> listProject(Map<String, Object> params) {
        return projManMapper.listProject(params);
    }

    @Override
    public ProjManEntity getProjectById(Long id) {
        return null;
    }

    @Override
    public int saveProject(ProjManEntity project) {
        return 0;
    }

    @Override
    public int updateProject(ProjManEntity project) {
        return 0;
    }

    @Override
    public int batchRemove(Long[] id) {
        return 0;
    }
}
