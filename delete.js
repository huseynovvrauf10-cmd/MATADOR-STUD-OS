// Matador - İlan Silme Modülü
function ilanSil(id) {
    if (confirm("Kanka bu ilanı silmek istediğine emin misin?")) {
        db.collection("ilanlar").doc(id).delete()
        .then(() => {
            console.log("İlan başarıyla silindi kanka!");
        })
        .catch((error) => {
            console.error("Silerken bir arıza çıktı: ", error);
        });
    }
}
