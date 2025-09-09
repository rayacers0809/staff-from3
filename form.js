document.getElementById("applyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  let data = {};
  form.forEach((v, k) => data[k] = v);

  const res = await fetch("/api/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("✅ 지원서가 제출되었습니다!");
    e.target.reset();
  } else {
    alert("❌ 제출 실패. 관리자에게 문의하세요.");
  }
});
