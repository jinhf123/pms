package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.service.ProjManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * 项目管理
 *
 */
@Service("projManService")
public class ProjManServiceImpl implements ProjManService {


    @Autowired
    private ProjManManager projManManager;


    @Override
    public List<ProjManEntity> listProject(Map<String, Object> params) {
        return projManManager.listProject(params);
    }

    @Override
    public List<ProjManEntity> listArchiveProject(Map<String, Object> params) {
        return projManManager.listArchiveProject(params);
    }


}