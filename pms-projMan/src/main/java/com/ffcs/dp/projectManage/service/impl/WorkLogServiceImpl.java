package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import com.ffcs.dp.projectManage.manager.WorkLogManager;
import com.ffcs.dp.projectManage.service.ProjManService;
import com.ffcs.dp.projectManage.service.WorkLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 工作日志
 *
 */
@Service("workLogService")
public class WorkLogServiceImpl implements WorkLogService {


    @Autowired
    private WorkLogManager workLogManager;


    @Override
    public List<WorkLogEntity> getWorkLogList(Map<String, Object> params) {
        return workLogManager.getWorkLogList(params);
    }

    @Override
    public List<Map> getWorkHoursList(Map<String, Object> params){
        return workLogManager.getWorkHoursList(params);
    }

    @Override
    public void saveWorkLog(Map<String, Object> params){
        workLogManager.saveWorkLog(params);
    }


}