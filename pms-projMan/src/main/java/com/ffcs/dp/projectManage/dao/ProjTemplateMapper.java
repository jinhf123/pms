package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.ProjTemplateEntity;
import com.ffcs.dp.projectManage.entity.ProjTemplateStepEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 项目管理dao
 */
@MapperScan
@Repository
public interface ProjTemplateMapper extends BaseMapper<ProjTemplateEntity> {

    List<ProjTemplateEntity> listTemplate();

    Long saveTemplate(ProjTemplateEntity projTemplateEntity);

    void saveTemplateStep(ProjTemplateStepEntity projTemplateStepEntity);

}
