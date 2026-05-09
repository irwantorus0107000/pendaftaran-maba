document.getElementById('formDaftar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const nama = document.getElementById('nama').value;
    const jenisKelamin = document.querySelector('input[name="jk"]:checked').value;
    const tempatLahir = document.getElementById('tempat_lahir').value;
    const tanggalLahir = document.getElementById('tanggal_lahir').value;
    const asalSekolah = document.getElementById('asal_sekolah').value;
    const pekerjaanOrtu = document.getElementById('pekerjaan_ortu').value;
    const tempatTes = document.getElementById('tempat_tes').value;
    const gelombang = document.getElementById('gelombang').value;
    const nilaiMat = parseInt(document.getElementById('nilai_mat').value);
    const nilaiInggris = parseInt(document.getElementById('nilai_inggris').value);
    const nilaiUmum = parseInt(document.getElementById('nilai_umum').value);
    
    // Generate nomor urut acak (simulasi karena tanpa database)
    const noUrut = Math.floor(Math.random() * 900) + 100; // 100-999
    
    // Ambil bulan dari tanggal lahir
    const tgl = new Date(tanggalLahir);
    const bulan = tgl.getMonth() + 1; // 1-12
    
    // Generate kode pendaftar
    const kodePendaftar = tempatTes + gelombang + "-" + noUrut + "-" + bulan;
    
    // Nama gedung
    let namaGedung = "";
    switch(tempatTes) {
        case 'A': namaGedung = "Gedung A"; break;
        case 'B': namaGedung = "Gedung B"; break;
        case 'V': namaGedung = "Viktor"; break;
    }
    
    // Hitung rata-rata
    const rataRata = (nilaiMat + nilaiInggris + nilaiUmum) / 3;
    
    // Tentukan keterangan
    let keterangan = "";
    if (rataRata >= 70) {
        keterangan = "Lulus";
    } else if (rataRata >= 60) {
        keterangan = "Cadangan";
    } else {
        keterangan = "Tidak Lulus";
    }
    
    // Format TTL
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const tglFormat = tgl.toLocaleDateString('id-ID', options);
    const ttl = tempatLahir + ", " + tglFormat;
    
    // Tampilkan hasil
    const hasilHTML = `
        <h2>📋 Hasil Pendaftaran</h2>
        <table>
            <tr><td>Kode Pendaftar</td><td>: ${kodePendaftar}</td></tr>
            <tr><td>Keterangan Tes</td><td>: ${namaGedung}</td></tr>
            <tr><td>Nama Pendaftar</td><td>: ${nama}</td></tr>
            <tr><td>Jenis Kelamin</td><td>: ${jenisKelamin}</td></tr>
            <tr><td>TTL</td><td>: ${ttl}</td></tr>
            <tr><td>Asal Sekolah</td><td>: ${asalSekolah}</td></tr>
            <tr><td>Pekerjaan Ortu</td><td>: ${pekerjaanOrtu}</td></tr>
            <tr><td>Nilai Matematika</td><td>: ${nilaiMat}</td></tr>
            <tr><td>Nilai B. Inggris</td><td>: ${nilaiInggris}</td></tr>
            <tr><td>Nilai Pengetahuan Umum</td><td>: ${nilaiUmum}</td></tr>
            <tr><td>Rata-rata</td><td>: ${rataRata.toFixed(2)}</td></tr>
            <tr><td style="color: #1a237e; font-size: 18px;">Keterangan</td>
                <td style="color: #1a237e; font-size: 18px; font-weight: bold;">${keterangan}</td></tr>
        </table>
    `;
    
    const divHasil = document.getElementById('hasil');
    divHasil.innerHTML = hasilHTML;
    divHasil.style.display = 'block';
    
    // Scroll ke hasil
    divHasil.scrollIntoView({ behavior: 'smooth' });
});