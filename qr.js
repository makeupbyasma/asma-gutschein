export async function createQRCode(code){

    return new Promise((resolve)=>{

        const temp = document.createElement("div");

        new QRCode(temp,{
            text:
                window.location.origin +
                window.location.pathname.replace("index.html","") +
                "check.html?code=" +
                code,
            width:200,
            height:200
        });

        setTimeout(()=>{

            const img = temp.querySelector("img");

            resolve(img.src);

        },500);

    });

}