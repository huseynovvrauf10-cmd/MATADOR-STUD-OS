// search.js
function araBakayim() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const ilanlar = document.getElementsByClassName('ilan-kart');

    for (let i = 0; i < ilanlar.length; i++) {
        // İlan kartının içindeki başlığı alıyoruz (h3)
        let baslik = ilanlar[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        
        // Eğer aranan kelime başlıkta varsa göster, yoksa gizle
        if (baslik.includes(input)) {
            ilanlar[i].style.display = "";
        } else {
            ilanlar[i].style.display = "none";
        }
    }
}
