// canvasの準備
var canvas = document.getElementById('canvas');
var canvasWidth = 480;
var canvasHeight = 270;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

var willShowDLLink = false;

// Canvas上に背景画像を表示
var img = new Image();
img.src = 'img/background4.png';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
}

/* 画像を読み込んで画像を表示 */

var file1 = document.getElementById('file1');
var file2 = document.getElementById('file2');
var uploadImgSrc;

// ファイルが指定された時にloadLocalImage()を実行
// (dx, dy) には画像を配置する中心点を渡す
file1.addEventListener('change', function(ev){loadLocalImage(ev, (((canvasWidth / 4) * 1) - 10), (canvasHeight/2 - 10))}, true);
file2.addEventListener('change', function(ev){loadLocalImage(ev, (((canvasWidth / 4) * 3) + 10), (canvasHeight/2 - 10))}, true);


function loadLocalImage(e, dx, dy) {

    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // ファイル読み込み
    var reader = new FileReader();
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw(dx, dy);
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}


// Canvas上に画像を表示する
function canvasDraw(dx, dy) {

    // Canvas上に画像を表示
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = uploadImgSrc;
    img.onload = function() {
        
        var maxWidth = 150;
        var maxHeight  = 150;

        var isYokonaga = this.width > this.height;

        if (isYokonaga) {

            console.log("横長画像");
            var width = maxWidth;
            var height = maxWidth * (this.height / this.width);
            
        } else {

            console.log("縦長画像");
            var width = maxHeight * (this.width / this.height);
            var height = maxHeight;

        }

        dx = dx - width/2;
        dy = dy - height/2;

        ctx.drawImage(img, dx, dy, width, height );


        if (willShowDLLink) {

            // canvasを画像に変換
            var data = canvas.toDataURL();

            // DLリンクを表示
            $('#result').attr("href", data);
            $("#result").attr("download", "「いいねvsRT画像」メーカー.png");
            $('#result').text("画像をダウンロード");

        } else {

            willShowDLLink = true;

        }
    }

}
