/* 画像プリロード */

var canvas = document.getElementById('canvas');
var canvasWidth = 400;
var canvasHeight = 300;

// Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

// Canvas上に画像を表示
var img = new Image();
img.src = '2.jpg';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
}


/* 画像を読み込んで画像を表示 */

var file = document.getElementById('file');
var uploadImgSrc;

// Canvasの準備

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {

    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        //ctx.drawImage(img, 0, 0, 50, 50);

        // canvasを画像に変換
        var data = canvas.toDataURL();

        // ダウンロードリンクを生成して出力
        var dlLink = document.createElement('a');
        dlLink.href = data;
        dlLink.download = 'sample.png';
        dlLink.innerText = 'ダウンロード';
        document.getElementById('result').appendChild(dlLink);
    }

}
