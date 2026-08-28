/**
 * =====================================================
 * STUDI KASUS - SEARCH AS YOU TYPE
 * =====================================================
 * Menggantikan pengalaman dropdown <select> biasa dengan
 * search box ala AI: user ketik kata kunci, muncul saran
 * yang match, klik salah satu untuk langsung masuk ke
 * studi kasus tersebut.
 *
 * PENTING: file ini TIDAK mengganti logic switch panel
 * yang sudah ada di studi-kasus.js. Elemen <select
 * id="studiKasusSelect"> ASLI tetap ada di HTML (disembunyikan
 * lewat CSS .sk-hidden-select), dan skrip ini hanya:
 *   1. Membaca daftar <option> dari select itu sebagai
 *      sumber data pencarian (jadi teks pertanyaan tidak
 *      di-duplikasi/hardcode dua kali di file terpisah).
 *   2. Saat user klik salah satu saran, set select.value
 *      lalu dispatch event 'change' ke select tsb - persis
 *      seperti kalau user pilih manual di dropdown asli.
 * Jadi kalau nanti mau ubah teks/jumlah studi kasus, cukup
 * ubah <option> di HTML, search ini otomatis ikut update.
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("studiKasusSelect");
  const input = document.getElementById("studiKasusSearch");
  const suggestionsBox = document.getElementById("skSuggestions");
  const clearBtn = document.getElementById("skClearBtn");

  if (!select || !input || !suggestionsBox) return;

  // Ambil daftar studi kasus dari <option> select asli (skip option kosong "-- Pilih --")
  const items = Array.from(select.options)
    .filter((opt) => opt.value)
    .map((opt) => ({
      value: opt.value,
      // Rapikan whitespace/line-break dari markup multi-baris di HTML
      text: opt.textContent.replace(/\s+/g, " ").trim(),
    }));

  let activeIndex = -1;
  let currentMatches = [];

  function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      text.slice(0, idx) +
      `<mark>${text.slice(idx, idx + query.length)}</mark>` +
      text.slice(idx + query.length)
    );
  }

  function getMatches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    // Support pencarian "studi kasus 1" / "kasus 1" / "1" langsung ke nomor
    const nomorMatch = q.match(/(?:studi\s*kasus\s*|kasus\s*)?(\d)/);
    if (nomorMatch && q.replace(/[^a-z0-9]/g, "") === `studikasus${nomorMatch[1]}`.replace(/[^a-z0-9]/g, "")) {
      const byNumber = items.filter((it) => it.value === nomorMatch[1]);
      if (byNumber.length) return byNumber;
    }

    return items.filter((it) => it.text.toLowerCase().includes(q));
  }

  function renderSuggestions(query) {
    currentMatches = getMatches(query);
    activeIndex = -1;

    if (!currentMatches.length) {
      suggestionsBox.innerHTML = `
        <div class="sk-suggestion-empty">
          <i class="fa-solid fa-magnifying-glass"></i>
          Tidak ada studi kasus yang cocok dengan "${query}"
        </div>
      `;
      suggestionsBox.classList.add("open");
      return;
    }

    suggestionsBox.innerHTML = currentMatches
      .map(
        (it, i) => `
        <button type="button" class="sk-suggestion-item" data-value="${it.value}" data-index="${i}">
          <span class="sk-suggestion-badge">${it.value}</span>
          <span class="sk-suggestion-text">${highlightMatch(it.text, query.trim())}</span>
          <i class="fa-solid fa-arrow-right sk-suggestion-arrow"></i>
        </button>
      `,
      )
      .join("");

    suggestionsBox.classList.add("open");
  }

  function selectItem(value) {
    const item = items.find((it) => it.value === value);

    input.value = item ? item.text : "";
    clearBtn.style.display = item ? "flex" : "none";
    suggestionsBox.classList.remove("open");

    select.value = value;
    select.dispatchEvent(new Event("change"));
  }

  function updateActiveHighlight() {
    suggestionsBox.querySelectorAll(".sk-suggestion-item").forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
  }

  // Saran baru muncul setelah user mulai mengetik (bukan langsung
  // menampilkan semua saat kotak baru difokus/diklik kosong)
  input.addEventListener("focus", () => {
    if (input.value.trim()) renderSuggestions(input.value);
  });

  input.addEventListener("input", () => {
    clearBtn.style.display = input.value ? "flex" : "none";

    if (!input.value.trim()) {
      suggestionsBox.classList.remove("open");
      suggestionsBox.innerHTML = "";
      return;
    }

    renderSuggestions(input.value);
  });

  input.addEventListener("keydown", (e) => {
    if (!suggestionsBox.classList.contains("open")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, currentMatches.length - 1);
      updateActiveHighlight();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActiveHighlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = currentMatches[activeIndex] || currentMatches[0];
      if (target) selectItem(target.value);
    } else if (e.key === "Escape") {
      suggestionsBox.classList.remove("open");
      input.blur();
    }
  });

  suggestionsBox.addEventListener("click", (e) => {
    const btn = e.target.closest(".sk-suggestion-item");
    if (!btn) return;
    selectItem(btn.dataset.value);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    selectItem("");
    input.focus();
  });

  // Klik di luar search box -> tutup daftar saran
  document.addEventListener("click", (e) => {
    if (!document.getElementById("skSearch").contains(e.target)) {
      suggestionsBox.classList.remove("open");
    }
  });
});