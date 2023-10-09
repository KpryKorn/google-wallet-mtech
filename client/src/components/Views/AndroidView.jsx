import FormulaireAdherent from "../FormulaireAdherent/FormulaireAdherent";
import logoMGEN from "/logo-mgen.png";
import passAdherent from "/pass-adherent-mgen.png";

function AndroidView() {
  return (
    <>
      <div className="logo">
        <img src={logoMGEN} alt="Logo de la MGEN" />
      </div>
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
      <FormulaireAdherent />
    </>
  );
}

export default AndroidView;
