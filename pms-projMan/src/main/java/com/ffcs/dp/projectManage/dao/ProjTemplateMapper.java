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

    void updateDefault();

    void updateSetDefault(Long tempId);

    void updateTemplate(ProjTemplateEntity projTemplateEntity);

    void updateTemplateStep(ProjTemplateStepEntity projTemplateStepEntity);

    void updateTemplateState(Long tempId);

    void updateTemplateStepState(Long tempStepId);

    List<Long> getTemplateInProj(Long tempId);

}
