import FormulaireAdherent from "../FormulaireAdherent/FormulaireAdherent";
import logoMGEN from "/logo-mgen.png";
import passAdherent from "/pass-adherent-mgen.png";
import PassAdherent from "../PassAdherent/PassAdherent";
import { useState } from "react";

function AndroidView() {
  const [adherentData, setAdherentData] = useState({
    nom: "MCLFY",
    prenom: "Marty",
    numSecuSociale: "1 99 12 34 567 890 12",
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
          <img src={passAdherent} alt="Screenshot du pass adhérent MGEN" />
        </div>
      </main>
      <FormulaireAdherent
        adherentData={adherentData}
        onAdherentDataChange={handleAdherentDataChange}
      />
      <PassAdherent adherentData={adherentData} />
    </>
  );
}

export default AndroidView;
