package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.NoticeEntity;
import com.ffcs.dp.projectManage.entity.ProjManEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 通知管理dao
 */
@MapperScan
@Repository
public interface NoticeMapper extends BaseMapper<ProjManEntity> {


    List<NoticeEntity> unReadList(Map<String, Object> params);

    int updateNotice(Map<String, Object> params);
}
