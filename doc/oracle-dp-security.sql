-- Create table
create table pms_sys_user
(
  user_id       integer not null,
  username      varchar2(64),
  password      varchar2(64),
  email         varchar2(128),
  phone         varchar2(128),
  status        varchar2(1),
  create_id     integer,
  create_date   date,
  modified_date date
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_user
  is 'PMS用户表';
-- Add comments to the columns 
comment on column pms_sys_user.user_id
  is '用户id';
comment on column pms_sys_user.username
  is '用户名';
comment on column pms_sys_user.password
  is '密码';
comment on column pms_sys_user.email
  is '邮箱';
comment on column pms_sys_user.phone
  is '手机号';
comment on column pms_sys_user.status
  is '状态    0：禁用   1：正常';
comment on column pms_sys_user.create_id
  is '创建用户id';
comment on column pms_sys_user.create_date
  is '创建时间';
comment on column pms_sys_user.modified_date
  is '修改时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_user
  add constraint pk_pms_sys_user primary key (USER_ID);



-- Create table
create table pms_sys_user_role
(
  id      integer not null,
  user_id integer,
  role_id integer
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_user_role
  is 'PMS用户角色表';
-- Add comments to the columns 
comment on column pms_sys_user_role.id
  is '用户角色id';
comment on column pms_sys_user_role.user_id
  is '用户id';
comment on column pms_sys_user_role.role_id
  is '角色id';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_user_role
  add constraint pk_pms_sys_user_role primary key (ID);




-- Create table
create table pms_sys_menu
(
  menu_id       integer not null,
  parent_id     integer,
  name          varchar2(256),
  url           varchar2(256),
  perms         varchar2(512),
  type          varchar2(1),
  icon          varchar2(50),
  order_num     integer,
  create_date   date,
  modified_date date
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_menu
  is 'PMS菜单表';
-- Add comments to the columns 
comment on column pms_sys_menu.menu_id
  is '菜单id';
comment on column pms_sys_menu.parent_id
  is '父级菜单id';
comment on column pms_sys_menu.name
  is '菜单名称';
comment on column pms_sys_menu.url
  is '菜单路径';
comment on column pms_sys_menu.perms
  is '授权(多个用逗号分隔，如：user:list,user:create)';
comment on column pms_sys_menu.type
  is '类型   0：目录   1：菜单   2：按钮';
comment on column pms_sys_menu.icon
  is '菜单图标';
comment on column pms_sys_menu.order_num
  is '排序';
comment on column pms_sys_menu.create_date
  is '创建时间';
comment on column pms_sys_menu.modified_date
  is '修改时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_menu
  add constraint pk_pms_sys_menu primary key (MENU_ID);




-- Create table
create table pms_sys_role
(
  role_id       integer not null,
  role_name     varchar2(128),
  role_sign     varchar2(128),
  remark        varchar2(512),
  create_id     integer,
  create_date   date,
  modified_date date
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_role
  is 'PMS角色表';
-- Add comments to the columns 
comment on column pms_sys_role.role_id
  is '角色id';
comment on column pms_sys_role.role_name
  is '角色名称';
comment on column pms_sys_role.role_sign
  is '角色标识';
comment on column pms_sys_role.remark
  is '备注';
comment on column pms_sys_role.create_id
  is '角色创建id';
comment on column pms_sys_role.create_date
  is '创建时间';
comment on column pms_sys_role.modified_date
  is '修改时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_role
  add constraint pk_pms_sys_role primary key (ROLE_ID);




-- Create table
create table pms_sys_role_menu
(
  id      integer not null,
  role_id integer,
  menu_id integer
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_role_menu
  is 'PMS角色菜单表';
-- Add comments to the columns 
comment on column pms_sys_role_menu.id
  is '角色菜单id';
comment on column pms_sys_role_menu.role_id
  is '角色id';
comment on column pms_sys_role_menu.menu_id
  is '菜单id';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_role_menu
  add constraint pk_pms_sys_role_menu primary key (ID);






INSERT INTO pms_sys_user VALUES ('1', 'admin', '33808479d49ca8a3cdc93d4f976d1e3d', 'admin@example.com', '123456', '1', '1', sysdate, null);
INSERT INTO pms_sys_user VALUES ('2', 'test', '3a447dc3b0b83930f08c55d76c205048', null, null, '1', '1', sysdate, null);


INSERT INTO pms_sys_role VALUES ('1', '超级管理员', 'admin', '【系统内置】', '2', sysdate,null);
INSERT INTO pms_sys_role VALUES ('38', '测试角色', 'test', null, '1', sysdate, null);


INSERT INTO pms_sys_user_role VALUES ('44', '2', '38');
INSERT INTO pms_sys_user_role VALUES ('46', '1', '1');






INSERT INTO pms_sys_menu VALUES ('1', '0', '基础管理', null, '', '0', 'fa fa-coffee', '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('2', '3', '系统菜单', 'base/menu/list.html', null, '1', 'fa fa-th-list', '2', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('3', '0', '系统管理', null, null, '0', 'fa fa-desktop', '1', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('4', '1', '通用字典', 'base/macro/list.html', null, '1', 'fa fa-book', '1', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('6', '3', '用户管理', 'base/user/list.html', null, '1', 'fa fa-user', '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('7', '3', '角色管理', 'base/role/list.html', null, '1', 'fa fa-paw', '1', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('11', '6', '刷新', null, 'sys:user:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('12', '6', '新增', null, 'sys:user:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('13', '6', '编辑', null, 'sys:user:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('14', '6', '删除', null, 'sys:user:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('15', '7', '刷新', null, 'sys:role:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('16', '7', '新增', null, 'sys:role:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('17', '7', '编辑', null, 'sys:user:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('18', '7', '删除', null, 'sys:role:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('19', '7', '分配权限', null, 'sys:role:authorize', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('20', '2', '刷新', null, 'sys:menu:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('21', '2', '新增', null, 'sys:menu:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('22', '2', '编辑', null, 'sys:menu:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('23', '2', '删除', null, 'sys:menu:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('24', '6', '启用', null, 'sys:user:enable', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('25', '6', '停用', null, 'sys:user:disable', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('26', '6', '重置密码', null, 'sys:user:resetPassword', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('27', '1', '系统日志', 'base/log/list.html', null, '1', 'fa fa-warning', '2', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('28', '27', '刷新', null, 'sys:log:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('29', '27', '删除', null, 'sys:log:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('30', '27', '清空', null, 'sys:log:clear', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('32', '4', '刷新', null, 'sys:macro:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('33', '4', '新增', null, 'sys:macro:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('34', '4', '编辑', null, 'sys:macro:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('35', '4', '删除', null, 'sys:macro:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('37', '1', '行政区域', 'base/area/list.html', null, '1', 'fa fa-leaf', '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('38', '37', '刷新', null, 'sys:area:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('39', '37', '新增', null, 'sys:area:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('40', '37', '编辑', null, 'sys:area:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('41', '37', '删除', null, 'sys:area:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('42', '1', '定时任务', 'base/quartz/list.html', null, '1', 'fa fa-bell', '4', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('43', '42', '刷新', null, 'quartz:job:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('44', '42', '新增', null, 'quartz:job:save', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('45', '42', '编辑', null, 'quartz:job:edit', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('46', '42', '删除', null, 'quartz:job:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('47', '42', '启用', null, 'quartz:job:enable', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('48', '42', '停用', null, 'quartz:job:disable', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('49', '42', '立即执行', null, 'quartz:job:run', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('50', '42', '日志列表', null, 'quartz:job:log', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('51', '42', '刷新', null, 'quartz:log:list', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('52', '42', '删除', null, 'quartz:log:remove', '2', null, '0', sysdate, null);
INSERT INTO pms_sys_menu VALUES ('53', '42', '清空', null, 'quartz:log:clear', '2', null, '0', sysdate, null);




INSERT INTO pms_sys_role_menu VALUES ('336', '38', '1');
INSERT INTO pms_sys_role_menu VALUES ('338', '38', '4');
INSERT INTO pms_sys_role_menu VALUES ('339', '38', '32');
INSERT INTO pms_sys_role_menu VALUES ('340', '38', '33');
INSERT INTO pms_sys_role_menu VALUES ('341', '38', '34');
INSERT INTO pms_sys_role_menu VALUES ('342', '38', '35');
INSERT INTO pms_sys_role_menu VALUES ('343', '38', '27');
INSERT INTO pms_sys_role_menu VALUES ('344', '38', '28');
INSERT INTO pms_sys_role_menu VALUES ('345', '38', '29');
INSERT INTO pms_sys_role_menu VALUES ('346', '38', '30');
INSERT INTO pms_sys_role_menu VALUES ('347', '38', '3');
INSERT INTO pms_sys_role_menu VALUES ('348', '38', '6');
INSERT INTO pms_sys_role_menu VALUES ('349', '38', '11');
INSERT INTO pms_sys_role_menu VALUES ('350', '38', '12');
INSERT INTO pms_sys_role_menu VALUES ('351', '38', '13');
INSERT INTO pms_sys_role_menu VALUES ('352', '38', '14');
INSERT INTO pms_sys_role_menu VALUES ('353', '38', '24');
INSERT INTO pms_sys_role_menu VALUES ('354', '38', '25');
INSERT INTO pms_sys_role_menu VALUES ('355', '38', '26');
INSERT INTO pms_sys_role_menu VALUES ('356', '38', '7');
INSERT INTO pms_sys_role_menu VALUES ('357', '38', '15');
INSERT INTO pms_sys_role_menu VALUES ('358', '38', '16');
INSERT INTO pms_sys_role_menu VALUES ('359', '38', '17');
INSERT INTO pms_sys_role_menu VALUES ('360', '38', '18');
INSERT INTO pms_sys_role_menu VALUES ('361', '38', '19');
INSERT INTO pms_sys_role_menu VALUES ('362', '38', '2');
INSERT INTO pms_sys_role_menu VALUES ('363', '38', '20');
INSERT INTO pms_sys_role_menu VALUES ('364', '38', '21');
INSERT INTO pms_sys_role_menu VALUES ('365', '38', '22');
INSERT INTO pms_sys_role_menu VALUES ('366', '38', '23');
INSERT INTO pms_sys_role_menu VALUES ('433', '1', '1');
INSERT INTO pms_sys_role_menu VALUES ('434', '1', '37');
INSERT INTO pms_sys_role_menu VALUES ('435', '1', '38');
INSERT INTO pms_sys_role_menu VALUES ('436', '1', '39');
INSERT INTO pms_sys_role_menu VALUES ('437', '1', '40');
INSERT INTO pms_sys_role_menu VALUES ('438', '1', '41');
INSERT INTO pms_sys_role_menu VALUES ('439', '1', '4');
INSERT INTO pms_sys_role_menu VALUES ('440', '1', '32');
INSERT INTO pms_sys_role_menu VALUES ('441', '1', '33');
INSERT INTO pms_sys_role_menu VALUES ('442', '1', '34');
INSERT INTO pms_sys_role_menu VALUES ('443', '1', '35');
INSERT INTO pms_sys_role_menu VALUES ('444', '1', '27');
INSERT INTO pms_sys_role_menu VALUES ('445', '1', '28');
INSERT INTO pms_sys_role_menu VALUES ('446', '1', '29');
INSERT INTO pms_sys_role_menu VALUES ('447', '1', '30');
INSERT INTO pms_sys_role_menu VALUES ('448', '1', '42');
INSERT INTO pms_sys_role_menu VALUES ('449', '1', '43');
INSERT INTO pms_sys_role_menu VALUES ('450', '1', '44');
INSERT INTO pms_sys_role_menu VALUES ('451', '1', '45');
INSERT INTO pms_sys_role_menu VALUES ('452', '1', '46');
INSERT INTO pms_sys_role_menu VALUES ('453', '1', '47');
INSERT INTO pms_sys_role_menu VALUES ('454', '1', '48');
INSERT INTO pms_sys_role_menu VALUES ('455', '1', '49');
INSERT INTO pms_sys_role_menu VALUES ('456', '1', '50');
INSERT INTO pms_sys_role_menu VALUES ('457', '1', '51');
INSERT INTO pms_sys_role_menu VALUES ('458', '1', '52');
INSERT INTO pms_sys_role_menu VALUES ('459', '1', '53');
INSERT INTO pms_sys_role_menu VALUES ('460', '1', '3');
INSERT INTO pms_sys_role_menu VALUES ('461', '1', '6');
INSERT INTO pms_sys_role_menu VALUES ('462', '1', '11');
INSERT INTO pms_sys_role_menu VALUES ('463', '1', '12');
INSERT INTO pms_sys_role_menu VALUES ('464', '1', '13');
INSERT INTO pms_sys_role_menu VALUES ('465', '1', '14');
INSERT INTO pms_sys_role_menu VALUES ('466', '1', '24');
INSERT INTO pms_sys_role_menu VALUES ('467', '1', '25');
INSERT INTO pms_sys_role_menu VALUES ('468', '1', '26');
INSERT INTO pms_sys_role_menu VALUES ('469', '1', '7');
INSERT INTO pms_sys_role_menu VALUES ('470', '1', '15');
INSERT INTO pms_sys_role_menu VALUES ('471', '1', '16');
INSERT INTO pms_sys_role_menu VALUES ('472', '1', '17');
INSERT INTO pms_sys_role_menu VALUES ('473', '1', '18');
INSERT INTO pms_sys_role_menu VALUES ('474', '1', '19');
INSERT INTO pms_sys_role_menu VALUES ('475', '1', '2');
INSERT INTO pms_sys_role_menu VALUES ('476', '1', '20');
INSERT INTO pms_sys_role_menu VALUES ('477', '1', '21');
INSERT INTO pms_sys_role_menu VALUES ('478', '1', '22');
INSERT INTO pms_sys_role_menu VALUES ('479', '1', '23');









