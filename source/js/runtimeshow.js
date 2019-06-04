function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    BirthDay=new Date("6/7/2018 00:00:00");//這個日期是可以修改的
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());//其實僅僅改了這裏
    // sectimeold=timeold/1000
    // secondsold=Math.floor(sectimeold);
    msPerDay=24*60*60*1000
    e_daysold=timeold/msPerDay
    daysold=Math.floor(e_daysold);
    // e_hrsold=(e_daysold-daysold)*24;
    // hrsold=Math.floor(e_hrsold);
    // e_minsold=(e_hrsold-hrsold)*60;
    // minsold=Math.floor((e_hrsold-hrsold)*60);
    // seconds=Math.floor((e_minsold-minsold)*60);
    // span_dt_dt.innerHTML = "已運行&nbsp;&nbsp;" + daysold + "&nbsp;天&nbsp;" + hrsold + "&nbsp;時&nbsp;" + minsold + "&nbsp;分&nbsp;" + seconds + "&nbsp;秒";
    webinfo_runtime_count.innerHTML= daysold + "&nbsp;天"
}
    
show_date_time()
    
