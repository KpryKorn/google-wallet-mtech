import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./FormulaireApple.module.css";

function FormulaireApple(props) {
  const { appleData, onAppleDataChange } = props;

  function handleSecuInputChange(e) {
    const { value } = e.target;
    const updatedSecuData = { ...appleData };

    updatedSecuData.generic.secondaryFields[0].value = value;
    onAppleDataChange(updatedSecuData);
  }

  function handleNameInputChange(e) {
    const { value } = e.target;
    const updatedNameData = { ...appleData };

    updatedNameData.generic.headerFields[0].value = value;
    onAppleDataChange(updatedNameData);
  }

  // TODO : FIX "VALUES" FORMIK

  function handleSubmit(values) {
    console.log({ values });
    fetch("http://localhost:3000/api/apple", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(`Client: ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formSchema = Yup.object().shape({
    nom: Yup.string()
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
        initialValues={appleData}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="nom">Nom</label>
          <Field
            id="nom"
            name="nom"
            value={appleData?.generic?.headerFields[0].value || ""}
            onChange={handleNameInputChange}
          />
          <ErrorMessage component="span" name="nom" />

          <label htmlFor="numSecuSociale">Numéro de sécurité sociale</label>
          <Field
            id="numSecuSociale"
            name="numSecuSociale"
            placeholder="(Ex.) 1 99 12 34 567 890 12"
            onInput={(e) => {
              if (e.target.value.length > 15) {
                e.target.value = e.target.value.slice(0, 15);
              }
            }}
            value={appleData?.generic?.secondaryFields[0].value || ""}
            onChange={handleSecuInputChange}
          />
          <ErrorMessage component="span" name="numSecuSociale" />

          <button type="submit">Télécharger</button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormulaireApple;
