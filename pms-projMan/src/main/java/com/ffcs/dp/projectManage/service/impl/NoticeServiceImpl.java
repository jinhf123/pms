package com.ffcs.dp.projectManage.service.impl;

import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.projectManage.entity.NoticeEntity;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.manager.NoticeManager;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import com.ffcs.dp.projectManage.service.NoticeService;
import com.ffcs.dp.projectManage.service.ProjManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 项目管理
 *
 */
@Service("noticeService")
public class NoticeServiceImpl implements NoticeService {


    @Autowired
    private NoticeManager noticeManager;

    @Override
    public List<NoticeEntity> unReadList(Map<String, Object> params) {
        return noticeManager.unReadList(params);
    }

    @Override
    public int readNotice(Map<String, Object> params) {
        return noticeManager.readNotice(params);
    }
}