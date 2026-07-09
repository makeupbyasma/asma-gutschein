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

    pdf.setFillColor(255,248,251);
    pdf.rect(0,0,210,297,"F");

    // Außenrahmen

    pdf.setDrawColor(214,133,168);
    pdf.setLineWidth(1.4);
    pdf.roundedRect(
        8,
        8,
        194,
        281,
        4,
        4
    );

    // -------------------------
    // Logo
    // -------------------------

    pdf.addImage(
        logo,
        "JPEG",
        80,
        12,
        50,
        28
    );

    // -------------------------
    // Überschrift
    // -------------------------

    pdf.setTextColor(214,133,168);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(23);

    pdf.text(
        "MAKE-UP ARTIST",
        105,
        50,
        {
            align:"center"
        }
    );

    pdf.setFontSize(16);

    pdf.text(
        "by Asma",
        105,
        59,
        {
            align:"center"
        }
    );

    pdf.setDrawColor(214,133,168);

    pdf.line(
        45,
        66,
        165,
        66
    );

    pdf.setTextColor(55,55,55);

    pdf.setFontSize(26);

    pdf.text(
        "GESCHENKGUTSCHEIN",
        105,
        80,
        {
            align:"center"
        }
    );

    // -------------------------
    // Empfänger
    // -------------------------

    pdf.setFontSize(15);

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        "Für:",
        25,
        102
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setTextColor(214,133,168);

    pdf.setFontSize(25);

    pdf.text(
        data.receiver,
        55,
        102
    );

    // -------------------------
    // Datum
    // -------------------------

    pdf.setTextColor(60,60,60);

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(13);

    pdf.text(
        "Ausgestellt:",
        25,
        118
    );

    pdf.text(
        purchaseDate,
        70,
        118
    );

    pdf.text(
        "Gültig bis:",
        25,
        128
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setTextColor(214,133,168);

    pdf.text(
        validUntil,
        70,
        128
    );

    // -------------------------
    // Gutscheinwert
    // -------------------------

    pdf.setDrawColor(214,133,168);

    pdf.roundedRect(
        22,
        140,
        166,
        25,
        3,
        3
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(14);

    pdf.setTextColor(70,70,70);

    pdf.text(
        "Gutscheinwert",
        30,
        151
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(24);

    pdf.setTextColor(214,133,168);

    pdf.text(
        data.amount + " €",
        135,
        152
    );

    // -------------------------
    // Leistung
    // -------------------------

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(14);

    pdf.setTextColor(60,60,60);

    pdf.text(
        "Leistung:",
        25,
        180
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(
        data.service,
        70,
        180
    );

    // -------------------------
    // Gutscheincode
    // -------------------------

    pdf.setFillColor(250,235,242);

    pdf.roundedRect(
        22,
        190,
        166,
        32,
        4,
        4,
        "F"
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(13);

    pdf.setTextColor(90,90,90);

    pdf.text(
        "Gutscheincode",
        105,
        202,
        {
            align:"center"
        }
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(20);

    pdf.setTextColor(214,133,168);

    pdf.text(
        data.code,
        105,
        214,
        {
            align:"center"
        }
    );

    // >>> HIER ENDET TEIL 1 <<<
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
            235
        );

        pdf.setFont("helvetica","italic");
        pdf.setFontSize(12);

        pdf.text(
            data.message,
            25,
            244,
            {
                maxWidth:110
            }
        );

    }

    // -------------------------
    // QR-Code
    // -------------------------

    const qrImage = await createQRCode(data.code);

    pdf.addImage(
        qrImage,
        "PNG",
        145,
        228,
        42,
        42
    );

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(10);
    pdf.setTextColor(120,120,120);

    pdf.text(
        "QR-Code prüfen",
        166,
        275,
        {
            align:"center"
        }
    );

    // -------------------------
    // Hinweis
    // -------------------------

    pdf.setFont("helvetica","normal");
    pdf.setFontSize(10);
    pdf.setTextColor(70,70,70);

    pdf.text(
        "Dieser Gutschein hat einen Wert von " +
        data.amount +
        " € und kann für alle angebotenen Leistungen eingelöst werden.",
        25,
        262,
        {
            maxWidth:110
        }
    );

    // -------------------------
    // Kontakt
    // -------------------------

    pdf.setDrawColor(214,133,168);

    pdf.line(
        20,
        282,
        190,
        282
    );

    pdf.setFontSize(10);

    pdf.setTextColor(90,90,90);

    pdf.text(
        "Make-up Artist by Asma",
        105,
        279,
        {
            align:"center"
        }
    );

    pdf.text(
        "E-Mail: ahidar.asma@gmx.de",
        105,
        284,
        {
            align:"center"
        }
    );

    pdf.text(
        "Instagram: @makeupartistbyasma",
        105,
        289,
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

}