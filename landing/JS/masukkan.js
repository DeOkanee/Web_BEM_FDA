

  document.getElementById('show-form').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'block';
  });

  document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'none';
  });

  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    var nama = document.getElementById('nama').value.trim();
    var semester = document.getElementById('semester').value.trim();
    var masukkan = document.getElementById('masukkan').value.trim();
    var submitButton = document.getElementById('submit-button');

    if (nama === '' || semester === '' || masukkan === '') {
      Toast.fire({
        icon: "error",
        title: "Data masih kosong!"
      });
    } else {
      submitButton.textContent = "Mengirim...";
      submitButton.disabled = true;

      var form = document.getElementById('myForm');
      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", form.action, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Masukkan terkirim"
          });
          submitButton.textContent = "Kirim";
          submitButton.disabled = false;
          form.reset(); // Optional: Reset form fields after successful submission
        } else {
          Toast.fire({
            icon: "error",
            title: "Gagal! Terjadi kesalahan saat mengirim data."
          });
          submitButton.textContent = "Kirim";
          submitButton.disabled = false;
        }
      };
      xhr.send(formData);
    }
  });