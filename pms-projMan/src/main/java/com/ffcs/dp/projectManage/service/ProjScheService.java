package com.ffcs.dp.projectManage.service;

import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;

import java.util.List;
import java.util.Map;

public interface ProjScheService {


    List<ScheduleEntity> getProjScheList(Map<String, Object> params);

    int saveProjSche(Map<String, Object> params);

    int deleteProjSche(Map<String, Object> params);
}
