package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.SysUserEntity;
import com.ffcs.dp.projectManage.entity.RiskIssueEntity;
import com.ffcs.dp.projectManage.entity.ScheduleEntity;
import com.ffcs.dp.projectManage.service.ProjScheService;
import com.ffcs.dp.projectManage.service.RiskIssueService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 风险问题
 *
 */
@Controller
@ResponseBody
@RequestMapping("/riskIssue/projRisk")
public class RiskIssueController extends AbstractController {


    @Resource
    private RiskIssueService riskIssueService;


    //获取风险问题列表带分页
    @RequestMapping("/list")
    public Page<RiskIssueEntity> list(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return riskIssueService.list(params);
    }


    //获取风险问题列表
    @RequestMapping("/getRiskIssueList")
    public List<RiskIssueEntity> getRiskIssueList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return riskIssueService.getRiskIssueList(params);
    }


    //保存风险问题信息
    @RequestMapping("/saveRiskIssue")
    public JSON saveRiskIssue(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        try{
            riskIssueService.saveRiskIssue(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }


    //删除风险问题信息
    @RequestMapping("/deleteRiskIssue")
    public JSON deleteRiskIssue(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "删除成功！";
        params.put("userId", getUserId());
        try{
            riskIssueService.deleteRiskIssue(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "删除失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("msg",msg);
        return json;
    }




}