import { createQRCode } from "./qr.js";

// =======================================
// PDF GUTSCHEIN
// Make-up Artist by Asma
// =======================================

export async function createVoucherPDF(data){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({

        orientation:"portrait",
        unit:"mm",
        format:"a4"

    });

    // ----------------------------
    // Logo laden
    // ----------------------------

    const logo = new Image();

    logo.src = "images logo.jpeg";

    await new Promise(resolve=>{

        logo.onload = resolve;

    });

    // ----------------------------
    // Datum
    // ----------------------------

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

    // Eleganter Creme Hintergrund

pdf.setFillColor(252,248,243);
pdf.rect(
    0,
    0,
    210,
    297,
    "F"
);

// Dünner eleganter Rahmen

pdf.setDrawColor(220,195,170);
pdf.setLineWidth(0.7);

//pdf.roundedRect(
   // 12,
   // 12,
   // 186,
    //260,
    //3,
   // 3
//);
    // Logo oben mittig

pdf.addImage(
    logo,
    "JPEG",
    58,
    18,
    95,
    42
);

// Elegante Überschrift

pdf.setFont(
    "times",
    "bold"
);

pdf.setFontSize(30);

pdf.setTextColor(
    155,
    120,
    95
);

pdf.text(
    "GESCHENKGUTSCHEIN",
    105,
    80,
    {
        align:"center"
    }
);

pdf.setFont(
    "times",
    "italic"
);

pdf.setFontSize(15);

pdf.setTextColor(
    140,
    140,
    140
);

pdf.text(
    "Make-up Artist by Asma",
    105,
    89,
    {
        align:"center"
    }
);

pdf.setDrawColor(
    220,
    195,
    170
);

pdf.line(
    55,
    95,
    155,
    95
);
    // ======================================
// Empfänger
// ======================================

pdf.setFont(
    "times",
    "italic"
);

pdf.setFontSize(16);

pdf.setTextColor(
    120,
    120,
    120
);

pdf.text(
    "Dieser Gutschein ist ausgestellt für",
    105,
    112,
    {
        align:"center"
    }
);

pdf.setFont(
    "times",
    "bold"
);

pdf.setFontSize(32);

pdf.setTextColor(
    170,
    135,
    110
);

pdf.text(
    data.receiver,
    105,
    126,
    {
        align:"center"
    }
);

// feine Linie

pdf.setDrawColor(
    225,
    205,
    185
);

pdf.line(
    65,
    132,
    145,
    132
);
    // ----------------------------
    // Ausstellungsdatum
    // ----------------------------

    pdf.setFont(

        "helvetica",

        "normal"

    );

    pdf.setFontSize(13);

    pdf.setTextColor(

        60,

        60,

        60

    );

    pdf.text(

        "Ausstellungsdatum:",

        35,

        142

    );

    pdf.text(

        purchaseDate,

        83,

        142

    );

    pdf.text(

        "Gültig bis:",

        35,

        150

    );

    pdf.setFont(

        "helvetica",

        "bold"

    );

    pdf.setTextColor(

        214,

        133,

        168

    );

    pdf.text(

        validUntil,

        83,

        150

    );

    pdf.setFont(

        "helvetica",

        "normal"

    );

    pdf.setTextColor(

        90,

        90,

        90

    );

    pdf.text(

        "(12 Monate gültig)",

        122,

        150

    );

// ======================================
// Gutscheinwert
// ======================================

pdf.setDrawColor(
    215,
    195,
    170
);

pdf.setFillColor(
    255,
    255,
    255
);

pdf.roundedRect(
    28,
    160,
    154,
    48,
    3,
    3,
    "FD"
);

pdf.setFont(
    "times",
    "italic"
);

pdf.setFontSize(15);

pdf.setTextColor(
    150,
    150,
    150
);

pdf.text(
    "Gutscheinwert",
    105,
    175,
    {
        align:"center"
    }
);

pdf.setFont(
    "times",
    "bold"
);

pdf.setFontSize(38);

pdf.setTextColor(
    180,
    140,
    105
);

pdf.text(
    data.amount + " €",
    105,
    193,
    {
        align:"center"
    }
);
    // >>> TEIL 1 ENDE <<<
    // ----------------------------
    // Leistung
    // ----------------------------

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(15);

    pdf.setTextColor(
        60,
        60,
        60
    );

    pdf.text(
        "Leistung",
        45,
        204
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(15);

    pdf.text(
        data.service,
        88,
        204
    );

    // ----------------------------
    // Gutscheincode
    // ----------------------------

    pdf.setFillColor(
        250,
        235,
        242
    );

    pdf.roundedRect(
        25,
        206,
        160,
        30,
        4,
        4,
        "F"
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(12);

    pdf.setTextColor(
        100,
        100,
        100
    );

    pdf.text(
        "Gutscheincode",
        105,
        217,
        {
            align:"center"
        }
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(21);

    pdf.setTextColor(
        214,
        133,
        168
    );

    pdf.text(
        data.code,
        105,
        229,
        {
            align:"center"
        }
    );
// >>> TEIL 2 ENDE <<<
 // ----------------------------
// Nachricht
// ----------------------------

pdf.setFont("helvetica","bold");
pdf.setFontSize(13);
pdf.setTextColor(70,70,70);

pdf.text(
    "Persönliche Nachricht",
    25,
    244
);

pdf.setFont("helvetica","italic");
pdf.setFontSize(11);

pdf.text(
    data.message || "Alles Gute!",
    25,
    251,
    {
        maxWidth:90
    }
);

// ----------------------------
// QR-Code
// ----------------------------

const qrImage = await createQRCode(data.code);

pdf.setDrawColor(214,133,168);
pdf.setFillColor(255,255,255);

pdf.roundedRect(
    140,
    225,
    45,
    45,
    3,
    3,
    "FD"
);

pdf.addImage(
    qrImage,
    "PNG",
    145,
    230,
    35,
    35
);
// ----------------------------
// Hinweis
// ----------------------------

pdf.setFont("helvetica","normal");

pdf.setFontSize(10);

pdf.text(
    "• Gutscheinwert: " + data.amount + " €",
    25,
    260
);

pdf.text(
    "• Einlösbar für alle angebotenen Leistungen",
    25,
    266
);

pdf.text(
    "• Gültigkeit: 12 Monate ab Kaufdatum",
    25,
    272
);

    // ----------------------------
    // PDF speichern
    // ----------------------------

    pdf.save(

        "Gutschein-" + data.code + ".pdf"

    );

}
