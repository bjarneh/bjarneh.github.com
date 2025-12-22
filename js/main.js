
function checkForDarkMode(){

    var darktheme = false;

    var c = getCookieMap();
    if( c.hasOwnProperty('darktheme') ){
        darktheme = c['darktheme'];
    }

    if(darktheme){
        $("body").css({'background-color': '#151515', 'color': '#ddd' });
        $("#darklight").prop('checked', true);
    }
}



function toggleDarkMode(){

    var c = getCookieMap();

    if($("#darklight").is(':checked')){
        $("body").css({'background-color': '#151515', 'color': '#ddd' });
        c.add('darktheme', true);
    }else{
        $("body").css({'background-color': '#fffff8', 'color': '#111' });
        c.add('darktheme', false);
    }

}

