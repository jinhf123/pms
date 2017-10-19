package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.manager.ProjScheManager;
import com.ffcs.dp.projectManage.manager.WorkLogManager;
import com.ffcs.dp.projectManage.service.ProjScheService;
import com.ffcs.dp.projectManage.service.WorkLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 项目日程
 *
 */
@Service("projScheService")
public class ProjScheServiceImpl implements ProjScheService {


    @Autowired
    private ProjScheManager projScheManager;


    @Override
    public List<ScheduleEntity> getProjScheList(Map<String, Object> params) {
        return projScheManager.getProjScheList(params);
    }

    @Override
    public int saveProjSche(Map<String, Object> params) {
        return projScheManager.saveProjSche(params);
    }

    @Override
    public int deleteProjSche(Map<String, Object> params) {
        return projScheManager.deleteProjSche(params);
    }
}