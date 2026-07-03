import { db } from "./firebase.js";

import {

collection,

query,

where,

getDocs

} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const params=new URLSearchParams(location.search);

const code=params.get("code");

const q=query(

collection(db,"gutscheine"),

where("code","==",code)

);

const docs=await getDocs(q);

const result=document.getElementById("result");

if(docs.empty){

result.innerHTML="<h2>❌ Gutschein nicht gefunden</h2>";

}else{

const data=docs.docs[0].data();

result.innerHTML=`

<h2>✅ Gutschein gültig</h2>

<p><b>Code:</b> ${data.code}</p>

<p><b>Empfänger:</b> ${data.receiver}</p>

<p><b>Betrag:</b> ${data.amount} €</p>

<p><b>Status:</b> ${data.status}</p>

`;

}