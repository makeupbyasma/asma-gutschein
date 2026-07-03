export async function createQRCode(code){

    return new Promise((resolve)=>{

        const div=document.createElement("div");

        new QRCode(div,{

            text:
            "https://lovelasting740-png.github.io/asma-gutschein/check.html?code="+code,

            width:220,

            height:220

        });

        setTimeout(()=>{

            const img=div.querySelector("img");

            resolve(img.src);

        },500);

    });

}