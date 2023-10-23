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

  // TODO : handle Android Data Change
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/apple", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appleData), // envoi les données modifiées
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Données enregistrées avec succès");
        setShowToast(true);
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

        <div className={styles.formBtns}>
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
