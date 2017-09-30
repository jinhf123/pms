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
    public Map getProjInfo(Map<String, Object> params) {
        Map resultMap = new HashMap();
        Map map = projDetailMapper.getProjInfo(params);
        //项目信息
        resultMap.put("tempName",map.get("TEMP_NAME"));
        resultMap.put("projName",map.get("PROJ_NAME"));
        resultMap.put("projType",map.get("PROJ_TYPE"));
        resultMap.put("beloProjGroup",map.get("BELO_PROJ_GROUP"));
        resultMap.put("projLevel",map.get("PROJ_LEVEL"));
        resultMap.put("consMode",map.get("CONS_MODE"));
        resultMap.put("undertakeMode",map.get("UNDERTAKE_MODE"));
        resultMap.put("isCompletInAYear",map.get("IS_COMPLET_IN_A_YEAR"));
        resultMap.put("startDate",map.get("START_DATE"));
        resultMap.put("endDate",map.get("END_DATE"));
        resultMap.put("state",map.get("STATE"));
        //项目干系人
        resultMap.put("projGroupManager",map.get("PROJ_GROUP_MANAGER"));
        resultMap.put("bigProjManager",map.get("BIG_PROJ_MANAGER"));
        resultMap.put("projManager",map.get("PROJ_MANAGER"));
        resultMap.put("demaManager",map.get("DEMA_MANAGER"));
        resultMap.put("techManager",map.get("TECH_MANAGER"));
        resultMap.put("projMembers",map.get("PROJ_MEMBERS"));
        //项目规模
        resultMap.put("persMontTotal",map.get("PERS_MONT_TOTAL"));
        resultMap.put("resourceCost",map.get("RESOURCE_COST"));
        resultMap.put("persMontOutsource",map.get("PERS_MONT_OUTSOURCE"));
        resultMap.put("outsourceCost",map.get("OUTSOURCE_COST"));
        return resultMap;
    }





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
        projDetailMapper.insertTask(params);
    }

    @Override
    public void saveSchedule(Map<String, Object> params) {
        projDetailMapper.insertSchedule(params);
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
