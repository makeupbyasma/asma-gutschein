import { createQRCode } from "./qr.js";

// =======================================
// PDF GUTSCHEIN
// Make-up Artist by Asma
// =======================================

export async function createVoucherPDF(data) {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // -------------------------
    // Logo laden
    // -------------------------

    const logo = new Image();
    logo.src = "images logo.jpeg";

    await new Promise(resolve=>{
        logo.onload = resolve;
    });

    // -------------------------
    // Datum
    // -------------------------

    const today = new Date();

    const purchaseDate =
data.purchaseDate ||
today.toLocaleDateString("de-DE");

    const validUntil =
data.validUntil ||
new Date(
today.getFullYear()+1,
today.getMonth(),
today.getDate()
).toLocaleDateString("de-DE");
    // -------------------------
// Hintergrund
// -------------------------

pdf.setFillColor(252,247,249);
pdf.rect(0,0,210,297,"F");

// Gold-Rahmen

pdf.setDrawColor(214,133,168);
pdf.setLineWidth(1.6);

pdf.roundedRect(
    10,
    10,
    190,
    277,
    5,
    5
);

// -------------------------
// Logo
// -------------------------

pdf.addImage(
    logo,
    "JPEG",
    60,
    12,
    90,
    48
);

// -------------------------
// Titel
// -------------------------

pdf.setFont("helvetica","bold");
pdf.setFontSize(26);
pdf.setTextColor(214,133,168);

pdf.text(
    "GESCHENKGUTSCHEIN",
    105,
    72,
    {
        align:"center"
    }
);

pdf.setDrawColor(214,133,168);

pdf.line(
    45,
    78,
    165,
    78
);

// -------------------------
// Empfänger
// -------------------------

pdf.setFontSize(16);

pdf.setTextColor(70,70,70);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.text(
    "Dieser Gutschein ist ausgestellt für",
    105,
    94,
    {
        align:"center"
    }
);

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(28);

pdf.setTextColor(214,133,168);

pdf.text(
    data.receiver,
    105,
    108,
    {
        align:"center"
    }
);

// -------------------------
// Datum
// -------------------------

pdf.setFontSize(12);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setTextColor(70,70,70);

pdf.text(
    "Ausstellungsdatum:",
    30,
    125
);

pdf.text(
    purchaseDate,
    75,
    125
);

pdf.text(
    "Gültig bis:",
    30,
    135
);

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setTextColor(214,133,168);

pdf.text(
    validUntil,
    75,
    135
);

pdf.setFont(
    "helvetica",
    "normal"
);

pdf.setTextColor(70,70,70);

pdf.text(
    "(12 Monate gültig)",
    120,
    135
);

// -------------------------
// Gutscheinwert
// -------------------------

pdf.setFillColor(255,240,246);

pdf.roundedRect(
    25,
    148,
    160,
    35,
    4,
    4,
    "F"
);

pdf.setFontSize(14);

pdf.setTextColor(90,90,90);

pdf.text(
    "GUTSCHEINWERT",
    105,
    160,
    {
        align:"center"
    }
);

pdf.setFont(
    "helvetica",
    "bold"
);

pdf.setFontSize(28);

pdf.setTextColor(214,133,168);

pdf.text(
    data.amount + " €",
    105,
    173,
    {
        align:"center"
    }
);

// -------------------------
// Leistung
// -------------------------

pdf.setFont("helvetica","bold");
pdf.setFontSize(15);
pdf.setTextColor(60,60,60);

pdf.text(
    "Leistung",
    25,
    198
);

pdf.setFont("helvetica","normal");
pdf.setFontSize(14);

pdf.text(
    data.service,
    70,
    198
);

// -------------------------
// Gutscheincode
// -------------------------

pdf.setFillColor(248,233,241);

pdf.roundedRect(
    25,
    208,
    160,
    28,
    4,
    4,
    "F"
);

pdf.setFont("helvetica","normal");
pdf.setFontSize(12);
pdf.setTextColor(100,100,100);

pdf.text(
    "Gutscheincode",
    105,
    218,
    {
        align:"center"
    }
);

pdf.setFont("helvetica","bold");
pdf.setFontSize(21);
pdf.setTextColor(214,133,168);

pdf.text(
    data.code,
    105,
    229,
    {
        align:"center"
    }
);

// -------------------------
// Persönliche Nachricht
// -------------------------

if(data.message && data.message.trim() !== ""){

    pdf.setFont("helvetica","bold");
    pdf.setFontSize(14);
    pdf.setTextColor(60,60,60);

    pdf.text(
        "Persönliche Nachricht",
        25,
        246
    );

    pdf.setFont("helvetica","italic");
    pdf.setFontSize(12);

    pdf.text(
        data.message,
        25,
        254,
        {
            maxWidth:95
        }
    );

}

// -------------------------
// QR-Code
// -------------------------

const qrImage = await createQRCode(data.code);

pdf.setDrawColor(214,133,168);

pdf.roundedRect(
    138,
    240,
    50,
    42,
    4,
    4
);

pdf.addImage(
    qrImage,
    "PNG",
    145,
    245,
    36,
    36
);

pdf.setFont("helvetica","normal");
pdf.setFontSize(9);
pdf.setTextColor(100,100,100);

pdf.text(
    "QR-Code zur",
    163,
    285,
    {
        align:"center"
    }
);

pdf.text(
    "Gutscheinprüfung",
    163,
    289,
    {
        align:"center"
    }
);

// -------------------------
// Rechtlicher Hinweis
// -------------------------

pdf.setFont("helvetica","normal");
pdf.setFontSize(10);
pdf.setTextColor(70,70,70);

pdf.text(
    "Dieser Gutschein besitzt einen Wert von " +
    data.amount +
    " € und kann für sämtliche angebotenen Leistungen eingelöst werden.",
    25,
    274,
    {
        maxWidth:100
    }
);


   // -------------------------
// Kontakt / Footer
// -------------------------

pdf.setDrawColor(214,133,168);

pdf.line(
    20,
    286,
    190,
    286
);

pdf.setFont("helvetica","bold");
pdf.setFontSize(11);
pdf.setTextColor(214,133,168);

pdf.text(
    "Make-up Artist by Asma",
    105,
    292,
    {
        align:"center"
    }
);

pdf.setFont("helvetica","normal");
pdf.setFontSize(9);
pdf.setTextColor(80,80,80);

pdf.text(
    "E-Mail: ahidar.asma@gmx.de",
    105,
    297,
    {
        align:"center"
    }
);

pdf.text(
    "Instagram: @makeupartistbyasma",
    105,
    301,
    {
        align:"center"
    }
);

pdf.text(
    "Dieser Gutschein ist ab Ausstellungsdatum 12 Monate gültig.",
    105,
    305,
    {
        align:"center"
    }
);

// -------------------------
// PDF speichern
// -------------------------

pdf.save(
    "Gutschein-" + data.code + ".pdf"
);