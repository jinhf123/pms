package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.WorkLogMapper;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.manager.WorkLogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
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
        List<Map> list = workLogMapper.getWorkHoursList(params);
        List<Map> workHoursList = new ArrayList<>();

        Map obj = new HashMap();
        for(Map tmp:list){
            List<Map> items = new ArrayList<>();
            Map subMap = new HashMap();
            subMap.put("task", tmp.get("TASK_TITLE"));
            subMap.put("hours", tmp.get("HOURS"));
            subMap.put("rat", tmp.get("RAT"));
            items.add(subMap);

            Boolean flag = true;
            if(obj.keySet().size()<=0) {
                obj.put(tmp.get("WEEK"), items);
                flag=false;
            }else for(Object o: obj.keySet()){
                if(o.equals(tmp.get("WEEK"))){
                    ArrayList<Map> arr = (ArrayList<Map>)obj.get(o);
                    arr.add(subMap);
                    obj.put(o,arr);
                    flag=false;
                }
            }
            if(flag){
                obj.put(tmp.get("WEEK"), items);
            }
        }

        for(Object key: obj.keySet()){
            Map workHours = new HashMap();
            workHours.put("week",key);
            workHours.put("items",obj.get(key));
            workHoursList.add(workHours);
        }
        return workHoursList;
    }

    @Override
    public void saveWorkLog(Map<String, Object> params) {
        if (!"".equals(params.get("workLogId"))&&params.get("workLogId")!=null){
            workLogMapper.updateWorkLog(params);
        }else{
            workLogMapper.insertWorkLog(params);
        }
    }

    @Override
    public List<WorkLogEntity> getExportList(Map<String, Object> params) {
        return workLogMapper.getExportList(params);
    }

    @Override
    public WorkLogEntity getProjTaskInfo(Map<String, Object> params) {
        return workLogMapper.getProjTaskInfo(params);
    }


}
