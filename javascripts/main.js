$('.default').boxes();
$('.custom').click(function (e) {
  e.preventDefault();
  var titleHeight; // Đặt biến lưu giá trị chiều cao của title
  $.boxes({
    mode: 'custom',
    title: 'lelinhtinh',
    message:
      '<hr style="border: 0px none;border-bottom: 1px solid #DDD;" /><br />» <a target="_blank" href="http://devs.forumvi.com/">Devs forumvi</a><br />» Popup này sẽ tự đóng sau 5 giây nếu bạn không rê chuột vào.<br />» Có thể click ra ngoài để đóng popup.<br />» Nhập tiêu đề cho popup vào ô bên dưới.<br /><br /><hr style="border: 0px none;border-bottom: 1px solid #DDD;" /><br />Consectetur adipisicing elit. Voluptates a necessitatibus dolore veritatis reprehenderit eum dicta consectetur. Fugiat, maiores, labore, non quia eveniet ab reiciendis unde eum quidem error sapiente!',
    okBtn: 'Đồng ý',
    cancelBtn: 'Làm lại',
    inputTxt: 'lelinhtinh',

    width: 550,
    padding: [30, 40],
    border: [5, 5],

    autoClose: 5000, // Tự đóng sau 5000 ms
    noClose: true, // Không đóng boxes khi click vào nút Ok hoặc Cancel
    clickOut: true, // Đóng khi click ra ngoài nền
    messString: false, // Cho phép sử dụng HTML trong message

    okBtnShow: true, // Hiện nút Ok
    cancelBtnShow: true, // Hiện nút Cancel
    closeBtnShow: true, // Hiện nút Close
    inputTxtShow: true, // Hiện Input nhập liệu

    ok: function (helper) {
      var $input = helper.el.input;
      alert($input.val());
      $input.val('');
    },
    cancel: function (helper) {
      var $title = helper.el.title;
      var $input = helper.el.input;
      $title.text('...');
      helper.center();
      $input.val('').focus();
    },
    input: function (helper) {
      var $input = $(this); // Input của boxes hiện tại
      var $title = helper.el.title; // Title của boxes hiện tại
      titleHeight = $title.height(); // Lưu giá trị chiều cao của title
      $title.text($input.val()); // Lấy giá trị input đưa lên title
      if ($title.height() != titleHeight) {
        // Kiểm tra lại chiều cao của title, nếu khác giá trị cũ thì
        titleHeight = $title.height(); // Lưu lại giá trị chiều cao title mới
        helper.center(); // Chạy hàm căn giữa boxes
      }
    },
  });
});

$('.images').boxes({
  height: '100%',
  message:
    '<h2>Lorem ipsum Sunt et anim.</h2>\n\n<strong>Lorem ipsum Pariatur eu dolor pariatur Duis officia adipisicing velit enim Excepteur consectetur quis.</strong>\n\n<img src="https://example.com/broken-pictures" alt="" />\n\nLorem ipsum Excepteur occaecat non occaecat commodo do reprehenderit sint adipisicing officia cillum laborum tempor consequat non deserunt Excepteur tempor consectetur sit deserunt esse eu quis Ut aliqua sint esse sit dolor qui laborum dolor culpa amet in laborum occaecat ex velit deserunt veniam cillum ut laborum veniam id labore esse in voluptate enim Excepteur minim elit officia in dolor Ut amet ex nulla tempor in ullamco deserunt reprehenderit sunt.\n\nDuis id esse occaecat dolore ad aliquip reprehenderit ex dolore non nulla dolore dolore proident.\n\nDuis ex qui non sint est aliquip veniam anim nostrud eu culpa dolore nisi veniam adipisicing ullamco nostrud ad mollit sunt qui esse nostrud id aliqua non elit elit Excepteur consectetur consectetur et nulla enim aliqua deserunt tempor incididunt culpa magna aliqua exercitation dolore laboris dolore do velit incididunt anim aliqua minim dolor veniam eiusmod.\n\nLorem ipsum Ullamco ullamco proident aliquip veniam exercitation incididunt officia deserunt exercitation commodo Ut\n\n<img src="https://images.unsplash.com/photo-1626808642875-0aa545482dfb" alt="Photo by Zen Sümer on Unsplash" />\n\nDuis anim deserunt qui amet Ut mollit ullamco ex velit Ut incididunt incididunt nulla officia in ea esse non culpa elit tempor cillum elit ex culpa anim qui in voluptate non anim pariatur elit proident ut officia irure nostrud.\n\nUt et non id eiusmod aliquip elit velit reprehenderit dolor ut veniam enim minim Duis aliquip enim aute sed tempor laboris nulla voluptate qui sint dolor aliqua consectetur laborum in mollit sed est eiusmod irure anim eiusmod dolor dolore Duis Duis ullamco magna est sit Ut non labore exercitation consectetur ad amet magna proident velit amet ut in mollit voluptate voluptate.\n\nDuis voluptate exercitation laborum Duis eu proident ad sed in nostrud exercitation incididunt minim velit fugiat commodo cillum incididunt laborum aliquip dolor magna minim quis fugiat sed Ut elit proident ea deserunt occaecat dolore labore aliquip id qui quis mollit nisi voluptate labore culpa et occaecat reprehenderit enim veniam magna pariatur sint ullamco deserunt ut adipisicing in tempor magna reprehenderit Excepteur ut fugiat Excepteur esse in velit veniam dolore ex Ut dolore reprehenderit dolore magna enim ut deserunt exercitation mollit pariatur ad elit proident commodo reprehenderit mollit enim laborum ut magna do in Duis consequat eu qui anim reprehenderit laboris qui ea.',
  messString: false, // Cho phép sử dụng HTML trong message
});

$('.ajax').boxes({
  title: 'Warcraft',
  message: 'Đang tải...',
  minWidth: 500,
  messString: false, // Cho phép sử dụng HTML trong message
  helper: function (helper) {
    helper.effect('load');
    $.getScript(this.href, function () {
      helper.el.mess.html(warcraft);
      helper.center();
      helper.removeEffect();
    });
  },
});

$('.youtube').boxes({
  mode: 'youtube',
  title: 'Ori and the Will of the Wisps',
  autoResize: false, // Không tự resize khi thay đổi kích thước trình duyệt
  helper: function (helper) {
    helper.effect('load');
    var video = this.href.match(/(?:v=|v\/|embed\/|youtu.be\/)(.{11})/)[1];
    helper.el.mess.html(
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
        video +
        '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    );
    helper.center();
    $(this)
      .find('iframe')
      .load(function () {
        helper.removeEffect();
      });
  },
});
