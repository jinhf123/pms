package com.ffcs.dp.base.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 * 通用字典
 *
 */
public class SysMacroEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 字典id
	 */
	private Long id;
	
	/**
	 * 类型id
	 */
	private Long parentId;
	
	/**
	 * 类型名称（parent name）
	 */
	private String typeName;

	/**
	 * 类型代码（parent value）
	 */
	private String typeCode;


	/**
	 * 字典码
	 */
	private String name;
	
	/**
	 * 字典值
	 */
	private String value;
	
	/**
	 * 状态(1:显示, 0:隐藏)
	 */
	private Integer status;
	
	/**
	 * 类型(1:参数, 0:目录)
	 */
	private Integer type;
	
	/**
	 * 排序
	 */
	private Integer orderNum;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 创建时间
	 */
	private Timestamp createDate;
	
	/**
	 * 修改时间
	 */
	private Timestamp modifiedDate;
	
	/**
	 * ztree属性
	 */
	private Boolean open;
	
	private List<?> list;

	public SysMacroEntity() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Timestamp getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public Timestamp getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Timestamp modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}


}
