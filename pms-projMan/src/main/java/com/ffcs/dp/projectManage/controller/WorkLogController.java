package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.service.WorkLogService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 工作日志
 *
 */
@Controller
@ResponseBody
@RequestMapping("/projMan/workLog")
public class WorkLogController extends AbstractController {


    @Resource
    private WorkLogService workLogManService;


    //获取工作日志列表
    @RequestMapping("/getWorkLogList")
    public List<WorkLogEntity> getWorkLogList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return workLogManService.getWorkLogList(params);
    }


    //保存工作日志
    @RequestMapping("/saveWorkLog")
    public JSON saveWorkLog(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        String msg = "保存成功！";
        params.put("userId", getUserId());
        try{
            workLogManService.saveWorkLog(params);
        }catch (Exception e){
            e.printStackTrace();
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",true);
        json.put("message",msg);
        return json;
    }



    //获取工时统计列表
    @RequestMapping("/getWorkHoursList")
    public List<Map> getWorkHoursList(@RequestBody Map<String, Object> params) {
        params.put("userId", getUserId());
        return workLogManService.getWorkHoursList(params);
    }



    //导出excel
    @RequestMapping("/exportExcel")
    public void exportExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String startDate = request.getParameter("startDate").toString();
        String endDate = request.getParameter("endDate").toString();

        //建立Excel常用对象
        HSSFWorkbook wb = new HSSFWorkbook();//创建Excel工作簿对象
        HSSFSheet sheet = wb.createSheet(startDate+"~"+endDate+"工作日志");//创建Excel工作表对象
        //创建表头
        HSSFRow row = sheet.createRow((short)0); //创建Excel工作表的行
        //表头样式
        HSSFCellStyle titleStyle = wb.createCellStyle();//创建单元格样式
        titleStyle.setBorderBottom(BorderStyle.THICK);
        titleStyle.setBorderLeft(BorderStyle.THICK);
        titleStyle.setBorderRight(BorderStyle.THICK);
        titleStyle.setBorderTop(BorderStyle.THICK);
        //填充颜色HSSFColor.LIME.index)
        titleStyle.setFillForegroundColor(IndexedColors.GREEN.getIndex());// 设置背景色绿色
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);// 设置背景色样式

        //字体样式
        HSSFFont f  = wb.createFont();
        f.setFontHeightInPoints((short) 12);//字号
        f.setBold(true);//加粗
        titleStyle.setFont(f);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);//左右居中
        titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);//上下居中HSSFCellStyle.VERTICAL_CENTER

        //手工设置单元格的宽度
        sheet.setColumnWidth(0, 3766);
        sheet.setColumnWidth(1, 3766);
        sheet.setColumnWidth(2, 3766);
        sheet.setColumnWidth(3, 3766);
        sheet.setColumnWidth(4, 7532);
        sheet.setColumnWidth(5, 7532);
        sheet.setColumnWidth(6, 7532);

        //创建表头
        String[] titleNames = {"日期","开始时间","结束时间","是否项目工作","项目","任务","工作详情"};
        for(int i=0;i<titleNames.length;i++) {
            row.createCell((short)i).setCellValue(titleNames[i]); //设置Excel单元格的值
            row.getCell((short)i).setCellStyle(titleStyle);//设置Excel单元格的样式
        }

        //获取工作日志数据
        Map<String, Object> pp =new HashMap<>();
        pp.put("userId", getUserId());
        pp.put("workLogDate", "");
        pp.put("startDate", startDate);
        pp.put("endDate", endDate);
        System.out.print("查询参数：startDate="+pp.get("startDate").toString()+"\nendDate="+endDate);
        List<WorkLogEntity> workLogs = workLogManService.getWorkLogList(pp);

        //创建表格
        HSSFCellStyle cellStyle = wb.createCellStyle();//创建单元格样式
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        cellStyle.setBorderTop(BorderStyle.THIN);

        int rowNum = 1;
        for(WorkLogEntity we : workLogs){
            HSSFRow weRow = sheet.createRow((short)rowNum); //创建Excel工作表的行
            //设置Excel工作表的值
            weRow.createCell((short)0).setCellValue(we.getWorkDate().toString()); //日期
            weRow.createCell((short)1).setCellValue(we.getStartTime().toString()); //开始时间
            weRow.createCell((short)2).setCellValue(we.getEndTime().toString()); //结束时间
            weRow.createCell((short)3).setCellValue("1".equals(we.getIsProjectWork())?"是":"否"); //是否项目工作
            weRow.createCell((short)4).setCellValue(we.getProjName()!=null?we.getProjName().toString():""); //项目
            weRow.createCell((short)5).setCellValue(we.getTaskName()!=null?we.getTaskName().toString():""); //任务
            weRow.createCell((short)6).setCellValue(we.getWorkDetails()!=null?we.getWorkDetails().toString():""); //工作详情
            //设置Excel工作表的样式
            weRow.getCell(0).setCellStyle(cellStyle);
            weRow.getCell(1).setCellStyle(cellStyle);
            weRow.getCell(2).setCellStyle(cellStyle);
            weRow.getCell(3).setCellStyle(cellStyle);
            weRow.getCell(4).setCellStyle(cellStyle);
            weRow.getCell(5).setCellStyle(cellStyle);
            weRow.getCell(6).setCellStyle(cellStyle);
            rowNum++;
        }

        try {
            String fileName = "工作日志.xls";
            response.setHeader("Content-Disposition", "attachment; filename="+ new String( fileName.getBytes("gb2312"), "ISO8859-1" ) );
            response.setContentType("application/vnd.ms-excel; charset=utf-8") ;
            OutputStream out = response.getOutputStream() ;
            wb.write(out) ;
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }





}