document.addEventListener("DOMContentLoaded", function () {
    // Check if user is already logged in
    const storedData = localStorage.getItem("bemFdaLoginData");
    if (storedData) {
      const data = JSON.parse(storedData);
      // Automatically log in and redirect to home page
      window.location.href = "/home.html";
    }

    document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();

      // Validasi input sebelum mengirimkan data
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();

      if (username === "" || email === "") {
        // Jika ada input yang kosong, tampilkan Sweet Alert error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data masih kosong! Mohon lengkapi data.",
        });
        return; // Stop further execution
      }

      // Ubah teks tombol menjadi "Logging In"
      const loginButton = document.querySelector(".login-button");
      loginButton.value = "Logging In...";

      // Kirim data menggunakan fetch atau XMLHttpRequest
      fetch(
        "https://script.google.com/macros/s/AKfycbwUNBL_Stce7WjiLOrQGqVACuWpBegDl0_fGdkymVIbmlzvHaRwMH1fazpmxUofeg4LBA/exec",
        {
          method: "POST",
          body: new FormData(document.getElementById("loginForm")),
          enctype: "multipart/form-data",
        }
      )
       .then((response) => {
          if (response.ok) {
            // Jika sukses, tampilkan Sweet Alert success
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });

            // Store user login data locally
            const loginData = { username, email };
            localStorage.setItem("bemFdaLoginData", JSON.stringify(loginData));

            // Redirect ke halaman "/home.html" setelah 3 detik
            setTimeout(() => {
              window.location.href = "/home.html";
            }, 3000);
          } else {
            // Jika ada kesalahan
            throw new Error("Network response was not ok.");
          }
        })
       .catch((error) => {
          console.error("Error:", error);
          // Tambahkan kode untuk menampilkan pesan error jika diperlukan
        })
       .finally(() => {
          // Setelah selesai, ubah teks tombol kembali menjadi "Sign In"
          loginButton.value = "Sign In";
        });
    });
  });