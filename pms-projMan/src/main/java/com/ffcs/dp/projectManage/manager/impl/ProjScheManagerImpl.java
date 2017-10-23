package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.ProjScheMapper;
import com.ffcs.dp.projectManage.dao.WorkLogMapper;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.manager.ProjScheManager;
import com.ffcs.dp.projectManage.manager.WorkLogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("projScheManager")
public class ProjScheManagerImpl implements ProjScheManager {

    @Autowired
    private ProjScheMapper projScheMapper;

    @Override
    public List<ScheduleEntity> getProjScheList(Map<String, Object> params) {
        return projScheMapper.getProjScheList(params);
    }

    @Override
    public int saveProjSche(Map<String, Object> params) {
        int count;
        if (!"".equals(params.get("scheduleId"))&&params.get("scheduleId")!=null){
            count = projScheMapper.updateProjSche(params);
        }else{
            count = projScheMapper.insertProjSche(params);
        }
        return count;
    }

    @Override
    public int deleteProjSche(Map<String, Object> params) {
        return projScheMapper.deleteProjSche(params);
    }


}
