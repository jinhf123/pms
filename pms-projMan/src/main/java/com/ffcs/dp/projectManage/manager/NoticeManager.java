package com.ffcs.dp.projectManage.manager;

import com.ffcs.dp.projectManage.entity.NoticeEntity;
import com.ffcs.dp.projectManage.entity.ProjManEntity;

import java.util.List;
import java.util.Map;

public interface NoticeManager {


    List<NoticeEntity> unReadList(Map<String, Object> params);

    int readNotice(Map<String, Object> params);
}
