<script>
  const produitsPrix = {};
  const produitsData = [];

  // Charge dynamiquement les produits depuis le JSON
  fetch('produits-davines.json')
    .then(res => res.json())
    .then(produits => {
      const select = document.getElementById('produits');
      produits.forEach(p => {
        const option = document.createElement('option');
        option.value = p.nom;
        option.textContent = `${p.nom} - ${p.prix}€`;
        produitsPrix[p.nom] = p.prix;
        produitsData.push(p);
        select.appendChild(option);
      });
    });

  const prestations = [];

  document.getElementById("form-prestation").addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const duree = parseFloat(document.getElementById("duree").value);
    const produits = Array.from(document.getElementById("produits").selectedOptions).map(opt => opt.value);

    const coutProduits = produits.reduce((sum, nom) => sum + (produitsPrix[nom] || 0), 0);
    const prixConseille = duree * 40 + coutProduits;

    prestations.push({ nom, duree, produits, coutProduits, prixConseille });
    updatePrestationListe();
    updateChart();
    e.target.reset();
  });

  function updatePrestationListe() {
    const tbody = document.getElementById("prestation-liste");
    tbody.innerHTML = "";
    prestations.forEach(p => {
      tbody.innerHTML += `<tr>
        <td>${p.nom}</td>
        <td>${p.duree}h</td>
        <td>${p.coutProduits.toFixed(2)}€</td>
        <td>${p.prixConseille.toFixed(2)}€</td>
      </tr>`;
    });
  }

  function updateChart() {
    const labels = prestations.map(p => p.nom);
    const data = prestations.map(p => p.prixConseille);
    const ctx = document.getElementById("statChart").getContext("2d");
    if (window.statChart) window.statChart.destroy();
    window.statChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Prix conseillé (€)",
          backgroundColor: "#4caf50",
          data
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
</script>
