package com.ffcs.dp.projectManage.entity;

public class UserCostEntity {
    private Long userId;
    private Long costId;
    private String username;
    private String description;
    private Double cost;
    private String isOutsource;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getCostId() {
        return costId;
    }

    public void setCostId(Long costId) {
        this.costId = costId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getIsOutsource() {
        return isOutsource;
    }

    public void setIsOutsource(String isOutsource) {
        this.isOutsource = isOutsource;
    }
}
