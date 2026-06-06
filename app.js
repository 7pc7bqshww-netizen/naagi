const video = document.getElementById('camera-bg');
const speech = document.getElementById('speech');
const avatar = document.getElementById('nagi-img');
const modeLabel = document.getElementById('current-mode');

// 【インフラ機能】スマホの背面カメラ（現実世界）を起動するコード（エラー回避処理付き）

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }) //environmentで背面カメラを指定
.then(function(stream) {
    video.srcObject = stream;
})
.catch(function(error) {
    console.log("カメラの起動に失敗、またはオフラインのためスキップします");
});
}

// キャラをタップしたときの通常リアクション
function tapNagi() {
avatar.innerText = "┠(-_-)┨";
speech.innerText = "「…あんまりレンズのところをベタベタ触らないでください。手垢で現実の景色が見えなくなります」";
}

// ① 生活アラーム機能（特定の時間にナギが声（セリフ）を出す）
function modeAlarm() {
    clearBtnStyles();
    document.getElementById('btn-alarm').classList.add('active-mode');
    modeLabel.innerText = "生活アラームモード";
    avatar.innerText = "┠(`-')┨";
// 実際のアラーム時刻判定のシミュレーション
speech.innerText = "「…アラーム設定時間です。12時を過ぎました、ご飯を食べてください。お前の健康管理も私のタスクですので」";
// ※将来ここに音声ファイルを鳴らすコードを書きます：new Audio('alarm.wav').play();
}

// ② マップ案内機能（現実の道案内をナギがナビゲートする）
function modeMap() {
clearBtnStyles();
document.getElementById('btn-map').classList.add('active-mode');
modeLabel.innerText = "ナビゲーションモード";
avatar.innerText = "┠( ＞_＜)┨";
speech.innerText = "「…マップルート案内を開始。次の角を右です。…別に、一緒にお散歩したいわけじゃないですからね」";}

//🌟 危険予知AIモード（カメラの映像からトラブルをナギが先読みする）
function modeDanger() {
clearBtnStyles();
document.getElementById('btn-danger').classList.add('active-mode');
modeLabel.innerText = "周辺危険予知モード";
avatar.innerText = "┠( O-O )┨";
// スマホの近接センサーやカメラの物体認識と連動させる台詞
speech.innerText = "「…警告。前方に段差、および障害物を検知。スマホばかり見てないで、前を向いて歩いてください。怪我しますよ」";
}

// ボタンの赤枠スタイルをリセットする補助関数
function clearBtnStyles() {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active-mode'));
}

