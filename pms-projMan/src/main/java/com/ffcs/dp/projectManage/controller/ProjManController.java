package com.ffcs.dp.projectManage.controller;

import com.ffcs.dp.base.entity.SysMacroEntity;
import com.ffcs.dp.base.service.SysMacroService;
import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.service.ProjManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @Autowired
    private SysMacroService sysMacroService;




    @RequestMapping("/list")
    public List<ProjManEntity> list(@RequestBody Map<String, Object> params) {
        if(getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return projManService.listProject(params);
    }




    @RequestMapping("/dataGrid")
    public List<ProjManEntity> dataGrid(@RequestBody Map<String, Object> params) {
        if(getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return projManService.listProject(params);
    }



    //查找所属项目组下拉框选项
    @RequestMapping("/projGroup")
    public List<SysMacroEntity> projGroup(@RequestBody Map<String, Object> params) {
        if(getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return sysMacroService.listMacroByCatalog(params);
    }


}