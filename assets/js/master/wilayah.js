const data = [
  {
    nama: "Kalimantan Timur",
    kode: "64",
    tps: 5231,
    status: "Aktif",
  },

  {
    nama: "Jawa Timur",
    kode: "35",
    tps: 14230,
    status: "Aktif",
  },

  {
    nama: "DKI Jakarta",
    kode: "31",
    tps: 8100,
    status: "Aktif",
  },
];

const tbody = document.getElementById("wilayahTable");

data.forEach((item, index) => {
  tbody.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${item.nama}</td>

            <td>${item.kode}</td>

            <td>${item.tps.toLocaleString()}</td>

            <td>${item.status}</td>

            <td>

                <button>✏️</button>

                <button>🗑️</button>

            </td>

        </tr>
    `;
});
