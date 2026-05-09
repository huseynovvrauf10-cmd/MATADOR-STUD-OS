// Matador - Fotoğraf Yükleme Modülü
async function fotoYukle(dosya) {
    if (!dosya) return null;

    const depoRef = firebase.storage().ref();
    const dosyaAdi = Date.now() + "_" + dosya.name;
    const dosyaRef = depoRef.child('urunler/' + dosyaAdi);

    try {
        const sonuc = await dosyaRef.put(dosya);
        const url = await sonuc.ref.getDownloadURL();
        return url; // Fotoğrafın internet linkini döndürür
    } catch (error) {
        console.error("Foto yüklenirken patladık:", error);
        return null;
    }
}
