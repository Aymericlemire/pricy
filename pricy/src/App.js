import React, { useState } from "react";

function App() {
  const [heuresParSemaine, setHeuresParSemaine] = useState(35);
  const [semainesParAn, setSemainesParAn] = useState(46);
  const [salaireSouhaite, setSalaireSouhaite] = useState(2000);
  const [chargesPro, setChargesPro] = useState(800);
  const [chargesPerso, setChargesPerso] = useState(700);
  const [epargne, setEpargne] = useState(200);

  const [prestations, setPrestations] = useState([]);
  const [nom, setNom] = useState("");
  const [duree, setDuree] = useState(60);
  const [coutProduit, setCoutProduit] = useState(5);
  const [tarifActuel, setTarifActuel] = useState(20);

  const tarifHoraire = ((salaireSouhaite + chargesPro + chargesPerso + epargne) * 12) / (heuresParSemaine * semainesParAn);

  const ajouterPrestation = () => {
    const tarifRentable = ((duree / 60) * tarifHoraire) + coutProduit;
    const rentable = tarifActuel >= tarifRentable;
    setPrestations([...prestations, {
      id: prestations.length + 1,
      nom,
      duree,
      coutProduit,
      tarifActuel,
      tarifRentable: tarifRentable.toFixed(2),
      rentable
    }]);
    setNom(""); setDuree(60); setCoutProduit(5); setTarifActuel(20);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pricy - Test Local</h1>
      <p>Tarif horaire calculé : <strong>{tarifHoraire.toFixed(2)} €</strong></p>

      <h2>Ajouter une prestation</h2>
      <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} /><br />
      <input placeholder="Durée (min)" type="number" value={duree} onChange={(e) => setDuree(+e.target.value)} /><br />
      <input placeholder="Coût produit (€)" type="number" value={coutProduit} onChange={(e) => setCoutProduit(+e.target.value)} /><br />
      <input placeholder="Tarif actuel (€)" type="number" value={tarifActuel} onChange={(e) => setTarifActuel(+e.target.value)} /><br />
      <button onClick={ajouterPrestation}>Ajouter</button>

      <h2>Liste des prestations</h2>
      {prestations.map(p => (
        <div key={p.id} style={{ background: '#eee', padding: 10, margin: 5 }}>
          <strong>{p.nom}</strong><br />
          Durée : {p.duree} min<br />
          Coût produit : {p.coutProduit} €<br />
          Tarif actuel : {p.tarifActuel} €<br />
          Tarif rentable : {p.tarifRentable} €<br />
          {p.rentable ? "✅ Rentable" : "❌ Pas rentable"}
        </div>
      ))}
    </div>
  );
}

export default App;