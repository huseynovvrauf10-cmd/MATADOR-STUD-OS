// Matador Marketplace - Ana Script Dosyası

// 1. Firebase Yapılandırması (Senin bilgilerini buraya koyuyoruz)
const firebaseConfig = {
    apiKey: "AIzaSyAWZoeIDyTy_3AAQZkojD9V...", // Burayı kendi resmindekiyle kontrol et
    authDomain: "matador-b1ecc.firebaseapp.com",
    projectId: "matador-b1ecc",
    storageBucket: "matador-b1ecc.appspot.com",
    messagingSenderId: "1065363097675",
    appId: "1:1065363097675:web:4554d13f1...",
    measurementId: "G-KCLVT54MDQ"
};

// 2. Firebase'i Başlat
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 3. Formu Açıp Kapatan Fonksiyon
function acKapaPanel() {
    var x = document.getElementById("ilan-formu");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// 4. İlan Paylaşma Fonksiyonu
function ilanPaylas() {
    var ad = document.getElementById("urun-adi").value;
    var fiyat = document.getElementById("urun-fiyat").value;

    if(ad == "" || fiyat == "") {
        alert("Kanka boş bırakma, müşteri ne alacağını bilsin!");
        return;
    }

    db.collection("ilanlar").add({
        ad: ad,
        fiyat: fiyat,
        tarih: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Veri buluta uçtu kanka!");
        acKapaPanel(); // Formu kapat
    })
    .catch((error) => {
        console.error("Hata çıktı: ", error);
    });
}

// 5. İlanları Canlı Çekme ve Silme Butonu
db.collection("ilanlar").orderBy("tarih", "desc").onSnapshot((querySnapshot) => {
    const urunAkisi = document.getElementById("urun-akisi");
    if (urunAkisi) {
        urunAkisi.innerHTML = ""; 
        querySnapshot.forEach((doc) => {
            const ilan = doc.data();
            const urunKutusu = `
                <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 15px; margin-bottom: 20px; padding: 15px; position: relative;">
                    <button onclick="ilanSil('${doc.id}')" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #ff4444; cursor: pointer;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <h4 style="margin: 0; color: #fff;">${ilan.ad}</h4>
                    <p style="color: #ff003c; font-weight: bold; margin: 10px 0;">${ilan.fiyat} TL</p>
                    <a href="https://wa.me/905XXXXXXXXX?text=${ilan.ad} için yazıyorum" 
                       style="display: block; text-align: center; background: #25d366; color: white; text-decoration: none; padding: 10px; border-radius: 8px; font-weight: bold;">
                       WhatsApp ile Satın Al
                    </a>
                </div>
            `;
            urunAkisi.innerHTML += urunKutusu;
        });
    }
});

// 6. İlan Silme Fonksiyonu
function ilanSil(id) {
    if (confirm("Kanka bu ilanı silmek istediğine emin misin?")) {
        db.collection("ilanlar").doc(id).delete();
    }
}

