package com.ffcs.dp.projectManage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ffcs.dp.common.controller.AbstractController;
import com.ffcs.dp.common.utils.DateUtils;
import com.ffcs.dp.common.utils.ExcelUtil;
import com.ffcs.dp.projectManage.entity.WorkLogEntity;
import com.ffcs.dp.projectManage.service.WorkLogService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.regex.Pattern;

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

    @Resource
    private HttpServletRequest request;

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
    @ResponseBody
    public void exportExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

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
        Map<String, Object> params =new HashMap<>();
        params.put("userId", getUserId());
        params.put("workLogDate", "");
        params.put("startDate", startDate);
        params.put("endDate", endDate);
        System.out.print("查询参数：startDate="+params.get("startDate").toString()+"\nendDate="+params.get("endDate").toString());
        List<WorkLogEntity> workLogs = workLogManService.getExportList(params);

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
            weRow.createCell((short)0).setCellValue(we.getWorkDate()); //日期
            weRow.createCell((short)1).setCellValue(we.getStartTime()); //开始时间
            weRow.createCell((short)2).setCellValue(we.getEndTime()); //结束时间
            weRow.createCell((short)3).setCellValue("1".equals(we.getIsProjectWork())?"是":"否"); //是否项目工作
            weRow.createCell((short)4).setCellValue(we.getProjName()!=null? we.getProjName() :""); //项目
            weRow.createCell((short)5).setCellValue(we.getTaskName()!=null?we.getTaskName():""); //任务
            weRow.createCell((short)6).setCellValue(we.getWorkDetails()!=null?we.getWorkDetails():""); //工作详情
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






    //导入excel
    @RequestMapping("/importExcel")
    @ResponseBody
    private void importExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        JSONObject jsonObject = new JSONObject();
        Boolean result = true;
        String message = "";

        try {
            MultipartRequest multipartRequest=(MultipartRequest) request;
            MultipartFile excelFile=multipartRequest.getFile("excelFile");
            if(excelFile!=null){
                List<List<String>> datas = ExcelUtil.readXls(excelFile.getInputStream());
                if(datas!=null && datas.size()>0){
                    List<Map<String, Object>> list = new ArrayList<>();

                    for(int i=0; i<datas.size();i++){
                        List<String> data = datas.get(i);
                        //日期 开始时间	结束时间	是否项目工作	项目	任务	工作详情
                        Map<String, Object> workLog = new HashMap<>();
                        workLog.put("workLogDate",data.get(0));
                        workLog.put("startTime",data.get(1));
                        workLog.put("endTime",data.get(2));
                        workLog.put("minutes",getMinutes(data.get(1),data.get(2)));//计算时长
                        String isProjectWork = "是".equals(data.get(3))?"1":"0";//是：1  否：0
                        workLog.put("isProjectWork",isProjectWork);
                        if("1".equals(isProjectWork)){
                            String projName = data.get(4);
                            String taskName = data.get(5);
                            Map<String, Object> params = new HashMap<>();
                            params.put("projName",projName!=null?projName.trim():"");
                            params.put("taskName",taskName!=null?taskName.trim():"");
                            //查询项目Id和任务Id
                            WorkLogEntity tmp = workLogManService.getProjTaskInfo(params);

                            if(tmp.getProjId()==null){
                                if(taskName!=null){
                                    throw new Exception("第"+(i+1)+"行中,项目:"+projName+"不存在！");
                                }else {
                                    throw new Exception("第"+(i+1)+"行中,日志为项目工作时项目为必填项！");
                                }
                            }
                            if(tmp.getTaskId()==null){
                                if(taskName!=null){
                                    throw new Exception("第"+(i+1)+"行中,任务:"+taskName+"不存在！");
                                }else{
                                    throw new Exception("第"+(i+1)+"行中,日志为项目工作时任务为必填项！");
                                }
                            }
                            workLog.put("project",tmp.getProjId());
                            workLog.put("task",tmp.getTaskId());
                        }
                        workLog.put("projectName",data.get(4));
                        workLog.put("taskName",data.get(5));
                        workLog.put("workDetails",data.get(6));//工作详情
                        workLog.put("userId",getUserId());//创建者
                        list.add(workLog);
                    }

                    for(Map<String, Object> map:list){
                        workLogManService.saveWorkLog(map);
                    }

                }else{
                    result = false;
                    message = "导入数据为空！";
                }
            }else{
                result = false;
                message = "Excel不存在！";
            }
        } catch (Exception e) {
            e.printStackTrace();
            result = false;
            message = e.getMessage();
        }
        jsonObject.put("success", result);
        jsonObject.put("message", message);

        response.setHeader("Content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(jsonObject.toString());

    }


    //计算时间差（分钟）
    private static int getMinutes(String startTime, String endTime){
        int minutes = 0;
        String pattern = "(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]";
        if(Pattern.matches(pattern, startTime)&&Pattern.matches(pattern, endTime)){
            Date now = new Date();
            Calendar cal1 = Calendar.getInstance();
            cal1.setTime(now);
            cal1.set(Calendar.HOUR_OF_DAY, Integer.parseInt(startTime.split(":")[0]));
            cal1.set(Calendar.MINUTE, Integer.parseInt(startTime.split(":")[1]));
            Calendar cal2 = Calendar.getInstance();
            cal2.setTime(now);
            cal2.set(Calendar.HOUR_OF_DAY, Integer.parseInt(endTime.split(":")[0]));
            cal2.set(Calendar.MINUTE, Integer.parseInt(endTime.split(":")[1]));
            minutes = (int)((cal2.getTimeInMillis() -  cal1.getTimeInMillis())/60/1000);
        }
        return minutes;
    }



    //批量保存工作日志（来自任务详情评论时添加到工作日志）
    @RequestMapping("/batchSaveWorkLog")
    public JSON batchSaveWorkLog(@RequestBody Map<String, Object> params){
        JSONObject json = new JSONObject();
        Boolean success = true;
        String msg = "保存成功！";
        Long userId = getUserId();
        try{
            JSONArray dateTimeList = (JSONArray) params.get("dateList");
            for(int i=0;i<dateTimeList.size();i++){
                Map dateMap = (Map) dateTimeList.get(i);
                String startDateTime = dateMap.get("startDate").toString();//DateUtils.format(startDate,DateUtils.DATE_TIME_PATTERN);
                String endDateTime = dateMap.get("endDate").toString();//DateUtils.format(endDate,DateUtils.DATE_TIME_PATTERN);
                String startWorkLogDate = startDateTime.substring(0,10);
                String endWorkLogDate = endDateTime.substring(0,10);
                String startTime = startDateTime.substring(11,16);
                String endTime = endDateTime.substring(11,16);

                Date startDate = DateUtils.strToDate(startDateTime,DateUtils.DATE_TIME_PATTERN);
                Date endDate = DateUtils.strToDate(endDateTime,DateUtils.DATE_TIME_PATTERN);

                int days = DateUtils.timeDifference(startDate,endDate);
                for(int j = 0; j<=days; j++){
                    Map<String, Object> map = new HashMap<>();
                    String workLogDate = DateUtils.strDatePlus(startWorkLogDate,j);//日期加1天
                    map.put("workLogDate",workLogDate);
                    map.put("startTime",startTime);
                    map.put("endTime",endTime);
                    map.put("minutes",getMinutes(startTime,endTime)-120);//8点到18点减去中午2小时
                    map.put("isProjectWork",params.get("isProjectWork"));
                    map.put("project",params.get("project"));
                    map.put("task",params.get("task"));
                    map.put("workDetails",params.get("workDetails"));
                    map.put("userId",userId);
//                    System.out.print("workLogDate="+workLogDate+"\tstartTime="+startTime+"\tendTime="+endTime+"\tminutes="+getMinutes(startTime,endTime)+"\n");
                    workLogManService.saveWorkLog(map);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            success = false;
            msg = "保存失败"+e.getMessage();
        }
        json.put("success",success);
        json.put("message",msg);
        return json;
    }



}