// Array untuk menyimpan semua data pendaftar
let dataPendaftar = [];
let counterUrut = 100;

// Fungsi SIMPAN - dipanggil saat tombol SIMPAN diklik
function simpanData() {
    console.log("Tombol SIMPAN ditekan!"); // Untuk debugging
    
    // Ambil nilai dari form
    const nama = document.getElementById('nama').value.trim();
    const tempatLahir = document.getElementById('tempatLahir').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const pekerjaanOrtu = document.getElementById('pekerjaanOrtu').value.trim();
    const tempatTes = document.getElementById('tempatTes').value;
    const gelombang = document.getElementById('gelombang').value;
    const nilaiMat = document.getElementById('nilaiMat').value;
    const nilaiInggris = document.getElementById('nilaiInggris').value;
    const nilaiUmum = document.getElementById('nilaiUmum').value;
    
    // Cek radio button jenis kelamin
    const jkRadio = document.querySelector('input[name="jk"]:checked');
    
    // Validasi - tampilkan alert jika ada yang kosong
    if (!nama) {
        alert('❌ NAMA PENDAFTAR harus diisi!');
        document.getElementById('nama').focus();
        return;
    }
    if (!jkRadio) {
        alert('❌ JENIS KELAMIN harus dipilih!');
        return;
    }
    if (!tempatLahir) {
        alert('❌ TEMPAT LAHIR harus diisi!');
        document.getElementById('tempatLahir').focus();
        return;
    }
    if (!tanggalLahir) {
        alert('❌ TANGGAL LAHIR harus diisi!');
        document.getElementById('tanggalLahir').focus();
        return;
    }
    if (!pekerjaanOrtu) {
        alert('❌ PEKERJAAN ORANG TUA harus diisi!');
        document.getElementById('pekerjaanOrtu').focus();
        return;
    }
    if (!tempatTes) {
        alert('❌ TEMPAT TES harus dipilih!');
        document.getElementById('tempatTes').focus();
        return;
    }
    if (!gelombang) {
        alert('❌ GELOMBANG harus dipilih!');
        document.getElementById('gelombang').focus();
        return;
    }
    if (!nilaiMat || nilaiMat < 0 || nilaiMat > 100) {
        alert('❌ NILAI MATEMATIKA harus diisi (0-100)!');
        document.getElementById('nilaiMat').focus();
        return;
    }
    if (!nilaiInggris || nilaiInggris < 0 || nilaiInggris > 100) {
        alert('❌ NILAI BAHASA INGGRIS harus diisi (0-100)!');
        document.getElementById('nilaiInggris').focus();
        return;
    }
    if (!nilaiUmum || nilaiUmum < 0 || nilaiUmum > 100) {
        alert('❌ NILAI PENGETAHUAN UMUM harus diisi (0-100)!');
        document.getElementById('nilaiUmum').focus();
        return;
    }
    
    const jenisKelamin = jkRadio.value;
    
    // Konversi nilai ke integer
    const mat = parseInt(nilaiMat);
    const inggris = parseInt(nilaiInggris);
    const umum = parseInt(nilaiUmum);
    
    // Ambil bulan dari tanggal lahir
    const tgl = new Date(tanggalLahir);
    const bulan = tgl.getMonth() + 1;
    
    // Generate kode pendaftaran
    const noUrut = counterUrut++;
    const kodePendaftaran = tempatTes + gelombang + "-" + noUrut + "-" + bulan;
    
    // Tampilkan kode di form
    document.getElementById('kodePendaftaran').value = kodePendaftaran;
    
    // Format TTL
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const tglFormat = tgl.toLocaleDateString('id-ID', options);
    const ttl = tempatLahir + ", " + tglFormat;
    
    // Nama gedung
    const namaGedung = tempatTes === 'A' ? 'Gedung A' : 'Gedung B';
    
    // Hitung rata-rata
    const rataRata = (mat + inggris + umum) / 3;
    
    // Tentukan keterangan
    let keterangan = '';
    if (rataRata >= 70) {
        keterangan = 'Lulus';
    } else if (rataRata >= 60) {
        keterangan = 'Cadangan';
    } else {
        keterangan = 'Tidak Lulus';
    }
    
    // Simpan ke array
    dataPendaftar.push({
        kode: kodePendaftaran,
        nama: nama,
        ttl: ttl,
        jk: jenisKelamin,
        pekerjaanOrtu: pekerjaanOrtu,
        tempatTes: namaGedung,
        mat: mat,
        inggris: inggris,
        umum: umum,
        rata: rataRata,
        ket: keterangan
    });
    
    // Render tabel
    renderTabel();
    
    // Reset form (kecuali kode)
    resetFormInput();
    
    alert('✅ Data berhasil disimpan!\nKode Pendaftaran: ' + kodePendaftaran);
}

// Fungsi render tabel
function renderTabel() {
    const tbody = document.getElementById('bodyTabel');
    tbody.innerHTML = '';
    
    let jumlahLulus = 0;
    let jumlahTidakLulus = 0;
    
    dataPendaftar.forEach((d) => {
        const tr = document.createElement('tr');
        
        // Beri warna background untuk keterangan
        let bgColor = '';
        if (d.ket === 'Lulus') bgColor = '#d4edda';
        else if (d.ket === 'Tidak Lulus') bgColor = '#f8d7da';
        
        tr.innerHTML = `
            <td><strong>${d.kode}</strong></td>
            <td>${d.nama}</td>
            <td>${d.ttl}</td>
            <td>${d.jk}</td>
            <td>${d.pekerjaanOrtu}</td>
            <td>${d.tempatTes}</td>
            <td>${d.mat}</td>
            <td>${d.inggris}</td>
            <td>${d.umum}</td>
            <td><strong>${d.rata.toFixed(2)}</strong></td>
            <td style="background-color: ${bgColor}; font-weight: bold;">${d.ket}</td>
        `;
        
        tbody.appendChild(tr);
        
        if (d.ket === 'Lulus') jumlahLulus++;
        if (d.ket === 'Tidak Lulus') jumlahTidakLulus++;
    });
    
    // Update ringkasan
    document.getElementById('jumlahInput').textContent = dataPendaftar.length;
    document.getElementById('jumlahPendaftar').textContent = dataPendaftar.length;
    document.getElementById('jumlahLulus').textContent = jumlahLulus;
    document.getElementById('jumlahTidakLulus').textContent = jumlahTidakLulus;
}

// Fungsi reset form
function resetForm() {
    resetFormInput();
    document.getElementById('kodePendaftaran').value = '';
    console.log("Form di-reset!");
}

function resetFormInput() {
    document.getElementById('nama').value = '';
    document.getElementById('tempatLahir').value = '';
    document.getElementById('tanggalLahir').value = '';
    document.getElementById('pekerjaanOrtu').value = '';
    document.getElementById('tempatTes').value = '';
    document.getElementById('gelombang').value = '';
    document.getElementById('nilaiMat').value = '';
    document.getElementById('nilaiInggris').value = '';
    document.getElementById('nilaiUmum').value = '';
    
    // Reset radio
    const radios = document.querySelectorAll('input[name="jk"]');
    radios.forEach(r => r.checked = false);
}

// Debug: cek apakah script.js ter-load
console.log("✅ script.js berhasil dimuat!");
console.log("✅ Fungsi simpanData() siap digunakan!");
