
function createNew(){
    var epoc = Date.now();
    var node = `<li>
                  <input type='checkbox' id='check_${epoc}' />
                  <input id='todo_${epoc}' type='text' placeholder='Type a new task here…' />
                </li>`;
    $("#tasks").append(node);
}


function showFirstColumns(){
    $("#done").hide();
    $("#todo").show()
              .parent()
              .css({'grid-template-columns': 'repeat(1, 1fr)'});
}

function showSecondColumns(){
    $("#todo").hide();
    $("#done").show()
              .parent()
              .css({'grid-template-columns': 'repeat(1, 1fr)'});
}

function showBothColumns(){
    $("#done").show();
    $("#todo").show()
              .parent()
              .css({'grid-template-columns': 'repeat(2, 1fr)'});
}


function fmtDelta(t){

    const sec = 1000; // millis
    const min = 60 * sec;
    const hour = min * 60;
    const day = 24 * hour;
    const week = day * 7;
    const year = day * 365;

    if( t > year ){
        return { 'used': Math.round(t/year), 'unit': 'years' }
    }else if( t > week ){
        return { 'used': Math.round(t/week), 'unit': 'weeks' }
    }else if( t > day ){
        return { 'used': Math.round(t/day), 'unit': 'days' }
    }else if( t > hour ){
        return { 'used': Math.round(t/hour), 'unit': 'hours' }
    }else if( t > min ){
        return { 'used': Math.round(t/min), 'unit': 'mins' }
    }else if( t > sec ){
        return { 'used': Math.round(t/sec), 'unit': 'secs' }
    }

    return { 'used': 0, 'unit': 'secs' }

}


function addDoneTaskToTable(idn, desc){

    const sinceEpoc = parseInt(idn);
    const now = Date.now();
    const delta = now - sinceEpoc;

    const fmt = fmtDelta( delta );

    var row = `<tr>
                   <td>
                       <input type='checkbox' id='check_${idn}' checked/>
                   </td>
                   <td>${fmt['used']}</td>
                   <td>${fmt['unit']}</td>
                   <td id="done_${idn}">${desc}</td>
               </tr>`;

    $("#donetbody").prepend( row );

}

function whiteOrNada(s){
    if(s){
        return String(s).match(/^\s*$/) != null;
    }
    return true;
}


// Move task over to table of completed tasks
function completeTask(){

    var that = $(this);
    var idn = this.id.substring(6);

    var taskheader = $("#taskheader");
    var textbox = that.parent().find("input[type=text]");
    var donepos = taskheader.offset();
    var pos = textbox.offset();

    var floaterId = 'floater_' + idn;
    $('body').append(`<div id='${floaterId}' class='floater'></div>`);
    var floater = $("#" +floaterId);

    var to_left = donepos.left;
    var to_top  = donepos.top + 20;

    var saveTask = ! whiteOrNada(textbox.val());

    if( $("#done").is(":hidden")  || !saveTask ){
        to_left = 3000;
        to_top  = pos.top;
    }

    floater.text(textbox.val())
           .css({'top': pos.top, 'left': pos.left,
                 'width': textbox.width()})
           .show();

    setTimeout(function(){
        floater.animate({'left': to_left + 'px'}, 600, function(){
            floater.animate({'top': to_top + 'px'}, 220, function(){
                floater.remove();
                if( saveTask ){
                    addDoneTaskToTable( idn, textbox.val() );
                }
            });
        });
        that.parent().remove();
    }, 350);

}


function uncompleteTask(){

    var that = $(this);
    var idn = this.id.substring(6);

    var done = $("#done_" + idn);
    var desc = done.text();
    var node = $(`<li>
                  <input type='checkbox' id='check_${idn}' />
                  <input id='todo_${idn}' type='text' placeholder='Type a new task here…' value="${desc}" />
                </li>`);

    var todo = $("#tasks");
    var todopos = todo.offset();
    var pos = done.offset();

    var to_left = todopos.left + 32;
    var to_top  = todopos.top;

    if( $("#todo").is(":hidden") ){
        to_left = 3000;
        to_top  = pos.top;
    }

    var floaterId = 'floater_' + idn;
    $('body').append(`<div id='${floaterId}' class='floater'></div>`);
    var floater = $("#" +floaterId);

    floater.text(desc)
           .css({'top': pos.top, 'left': pos.left,
                 'width': $("#done").width() - 100})
           .show();

    setTimeout(function(){
        floater.animate({'left': to_left + 'px'}, 600, function(){
            floater.animate({'top': to_top + 'px'}, 220, function(){
                todo.prepend(node);
                floater.remove();
            });
        });
        that.parent().parent().remove();
    }, 350);

}






// @Deprecated
function toggleVisibleColumns(){

    var todo = $("#todo");
    var done = $("#done");

    var todo_visible = todo.is(":visible");
    var done_visible = done.is(":visible");

    if(todo_visible && done_visible){
        done.hide();
        todo.parent().css({'grid-template-columns': 'repeat(1, 1fr)'});
    }else{
        if(todo_visible){
            todo.hide();
            done.show();
        }else{
            todo.show();
            done.show();
            todo.parent().css({'grid-template-columns': 'repeat(2, 1fr)'});
        }
    }
}
