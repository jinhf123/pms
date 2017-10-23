package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.WorkLogEntity;

import java.util.List;
import java.util.Map;

public interface WorkLogManager {

    List<WorkLogEntity> getWorkLogList(Map<String, Object> params);

    List<Map> getWorkHoursList(Map<String, Object> params);

    void saveWorkLog(Map<String, Object> params);



}
