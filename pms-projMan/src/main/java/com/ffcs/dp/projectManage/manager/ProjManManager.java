package com.ffcs.dp.projectManage.manager;

import com.alibaba.fastjson.JSONArray;
import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface ProjManManager {

    List<ProjManEntity> listProject(Map<String, Object> params);

    List<ProjManEntity> listArchiveProject(Map<String, Object> params);

    int projGroupCount(Map<String, Object> params);

    int addProjectGroup(Map<String, Object> params);

    JSONArray getProjNameList(Map<String, Object> params);

    JSONArray getTaskNameList(Map<String, Object> params);

    JSONArray getTaskNameList2(Map<String, Object> params);
}
