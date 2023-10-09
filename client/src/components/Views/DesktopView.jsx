import logoMGEN from "/logo-mgen.png";
import qrCODE from "/qrcode_localhost.png";

function DesktopView() {
  return (
    <>
      <div className="logo">
        <img src={logoMGEN} alt="Logo de la MGEN" />
      </div>
      <main className="desktop-main">
        <p>Pour profiter de cette application, veuillez utiliser un mobile. </p>
        <img src={qrCODE} alt="QR CODE redirection mobile" />
        <p>
          Il est impossible de créer un pass adhérent MGEN sur un ordinateur.
        </p>
      </main>
    </>
  );
}

export default DesktopView;
