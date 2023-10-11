import styles from "./PassAdherent.module.css";
import LogoMGEN from "/logo-mgen.png";

// done : add appleData
// TODO : add androidData

function PassAdherent(props) {
  return (
    <>
      <div className={styles.passContainer}>
        <div className={styles.pass}>
          <div className={styles.heading}>
            <div className={styles.headingFlex}>
              <div className={styles.headingImg}>
                <img src={LogoMGEN} alt="Logo de la MGEN" />
              </div>
              <div className={styles.headingUser}>
                {props.appleData?.generic?.headerFields[0].value}
              </div>
            </div>
            <div style={{ marginTop: "24px" }}>
              <div className={styles.headingUser}>Carte d'Adhérent</div>
              <div className={styles.headingTitle}>TIERS PAYANT MUTUALISTE</div>
            </div>
          </div>
          <div className={styles.centerText}>
            <div className={styles.centerTextCol}>
              <div>N° sécurité sociale</div>
              <div>{props.appleData?.numSecuSociale}</div>
            </div>
            <div className={styles.centerTextColRight}>
              <div>Période de validité</div>
              <div style={{ textAlign: "right" }}>
                Du 01/01/2021 au 31/12/2021
              </div>
            </div>
          </div>
          <div className={styles.trait}></div>
          <div className={styles.flex3}>
            <div
              className={styles.centerTextCol}
              style={{ flex: "100%", alignItems: "flex-start" }}
            >
              <div>n° adhérent</div>
              <div>012284</div>
            </div>
            <div
              className={styles.centerTextCol}
              style={{ flex: "100%", alignItems: "center" }}
            >
              <div>n° amc</div>
              <div>774 734 488</div>
            </div>
            <div
              className={styles.centerTextCol}
              style={{ flex: "100%", alignItems: "flex-end" }}
            >
              <div>type conv.</div>
              <div>MU</div>
            </div>
          </div>
          <div
            className={styles.centerTextCol}
            style={{ alignItems: "center" }}
          >
            <div className={styles.qrContainer}>
              <div className={styles.qrCode}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassAdherent;
