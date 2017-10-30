package com.ffcs.dp.projectManage.entity;

public class ProjCostEntity {
    private Long projScaleId;
    private Long projId;
    private Double persMountTotal;
    private Double resourceCost;
    private Double persMountOutsource;
    private Double outsourceCost;

    public Long getProjScaleId() {
        return projScaleId;
    }

    public void setProjScaleId(Long projScaleId) {
        this.projScaleId = projScaleId;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public Double getPersMountTotal() {
        return persMountTotal;
    }

    public void setPersMountTotal(Double persMountTotal) {
        this.persMountTotal = persMountTotal;
    }

    public Double getResourceCost() {
        return resourceCost;
    }

    public void setResourceCost(Double resourceCost) {
        this.resourceCost = resourceCost;
    }

    public Double getPersMountOutsource() {
        return persMountOutsource;
    }

    public void setPersMountOutsource(Double persMountOutsource) {
        this.persMountOutsource = persMountOutsource;
    }

    public Double getOutsourceCost() {
        return outsourceCost;
    }

    public void setOutsourceCost(Double outsourceCost) {
        this.outsourceCost = outsourceCost;
    }
}
