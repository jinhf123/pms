#项目原型介绍
基于SSM框架的轻量级开发框架，已经完成基于角色的操作权限管理，对前后端进行封装，可快速实现CRUD的开发。项目采用Maven多模块构建，方便按需求进行模块化扩展。

### 项目框架介绍
- 一个轻量级的Java快速开发框架，能快速开发项目并交付（规划后期不定时发布更新）
- 友好的代码结构及注释，便于阅读及二次开发，命名规范和工程分层规约参考阿里巴巴JAVA开发规范
- 前后端开发封装，快速实现CRUD开发（规划通过velocity模板生成部分代码）
- 基于角色的权限管理，细分到按钮权限（规划将支持数据权限）
- 基于Maven模块化开发，可快速扩展个性化业务模块
### 技术方案
- 核心框架：Spring
- WEB框架：SpringMVC
- ORM框架：Mybatis
- 安全框架：Shiro
- 模板框架：velocity（支持freemarker、jsp等其他自定义视图）
- 主页框架：adminLTE(Bootstrap)
- JS框架：vue.js
- 表格插件：bootstrap-table
- 树形表格：tree-grid(基于bootstrap扩展)
- 树形插件：ztree
- 弹窗组件：layer
- 表单校验：validator
### 项目结构
- pms-security：父级（聚合）模块
- pms-common：公共通用模块
- pms-shiro：权限模块
- pms-orm：数据持久模块
- pms-web：前端界面
- pms-base：基础模块，目前包含行政区域、通用字典和系统日志功能模块
### 命名规范（参考阿里巴巴Java开发手册）
-  获取单个对象的方法用 get 做前缀
-  获取多个对象的方法用 list 做前缀
-  获取统计值的方法用 count 做前缀
-  插入的方法用 save(推荐) 或 insert 做前缀
-  删除的方法用 remove(推荐) 或 delete 做前缀
-  修改的方法用 update 做前缀
### 应用分层（参考阿里巴巴Java开发手册）

### 登录
- 超级管理员账号密码：admin / 1
