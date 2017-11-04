package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.common.entity.SysUserEntity;
import com.ffcs.dp.projectManage.entity.*;
import com.ffcs.dp.projectManage.service.ProjAddService;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.lang.reflect.Array;
import java.util.*;

/**
 * 项目管理
 */
@Controller
@ResponseBody
@RequestMapping("/projMan")
public class ProjAddController extends AbstractController {
    @Resource
    private ProjAddService projAddService;

    @RequestMapping(value = "/userCost", method = RequestMethod.POST)
    public List<UserCostEntity> list(@RequestBody List<Long> ids) {
        return projAddService.listUserCost(ids);
    }

    @RequestMapping(value = "/userCost/{id}", method = RequestMethod.GET)
    public UserCostEntity listUserCostById(@PathVariable Long id) {
        return projAddService.listUserCostById(id);
    }

    @RequestMapping(value = "/proAdd", method = RequestMethod.POST)
    public JSON saveProInfo(@RequestBody Map<String, Object> params) {
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        JSONObject projectInfo = (JSONObject) params.get("projInfo");
        JSONArray projStep = (JSONArray) params.get("projStep");
        JSONObject projStakeholder = (JSONObject) params.get("projStakeholder");
        JSONObject projCost = (JSONObject) params.get("projCost");
        JSONArray projUserWorkTime = (JSONArray) params.get("projUserWorkTime");
        ProjManEntity projManEntity = new ProjManEntity();
        List<StepEntity> stepEntities = new ArrayList<StepEntity>();
        StakeholderEntity stakeholderEntity = new StakeholderEntity();
        ProjCostEntity projCostEntity = new ProjCostEntity();
        List<WorktimeEntity> worktimeEntities = new ArrayList<WorktimeEntity>();

        projManEntity.setProjName(projectInfo.getString("projName"));
        projManEntity.setProjType(projectInfo.getString("projType"));
        projManEntity.setTempId(projectInfo.getLong("tempId"));
        projManEntity.setBeloProjGroup(projectInfo.getLong("beloProjGroup"));
        projManEntity.setConsMode(projectInfo.getString("consMode"));
        projManEntity.setUndertakeMode(projectInfo.getString("undertakeMode"));
        projManEntity.setIsCompletYear(projectInfo.getString("isCompletYear"));
        projManEntity.setStartDate(projectInfo.getDate("startDate"));
        projManEntity.setEndDate(projectInfo.getDate("endDate"));
        projManEntity.setCreator(getUserId());
        Calendar now = Calendar.getInstance();
        projManEntity.setYear(String.valueOf(now.get(Calendar.YEAR)));
        projManEntity.setState("0");

        stakeholderEntity.setProjGroupManager(projStakeholder.getString("projGroupManager"));
        stakeholderEntity.setBigProjManager(projStakeholder.getString("bigProjManager"));
        stakeholderEntity.setProjManager(projStakeholder.getString("projManager"));
        stakeholderEntity.setDemaManager(projStakeholder.getString("demaManager"));
        stakeholderEntity.setTechManager(projStakeholder.getString("techManager"));
        stakeholderEntity.setProjMembers(projStakeholder.getString("projMembers"));

        projCostEntity.setPersMountTotal(projCost.getDouble("projectWorkTime"));
        projCostEntity.setResourceCost(projCost.getDouble("projectWorkCost"));
        projCostEntity.setPersMountOutsource(projCost.getDouble("outsourceWorkTime"));
        projCostEntity.setOutsourceCost(projCost.getDouble("outsourceWorkCost"));

        Iterator<Object> it = projStep.iterator();
        while (it.hasNext()) {
            StepEntity step = new StepEntity();
            JSONObject ob = (JSONObject) it.next();
            step.setStepName(ob.getString("stepName"));
            step.setStepMod(ob.getLong("stepMod"));
            step.setDefaultDate(ob.getString("defaultDate"));
            step.setNoticeDate(ob.getDate("noticeDate"));
            JSONArray noticeId = (JSONArray) ob.get("noticeId");
            List<Long> noticeArray = new ArrayList<Long>();

            if (noticeId != null) {
                for (int i=0;i< noticeId.size();i++){
                    noticeArray.add(noticeId.getLong(i));
                }
            }
            step.setNoticeId(noticeArray);
            stepEntities.add(step);
        }

        it = projUserWorkTime.iterator();

        while (it.hasNext()) {
            WorktimeEntity worktime = new WorktimeEntity();
            JSONObject ob = (JSONObject) it.next();
            worktime.setStartDate(ob.getDate("start"));
            worktime.setEndDate(ob.getDate("end"));
            worktime.setUseRate(ob.getLong("rate"));
            worktime.setUserId(ob.getLong("userId"));
            worktimeEntities.add(worktime);
        }

        Map<String, Object> projInfo = new HashMap<>();
        projInfo.put("projInfo", projManEntity);
        projInfo.put("projStep", stepEntities);
        projInfo.put("projStakeholder", stakeholderEntity);
        projInfo.put("projCost", projCostEntity);
        projInfo.put("projUserWorkTime", worktimeEntities);


        try {
            projAddService.saveProjInfo(projInfo);
            json.put("projId", projManEntity.getProjId());
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("success", false);
            msg = "保存失败" + e.getMessage();
        }

        json.put("message", msg);
        return json;
    }

    @RequestMapping(value = "/stakeholder/{id}", method = RequestMethod.GET)
    public List<SysUserEntity> getStakeholder(@PathVariable Long id) {
        return projAddService.getStakeholder(id);
    }
}