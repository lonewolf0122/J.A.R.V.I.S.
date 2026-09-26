// J.A.R.V.I.S. 0.1
// AI本体はここではなく、将来 BrainAdapter に接続します。

const $ = (id) => document.getElementById(id);

function updateClock() {
  $("clock").textContent = new Date().toLocaleTimeString("ja-JP", {hour12:false});
}
setInterval(updateClock, 1000);
updateClock();

function addMessage(text, who) {
  const el = document.createElement("div");
  el.className = `bubble ${who === "user" ? "user" : "jarvis-msg"}`;
  el.textContent = text;
  $("messages").appendChild(el);
  $("messages").scrollTop = $("messages").scrollHeight;
}

function addTranscript(text) {
  const empty = $("transcript").querySelector(".empty");
  if (empty) empty.remove();
  const line = document.createElement("div");
  line.className = "transcript-line";
  line.innerHTML = '<div class="speaker">J.A.R.V.I.S.</div>';
  const body = document.createElement("div");
  body.textContent = text;
  line.appendChild(body);
  $("transcript").appendChild(line);
  $("transcript").scrollTop = $("transcript").scrollHeight;
}

// 将来ここだけをローカルAIなどに差し替える。
const BrainAdapter = {
  async respond(userText) {
    const text = userText.trim();
    if (!text) return "ご用件をどうぞ、マスター。";

    if (/こんにちは|こんばんは|おはよう/.test(text)) {
      return "ご挨拶ありがとうございます、マスター。システムは正常に稼働しています。";
    }
    if (/名前|誰/.test(text)) {
      return "私はJ.A.R.V.I.S.です。現在は初期コアとして動作しています。";
    }
    if (/時間|時刻/.test(text)) {
      return `現在時刻は${new Date().toLocaleTimeString("ja-JP")}です。`;
    }
    return `「${text}」を受信しました。現在はJ.A.R.V.I.S. 0.1のテスト応答です。`;
  }
};

async function sendMessage(text) {
  addMessage(text, "user");
  $("chatInput").value = "";
  $("responseText").textContent = "処理中です…";
  const reply = await BrainAdapter.respond(text);
  $("responseText").textContent = reply;
  addMessage(reply, "jarvis");
  addTranscript(reply);
}

$("chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await sendMessage($("chatInput").value);
});
