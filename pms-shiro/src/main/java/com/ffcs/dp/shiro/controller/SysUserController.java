package com.ffcs.dp.shiro.controller;

import java.util.List;
import java.util.Map;

import com.ffcs.dp.shiro.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ffcs.dp.common.annotation.SysLog;
import com.ffcs.dp.common.constant.SystemConstant;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.common.entity.Page;
import com.ffcs.dp.common.entity.R;
import com.ffcs.dp.common.entity.SysUserEntity;

/**
 * 系统用户
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {

    @Autowired
    private SysUserService sysUserService;

    /**
     * 用户列表
     *
     * @param params
     * @return
     */
    @RequestMapping("/list")
    public Page<SysUserEntity> list(@RequestBody Map<String, Object> params) {
        if (getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return sysUserService.listUser(params);
    }

    @RequestMapping(value = "/getUserName", method = RequestMethod.POST)
    public List<SysUserEntity> getUserNameById(@RequestBody List<Long> ids) {
        return sysUserService.getUserNameById(ids);
    }

    @RequestMapping("/staffSelectList")
    public Page<SysUserEntity> staffSelectList(@RequestBody Map<String, Object> params) {
        if (getUserId() != SystemConstant.SUPER_ADMIN) {
            params.put("userIdCreate", getUserId());
        }
        return sysUserService.staffSelectList(params);
    }

    /**
     * 获取登录的用户信息
     */
    @RequestMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }

    /**
     * 用户权限
     *
     * @return
     */
    @RequestMapping("/perms")
    public R listUserPerms() {
        return sysUserService.listUserPerms(getUserId());
    }

    /**
     * 新增用户
     *
     * @param user
     * @return
     */
    @SysLog("新增用户")
    @RequestMapping("/save")
    public R save(@RequestBody SysUserEntity user) {
        user.setUserIdCreate(getUserId());
        return sysUserService.saveUser(user);
    }

    /**
     * 根据id查询详情
     *
     * @param userId
     * @return
     */
    @RequestMapping("/infoUser")
    public R getById(@RequestBody Long userId) {
        return sysUserService.getUserById(userId);
    }

    /**
     * 修改用户
     *
     * @param user
     * @return
     */
    @SysLog("修改用户")
    @RequestMapping("/update")
    public R update(@RequestBody SysUserEntity user) {
        return sysUserService.updateUser(user);
    }

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @SysLog("删除用户")
    @RequestMapping("/remove")
    public R batchRemove(@RequestBody Long[] id) {
        return sysUserService.batchRemove(id);
    }

    /**
     * 用户修改密码
     *
     * @param pswd
     * @param newPswd
     * @return
     */
    @SysLog("修改密码")
    @RequestMapping("/updatePswd")
    public R updatePswdByUser(String pswd, String newPswd) {
        SysUserEntity user = getUser();
        user.setPassword(pswd);//原密码
        user.setEmail(newPswd);//邮箱临时存储新密码
        return sysUserService.updatePswdByUser(user);
    }

    /**
     * 启用账户
     *
     * @param id
     * @return
     */
    @SysLog("启用账户")
    @RequestMapping("/enable")
    public R updateUserEnable(@RequestBody Long[] id) {
        return sysUserService.updateUserEnable(id);
    }

    /**
     * 禁用账户
     *
     * @param id
     * @return
     */
    @SysLog("禁用账户")
    @RequestMapping("/disable")
    public R updateUserDisable(@RequestBody Long[] id) {
        return sysUserService.updateUserDisable(id);
    }

    /**
     * 重置密码
     *
     * @param user
     * @return
     */
    @SysLog("重置密码")
    @RequestMapping("/reset")
    public R updatePswd(@RequestBody SysUserEntity user) {
        return sysUserService.updatePswd(user);
    }
}
