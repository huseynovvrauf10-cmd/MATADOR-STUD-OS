// Matador - Ana Yönetim Merkezi (Beyin)

// 1. Firebase Yapılandırması (Kendi bilgilerini buraya koy)
const firebaseConfig = {
    apiKey: "AIzaSyAWZoeIDyTy_3AAQZkojD9V...", 
    authDomain: "matador-b1ecc.firebaseapp.com",
    projectId: "matador-b1ecc",
    storageBucket: "matador-b1ecc.appspot.com",
    messagingSenderId: "1065363097675",
    appId: "1:1065363097675:web:4554d13f1...",
    measurementId: "G-KCLVT54MDQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 2. Form Aç/Kapa
function acKapaPanel() {
    var x = document.getElementById("ilan-formu");
    x.style.display = (x.style.display === "none") ? "block" : "none";
}

// 3. YENİ: İlan Paylaşma (Fotoğraflı Versiyon)
async function ilanPaylas() {
    const ad = document.getElementById("urun-adi").value;
    const fiyat = document.getElementById("urun-fiyat").value;
    const fotoDosya = document.getElementById("urun-foto").files[0];

    if(!ad || !fiyat) {
        alert("Kanka adı ve fiyatı boş geçme!");
        return;
    }

    let fotoUrl = ""; // Varsayılan boş fotoğraf linki

    // Eğer fotoğraf seçildiyse, önce onu yükle (upload.js'deki fonksiyonu çağırır)
    if (fotoDosya) {
        console.log("Fotoğraf yükleniyor...");
        fotoUrl = await fotoYukle(fotoDosya);
    }

    // Veritabanına kaydet
    db.collection("ilanlar").add({
        ad: ad,
        fiyat: fiyat,
        foto: fotoUrl, // Fotoğraf linki buraya ekleniyor
        tarih: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("İlanın Başarıyla Yayında Kanka! 🔥");
        location.reload(); // Sayfayı yenile ki yeni ilanı görelim
    });
}

// 4. İlanları Ekrana Basma
db.collection("ilanlar").orderBy("tarih", "desc").onSnapshot((snaps) => {
    const akis = document.getElementById("urun-akisi");
    if (!akis) return;
    akis.innerHTML = "";
    snaps.forEach((doc) => {
        const ilan = doc.data();
        const kutu = `
            <div style="background:#111; border:1px solid #333; border-radius:15px; margin-bottom:20px; padding:15px; position:relative; overflow:hidden;">
                <button onclick="ilanSil('${doc.id}')" style="position:absolute; top:10px; right:10px; background:none; border:none; color:#ff4444; cursor:pointer; font-size:18px;">🗑️</button>
                
                ${ilan.foto ? `<img src="${ilan.foto}" style="width:100%; border-radius:10px; margin-bottom:10px; max-height:250px; object-fit:cover;">` : ''}
                
                <h3 style="color:#fff; margin:5px 0;">${ilan.ad}</h3>
                <p style="color:#ff003c; font-weight:bold; font-size:1.2rem;">${ilan.fiyat} TL</p>
                <a href="https://wa.me/905XXXXXXXXX?text=${ilan.ad} ilanınız için yazıyorum" style="display:block; text-align:center; background:#25d366; color:white; padding:12px; border-radius:8px; text-decoration:none; font-weight:bold;">WhatsApp Satın Al</a>
            </div>
        `;
        akis.innerHTML += kutu;
    });
});
