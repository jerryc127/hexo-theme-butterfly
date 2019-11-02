// get user config
var start_date = document.getElementById("runtionshow").getAttribute("start_date")

function show_date_time() {
    BirthDay=new Date(start_date);
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());
    msPerDay=24*60*60*1000
    e_daysold=timeold/msPerDay
    daysold=Math.floor(e_daysold);
    webinfo_runtime_count.innerHTML= daysold + " " + GLOBAL_CONFIG.runtime_unit
}

var interval;
show_date_time();
clearInterval(interval);
interval = setInterval(show_date_time, 10000);

    
