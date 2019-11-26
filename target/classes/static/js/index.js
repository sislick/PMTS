/***********新闻模块数据************/
var data_news = [{
	img: 'n1',
	title: '牧云系统正式上线',
	words: '您的快递正在牧云而来，通过程序员的不懈努力，快递系统终于和大家见面了'
}, {
	img: 'n2',
	title: '通知公告',
	words: '站在这个2019年的尾声，牧云系统祝福大家，2020年与牧云系统一起成长，我们将会为您提供优质的服务'
}];

/********添加新闻模块*********/
function addNews() {
	var news = document.getElementById('news');
	var news_str = news.innerHTML.trim();
	news.innerHTML = '';
	for (var i = 0; i < data_news.length; i++) {
		var words = '';
		if (data_news[i].words.length > 45) {
			words = data_news[i].words.substr(0, 45) + '...'
		} else {
			words = data_news[i].words;
		}
		news.innerHTML += news_str.replace('{{news_img}}', data_news[i].img)
			.replace('{{title}}', data_news[i].title)
			.replace('{{words}}', words);
	}
	var news_report = document.getElementsByClassName('news_report');
	var old_class = news_report[news_report.length - 1].className;
	var new_class = old_class + ' news_report_right';
	news_report[news_report.length - 1].className = new_class;
}

/**************活动专区模块数据***************/
var data_activity = [{
	id: '1',
	img: 'a1',
	alt: '活动1',
	title: '迎战双十一！牧云快递迎“新契机”',
	aDate: '2019-11-10'
}, {
	id: '2',
	img: 'a2',
	alt: '活动2',
	title: '知行合一，务实笃行 牧云快递网点负责人管理提升班沈阳开课',
	aDate: '2019-11-09'
}, {
	id: '3',
	img: 'a3',
	alt: '活动3',
	title: '品质为本，极致服务！牧云快递网点负责人管理提升班北京站开课',
	aDate: '2019-11-08'
}, {
	id: '4',
	img: 'a4',
	alt: '活动4',
	title: '品质为本，极致服务！',
	aDate: '2019-11-07'
}, {
	id: '5',
	img: 'a5',
	alt: '活动5',
	title: '品质为本，极致服务！牧云快递优秀',
	aDate: '2019-11-06'
}];
/******************通用函数********************/
var g = function(id) {
	if (id.substr(0, 1) == '.') {
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

/**************活动专区数据初始化****************/
function addActivity() {
	var activity_ppt = document.getElementById('activity_ppt');
	var activity_ppt_str = activity_ppt.innerHTML.trim();
	var size = data_activity.length > 4 ? 4 : data_activity.length;
	activity_ppt.innerHTML = '';
	for (var i = 0; i < size; i++) {
		activity_ppt.innerHTML += activity_ppt_str
			.replace('{{id}}', data_activity[i].id)
			.replace('{{img}}', data_activity[i].img)
			.replace('{{alt}}', data_activity[i].alt)
			.replace('{{css}}', ['', 'img_right'][i % 2]);
	}
	var activity_dot = document.getElementById('activity_dot');
	var activity_dot_str = activity_dot.innerHTML.trim();
	activity_dot.innerHTML = '';
	for (var i = 0; i < size; i++) {
		activity_dot.innerHTML += activity_dot_str.replace(/{{id}}/g, data_activity[i].id);
	}

	var activity_item = document.getElementById('activity_item');
	var activity_item_str = activity_item.innerHTML.trim();
	activity_item.innerHTML = '';
	for (var i = 0; i < data_activity.length; i++) {
		activity_item.innerHTML += activity_item_str
			.replace('{{title}}', data_activity[i].title)
			.replace('{{aDate}}', data_activity[i].aDate);
	}
}

/**************************************/
//5.幻灯片切换
var timeIdActivity;
var countActivity = 1;

function switchActivity(n) {
	var sizeActivity = data_activity.length > 4 ? 4 : data_activity.length;


	//stopfn();
	//5.1 获得要展现的的幻灯片&控制按钮 DOM
	var main = g('img_' + n);
	var ctrl = g('dot_' + n);

	//5.2获得所有的幻灯片以及控制按钮
	var clear_main = g('.activity_img');
	var clear_ctrl = g('.dot');
	//5.3清除他们的active样式
	for (i = 0; i < clear_ctrl.length; i++) {
		clear_main[i].className = clear_main[i].className.replace(" img_active", '');
		clear_ctrl[i].className = clear_ctrl[i].className.replace(" dot_active", '');
	}
	//5.4 为当前控制按钮和幻灯片附加样式
	main.className += ' img_active';
	ctrl.className += ' dot_active';

	//7.2 切换时，复制上一张幻灯片到 main_background 中
	setTimeout(function() {
		g('main_background').innerHTML = main.innerHTML;
	}, 1000);

	beginfnActivity();
	countActivity = n;
	if (++countActivity > sizeActivity) {
		countActivity = 1;
	}
}

//8.定时切换幻灯片

//调用开启定时器的函数
beginfnActivity();
//当鼠标移到外面的时候触发
function beginfnActivity() {
	//为了避免出现连续开启两次定时器,在每次开启之前关闭一下
	clearInterval(timeIdActivity);
	timeIdActivity = setInterval(function() {
		switchActivity(countActivity);
	}, 4000);
}

function stopfnActivity() {
		clearInterval(timeIdActivity);
	}
	//页面失去焦点
onblur = function() {
		stopfnActivity();
	}
	//页面过去焦点的时候开始
onfocus = function() {
	beginfnActivity();
}

$(function() {
	var n = 0;
	$('#item>ul>li').mousemove(
		function() {
			$(this).children('ul').css('visibility', 'visible');
		}
	)
	$('#item>ul>li').mouseout(
		function() {
			$(this).children('ul').css('visibility', 'hidden');
		}
	)
	$('#strip>ul').mousemove(
		function() {
			$(this).children('li').removeClass('logo_img');
		}
	)
	$('#strip>ul').mouseout(
		function() {
			$(this).children('li').addClass("logo_img");
		}
	)
	$('#exit').click(
			function() {
				$.ajax({
					type: "post",
					url: "/user/exit",
					data: data,
					async: true,
					dataType: "json",
					success: function(json) {
						if(json.state == 200){
							window.location.href = '/';
						}
					}
				});
			}
		)
		/*添加新闻*/
	addNews();
	/*添加活动*/
	addActivity();
	switchActivity(countActivity);
	beginfnActivity();
})