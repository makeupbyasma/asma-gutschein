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

    // ----------------------------
    // Hintergrund
    // ----------------------------

    pdf.setFillColor(255,248,251);

    pdf.rect(

        0,
        0,
        210,
        297,
        "F"

    );

    // ----------------------------
    // Rahmen
    // ----------------------------

    pdf.setDrawColor(

        214,
        133,
        168

    );

    pdf.setLineWidth(1.5);

    pdf.roundedRect(

        8,
        8,
        194,
        281,
        5,
        5

    );

    // ----------------------------
    // Logo
    // ----------------------------

    pdf.addImage(

        logo,

        "JPEG",

        62,

        12,

        85,

        42

    );

    // ----------------------------
    // Titel
    // ----------------------------

    pdf.setFont(

        "helvetica",

        "bold"

    );

    pdf.setFontSize(28);

    pdf.setTextColor(

        214,
        133,
        168

    );

    pdf.text(

        "GESCHENKGUTSCHEIN",

        105,

        68,

        {

            align:"center"

        }

    );

    pdf.setDrawColor(

        214,
        133,
        168

    );

    pdf.line(

        45,

        75,

        165,

        75

    );

    // ----------------------------
    // Empfänger
    // ----------------------------

    pdf.setFont(

        "helvetica",

        "normal"

    );

    pdf.setFontSize(15);

    pdf.setTextColor(

        70,

        70,

        70

    );

    pdf.text(

        "Dieser Gutschein ist ausgestellt für",

        105,

        90,

        {

            align:"center"

        }

    );

    pdf.setFont(

        "helvetica",

        "bold"

    );

    pdf.setFontSize(27);

    pdf.setTextColor(

        214,

        133,

        168

    );

    pdf.text(

        data.receiver,

        105,

        104,

        {

            align:"center"

        }

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

        28,

        120

    );

    pdf.text(

        purchaseDate,

        75,

        120

    );

    pdf.text(

        "Gültig bis:",

        28,

        130

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

        75,

        130

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

        118,

        130

    );

    // ----------------------------
    // Gutscheinwert
    // ----------------------------

    pdf.setFillColor(

        250,

        235,

        242

    );

    pdf.roundedRect(

        25,

        145,

        160,

        36,

        4,

        4,

        "F"

    );

    pdf.setFont(

        "helvetica",

        "bold"

    );

    pdf.setFontSize(15);

    pdf.setTextColor(

        90,

        90,

        90

    );

    pdf.text(

        "GUTSCHEINWERT",

        105,

        157,

        {

            align:"center"

        }

    );

    pdf.setFontSize(30);

    pdf.setTextColor(

        214,

        133,

        168

    );

    pdf.text(

        data.amount + " €",

        105,

        172,

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
        25,
        196
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(15);

    pdf.text(
        data.service,
        70,
        196
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

    // ----------------------------
    // Persönliche Nachricht
    // ----------------------------

    if(
        data.message &&
        data.message.trim() !== ""
    ){

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(14);

        pdf.setTextColor(
            60,
            60,
            60
        );

        pdf.text(
            "Persönliche Nachricht",
            25,
            248
        );

        pdf.setFont(
            "helvetica",
            "italic"
        );

        pdf.setFontSize(12);

        pdf.text(
            data.message,
            25,
            257,
            {
                maxWidth:95
            }
        );

    }

    // ----------------------------
    // QR-Code
    // ----------------------------

    const qrImage =
        await createQRCode(data.code);

    pdf.setDrawColor(
        214,
        133,
        168
    );

    pdf.roundedRect(
        138,
        240,
        48,
        48,
        4,
        4
    );

    pdf.addImage(
        qrImage,
        "PNG",
        144,
        246,
        36,
        36
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
        120,
        120,
        120
    );

    pdf.text(
        "QR-Code zur",
        162,
        284,
        {
            align:"center"
        }
    );

    pdf.text(
        "Prüfung",
        162,
        288,
        {
            align:"center"
        }
    );

    // >>> TEIL 2 ENDE <<<
    // ----------------------------
    // Rechtlicher Hinweis
    // ----------------------------

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
        70,
        70,
        70
    );

    pdf.text(

        "Dieser Gutschein besitzt einen Wert von " +
        data.amount +
        " € und kann für alle angebotenen Leistungen eingelöst werden.",

        25,

        275,

        {
            maxWidth:100
        }

    );

    pdf.text(

        "Der Gutschein ist ab Ausstellungsdatum 12 Monate gültig.",

        25,

        282

    );

    // ----------------------------
    // Trennlinie
    // ----------------------------

    pdf.setDrawColor(
        214,
        133,
        168
    );

    pdf.line(
        20,
        286,
        190,
        286
    );

    // ----------------------------
    // Footer
    // ----------------------------

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(11);

    pdf.setTextColor(
        214,
        133,
        168
    );

    pdf.text(

        "Make-up Artist by Asma",

        105,

        291,

        {
            align:"center"
        }

    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
        90,
        90,
        90
    );

    pdf.text(

        "E-Mail: ahidar.asma@gmx.de",

        105,

        295,

        {
            align:"center"
        }

    );

    // >>> TEIL 3 ENDE <<<
    pdf.text(

        "Instagram: @makeupartistbyasma",

        105,

        299,

        {
            align:"center"
        }

    );

    // ----------------------------
    // PDF speichern
    // ----------------------------

    pdf.save(

        "Gutschein-" + data.code + ".pdf"

    );

}