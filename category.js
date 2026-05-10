// category.js
function setupCategories() {
    const categories = ['Hepsi', 'Elektronik', 'Giyim', 'Diger'];
    const container = document.getElementById('category-container');
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.onclick = () => filterByKategori(cat);
        container.appendChild(btn);
    });
}

function filterByKategori(kategori) {
    console.log(kategori + " seçildi kanka.");
    // Veri çekme dosyasındaki fonksiyonu çağıracağız
    fetchIlanlar(kategori); 
}
