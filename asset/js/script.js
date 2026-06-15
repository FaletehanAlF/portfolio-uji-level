const form = document.getElementById("contactForm");

if (form) {
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!username) {
      alert("Username wajib diisi!");
      return;
    }

    if (!email) {
      alert("Email wajib diisi!");
      return;
    }

    if (!message) {
      alert("Pesan wajib diisi!");
      return;
    }

    if (submitButton) {
      submitButton.textContent = "Mengirim...";
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      let result = null;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.warn("Response tidak berformat JSON", jsonError);
      }

      if (response.ok) {
        alert("Pesan berhasil dikirim!");
        form.reset();
      } else {
        const errorMessage =
          result?.errors?.[0]?.message ||
          result?.message ||
          `Gagal mengirim pesan (kode ${response.status}).`;
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error saat mengirim formulir:", error);
      alert(
        "Terjadi kesalahan saat mengirim pesan. Periksa koneksi internet atau coba lagi nanti."
      );
    } finally {
      if (submitButton) {
        submitButton.textContent = "Send";
        submitButton.disabled = false;
      }
    }
  });
}