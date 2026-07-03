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

    // Hintergrund

    pdf.setFillColor(255,248,251);
    pdf.rect(0,0,210,297,"F");

    // Rahmen

    pdf.setDrawColor(214,133,168);
    pdf.setLineWidth(1.5);
    pdf.roundedRect(10,10,190,277,4,4);

    // Titel

    pdf.setTextColor(214,133,168);
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(24);

    pdf.text("MAKE-UP ARTIST",105,30,{
        align:"center"
    });

    pdf.setFontSize(16);

    pdf.text("by Asma",105,40,{
        align:"center"
    });

    // Überschrift

    pdf.setFontSize(28);

    pdf.setTextColor(60,60,60);

    pdf.text("GESCHENKGUTSCHEIN",105,65,{
        align:"center"
    });

    pdf.setDrawColor(214,133,168);

    pdf.line(40,72,170,72);

    // Empfänger

    pdf.setFontSize(16);

    pdf.text("Für:",25,95);

    pdf.setFont("helvetica","bold");

    pdf.setFontSize(26);

    pdf.setTextColor(214,133,168);

    pdf.text(data.receiver,60,95);

    // Betrag

    pdf.setFontSize(16);

    pdf.setTextColor(40,40,40);

    pdf.text("Gutscheinwert:",25,120);

    pdf.setFontSize(22);

    pdf.setFont("helvetica","bold");

    pdf.text(data.amount+" €",95,120);

    // Leistung

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(16);

    pdf.text("Leistung:",25,140);

    pdf.setFont("helvetica","bold");

    pdf.text(data.service,70,140);

    // Code

    pdf.setFillColor(250,235,242);

    pdf.roundedRect(25,160,160,28,4,4,"F");

    pdf.setFontSize(13);

    pdf.setTextColor(80,80,80);

    pdf.text("Gutscheincode",105,170,{
        align:"center"
    });

    pdf.setFontSize(20);

    pdf.setTextColor(214,133,168);

    pdf.text(data.code,105,181,{
        align:"center"
    });

    // Nachricht

    if(data.message){

        pdf.setFontSize(15);

        pdf.setTextColor(60,60,60);

        pdf.text("Persönliche Nachricht:",25,205);

        pdf.setFont("helvetica","italic");

        pdf.text(data.message,25,218);

    }

    // Footer

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(11);

    pdf.setTextColor(120,120,120);

    pdf.text(
        "Dieser Gutschein wurde automatisch erstellt.",
        105,
        270,
        {
            align:"center"
        }
    );

    pdf.text(
        "Make-up Artist by Asma",
        105,
        277,
        {
            align:"center"
        }
    );
const qrImage = await createQRCode(data.code);

pdf.addImage(
    qrImage,
    "PNG",
    145,
    205,
    40,
    40
);

pdf.setFontSize(10);

pdf.text(
    "QR-Code prüfen",
    165,
    250,
    {
        align:"center"
    }
);

    pdf.save(

        "Gutschein-"+data.code+".pdf"

    );

}