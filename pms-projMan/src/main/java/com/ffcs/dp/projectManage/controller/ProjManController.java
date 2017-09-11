package com.ffcs.dp.projectManage.controller;

import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.service.ProjManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 项目管理
 *
 */
@Controller
@ResponseBody
@RequestMapping("/projMan/project")
public class ProjManController extends AbstractController {


    @Resource
    private ProjManService projManService;


    @RequestMapping("/list")
    public List<ProjManEntity> list(@RequestBody Map<String, Object> params) {
        if(getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return projManService.listProject(params);
    }



}