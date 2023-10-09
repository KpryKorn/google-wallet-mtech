import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./FormulaireAdherent.module.css";

function FormulaireAdherent() {
  const signupSchema = Yup.object().shape({
    nom: Yup.string()
      .min(2, "Trop court !")
      .max(50, "Trop long !")
      .required("Champ requis"),
    prenom: Yup.string()
      .min(2, "Trop court !")
      .max(50, "Trop long !")
      .required("Champ requis"),
    numSecuSociale: Yup.string()
      .min(15, "Doit faire 15 caractères")
      .required("Champ requis"),
  });

  return (
    <div className={styles.formContainer}>
      <h3>Mes informations</h3>
      <Formik
        initialValues={{
          nom: "MCFLY",
          prenom: "Marty",
          numSecuSociale: "",
        }}
        validationSchema={signupSchema}
      >
        <Form>
          <label htmlFor="nom">Nom</label>
          <Field id="nom" name="nom" />
          <ErrorMessage component="span" name="nom" />

          <label htmlFor="prenom">Prénom</label>
          <Field id="prenom" name="prenom" />
          <ErrorMessage component="span" name="prenom" />

          <label htmlFor="numSecuSociale">Numéro de sécurité sociale</label>
          <Field
            id="numSecuSociale"
            name="numSecuSociale"
            maxLength="15"
            type="number"
            placeholder="(Ex.) 1 99 12 34 567 890 12"
            onInput={(e) => {
              if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
              }
            }}
          />
          <ErrorMessage component="span" name="numSecuSociale" />

          <button type="submit">Télécharger</button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormulaireAdherent;
