package com.ffcs.dp.projectManage.controller;

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




    //获取工作日志列表
    @RequestMapping("/saveWorkLog")
    public void saveWorkLog(@RequestBody Map<String, Object> params) throws Exception{
        params.put("userId", getUserId());

        System.out.print(params.keySet().size());
        for(String str : params.keySet()){
            System.out.print("\t"+str+"="+params.get(str));
        }
        workLogManService.saveWorkLog(params);
    }





    //获取工时统计列表
    @RequestMapping("/getWorkHoursList")
    public List<Map> getWorkHoursList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return workLogManService.getWorkHoursList(params);
    }





}