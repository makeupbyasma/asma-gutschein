import { db } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const result = document.getElementById("result");

const params = new URLSearchParams(window.location.search);

const code = params.get("code");

const q = query(
    collection(db,"gutscheine"),
    where("code","==",code)
);

const snapshot = await getDocs(q);

if(snapshot.empty){

    result.innerHTML = "❌ Gutschein existiert nicht.";

}

else{

    const data = snapshot.docs[0].data();

    if(data.status==="Offen"){

        result.innerHTML = "✅ Gutschein ist gültig.";

    }

    else{

        result.innerHTML = "❌ Gutschein wurde bereits eingelöst.";

    }

}