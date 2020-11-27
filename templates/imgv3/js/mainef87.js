jQuery(document).ready(function($){
    // Mobile Menu
    $('#main_menu').click(function(){
        $(this).toggleClass('open');
        $('body').toggleClass('open'); 
    });
    
    // Proggress bar
    if ( $('#monitoring').length > 0 ) {
        var $meters = $(".progress-bar .current-progress");
        var $section = $('#monitoring');
        var is_loadDaBars = false;
        
        function loadDaBars() {
            if ( ! is_loadDaBars ) {
                var scrollOffset = $(document).scrollTop();
                var containerOffset = $section.offset().top - window.innerHeight;
                if (scrollOffset > containerOffset) {
                    setTimeout( function(){
                        $meters.each(function() {
                            var $el = $(this);
                            var origWidth = $el.data('width');
                            $el.width(0);
                            $el.css('opacity', 1);
                            $el.animate({width: origWidth}, 1200);
                        });
                    }, 1000 );
                    is_loadDaBars = true;
                }
            }
        }
        
        $(document).on('scroll', function(ev) {
            loadDaBars();
        });
        
        $('body').on({
            'touchmove': function(e) { 
                loadDaBars();
            }
        });
    }
    
    // Select Styling
    if ( $('.chosen-select').length > 0 ) {
        $('.chosen-select').chosen({
            disable_search_threshold: 10
        });
    }
    
    if ( $(window).width() > 1030 ) {            

        $('.layer-form div').plaxmove({
            ratioH:0.03,
            ratioV: false
        });

        $('.fullwidth .h2').plaxmove({
            ratioH:0.04,
            ratioV: false
        });      

        $('.layer-man div').plaxmove({
            ratioH:0.03,
            ratioV: false
        });
        
        $('.layer-header-text div').plaxmove({
            ratioH:-0.03,
            ratioV: 0.02
        });

        $('.layer-donate div').plaxmove({
            ratioH:-0.03,
            ratioV: false
        });          
    }
    
    if ( detectIE() && $('.grayscale').length > 0 ) {
        $('.item-news').each(function(){
            $(this).removeClass('wow zoomIn');
        });
    }
    
});


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}



function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
function dd1(){
$("#download_1").dialog({
minWidth: 400,
resizable: false
});
}

function load_info(){
$.getScript("https://api.vk.com/method/groups.getById?group_id=crmprp&fields=members_count&callback=get_info&v=5.73");
}
function get_news_box(){
var data = [];
switch(randomInteger(1, 3)){
case 1:
data['color'] = 'red';
data['id'] = randomInteger(1, 3);
break;
case 2:
data['color'] = 'yellow';
data['id'] = randomInteger(1, 3);
break;
case 3:
data['color'] = 'red';
data['id'] = randomInteger(1, 3);
break;
}
return data;
}

function get_news(data){
var content = '';
$.getJSON("/includes/back.php?func=get_news", function( data ){
$.each(data.response.items, function(key, value){
var img = '/templates/crmp-rp-v3/img/news.jpg';
if(value['text']){
try{
if(value['attachments'][0]['photo']['photo_604']){
img = value['attachments'][0]['photo']['photo_604'];
}
}catch(e){
//
}
content += "<a href='https://vk.com/crmprp?w=wall-54290139_"+value['id']+"' style='color:#000' target='_blank' title='Подробней'><div class='item-news type-"+get_news_box()['id']+" type-"+get_news_box()['color']+"  wow zoomIn'><div class='img'><img src='"+img+"' alt='' class='grayscale'></div><div class='text'>"+value['text']+"</div><div class='date-news'>"+timeConverter(value['date'])+"</div></div></a>";
}
});
$('.news-list').html(content);
});
}

function get_info(data){
$("#count_vk").text(data['response'][0]['members_count']+" подписчиков");
}