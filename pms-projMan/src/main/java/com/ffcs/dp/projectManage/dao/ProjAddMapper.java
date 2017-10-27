package com.ffcs.dp.projectManage.dao;

import com.ffcs.dp.common.dao.BaseMapper;
import com.ffcs.dp.projectManage.entity.UserCostEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@MapperScan
@Repository
public interface ProjAddMapper {
    List<UserCostEntity> listUserCost(List<Long> ids);
    UserCostEntity listUserCostById(Long id);
}
