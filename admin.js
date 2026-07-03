import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const tbody = document.querySelector("tbody");

async function loadVouchers(){

    const snapshot = await getDocs(collection(db,"gutscheine"));

    snapshot.forEach(doc=>{

        const data = doc.data();

        tbody.innerHTML += `

<tr>

<td>${data.code}</td>

<td>${data.customer}</td>

<td>${data.receiver}</td>

<td>${data.amount} €</td>

<td>${data.status}</td>

<td>

<button>

Einlösen

</button>

</td>

</tr>

`;

    });

}

loadVouchers();