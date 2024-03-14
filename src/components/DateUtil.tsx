export function getDateTime() {
	var now     = new Date(); 
	var year    = now.getFullYear();
	var month   = now.getMonth()+1; 
	var day     = now.getDate();
	var hour    = now.getHours();
	var minute  = now.getMinutes();
	var second  = now.getSeconds(); 
	var stringMonth, stringDay, stringHour, stringMinute, stringSecond;
	if(month.toString().length == 1) {
		stringMonth = '0'+month;
	} else {
		stringMonth = ''+month;
	}
	if(day.toString().length == 1) {
		stringDay = '0'+day;
	} else {
		stringDay = ''+day;
	}
	if(hour.toString().length == 1) {
		stringHour = '0'+hour;
	} else {
		stringHour = ''+hour;
	}
	if(minute.toString().length == 1) {
		stringMinute = '0'+minute;
	} else {
		stringMinute = ''+minute;
	}
	if(second.toString().length == 1) {
		stringSecond = '0'+second;
	} else {
		stringSecond = ''+second;
	}
	var dateTime = year+'-'+stringMonth+'-'+stringDay+' '+stringHour+':'+stringMinute+':'+stringSecond;   
	 return dateTime;
}