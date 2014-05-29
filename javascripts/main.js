$(function () {
	// demo 1
	$(".default").click(function () {
		$.boxes();
	});
	$(".custom").click(function (e) {
		e.preventDefault();
		var titleHeight; // Đặt biến lưu giá trị chiều cao của title
		$.boxes({
			mode: 'custom',
			title: 'Zzbaivong',
			message: '<hr style="border: 0px none;border-bottom: 1px solid #DDD;" /><br />» <a target="_blank" href="http://devs.forumvi.com/">Devs forumvi</a><br />» Popup này sẽ tự đóng sau 5 giây nếu bạn không rê chuột vào.<br />» Có thể click ra ngoài để đóng popup.<br />» Nhập tiêu đề cho popup vào ô bên dưới.<br /><br /><hr style="border: 0px none;border-bottom: 1px solid #DDD;" /><br />Consectetur adipisicing elit. Voluptates a necessitatibus dolore veritatis reprehenderit eum dicta consectetur. Fugiat, maiores, labore, non quia eveniet ab reiciendis unde eum quidem error sapiente!',
			okBtn: 'Đồng ý',
			cancelBtn: 'Làm lại',
			inputTxt: 'Zzbaivong',

			width: 550,
			padding: [30, 40],
			border: [5, 5],

			autoClose: 5000, // Tự đóng sau 5000 ms
			clickOut: true, // Đóng khi click ra ngoài nền
			messString: false, // Cho phép sử dụng HTML trong message

			okBtnShow: true, // Hiện nút Ok
			cancelBtnShow: true, // Hiện nút Cancel
			closeBtnShow: true, // Hiện nút Close
			inputTxtShow: true, // Hiện Input nhập liệu

			ok: function ($obj) {
				var $input = $obj.find('.zzBoxes_input');
				alert($input.val());
				$input.val('');
			},
			cancel: function ($obj) {
				var $title = $obj.find('.zzBoxes_title');
				var $input = $obj.find('.zzBoxes_input');
				$title.text('...')
				$input.val('').focus();
			},
			button: function () {
				$.boxes.helper.noClose = false;
			},
			input: function ($obj) {
				var $input = $(this); // Input của boxes hiện tại
				var $title = $obj.find('.zzBoxes_title'); // Title của boxes hiện tại
				titleHeight = $title.height(); // Lưu giá trị chiều cao của title
				$title.text($input.val()); // Lấy giá trị input đưa lên title
				if ($title.height() != titleHeight) { // Kiểm tra lại chiều cao của title, nếu khác giá trị cũ thì
					titleHeight = $title.height(); // Lưu lại giá trị chiều cao title mới
					$.boxes.helper.center(); // Chạy hàm căn giữa boxes
				}
			}
		});
	});

	$(".images").click(function (e) {
		e.preventDefault();
		$.boxes({
			height: '100%',
			message: '<h2>Lorem ipsum Sunt et anim.</h2>\n\n<strong>Lorem ipsum Pariatur eu dolor pariatur Duis officia adipisicing velit enim Excepteur consectetur quis.</strong>\n\n<img src="https://dl.dropboxusercontent.com/u/126946313/anime/Chapter%20045-037.jpg" alt="" />\n\nLorem ipsum Excepteur occaecat non occaecat commodo do reprehenderit sint adipisicing officia cillum laborum tempor consequat non deserunt Excepteur tempor consectetur sit deserunt esse eu quis Ut aliqua sint esse sit dolor qui laborum dolor culpa amet in laborum occaecat ex velit deserunt veniam cillum ut laborum veniam id labore esse in voluptate enim Excepteur minim elit officia in dolor Ut amet ex nulla tempor in ullamco deserunt reprehenderit sunt.\n\nDuis id esse occaecat dolore ad aliquip reprehenderit ex dolore non nulla dolore dolore proident.\n\nDuis ex qui non sint est aliquip veniam anim nostrud eu culpa dolore nisi veniam adipisicing ullamco nostrud ad mollit sunt qui esse nostrud id aliqua non elit elit Excepteur consectetur consectetur et nulla enim aliqua deserunt tempor incididunt culpa magna aliqua exercitation dolore laboris dolore do velit incididunt anim aliqua minim dolor veniam eiusmod.\n\nLorem ipsum Ullamco ullamco proident aliquip veniam exercitation incididunt officia deserunt exercitation commodo Ut\n\n<img src="http://r23.imgfast.net/users/2316/63/36/82/avatars/1-80.png" alt="" style="float: right;" />\n\nDuis anim deserunt qui amet Ut mollit ullamco ex velit Ut incididunt incididunt nulla officia in ea esse non culpa elit tempor cillum elit ex culpa anim qui in voluptate non anim pariatur elit proident ut officia irure nostrud.\n\nUt et non id eiusmod aliquip elit velit reprehenderit dolor ut veniam enim minim Duis aliquip enim aute sed tempor laboris nulla voluptate qui sint dolor aliqua consectetur laborum in mollit sed est eiusmod irure anim eiusmod dolor dolore Duis Duis ullamco magna est sit Ut non labore exercitation consectetur ad amet magna proident velit amet ut in mollit voluptate voluptate.\n\nDuis voluptate exercitation laborum Duis eu proident ad sed in nostrud exercitation incididunt minim velit fugiat commodo cillum incididunt laborum aliquip dolor magna minim quis fugiat sed Ut elit proident ea deserunt occaecat dolore labore aliquip id qui quis mollit nisi voluptate labore culpa et occaecat reprehenderit enim veniam magna pariatur sint ullamco deserunt ut adipisicing in tempor magna reprehenderit Excepteur ut fugiat Excepteur esse in velit veniam dolore ex Ut dolore reprehenderit dolore magna enim ut deserunt exercitation mollit pariatur ad elit proident commodo reprehenderit mollit enim laborum ut magna do in Duis consequat eu qui anim reprehenderit laboris qui ea.',
			messString: false, // Cho phép sử dụng HTML trong message
		});
	});

	$(".ajax").click(function (e) {
		e.preventDefault();
		$.boxes({
			title: 'Warcraft',
			message: 'Đang tải...',
			minWidth: 500,
			messString: false, // Cho phép sử dụng HTML trong message
			helper: function (opt) {
				$.boxes.helper.effect('load');
				$.getScript('http://www.devs.cf/31567.js', function () {
					$.boxes.helper.el.mess.html(warcraft);
					$.boxes.helper.center();
					$.boxes.helper.removeEffect();
				});
			}
		});
	});

	$(".youtube").click(function (e) {
		var video = this.href.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
		e.preventDefault();
		$.boxes({
			mode: 'youtube',
			title: 'Giải đấu Hạng Phong trào - Chung kết',
			message: '<iframe width="560" height="315" src="//www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>',
			messString: false, // Cho phép sử dụng HTML trong message
			autoResize: false, // Không tự resize khi thay đổi kích thước trình duyệt
			helper: function (opt) {
				$.boxes.helper.effect('load');
				$(this).find('iframe').load(function () {
					$.boxes.helper.removeEffect();
				});
			}
		});
	});

	// demo 2
	$(".alert").click(function () {
		$.boxes('alert', 'Đây là thông báo cho bạn.');
	});
	$(".confirm").click(function () {
		$.boxes('confirm', 'Nhấn một nút bất kỳ!');
	});
	$(".prompt").click(function () {
		$.boxes('prompt', 'Nhập tên của bạn?', 'baivong');
	});

	// demo 3
	$("#alert").click(function () {
		alert('alert("Đây là thông báo cho bạn.", function() {\n\talert(this.data);\n});', function () {
			alert(this.data);
			console.log(this.data);
		});
	});
	$("#confirm").click(function () {
		confirm('confirm("Nhấn một nút bất kỳ!", function() {\n\talert(this.data);\n});', function () {
			alert(this.data);
			console.log(this.data);
		});
	});
	$("#prompt").click(function () {
		prompt('prompt("Nhập tên của bạn?", "baivong", function() {\n\talert("Xin chào! " + this.data);\n});', 'baivong', function () {
			alert('Xin chào! ' + this.data);
			console.log(this.data);
		});
	});
});
