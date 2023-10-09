import logoMGEN from "/logo-mgen.png";

function DesktopView() {
  return (
    <>
      <div className="logo">
        <img src={logoMGEN} alt="Logo de la MGEN" />
      </div>
      <main className="desktop-main">
        <p>
          Pour profiter de cette application, veuillez utiliser un mobile.
          <br />
          <br /> Il est impossible de créer un pass adhérent MGEN sur un
          ordinateur.
        </p>
      </main>
    </>
  );
}

export default DesktopView;
