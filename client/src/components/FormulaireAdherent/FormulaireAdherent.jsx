import { Formik, Form, Field, ErrorMessage } from "formik";

function FormulaireAdherent() {
  return (
    <div className="formContainer">
      <h3>Mes informations</h3>
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          numSecuSociale: "",
        }}
      >
        <Form>
          <label htmlFor="nom">Nom</label>
          <Field id="nom" name="nom" placeholder="(Ex.) DUPONT.." />

          <label htmlFor="prenom">Prénom</label>
          <Field id="prenom" name="prenom" placeholder="(Ex.) Jean.." />

          <label htmlFor="numSecuSociale">Numéro de sécurité sociale</label>
          <Field id="numSecuSociale" name="numSecuSociale" type="number" />

          <button type="submit">Télécharger</button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormulaireAdherent;
