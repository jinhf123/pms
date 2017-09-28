package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.common.utils.DateUtils;
import com.ffcs.dp.projectManage.dao.ProjDetailMapper;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.entity.StepEntity;
import com.ffcs.dp.projectManage.entity.TaskEntity;
import com.ffcs.dp.projectManage.manager.ProjDetailManager;
import org.apache.commons.collections.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component("projDetailManager")
public class ProjDetailManagerImpl implements ProjDetailManager {

    @Autowired
    private ProjDetailMapper projDetailMapper;


    @Override
    public Map getProjectInfo(Map<String, Object> params) {
        Map resultMap = new HashMap();
        Map map = projDetailMapper.getProjectInfo(params);
        resultMap.put("projectName",map.get("PROJ_NAME"));
        resultMap.put("allStep",map.get("ALL_STEP"));
        resultMap.put("unCompStep",map.get("UN_COMP_STEP"));
        resultMap.put("unCompTask",map.get("UN_COMP_TASK"));
        resultMap.put("unCompSchedule",map.get("UN_COMP_SCHEDULE"));
        return resultMap;
    }

    @Override
    public List<StepEntity> getStepList(Map<String, Object> params) {
        List<StepEntity> result = projDetailMapper.getStepList(params);


        return result;
    }

    @Override
    public List<TaskEntity> getTaskList(Map<String, Object> params) {
        List<TaskEntity> result = new ArrayList<>();
        List<TaskEntity> list = projDetailMapper.getTaskList(params);
        List<TaskEntity> parTaskList = new ArrayList<>();
        List<TaskEntity> subTaskList = new ArrayList<>();
        Iterator<TaskEntity> it = list.iterator();
        while(it.hasNext()){
            TaskEntity x = it.next();
            if(x.getParentTask()!=null&&!"".equals(x.getParentTask())){
                subTaskList.add(x);
            }else{
                parTaskList.add(x);
            }
        }

        Iterator<TaskEntity> pIt = parTaskList.iterator();
        while(pIt.hasNext()){
            TaskEntity x = pIt.next();
            List<TaskEntity> delList = new ArrayList<>();
            for(TaskEntity s:subTaskList){
                if(s.getParentTask()==x.getTaskId()){
                    if(x.getSubTaskList()==null){
                        x.setSubTaskList(new ArrayList<TaskEntity>());
                    }
                    List<TaskEntity> newList = x.getSubTaskList();
                    newList.add(s);
                    x.setSubTaskList(newList);
                    delList.add(s);
                }
            }
            subTaskList.removeAll(delList);
            x.setExpand(false);
            result.add(x);
        }
        return result;
    }

    @Override
    public List<ScheduleEntity> getScheduleList(Map<String, Object> params) {
        List<ScheduleEntity> result = new ArrayList<>();
        List<ScheduleEntity> list = projDetailMapper.getScheduleList(params);
        for(ScheduleEntity se:list){
            String date = DateUtils.format(se.getEndDate(),"MM-dd");
            se.setDate(date);
            result.add(se);
        }
        return result;
    }

    @Override
    public void saveTask(Map<String, Object> params) {
        /*if (!"".equals(params.get("scheduleId"))&&params.get("scheduleId")!=null){
            projDetailMapper.updateTask(params);
        }else{*/
            projDetailMapper.insertTask(params);
        /*}*/
    }

    @Override
    public void saveSchedule(Map<String, Object> params) {
       /* if (!"".equals(params.get("scheduleId"))&&params.get("scheduleId")!=null){
            projDetailMapper.updateSchedule(params);
        }else{*/
            projDetailMapper.insertSchedule(params);
        /*}*/
    }

    @Override
    public void deleteTask(Map<String, Object> params) {
        projDetailMapper.deleteTask(params);
    }

    @Override
    public void deleteSchedule(Map<String, Object> params) {
        projDetailMapper.deleteSchedule(params);
    }

    @Override
    public int updateStepState(Map<String, Object> params) {
        return projDetailMapper.updateStepState(params);
    }

    @Override
    public int updateTaskState(Map<String, Object> params) {
        return projDetailMapper.updateTaskState(params);
    }


}
