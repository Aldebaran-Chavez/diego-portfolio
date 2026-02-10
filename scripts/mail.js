document.addEventListener("DOMContentLoaded", () => {
  const mailContainer = document.getElementById("mailCopy");
  const mailText = document.getElementById("mailText").innerText;

  mailContainer.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mailText);

      // feedback visual
      mailContainer.classList.add("copied");

      setTimeout(() => {
        mailContainer.classList.remove("copied");
      }, 1200);
    } catch (err) {
      console.error("Error al copiar el correo:", err);
    }
  });
});
