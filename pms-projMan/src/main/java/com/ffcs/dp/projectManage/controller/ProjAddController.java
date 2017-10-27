package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import com.ffcs.dp.projectManage.entity.UserCostEntity;
import com.ffcs.dp.projectManage.service.ProjAddService;
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
}