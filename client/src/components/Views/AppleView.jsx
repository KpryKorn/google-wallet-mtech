import FormulaireAdherent from "../FormulaireAdherent/FormulaireAdherent";
import PassAdherent from "../PassAdherent/PassAdherent";
import logoMGEN from "/logo-mgen.png";
import { useState } from "react";

function AppleView() {
  const [adherentData, setAdherentData] = useState({
    nom: "MCLFY",
    prenom: "Marty",
    numSecuSociale: "199123456789012",
  });

  function handleAdherentDataChange(data) {
    setAdherentData(data);
  }

  return (
    <>
      <div className="logo">
        <img src={logoMGEN} alt="Logo de la MGEN" />
      </div>
      <p className="device-check">Connecté sur un appareil iOS</p>
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
          <PassAdherent adherentData={adherentData} />
        </div>
      </main>
      <FormulaireAdherent
        adherentData={adherentData}
        onAdherentDataChange={handleAdherentDataChange}
      />
    </>
  );
}

export default AppleView;
