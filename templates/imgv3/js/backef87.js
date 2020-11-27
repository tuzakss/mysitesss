var iarray = new Object();

iarray.acc_move_step = 1;
iarray.email_step = 1;
iarray.move_name_s = 0;

function show_s(){
if($('#skey').attr('type') == 'text'){
$('#skey').attr('type', 'password');
$('#skey1').attr('type', 'password');
}else{
$('#skey').attr('type', 'text');
$('#skey1').attr('type', 'text');
}
}
function submit_s(){
if($("#skey").val() == $("#skey1").val()){
$("#skey_form").submit();
}else{
alert('Защитные коды не совпадают!');
}
}
function show_p(){
if($('#npass').attr('type') == 'text'){
$('#npass').attr('type', 'password');
$('#npass1').attr('type', 'password');
}else{
$('#npass').attr('type', 'text');
$('#npass1').attr('type', 'text');
}
}
function submit_p(){
if($("#npass").val() == $("#npass1").val()){
$("#login").submit();
}else{
alert('Пароли не совпадают!');
}
}
function dd1(){
$("#download_1").dialog({
minWidth: 400,
resizable: false
});
}
function move_acc_next(){
switch(iarray.acc_move_step){
case 1:
if(iarray.move_sid != $("#new_sid").val()){
iarray.move_name_s = 0;
}
if(iarray.move_name_s == 1){
iarray.move_name = $("#new_name").val();
}else{
iarray.move_name = $("#old_name").val();
}
$.post(
  "/includes/back.php?func=acc_move&step=1",
  {
    name: iarray.move_name,
	sid: $("#new_sid").val()
  },
function(data){
var info = JSON.parse(data);
switch(info.success){
case 1:
if(iarray.move_name_s == 0){
if(confirm('Подтвердить перенос?')){
iarray.acc_move_step++;
move_acc_next();
}
}else{
if(confirm('Подтвердить перенос с новым ником '+$("#new_name").val()+'?')){
iarray.acc_move_step++;
move_acc_next();
}
}
break;
case 2:
if(confirm(info.error+'\nХотите изменить E-Mail?')){
window.location = '/email';
}
break;
default:
if(iarray.move_name_s == 0){
alert('Ваш никнейм уже занят на этом сервере, придумайте себе новый!');
$("#next_btn").text('Проверить');
}else{
alert('Никнейм '+$("#new_name").val()+' уже занят на этом сервере, придумайте себе другой!');
$("#next_btn").text('Проверить');
}
iarray.move_name_s = 1;
$("#box_name").fadeIn(500);
}
}
);
iarray.move_sid = $("#new_sid").val();
break;
case 2:
$("#new_sid").prop('disabled', true).trigger("chosen:updated");
$("#new_name").css('opacity', 0.5)
$("#new_name").prop('disabled', true);
$("#code_box").fadeIn(500);
$.getJSON("/includes/back.php?func=acc_move&step=2", function(info){
if(info.success == 1){
iarray.acc_move_step++;
$("#next_btn").text('Подтвердить');
}else{
alert(info.error);
}
});
break;
case 3:
$.post(
  "/includes/back.php?func=acc_move&step=3",
  {
    code: $("#email_code").val()
  },
function(data){
var info = JSON.parse(data);
if(info.success == 1){
iarray.acc_move_step++;
$("#code_box").fadeOut(500);
$("#end_box").fadeIn(500);
$("#next_btn").text('Завершить');
}else{
alert(info.error);
}
}
);
break;
case 4:
$.getJSON("/includes/back.php?func=acc_move&step=4", function(info){
if(info.success == 1){
alert(info.message);
window.location = '/my';
}else{
alert(info.error);
}
});
break;
}
}
function email_next(){
switch(iarray.email_step){
case 1:
if(Cookies.get('email_x') == 1){
iarray.email_step++;
}else{
$.getJSON("/includes/back.php?func=email&step=1", function(info){
if(info.success == 1){
iarray.email_step++;
}
});
Cookies.set('email_x', 1);
}
break;
case 2:
$.post(
  "/includes/back.php?func=email&step=2",
  {
    email_code: $("#code").val()
  },
function(data){
var info = JSON.parse(data);
if(info.success == 1){
$("#new_email_d").fadeIn(500);
$("#new_t").fadeIn(500);
$("#code_d").fadeOut(500);
$("#old_t").fadeOut(500);
$("#code").val('');
iarray.email_step++;
}else{
alert(info.error);
}
});
break;
case 3:
$.post(
  "/includes/back.php?func=email&step=3",
  {
    new_email: $("#new_email").val()
  },
function(data){
var info = JSON.parse(data);
if(info.success == 1){
$("#old_t").html("Введите код, который был отправлен на <b id='email_d'>"+$("#new_email").val()+"</b>");
$("#new_email_d").fadeOut(500);
$("#new_t").fadeOut(500);
$("#code_d").fadeIn(500);
$("#old_t").fadeIn(500);
iarray.email_step++;
}else{
alert(info.error);
}
});
break;
case 4:
$.post(
  "/includes/back.php?func=email&step=4",
  {
    email_code1: $("#code").val()
  },
function(data){
var info = JSON.parse(data);
if(info.success == 1){
alert('E-Mail успешно изменён!');
window.location = '/my'
}else{
alert(info.error);
}
});
break;
}
}