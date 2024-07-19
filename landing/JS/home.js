document.addEventListener('DOMContentLoaded', function() {
    // Periksa apakah ada data login yang tersimpan di localStorage
    const storedData = localStorage.getItem('bemFdaLoginData');
    if (storedData) {
        // Jika ada, tampilkan ikon sukses
        document.getElementById('login-icon').style.display = 'inline'; // Atur tampilan ikon sesuai kebutuhan
    }
});

  

// Tampilkan Sweet Alert saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
        icon: 'info',
        title: 'info',
        html: 'Yang mau mengambil Sertifikat Berdonasi Fesding Project Bisa klik <a href="https://sertif-berdonasi-fesding24.vercel.app/">Disini</a> atau Bisa klik Sertifikat Berdonasi yang ada di pogram kerja <a class="nav-link click-scroll" href="#fesding-sertif">FESDING PROJECT 2024</a>',
    });
});

  document
.getElementById("contact-link-contact-us")
.addEventListener("click", function () {
  var dwiSeptianiLink = document.getElementById("dwi-septiani-link");
  var suryaDanaLink = document.getElementById("surya-dana-link");
  var ediSuastawanLink = document.getElementById("edi-suastawan-link");

  dwiSeptianiLink.style.display = "block";
  suryaDanaLink.style.display = "block";
  ediSuastawanLink.style.display = "block";

  setTimeout(function () {
    dwiSeptianiLink.style.display = "none";
    suryaDanaLink.style.display = "none";
    ediSuastawanLink.style.display = "none";
  }, 10000); // 10 detik
});
//berubah warna saat klk
function changeColor(element) {
element.style.backgroundColor = "#4CAF50"; // Ubah warna latar menjadi hijau
return true; // Kembalikan nilai true untuk menjalankan tindakan bawaan dari tautan
}

      // Ambil elemen teks yang akan dianimasikan
const greeting = document.getElementById('greeting');

// Animasi efek mengetik menggunakan setTimeout
function typeWriterEffect(text, i) {
  if (i < text.length) {
    greeting.innerHTML += text.charAt(i);
    i++;
    setTimeout(() => {
      typeWriterEffect(text, i);
    }, 100); // Waktu delay antara karakter
  }
}

// Panggil fungsi untuk memulai efek mengetik
document.addEventListener('DOMContentLoaded', function () {
  const text = greeting.innerHTML;
  greeting.innerHTML = ''; // Kosongkan teks awal
  typeWriterEffect(text, 0);
});
