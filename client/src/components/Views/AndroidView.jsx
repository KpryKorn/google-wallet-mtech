import FormulaireApple from "../FormulaireAdherent/FormulaireApple";
import logoMGEN from "/logo-mgen.png";
import PassApple from "../PassAdherent/PassApple";
import { useState } from "react";

function AndroidView() {
  const [adherentData, setAdherentData] = useState({
    nom: "MCLFY",
    prenom: "Marty",
    numSecuSociale: "199223456789012",
  });

  function handleAdherentDataChange(data) {
    setAdherentData(data);
  }
  return (
    <>
      <div className="logo">
        <img src={logoMGEN} alt="Logo de la MGEN" />
      </div>
      <p className="device-check">Connecté sur un appareil Android</p>
      <main className="split">
        <div className="hero__text">
          <p>
            Créez votre pass adhérent MGEN avec vos informations personnelles
            pour l'ajouter à votre wallet mobile. <br />
            Directement dans votre téléphone, impossible de le perdre ! <br />
            Les pass sont des fichiers numériques liés à votre compte.
          </p>
        </div>
        <div className="hero__img">
          <PassApple adherentData={adherentData} />
        </div>
      </main>
      <FormulaireApple
        adherentData={adherentData}
        onAdherentDataChange={handleAdherentDataChange}
      />
    </>
  );
}

export default AndroidView;
