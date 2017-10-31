package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;

import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;

import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 项目管理
 */
@Controller
@ResponseBody
@RequestMapping("/projMan")
public class ProjTemplateController extends AbstractController {
    @Resource
    private ProjTemplateService projTemplateService;

    @RequestMapping(value = "/template", method = RequestMethod.GET)
    public List<ProjTemplateEntity> list() {
        return projTemplateService.listTemplate();
    }

    @RequestMapping(value = "/template", method = RequestMethod.POST)
    public JSON save(@RequestBody Map<String, Object> params) {
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        Map<String, Object> template = (Map<String, Object>) params.get("params");
        JSONArray StepList = (JSONArray) template.get("stepList");
        Iterator<Object> it = StepList.iterator();
        List<ProjTemplateStepEntity> stepEntities = new ArrayList<ProjTemplateStepEntity>();
        int i = 0;
        while (it.hasNext()) {
            ProjTemplateStepEntity step = new ProjTemplateStepEntity();
            JSONObject ob = (JSONObject) it.next();
            step.setStepName(ob.getString("stepName"));
            step.setStepSort(String.valueOf(i));
            step.setDefaultMoveDate(ob.getString("defaultMoveDate"));
            step.setFinishNoticeDate(ob.getString("finishNoticeDate"));
            step.setNoticeStaff(ob.getString("noticeStaff"));
            step.setNoticeStaffId(ob.getString("noticeStaffId"));
            step.setTaskChangeStaff(ob.getString("taskChangeStaff"));
            step.setTaskChangeStaffId(ob.getString("taskChangeStaffId"));
            step.setFinishScheduleNoticeDate(ob.getString("finishScheduleNoticeDate"));
            step.setFinishScheduleStaff(ob.getString("finishScheduleStaff"));
            step.setIsAttach(ob.getString("isAttach"));
            step.setAttachWord(ob.getLong("attachWord"));
            step.setAttachExcel(ob.getLong("attachExcel"));
            step.setAttachPdf(ob.getLong("attachPdf"));
            step.setAttachContent(ob.getString("attachContent"));
            i++;
            stepEntities.add(step);
        }
        ProjTemplateEntity templateEntity = new ProjTemplateEntity();
        templateEntity.setTempName((String) template.get("tempName"));
        templateEntity.setDescription((String) template.get("description"));
        templateEntity.setContent((String) template.get("description"));
        templateEntity.setProjTemplateStepEntities(stepEntities);
        templateEntity.setIsDefault("0");
        try {
            projTemplateService.saveTemplate(templateEntity);
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            msg = "保存失败" + e.getMessage();
            json.put("success", false);
        }
        json.put("message", msg );
        return json;
    }

    @RequestMapping(value = "/template/setDefault", method = RequestMethod.POST)
    public JSON setDefault(@RequestBody Long tempId) {
        JSONObject json = new JSONObject();
        String msg = "修改成功！";
        try {
            projTemplateService.updateSetDefault(tempId);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
            msg = "修改失败" + e.getMessage();
        }
        json.put("message", msg );
        return  json;
    }
}