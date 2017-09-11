-- Create table
create table pms_sys_area
(
  area_id       integer not null,
  area_code     varchar(32),
  parent_code   varchar(32),
  name          varchar(64),
  layer         varchar(1),
  order_num     integer,
  status        varchar(1),
  remark        varchar(128),
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
comment on table pms_sys_area
  is 'PMS行政区划表';
-- Add comments to the columns 
comment on column pms_sys_area.area_id
  is '区域id';
comment on column pms_sys_area.area_code
  is '行政区划代码';
comment on column pms_sys_area.parent_code
  is '父级行政区划代码';
comment on column pms_sys_area.name
  is '地区名称';
comment on column pms_sys_area.layer
  is '层级,1:省级,2:地市,3:区县';
comment on column pms_sys_area.order_num
  is '排序';
comment on column pms_sys_area.status
  is '状态 1：显示  0：隐藏';
comment on column pms_sys_area.remark
  is '备注';
comment on column pms_sys_area.create_date
  is '创建时间';
comment on column pms_sys_area.modified_date
  is '修改时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_area
  add constraint pk_pms_sys_area primary key (AREA_ID);







-- Create table
create table pms_sys_log
(
  id          integer not null,
  user_id     integer,
  user_name   varchar2(64),
  operation   varchar2(64),
  time        integer,
  method      varchar2(256),
  params      varchar2(512),
  ip          varchar2(64),
  create_date date
)
tablespace BOSSWG_CFG
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table pms_sys_log
  is 'PMS系统日志表';
-- Add comments to the columns 
comment on column pms_sys_log.id
  is '日志id';
comment on column pms_sys_log.user_id
  is '用户Id';
comment on column pms_sys_log.user_name
  is '用户名称';
comment on column pms_sys_log.operation
  is '操作';
comment on column pms_sys_log.time
  is '响应时间';
comment on column pms_sys_log.method
  is '请求方法';
comment on column pms_sys_log.params
  is '请求参数';
comment on column pms_sys_log.ip
  is 'ip地址';
comment on column pms_sys_log.create_date
  is '创建时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table pms_sys_log
  add constraint pk_pms_sys_log primary key (ID);








-- Create table
create table PMS_SYS_MACRO
(
  id            INTEGER not null,
  parent_id     INTEGER,
  name          VARCHAR2(64),
  value         VARCHAR2(128),
  status        VARCHAR2(1),
  type          VARCHAR2(1),
  order_num     INTEGER,
  remark        VARCHAR2(128),
  create_date   DATE,
  modified_date DATE
)
tablespace BOSSWG_CFG
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table PMS_SYS_MACRO
  is 'PMS通用字典表';
-- Add comments to the columns 
comment on column PMS_SYS_MACRO.id
  is '代码id';
comment on column PMS_SYS_MACRO.parent_id
  is '父级id';
comment on column PMS_SYS_MACRO.name
  is '代码名称';
comment on column PMS_SYS_MACRO.value
  is '代码值';
comment on column PMS_SYS_MACRO.status
  is '状态, 0:隐藏 1:显示';
comment on column PMS_SYS_MACRO.type
  is '类型, 0:目录 1:参数配置';
comment on column PMS_SYS_MACRO.order_num
  is '排序';
comment on column PMS_SYS_MACRO.remark
  is '备注';
comment on column PMS_SYS_MACRO.create_date
  is '创建时间';
comment on column PMS_SYS_MACRO.modified_date
  is '更新时间';
-- Create/Recreate primary, unique and foreign key constraints 
alter table PMS_SYS_MACRO
  add constraint PK_PMS_SYS_MACRO primary key (ID)
  using index 
  tablespace BOSSWG_CFG
  pctfree 10
  initrans 2
  maxtrans 255;




INSERT INTO pms_sys_macro VALUES ('1', '0', '系统参数', null, '1', '0', '0', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('2', '1', '用户状态', 'userStatus', '1', '0', '0', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('3', '2', '正常', '1', '0', '1', '0', '用户可登录', sysdate, null);
INSERT INTO pms_sys_macro VALUES ('4', '2', '禁用', '0', '1', '1', '0', '禁止用户登录', sysdate, null);
INSERT INTO pms_sys_macro VALUES ('5', '0', '客户关系', 'clientManage', '1', '0', '1', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('6', '5', '产品信息', 'clientProduct', '1', '0', '0', null, sysdate, null);



