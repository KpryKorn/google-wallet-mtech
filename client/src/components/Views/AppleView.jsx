import FormulaireApple from "../FormulaireAdherent/FormulaireApple";
import PassApple from "../PassAdherent/PassApple";
import logoMGEN from "/logo-mgen.png";
import { useState, useEffect } from "react";

function AppleView() {
  const [appleData, setAppleData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/apple");
        const data = await res.json();
        setAppleData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  function handleAppleDataChange(data) {
    setAppleData(data);
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
          <PassApple appleData={appleData} />
        </div>
      </main>
      <FormulaireApple
        appleData={appleData}
        onAppleDataChange={handleAppleDataChange}
      />
    </>
  );
}

export default AppleView;
