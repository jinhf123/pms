package com.ffcs.dp.projectManage.entity;

import java.io.Serializable;
import java.util.List;

public class FileManEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long fileId;//主键id
    private Long folderId;//所属目录id
    private String fileName;//文档名称
    private String filePath;//存放路径
    private String describe;//文档说明
    private String fileType;//文档类型
    private Long creator;//创建者
    private String staffName;//创建者名称
    private String createDate;//创建日期

    private List<FileManEntity> fileList;


    public FileManEntity() {
        super();
    }


    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }



    public List<FileManEntity> getFileList() {
        return fileList;
    }

    public void setFileList(List<FileManEntity> fileList) {
        this.fileList = fileList;
    }
}