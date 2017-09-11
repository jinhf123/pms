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
  is 'PMS����������';
-- Add comments to the columns 
comment on column pms_sys_area.area_id
  is '����id';
comment on column pms_sys_area.area_code
  is '������������';
comment on column pms_sys_area.parent_code
  is '����������������';
comment on column pms_sys_area.name
  is '��������';
comment on column pms_sys_area.layer
  is '�㼶,1:ʡ��,2:����,3:����';
comment on column pms_sys_area.order_num
  is '����';
comment on column pms_sys_area.status
  is '״̬ 1����ʾ  0������';
comment on column pms_sys_area.remark
  is '��ע';
comment on column pms_sys_area.create_date
  is '����ʱ��';
comment on column pms_sys_area.modified_date
  is '�޸�ʱ��';
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
  is 'PMSϵͳ��־��';
-- Add comments to the columns 
comment on column pms_sys_log.id
  is '��־id';
comment on column pms_sys_log.user_id
  is '�û�Id';
comment on column pms_sys_log.user_name
  is '�û�����';
comment on column pms_sys_log.operation
  is '����';
comment on column pms_sys_log.time
  is '��Ӧʱ��';
comment on column pms_sys_log.method
  is '���󷽷�';
comment on column pms_sys_log.params
  is '�������';
comment on column pms_sys_log.ip
  is 'ip��ַ';
comment on column pms_sys_log.create_date
  is '����ʱ��';
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
  is 'PMSͨ���ֵ��';
-- Add comments to the columns 
comment on column PMS_SYS_MACRO.id
  is '����id';
comment on column PMS_SYS_MACRO.parent_id
  is '����id';
comment on column PMS_SYS_MACRO.name
  is '��������';
comment on column PMS_SYS_MACRO.value
  is '����ֵ';
comment on column PMS_SYS_MACRO.status
  is '״̬, 0:���� 1:��ʾ';
comment on column PMS_SYS_MACRO.type
  is '����, 0:Ŀ¼ 1:��������';
comment on column PMS_SYS_MACRO.order_num
  is '����';
comment on column PMS_SYS_MACRO.remark
  is '��ע';
comment on column PMS_SYS_MACRO.create_date
  is '����ʱ��';
comment on column PMS_SYS_MACRO.modified_date
  is '����ʱ��';
-- Create/Recreate primary, unique and foreign key constraints 
alter table PMS_SYS_MACRO
  add constraint PK_PMS_SYS_MACRO primary key (ID)
  using index 
  tablespace BOSSWG_CFG
  pctfree 10
  initrans 2
  maxtrans 255;




INSERT INTO pms_sys_macro VALUES ('1', '0', 'ϵͳ����', null, '1', '0', '0', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('2', '1', '�û�״̬', 'userStatus', '1', '0', '0', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('3', '2', '����', '1', '0', '1', '0', '�û��ɵ�¼', sysdate, null);
INSERT INTO pms_sys_macro VALUES ('4', '2', '����', '0', '1', '1', '0', '��ֹ�û���¼', sysdate, null);
INSERT INTO pms_sys_macro VALUES ('5', '0', '�ͻ���ϵ', 'clientManage', '1', '0', '1', null, sysdate, null);
INSERT INTO pms_sys_macro VALUES ('6', '5', '��Ʒ��Ϣ', 'clientProduct', '1', '0', '0', null, sysdate, null);



