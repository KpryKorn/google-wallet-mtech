import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./FormulaireAdherent.module.css";

function FormulaireAdherent(props) {
  const { appleData, onAppleDataChange } = props;

  function handleInputChange(e) {
    const { name, value } = e.target;
    onAppleDataChange({ ...appleData, [name]: value });
    // todo : fix pour correspondre aux données renvoyées par l'api
  }

  const formSchema = Yup.object().shape({
    nomPrenom: Yup.string()
      .min(2, "Trop court !")
      .max(80, "Trop long !")
      .required("Champ requis"),
    numSecuSociale: Yup.string()
      .min(15, "Doit faire 15 caractères")
      .required("Champ requis"),
  });

  return (
    <div className={styles.formContainer}>
      <h3>Mes informations</h3>
      <Formik initialValues={appleData} validationSchema={formSchema}>
        <Form>
          <label htmlFor="nomPrenom">Nom + Prénom</label>
          <Field
            id="nomPrenom"
            name="nomPrenom"
            value={appleData.nom} // TODO : fix initialValues pour correspondre aux vraies données
            onChange={handleInputChange}
          />
          <ErrorMessage component="span" name="nomPrenom" />

          <label htmlFor="numSecuSociale">Numéro de sécurité sociale</label>
          <Field
            id="numSecuSociale"
            name="numSecuSociale"
            type="number"
            placeholder="(Ex.) 1 99 12 34 567 890 12"
            onInput={(e) => {
              if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
              }
            }}
            value={appleData.numSecuSociale}
            onChange={handleInputChange}
          />
          <ErrorMessage component="span" name="numSecuSociale" />

          <button type="submit">Télécharger</button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormulaireAdherent;
