export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  const fields = Object.keys(data).map((key) => ({
    name: key,
    value: data[key] || "미입력",
    inline: false
  }));

  const payload = {
    content: "📌 **새로운 DOGE 스태프 지원서 도착!**",
    embeds: [
      {
        title: "🐾 DOGE 스태프 지원서",
        color: 0x8e2de2,
        fields,
        footer: { text: "DOGE 서버 지원 시스템" },
        timestamp: new Date()
      }
    ]
  };

  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 🔎 Discord 응답 상태/본문 로깅
    console.log("📡 Discord response status:", response.status);
    const text = await response.text();
    console.log("📡 Discord response body:", text);

    if (!response.ok) {
      return res.status(500).json({
        error: "Webhook 전송 실패",
        status: response.status,
        body: text
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Error sending webhook:", err);
    res.status(500).json({ error: "Webhook 전송 실패", details: err.message });
  }
}
