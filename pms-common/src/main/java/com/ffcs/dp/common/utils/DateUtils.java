package com.ffcs.dp.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期处理
 *
 */
public class DateUtils {
	
	/** 时间格式(yyyy-MM-dd) */
	public final static String DATE_PATTERN = "yyyy-MM-dd";
	
	/** 时间格式(yyyy-MM-dd HH:mm:ss) */
	public final static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

	public static String format(Date date) {
		return format(date, DATE_PATTERN);
	}

	public static String format(Date date, String pattern) {
		if (date != null) {
			SimpleDateFormat df = new SimpleDateFormat(pattern);
			return df.format(date);
		}
		return null;
	}



	/**
	 * 计算时间差
	 * @param fromDate 开始时间
	 * @param toDate 结束时间
	 * @param type 返回类型 days-天数 hours-小时数 minutes-分钟数
	 * */
	public static int timeDifference(Date fromDate,Date toDate, String type) {
		if (fromDate != null||toDate != null) {
			SimpleDateFormat df = new SimpleDateFormat(DATE_TIME_PATTERN);
			String fromDateStr =  df.format(fromDate);
			String toDateStr = df.format(toDate);
			long from = 0;
			long to = 0;
			try {
				from = df.parse(fromDateStr).getTime();
				to = df.parse(toDateStr).getTime();
			} catch (ParseException e) {
				e.printStackTrace();
			}
			if(type =="days"){
				return (int) ((to - from)/(1000 * 60 * 60 * 24));
			}else if(type == "hours"){
				return (int) ((to - from)/(1000 * 60 * 60));
			}else if(type == "minutes "){
				return (int) ((to - from)/(1000 * 60));
			}else{
				return 0;
			}
		}
		return 0;
	}
	public static int timeDifference(Date fromDate,Date toDate) {
		return timeDifference(fromDate,toDate,"days");
	}



	/**
	 * 字符串转化为Date
	 * */
	public static Date strToDate(String str, String pattern){
		if (str != null) {
			SimpleDateFormat df = new SimpleDateFormat(pattern);
			try {
				return df.parse( str );
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}


	/**
	 * 日期字符串计算
	 * @param dateStr 日期字符串 el:2017-11-01
	 * @param days 距离天数
	 * */
	public static String strDatePlus(String dateStr, int days){
		if(dateStr!=null){
			Date date = strToDate(dateStr,DateUtils.DATE_PATTERN);
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			c.add(Calendar.DAY_OF_MONTH, days);// 日期 +days 天
			Date newDate = c.getTime();
			return format(newDate);
		}
		return null;
	}


}
