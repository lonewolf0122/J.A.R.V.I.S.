// J.A.R.V.I.S. Brain
// AIコア交換用モジュール

window.JarvisBrain = {
  async respond(userText) {
    const text = userText.trim();

    if (!text) {
      return "ご用件をどうぞ、マスター。";
    }

    return `了解しました、マスター。「${text}」を受信しました。`;
  }
};
