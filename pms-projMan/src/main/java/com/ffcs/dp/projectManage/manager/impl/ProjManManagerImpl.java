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
    public List<ProjManEntity> listProject(Map<String, Object> params) {
        return projManMapper.listProject(params);
    }

    @Override
    public List<ProjManEntity> listArchiveProject(Map<String, Object> params)  {
        return projManMapper.listArchiveProject(params);
    }

}
