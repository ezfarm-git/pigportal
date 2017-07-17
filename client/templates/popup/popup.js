 Template.popup.onRendered(function () {
	//var popup = require('window-popup').windowPopup;
	//popup(500,500,'/data/product');

	function setCookie(name, value, expiredays) {
	var today = new Date();
	    today.setDate(today.getDate() + expiredays);
 
	    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';'
		
	console.log("today: " , today);
	console.log("cookie" , document.cookie);
	} 

	function getCookie(name) { 
    var cName = name + "="; 
    var x = 0; 
    while ( i <= document.cookie.length ) 
    { 
        var y = (x+cName.length); 
        if ( document.cookie.substring( x, y ) == cName ) 
        { 
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) ); 
        } 
        x = document.cookie.indexOf( " ", x ) + 1; 
        if ( x == 0 ) 
            break; 
    } 
    return ""; 
	} 

	function closePopupNotToday(){	             
		setCookie('notToday','Y', 1);
		$("#main_popup").hide('fade');
	} 

	function closePopup(){
		$("#main_popup").hide('fade');
	} 

	$(window).ready(function(){
      if(getCookie("notToday")!="Y"){
		$("#main_popup").show('fade');
	} 
	});
});

