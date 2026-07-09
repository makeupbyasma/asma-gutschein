import { createQRCode } from "./qr.js";

// =======================================
// PDF GUTSCHEIN
// Make-up Artist by Asma
// =======================================

export async function createVoucherPDF(data) {

const logo = new Image();

logo.src = "images logo.jpeg";

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

await new Promise(resolve => {

    logo.onload = resolve;

});

pdf.addImage(

    logo,

    "jpeg",

    78,

    10,

    55,

    30

);

    // Titel

    pdf.setTextColor(214,133,168);
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(24);

    pdf.text("MAKE-UP ARTIST",105,50,{
        align:"center"
    });

    pdf.setFontSize(16);

    pdf.text("by Asma",105,60,{
        align:"center"
    });

    // Überschrift

    pdf.setFontSize(28);

    pdf.setTextColor(60,60,60);

    pdf.text("GESCHENKGUTSCHEIN",105,85,{
        align:"center"
    });

    pdf.setDrawColor(214,133,168);

    pdf.line(40,92,170,92);

    // Empfänger

    pdf.setFontSize(16);

    pdf.text("Für:",25,115);

    pdf.setFont("helvetica","bold");

    pdf.setFontSize(26);

    pdf.setTextColor(214,133,168);

    pdf.text(data.receiver,60,115);

pdf.setFont("helvetica","normal");

pdf.setFontSize(15);

pdf.setTextColor(40,40,40);

pdf.text("Ausgestellt:",25,128);

pdf.text(data.purchaseDate,75,128);

pdf.text("Gültig bis:",25,138);

pdf.setFont("helvetica","bold");

pdf.setTextColor(214,133,168);

pdf.text(data.validUntil,75,138);

    // Betrag

    pdf.setFontSize(16);

    pdf.setTextColor(40,40,40);

    pdf.text("Gutscheinwert:",25,150);

    pdf.setFontSize(22);

    pdf.setFont("helvetica","bold");

    pdf.text(data.amount+" €",115,150);

    // Leistung

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(16);

    pdf.text("Leistung:",25,170);

    pdf.setFont("helvetica","bold");

    pdf.text(data.service,70,170);

    // Code

    pdf.setFillColor(250,235,242);

    pdf.roundedRect(25,190,190,28,4,4,"F");

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

        pdf.text("Persönliche Nachricht:",25,235);

        pdf.setFont("helvetica","italic");

        pdf.text(data.message,25,248);

    }

    // Footer

pdf.setFontSize(10);

pdf.setTextColor(90,90,90);

pdf.text(
"Make-up Artist by Asma",
105,
270,
{
align:"center"
}
);

pdf.text(
"E-Mail: ahidar.asma@gmx.de",
105,
276,
{
align:"center"
}
);

pdf.text(
"Instagram: @makeupartistbyasma",
105,
282,
{
align:"center"
}
);

    pdf.setFont("helvetica","normal");

    pdf.setFontSize(11);

    pdf.setTextColor(150,150,150);

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
    235,
    40,
    40
);

pdf.setFontSize(10);



pdf.text(

pdf.setFont("helvetica","normal");

pdf.setFontSize(11);

pdf.setTextColor(70,70,70);

pdf.text(
"Dieser Gutschein hat einen Wert von "
+ data.amount +
" € und kann für alle angebotenen Leistungen eingelöst werden.",
25,
198,
{
maxWidth:110
}
);

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