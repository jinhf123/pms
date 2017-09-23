package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.WorkLogMapper;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.manager.WorkLogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component("workLogManager")
public class WorkLogManagerImpl implements WorkLogManager {

    @Autowired
    private WorkLogMapper workLogMapper;


    @Override
    public List<WorkLogEntity> getWorkLogList(Map<String, Object> params) {
        return workLogMapper.getWorkLogList(params);
    }

    @Override
    public List<Map> getWorkHoursList(Map<String, Object> params) {
        return workLogMapper.getWorkHoursList(params);
    }

    @Override
    public void saveWorkLog(Map<String, Object> params) {
        if (!"".equals(params.get("workLogId"))&&params.get("workLogId")!=null){
            workLogMapper.updateWorkLog(params);
        }else{
            workLogMapper.insertWorkLog(params);
        }
    }


}
