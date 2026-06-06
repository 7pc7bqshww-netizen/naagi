// ==========================================

// 灯史ナギ AR Living Support - アラーム機能特化コア

// ==========================================

const video = document.getElementById('camera-bg');

const speech = document.getElementById('speech');

const avatar = document.getElementById('nagi-img');

const modeLabel = document.getElementById('current-mode');

// 背面カメラ起動インフラ（エラー回避付き）

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })

.then(function(stream) {

video.srcObject = stream;

})

.catch(function(error) {

console.log("カメラの起動をスキップ（オフライン動作維持）");

});

}

// ==========================================

// ⏱ アラーム（生活スケジュール）設定エリア

// ==========================================

// あなたがナギちゃんに教えてほしい「時間（時・分）」をここに自由に設定できます

const ALARM

_

SCHEDULE = {

lunch: { hour: 12, minute: 0 }, // お昼ご飯の時間

sleep: { hour: 23, minute: 30 } // 就寝時間（夜11時30分）

};

// ナギちゃんのアラーム専用セリフ集

const alarmDialogues = {
waiting: "「…私は時間を見張っています。お前はサボらずに、目の前のタスク（生活）をこなしてください」",
lunch: "「⏱ ┠( ── )┨：12時を過ぎました。お昼ご飯を食べてください。お前の健康管理も私のタスクですので」",
sleep: "「⏱ ┠( ＝ ＝ )┨：もう夜の23時半です。画面の明かりを消して早く寝てください。夜更かしはバグの元です」"
};

// キャラをタップしたときのリアクション

function tapNagi() {
avatar.innerText = "┠( ￣ ￣)┨";
speech.innerText = "「…時間を気にする前に、まず手を動かしたらどうですか」";
}

// 1秒ごとに現在時刻をチェックする心臓部（タイマー）

function checkTime() {
const now = new Date();const currentHour = now.getHours();
const currentMinute = now.getMinutes();

// 【12:00】のお昼ご飯アラーム判定
if (currentHour === ALARMSCHEDULE.lunch.hour && currentMinute ===_ALARM_SCHEDULE.lunch.minute) {
triggerNagiAlarm("┠( ── )┨", alarmDialogues.lunch,'lunch.mp3');
}

// 【23:30】の就寝アラーム判定
else if (currentHour === ALARM_SCHEDULE.sleep.hour && currentMinute ===ALARM_SCHEDULE.sleep.minute) {
    triggerNagiAlarm("( ＝ ＝ )", alarmDialogues.sleep,'sleep.mp3');
}
}

// アラームが発動した時のナギちゃんの挙動

function triggerNagiAlarm(face, text, audioFile) {
avatar.innerText = face;
speech.innerText = text;
modeLabel.innerText = "⚠ 生活スケジュール警告発令中";

// 演出：アラーム時にナギちゃんが画面で少しカタカタ震える（機械的エラー演出）
avatar.style.transform = 'scale(1.2) rotate(5deg)';
setTimeout(() => { avatar.style.transform = 'scale(1) rotate(0deg)'; }, 200);

// 【音声再生の仕掛け】
// 将来、GitHubに「lunch.mp3」や「sleep.mp3」という名前であなたの録音した声をアップすれ
// 下の2行の先頭の「//」を消すだけで、時間ぴったりに本物のナギちゃんの声が鳴り響きま
// let alarmAudio = new Audio(audioFile);
// alarmAudio.play().catch(e => console.log("音声ファイルの再生待機中"));
}

// 手動でアラームモードをテスト確認するボタン用関数
function modeAlarm() {
clearBtnStyles();
document.getElementById('btn-alarm').classList.add('active-mode');
// テストとして、お昼のアラームを今すぐ強発動させて画面を確認します
triggerNagiAlarm("┠( ── )┨", alarmDialogues.lunch,'lunch.mp3');
}

// その他のモード（ダミー処理。エラーを出さないために残してあります）

function modeMap() {
clearBtnStyles();
document.getElementById('btn-map').classList.add('active-mode');
modeLabel.innerText = "ナビゲーションモード";avatar.innerText = "( ~-~)";
speech.innerText = "「…マップ案内は現在アラーム回路のテストのためスタンドバイ状態です」";
}

function modeDanger() {
    clearBtnStyles();
    document.getElementById('btn-danger').classList.add('active-mode');
    modeLabel.innerText = "周辺危険予知モード";
    avatar.innerText = "( ◯-◯ )";
    speech.innerText = "「…危険予知センサーは現在アラーム回路のテストのためスタンドバイ状態です」";
}

function clearBtnStyles() {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active-mode'));
}

// 1秒（1000ミリ秒）ごとに時計を監視し続ける命令を起動
setInterval(checkTime, 1000);
