document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const machineCards = document.querySelectorAll(".machines-grid > a");

  let currentOS = "all";
  let currentDiff = "all";

  function filterMachines() {
    const query = searchInput.value.toLowerCase().trim();

    machineCards.forEach((card) => {
      const os = card.getAttribute("data-os");
      const diff = card.getAttribute("data-diff");
      const text = card.textContent.toLowerCase();

      const matchesSearch = text.includes(query);
      const matchesOS = currentOS === "all" || os === currentOS;
      const matchesDiff = currentDiff === "all" || diff === currentDiff;

      if (matchesSearch && matchesOS && matchesDiff) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterType = btn.getAttribute("data-filter-type");
      const value = btn.getAttribute("data-value");

      if (filterType === "all") {
        currentOS = "all";
        currentDiff = "all";
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      } else if (filterType === "os") {
        document.querySelectorAll('.filter-btn[data-filter-type="os"]').forEach((b) => b.classList.remove("active"));
        document.querySelector('.filter-btn[data-filter-type="all"]').classList.remove("active");
        
        if (currentOS === value) {
          currentOS = "all";
        } else {
          currentOS = value;
          btn.classList.add("active");
        }
      } else if (filterType === "diff") {
        document.querySelectorAll('.filter-btn[data-filter-type="diff"]').forEach((b) => b.classList.remove("active"));
        document.querySelector('.filter-btn[data-filter-type="all"]').classList.remove("active");

        if (currentDiff === value) {
          currentDiff = "all";
        } else {
          currentDiff = value;
          btn.classList.add("active");
        }
      }

      if (currentOS === "all" && currentDiff === "all") {
        document.querySelector('.filter-btn[data-filter-type="all"]').classList.add("active");
      }

      filterMachines();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterMachines);
  }
});