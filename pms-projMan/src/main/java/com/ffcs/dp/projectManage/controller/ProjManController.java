package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.annotation.SysLog;
import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.service.ProjManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 项目管理
 */
@RestController
@RequestMapping("/projMan/project")
public class ProjManController extends AbstractController {


    @Autowired
    private ProjManService projManService;


    @RequestMapping("/dataGrid")
    public List<ProjManEntity> dataGrid(@RequestBody Map<String, Object> params) {
        if (getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return projManService.listProject(params);
    }


    //查找已归档项目列表
    @RequestMapping("/archiveDataGrid")
    public List<ProjManEntity> archiveDataGrid(@RequestBody Map<String, Object> params) {
        params.put("userIdCreate", getUserId());
        return projManService.listArchiveProject(params);
    }


    //新增项目组
    @SysLog("新增字典-添加项目类型")
    @RequestMapping("/addProjectGroup")
    public JSON addProjectGroup(@RequestBody Map<String, Object> params) {
        JSONObject result = new JSONObject();
        boolean success = true;
        String msg = "";
        params.put("userId", getUserId());
        try {
            //判断项目组名称是否存在
            int count = projManService.projGroupCount(params);
            if (count > 0) {
                success = false;
                msg = "项目组名称已存在！";
            } else {
                projManService.addProjectGroup(params);
            }
        } catch (Exception e) {
            e.printStackTrace();
            success = false;
            msg = "新增项目组失败！" + e.getMessage();
        }
        result.put("success", success);
        result.put("msg", msg);
        return result;
    }


    //获取项目下拉框数据
    @RequestMapping("/getProjNameList")
    public JSONArray getProjNameList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projManService.getProjNameList(params);
    }


    //获取任务下拉框数据
    @RequestMapping("/getTaskNameList")
    public JSONArray getTaskNameList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projManService.getTaskNameList(params);
    }

    //获取任务下拉框数据
    @RequestMapping("/getTaskNameList2")
    public JSONArray getTaskNameList2(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return projManService.getTaskNameList2(params);
    }

}