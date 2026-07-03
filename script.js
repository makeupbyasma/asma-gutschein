// ===============================
// Gutschein Code
// ===============================

function generateVoucherCode(){

    const random = Math.floor(
        100000 + Math.random()*900000
    );

    return "ASMA-" + random;

}

const voucherCode = generateVoucherCode();

const previewCode = document.getElementById("previewCode");

if(previewCode){

    previewCode.innerHTML = voucherCode;

}



// ===============================
// Versandart
// ===============================

function toggleAddress(){

    const delivery =
    document.getElementById("delivery").value;

    const address =
    document.getElementById("addressBox");

    if(delivery==="Post"){

        address.style.display="block";

    }

    else{

        address.style.display="none";

    }

}
// ===============================
// Live Vorschau
// ===============================

const customer =
document.getElementById("customerName");

const receiver =
document.getElementById("receiverName");

const amount =
document.getElementById("amount");

const service =
document.getElementById("service");

function updatePreview(){

    document.getElementById("previewName").innerHTML =
    receiver.value || "Empfänger";

    document.getElementById("previewAmount").innerHTML =
    amount.value + " €";

    document.getElementById("previewService").innerHTML =
    service.value;

}

receiver.addEventListener("input",updatePreview);

amount.addEventListener("change",updatePreview);

service.addEventListener("change",updatePreview);

updatePreview();
// ===============================
// Formular prüfen
// ===============================

function validateForm(){

    const customer =
    document.getElementById("customerName").value.trim();

    const receiver =
    document.getElementById("receiverName").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const amount =
    document.getElementById("amount").value;

    const service =
    document.getElementById("service").value;

    if(customer===""){

        alert("Bitte deinen Namen eingeben.");
        return false;

    }

    if(receiver===""){

        alert("Bitte den Empfänger eingeben.");
        return false;

    }

    if(email===""){

        alert("Bitte eine E-Mail eingeben.");
        return false;

    }

    if(phone===""){

        alert("Bitte eine Telefonnummer eingeben.");
        return false;

    }

    return {



        code:voucherCode,

        customer:customer,

        receiver:receiver,

        email:email,

        phone:phone,

        amount:amount,

        service:service,

message:
document.getElementById("message").value,

        delivery:
        document.getElementById("delivery").value

    };

}
// ===============================
// Bestellung
// ===============================

async function orderVoucher(){
    const data = validateForm();

    if(!data){

        return;

    }

    const button =
    document.getElementById("buyButton");

    button.disabled=true;

    button.innerHTML="⏳ Bestellung wird verarbeitet...";

    try{

    const success = await saveVoucher(data);

    if(!success){
        throw new Error("Speichern fehlgeschlagen");
    }

    await createVoucherPDF(data);

    await sendEmail(data);

    await sendCustomerEmail(data);

    alert("Vielen Dank! Zahlung erfolgreich.");

}
catch(error){

    console.error(error);

    alert("Fehler.");

}
    catch(error){

        alert("Fehler beim Senden.");

        button.disabled=false;

        button.innerHTML="Jetzt Gutschein kaufen";

    }

}
// ===============================
// Button verbinden
// ===============================

// ===============================
// Firebase speichern
// ===============================

import {
    db
} from "./firebase.js";

import {
    createVoucherPDF
} from "./pdf.js";

import {

    collection,

    addDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

async function saveVoucher(data){

    try{

        await addDoc(

            collection(db,"gutscheine"),

            {

                code:data.code,

                customer:data.customer,

                receiver:data.receiver,

                email:data.email,

                phone:data.phone,

                amount:data.amount,

                service:data.service,

                delivery:data.delivery,

                status:"Offen",

                created:serverTimestamp()

            }

        );

        console.log("Gespeichert");

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}
// =======================================
// EmailJS
// =======================================

async function sendEmail(data){

    try{

        await emailjs.send(

            "service_8g11l57",

            "template_drxcxtk",

            {

                code:data.code,

                customer:data.customer,

                receiver:data.receiver,

                email:data.email,

                phone:data.phone,

                amount:data.amount,

                service:data.service,

                delivery:data.delivery

            }

        );

        console.log("E-Mail erfolgreich gesendet");

        return true;

    }

    catch(error){

        console.log(error);

        return false;

    }

}
async function sendCustomerEmail(data){

    try{

        await emailjs.send(

            "service_8g11l57",

            "template_eqvapix",

            {

                receiver:data.receiver,

                email:data.email,

                code:data.code,

                amount:data.amount,

                service:data.service,

                delivery:data.delivery

            }

        );

        console.log("Kunden-E-Mail gesendet");

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

// =======================================
// PDF Gutschein erstellen
// =======================================





paypal.Buttons({

createOrder:function(data,actions){

return actions.order.create({

purchase_units:[{

amount:{

value:document.getElementById("amount").value

}

}]

});

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

alert(

"Danke " +

details.payer.name.given_name +

"! Zahlung erfolgreich."

);

orderVoucher();

});

}

}).render("#paypal-button-container");