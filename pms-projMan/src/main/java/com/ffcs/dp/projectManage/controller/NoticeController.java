package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.base.entity.SysMacroEntity;
import com.ffcs.dp.base.service.SysMacroService;
import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.NoticeEntity;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.service.NoticeService;
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
 * 通知
 *
 */
@Controller
@ResponseBody
@RequestMapping("/projMan/notice")
public class NoticeController extends AbstractController {


    @Resource
    private NoticeService noticeService;


    @RequestMapping("/unReadList")
    public List<NoticeEntity> unReadList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return noticeService.unReadList(params);
    }



    //读取通知（修改通知状态为已读）
    @RequestMapping("/readNotice")
    public JSON readNotice(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "操作成功！";
        params.put("userId", getUserId());
        try{
            noticeService.readNotice(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "操作失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("message",msg);
        return json;
    }



}