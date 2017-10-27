package com.ffcs.dp.projectManage.manager.impl;

import com.ffcs.dp.projectManage.dao.NoticeMapper;
import com.ffcs.dp.projectManage.dao.ProjManMapper;
import com.ffcs.dp.projectManage.entity.NoticeEntity;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import com.ffcs.dp.projectManage.manager.NoticeManager;
import com.ffcs.dp.projectManage.manager.ProjManManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component("noticeManager")
public class NoticeManagerImpl implements NoticeManager {

    @Autowired
    private NoticeMapper noticeMapper;


    @Override
    public List<NoticeEntity> unReadList(Map<String, Object> params) {
        return noticeMapper.unReadList(params);
    }

    @Override
    public int readNotice(Map<String, Object> params) {
        return  noticeMapper.updateNotice(params);
    }
}
