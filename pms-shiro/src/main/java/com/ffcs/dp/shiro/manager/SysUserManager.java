package com.ffcs.dp.shiro.manager;

import java.util.List;
import java.util.Set;

import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.Query;
import com.ffcs.dp.common.entity.SysUserEntity;

/**
 * 系统用户
 */
public interface SysUserManager {

    SysUserEntity getByUserName(String username);

    List<SysUserEntity> listUser(Page<SysUserEntity> page, Query search);

    List<SysUserEntity> staffSelectList(Page<SysUserEntity> page, Query search);

    List<SysUserEntity> getUserNameById(List<Long> ids);


    int saveUser(SysUserEntity user);

    SysUserEntity getById(Long userId);

    int updateUser(SysUserEntity user);

    int batchRemove(Long[] id);

    Set<String> listUserPerms(Long userId);

    Set<String> listUserRoles(Long userId);

    int updatePswdByUser(Query query);

    int updateUserEnable(Long[] id);

    int updateUserDisable(Long[] id);

    int updatePswd(SysUserEntity user);

    SysUserEntity getUserById(Long userId);

}
