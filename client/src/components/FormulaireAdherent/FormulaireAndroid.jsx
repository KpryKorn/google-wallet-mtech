import styles from "./FormulaireAdherent.module.css";
import Toast from "../UI/Toast";
import { useState } from "react";

// TODO : fetch Android Data
function FormulaireAndroid({ appleData, onAppleDataChange }) {
  const [showToast, setShowToast] = useState(false);

  function handleSecuInputChange(e) {
    const { value } = e.target;
    const updatedSecuData = { ...appleData };

    updatedSecuData.generic.secondaryFields[0].value = value;
    onAppleDataChange(updatedSecuData);
  }

  function handleNameInputChange(e) {
    const { value } = e.target;
    const updatedNameData = { ...appleData };

    updatedNameData.generic.headerFields[0].value = value;
    onAppleDataChange(updatedNameData);
  }

  // Requête POST url-encoded + bouton d'ajout au wallet
  function handleSubmit(e) {
    e.preventDefault();
    const nom = e.target.nom.value;
    const numSecuSociale = e.target.numSecuSociale.value;

    fetch("http://localhost:3000/api/android", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nom=${nom}&numSecuSociale=${numSecuSociale}`, // envoi les données modifiées
    })
      .then((response) => {
        setShowToast(true);
        return response.text();
      })
      .then((button) => {
        document.getElementById("button").innerHTML = button;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  return (
    <div className={styles.formContainer}>
      <h3>Mes informations</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          name="nom"
          value={appleData?.generic?.headerFields[0].value || ""}
          onChange={handleNameInputChange}
        />

        <label htmlFor="numSecuSociale">Numéro de sécurité sociale</label>
        <input
          id="numSecuSociale"
          name="numSecuSociale"
          placeholder="(Ex.) 1 99 12 34 567 890 12"
          onInput={(e) => {
            if (e.target.value.length > 15) {
              e.target.value = e.target.value.slice(0, 15);
            }
          }}
          value={appleData?.generic?.secondaryFields[0].value || ""}
          onChange={handleSecuInputChange}
        />

        <div id="button" className={styles.formBtns}>
          <button type="submit">Sauvegarder</button>
          <a href="http://localhost:3000/api/apple/download">Télécharger</a>
        </div>
      </form>
      <Toast
        message={"Vos données ont correctement été sauvegardées."}
        showToast={showToast}
      />
    </div>
  );
}

export default FormulaireAndroid;
