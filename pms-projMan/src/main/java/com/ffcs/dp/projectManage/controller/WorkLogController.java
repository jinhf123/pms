package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.service.WorkLogService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 工作日志
 *
 */
@Controller
@ResponseBody
@RequestMapping("/projMan/workLog")
public class WorkLogController extends AbstractController {


    @Resource
    private WorkLogService workLogManService;

    //获取工作日志列表
    @RequestMapping("/getWorkLogList")
    public List<WorkLogEntity> getWorkLogList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return workLogManService.getWorkLogList(params);
    }


    //保存工作日志
    @RequestMapping("/saveWorkLog")
    public JSON saveWorkLog(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        try{
            workLogManService.saveWorkLog(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("message",msg);
        return json;
    }



    //获取工时统计列表
    @RequestMapping("/getWorkHoursList")
    public List<Map> getWorkHoursList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return workLogManService.getWorkHoursList(params);
    }





}