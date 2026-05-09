// Array untuk menyimpan semua data pendaftar
let dataPendaftar = [];
let counterUrut = 100; // mulai dari 100

// Event listener form
document.getElementById('formDaftar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai
    const nama = document.getElementById('nama').value.trim();
    const jenisKelamin = document.querySelector('input[name="jk"]:checked').value;
    const tempatLahir = document.getElementById('tempatLahir').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const pekerjaanOrtu = document.getElementById('pekerjaanOrtu').value.trim();
    const tempatTes = document.getElementById('tempatTes').value;
    const gelombang = document.getElementById('gelombang').value;
    const nilaiMat = parseInt(document.getElementById('nilaiMat').value);
    const nilaiInggris = parseInt(document.getElementById('nilaiInggris').value);
    const nilaiUmum = parseInt(document.getElementById('nilaiUmum').value);
    
    // Ambil bulan dari tanggal lahir
    const tgl = new Date(tanggalLahir);
    const bulan = tgl.getMonth() + 1; // 1-12
    
    // Generate kode pendaftaran
    const noUrut = counterUrut++;
    const kodePendaftaran = tempatTes + gelombang + "-" + noUrut + "-" + bulan;
    
    // Update kode di form (readonly)
    document.getElementById('kodePendaftaran').value = kodePendaftaran;
    
    // Format tempat tanggal lahir
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const tglFormat = tgl.toLocaleDateString('id-ID', options);
    const ttl = tempatLahir + ", " + tglFormat;
    
    // Nama gedung
    const namaGedung = tempatTes === 'A' ? 'Gedung A' : 'Gedung B';
    
    // Hitung rata-rata
    const rataRata = (nilaiMat + nilaiInggris + nilaiUmum) / 3;
    
    // Keterangan
    let keterangan = '';
    if (rataRata >= 70) {
        keterangan = 'Lulus';
    } else if (rataRata >= 60) {
        keterangan = 'Cadangan';
    } else {
        keterangan = 'Tidak Lulus';
    }
    
    // Tambahkan ke array data
    dataPendaftar.push({
        kode: kodePendaftaran,
        nama: nama,
        ttl: ttl,
        jk: jenisKelamin,
        pekerjaanOrtu: pekerjaanOrtu,
        tempatTes: namaGedung,
        mat: nilaiMat,
        inggris: nilaiInggris,
        umum: nilaiUmum,
        rata: rataRata,
        ket: keterangan
    });
    
    // Render tabel
    renderTabel();
    
    // Reset form (kecuali kode readonly akan terupdate saat submit berikutnya)
    this.reset();
    document.getElementById('kodePendaftaran').value = '';
});

// Fungsi render tabel & ringkasan
function renderTabel() {
    const tbody = document.getElementById('bodyTabel');
    tbody.innerHTML = '';
    
    let jumlahLulus = 0;
    let jumlahTidakLulus = 0;
    
    dataPendaftar.forEach((d, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${d.kode}</td>
            <td>${d.nama}</td>
            <td>${d.ttl}</td>
            <td>${d.jk}</td>
            <td>${d.pekerjaanOrtu}</td>
            <td>${d.tempatTes}</td>
            <td>${d.mat}</td>
            <td>${d.inggris}</td>
            <td>${d.umum}</td>
            <td>${d.rata.toFixed(2)}</td>
            <td><strong>${d.ket}</strong></td>
        `;
        
        tbody.appendChild(tr);
        
        // Hitung statistik
        if (d.ket === 'Lulus') {
            jumlahLulus++;
        } else if (d.ket === 'Tidak Lulus') {
            jumlahTidakLulus++;
        }
    });
    
    // Update ringkasan
    document.getElementById('jumlahInput').textContent = dataPendaftar.length;
    document.getElementById('jumlahPendaftar').textContent = dataPendaftar.length;
    document.getElementById('jumlahLulus').textContent = jumlahLulus;
    document.getElementById('jumlahTidakLulus').textContent = jumlahTidakLulus;
}

// Reset form juga membersihkan kode
document.getElementById('formDaftar').addEventListener('reset', function() {
    document.getElementById('kodePendaftaran').value = '';
});
