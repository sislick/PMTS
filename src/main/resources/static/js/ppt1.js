/*数据*/
var data = ["p1", "p2", "p3", "p4", "p5"];

/*添加ppt*/
function addppt() {
	/*轮播图片*/
	var template_img = document.getElementById('template_img');
	var str_img = template_img.innerHTML.trim();
	var reg = new RegExp("{{img}}", "g"); //创建正则RegExp对象,用于替换img  
	template_img.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		template_img.innerHTML += str_img.replace(reg, data[i]);
	}

	/*轮播圆点*/
	var template_dot = document.getElementById('template_dot');
	var str_dot = template_dot.innerHTML.trim();
	template_dot.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		template_dot.innerHTML += str_dot.replace(reg, data[i]);
	}
}

/*设置图片的初始位置*/
function place() {
	var arry_img = document.getElementsByClassName('img');
	var img_n = parseInt(arry_img.length / 2);
	if (arry_img.length <= 0) {
		return;
	}
	arry_img[0].left = -100 * img_n + '%';
	for (var i = 1; i < arry_img.length; i++) {
		arry_img[i].left = parseInt(arry_img[i - 1].left) + 100 + '%';
	}
}

/*绑定圆点和图片之间的关系*/
$(".circle").on("click", function() {

})

//动态调整图片的left
function movePictures() {
	var arry_img = document.getElementsByClassName('img');
	for (var i = 0; i < arry_img.length; i++) {
		arry_img[i].left = parseInt(arry_img[i].left) + 10 + '%';
		console.log(arry_img[i].left);
	}
}

function a() {
	var arry_img = document.getElementsByClassName('img');
	for (var i = 0; i < arry_img.length; i++) {
		console.log(arry_img[i].left);
	}
}
window.onload = function() {
	addppt();
	place();
	a();
//	setInterval(function() {
//		movePictures();
//	}, 100);
}