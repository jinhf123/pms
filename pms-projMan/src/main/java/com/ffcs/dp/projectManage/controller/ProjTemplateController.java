package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;

import com.ffcs.dp.common.entity.SysUserEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;

import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.service.ProjTemplateService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        JSONArray StepList = (JSONArray) params.get("projTemplateStepEntities");
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
        templateEntity.setTempName((String) params.get("tempName"));
        templateEntity.setDescription((String) params.get("description"));
        templateEntity.setContent((String) params.get("description"));
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
        json.put("message", msg);
        return json;
    }

    @RequestMapping(value = "/template/setDefault", method = RequestMethod.POST)
    public JSON setDefault(@RequestBody Long tempId) {
        JSONObject json = new JSONObject();
        String msg = "修改成功！";
        try {
            projTemplateService.updateSetDefault(tempId);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
            msg = "修改失败" + e.getMessage();
        }
        json.put("message", msg);
        return json;
    }

    @RequestMapping(value = "/template/delete", method = RequestMethod.POST)
    public JSON deleteTemplate(@RequestBody Long tempId) {
        JSONObject json = new JSONObject();
        String msg = "删除成功！";
        List<Long> projIds = projTemplateService.getTemplateInProj(tempId);
        if (projIds.size() == 0) {
            try {
                projTemplateService.updateTemplateState(tempId);
                json.put("success", true);
            } catch (Exception e) {
                json.put("success", false);
                msg = "删除失败" + e.getMessage();
            }
        } else {
            msg = "该模板正在使用中无法修改!";
            json.put("success", false);
        }
        json.put("message", msg);
        return json;
    }

    @RequestMapping(value = "/template/update", method = RequestMethod.POST)
    public JSON update(@RequestBody Map<String, Object> params) {
        JSONObject json = new JSONObject();
        String msg = "修改成功！";
        Long tempId = Long.valueOf((Integer) params.get("tempId"));
        List<Long> projIds = projTemplateService.getTemplateInProj(tempId);
        if (projIds.size() == 0) {
            JSONArray StepList = (JSONArray) params.get("projTemplateStepEntities");
            Iterator<Object> it = StepList.iterator();
            List<ProjTemplateStepEntity> stepEntities = new ArrayList<ProjTemplateStepEntity>();
            int i = 0;
            while (it.hasNext()) {
                ProjTemplateStepEntity step = new ProjTemplateStepEntity();
                JSONObject ob = (JSONObject) it.next();
                step.setTempId(tempId);
                step.setTempStepId(ob.getLong("tempStepId"));

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
                step.setState("1");
                i++;
                stepEntities.add(step);
            }

            JSONArray deleteStep = (JSONArray) params.get("deleteStep");
            for (int j = 0; j < deleteStep.size(); j++) {
                ProjTemplateStepEntity step = new ProjTemplateStepEntity();
                step.setTempStepId(deleteStep.getLong(j));
                step.setState("0");
                stepEntities.add(step);
            }

            ProjTemplateEntity templateEntity = new ProjTemplateEntity();
            templateEntity.setTempId(tempId);
            templateEntity.setTempName((String) params.get("tempName"));
            templateEntity.setDescription((String) params.get("description"));
            templateEntity.setContent((String) params.get("description"));
            templateEntity.setProjTemplateStepEntities(stepEntities);
            templateEntity.setIsDefault("0");

            try {
                projTemplateService.updateTemplate(templateEntity);
                json.put("success", true);
            } catch (Exception e) {
                e.printStackTrace();
                msg = "修改失败" + e.getMessage();
                json.put("success", false);
            }
        } else {
            msg = "该模板正在使用中无法修改!";
            json.put("success", false);
        }
        json.put("message", msg);
        return json;
    }

    @RequestMapping(value = "/template/project/{id}", method = RequestMethod.GET)
    public List<Long> getTemplateInProj(@PathVariable Long id) {
        return projTemplateService.getTemplateInProj(id);
    }

}