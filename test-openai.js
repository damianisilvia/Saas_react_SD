async function main() {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer Ab8RN6Ku-iMcgiosoo8C2uwRE66YRADJ8v_tHHcaLaxXsbom1Q"
    },
    body: JSON.stringify({
      model: "gemini-1.5-flash",
      messages: [{ role: "user", content: "hello" }]
    })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}
main();
