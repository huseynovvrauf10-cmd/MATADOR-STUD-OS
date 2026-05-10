// db-queries.js
function fetchIlanlar(kategori = 'Hepsi') {
    const ilanlarDiv = document.getElementById('ilanlar-listesi');
    ilanlarDiv.innerHTML = "Yükleniyor kanka..."; 

    let query = db.collection("ilanlar");

    if (kategori !== 'Hepsi') {
        query = query.where("kategori", "==", kategori);
    }

    query.get().then((snapshot) => {
        ilanlarDiv.innerHTML = ""; // Temizle
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Kart yapısını basan fonksiyonu çağır (bunu da ayırabiliriz istersen)
            renderIlanKart(doc.id, data);
        });
    });
}
