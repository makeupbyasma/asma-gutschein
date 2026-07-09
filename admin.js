import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
const tbody = document.querySelector("tbody");

async function loadVouchers(){

    tbody.innerHTML = "";

    const snapshot = await getDocs(collection(db,"gutscheine"));

    snapshot.forEach((voucher)=>{

        const data = voucher.data();

        tbody.innerHTML += `

<tr>

<td>${data.code}</td>

<td>${data.customer}</td>

<td>${data.receiver}</td>

<td>${data.amount} €</td>

<td>${data.status}</td>

<td>

<button onclick="redeemVoucher('${voucher.id}')">

Einlösen

</button>

</td>

</tr>

`;

    });

}
loadVouchers();
window.redeemVoucher = async function(id){

    await updateDoc(
        doc(db,"gutscheine",id),
        {
            status:"Eingelöst"
        }
    );

    alert("Gutschein wurde eingelöst.");

    loadVouchers();

}