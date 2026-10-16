document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".writeups-grid > a");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach((card) => {
      // Extrae todo el texto contenido en la tarjeta (Título, Descripción, Dificultad y Tags)
      const text = card.textContent.toLowerCase();

      if (text.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});