// Bu loyihaning o'z Apps Script endpointi. Umumiy relay emas — shuning uchun
// loyihani `project` kaliti emas, `sheetName` (jadvaldagi varaq nomi) ajratadi.
// O'lchangan: `sheetName` yuborilmasa MISSING_SHEET qaytadi.
const RELAY_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyH-OEl8EAXwnyQIih1R5KrjzaNn5YkntDpYghFtnpkdueoK5e3rlV-2MIkLKM2WU5v/exec";
const SHEET_NAME = "Lead";

// Sana ustunining sarlavhasi — TO'G'RI TIRNOQ (U+0027) bilan. O'lchangan:
// "o’tgan" (U+2019) variantlari INVALID_FIELDS qaytaradi.
const DATE_FIELD = "Royhatdan o'tgan vaqti";

function toshkentVaqti(ms) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const g = (t) => parts.find((p) => p.type === t).value;
  return `${g("year")}-${g("month")}-${g("day")} - ${g("hour")}:${g("minute")}:${g("second")}`;
}

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    return;
  }

  try {
    const formDataObj = JSON.parse(formDataRaw);

    const formData = new FormData();
    formData.append("sheetName", SHEET_NAME);
    formData.append("Telefon raqam", formDataObj.TelefonRaqam || "");
    formData.append(
      DATE_FIELD,
      toshkentVaqti(Number(formDataObj.YuborilganVaqt) || Date.now())
    );

    const response = await fetch(RELAY_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("HTTP " + response.status);

    const result = await response.json();
    if (!result.ok) throw new Error(result.code + ": " + result.message);

    localStorage.removeItem("formData");
  } catch (error) {
    console.error("Lead yuborilmadi:", error);
    const errorEl = document.getElementById("errorMessage");
    if (errorEl) errorEl.style.display = "block";
  }
}

window.onload = sendFormData;
