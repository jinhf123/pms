package com.ffcs.dp.projectManage.manager.impl;

import com.alibaba.fastjson.JSONArray;
import com.ffcs.dp.projectManage.dao.ProjManMapper;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

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

    @Override
    public int projGroupCount(Map<String, Object> params) {
        return projManMapper.projGroupCount(params);
    }

    @Override
    public int addProjectGroup(Map<String, Object> params) {
        return projManMapper.addProjectGroup(params);
    }

    @Override
    public JSONArray getProjNameList (Map<String, Object> params) {
        JSONArray result = new JSONArray();
        List<ProjManEntity> list = projManMapper.getProjNameList(params);
        for(ProjManEntity e : list){
            Map map = new HashMap();
            map.put("name",e.getProjName());
            map.put("value",e.getProjId());
            result.add(map);
        }
        System.out.print("项目列表数据："+result.toJSONString());
        return result;
    }


    @Override
    public JSONArray getTaskNameList (Map<String, Object> params) {
        JSONArray result = new JSONArray();
        List<TaskEntity> list = projManMapper.getTaskNameList(params);
        for(TaskEntity e : list){
             Map map = new HashMap();
             map.put("name",e.getTaskTitle());
            map.put("value",e.getTaskId());
            result.add(map);
        }
        System.out.print("任务列表数据："+result.toJSONString());
        return result;
    }


    @Override
    public JSONArray getTaskNameList2 (Map<String, Object> params) {
        JSONArray result = new JSONArray();
        List<TaskEntity> list = projManMapper.getTaskNameList2(params);
        Map resultMap = new HashMap();
        Iterator<TaskEntity> it = list.iterator();
        while(it.hasNext()){
            TaskEntity x = it.next();
            Map projMap = new HashMap();
            projMap.put("name",x.getProjName());
            projMap.put("value",x.getProjId());
            Map taskMap = new HashMap();
            taskMap.put("name",x.getTaskTitle());
            taskMap.put("value",x.getTaskId());
            if(!resultMap.containsKey(x.getProjId())){
                JSONArray taskArray = new JSONArray();
                taskArray.add(taskMap);
                projMap.put("tasks",taskArray);
                resultMap.put(x.getProjId(),projMap);
            }else{
                Map projMapTemp = (Map) resultMap.get(x.getProjId());
                JSONArray taskArray =  (JSONArray) projMapTemp.get("tasks");
                taskArray.add(taskMap);
                projMap.put("tasks",taskArray);
                resultMap.put(x.getProjId(),projMap);
            }
        }
        for(Object ob : resultMap.keySet()){
            result.add( resultMap.get(ob));
        }
        System.out.print("任务列表数据："+result.toJSONString());
        return result;
    }


}
