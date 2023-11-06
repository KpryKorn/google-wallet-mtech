const checkIfObjectExists = require("../common/utils.js");
const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const issuerId = "3388000000022272047";
const classId = `${issuerId}.test_class`;
const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
const credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

/**
 * Crée une classe de Pass Wallet
 * @async
 * @function createPassClass
 * @returns {Promise<boolean>} Renvoie une promesse résolue avec la valeur true si la classe a été créée avec succès, sinon false.
 */
async function createPassClass() {
  const genericClass = {
    id: `${classId}`,
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            twoItems: {
              startItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: "object.textModulesData['numSecuSociale']",
                    },
                  ],
                },
              },
              endItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: "object.textModulesData['periodeValidite']",
                    },
                  ],
                },
              },
            },
          },
          {
            threeItems: {
              startItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: "object.textModulesData['numAdherent']",
                    },
                  ],
                },
              },
              middleItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: "object.textModulesData['numAmc']",
                    },
                  ],
                },
              },
              endItem: {
                firstValue: {
                  fields: [
                    {
                      fieldPath: "object.textModulesData['typeConv']",
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  try {
    await httpClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: "GET",
    });
    console.log("Class already exists");
  } catch (err) {
    if (err.response?.status === 404) {
      const response = await httpClient.request({
        url: `${baseUrl}/genericClass`,
        method: "POST",
        data: genericClass,
      });
      console.log("Class insert response");
      console.log(response);
    } else {
      console.log(err);
      return false;
    }
  }
  return true;
}

/**
 * Crée un objet de Pass Wallet pour Google Pay à partir des informations fournies dans la requête
 * @param {Object} req - L'objet de requête
 * @param {Object} res - L'objet de réponse
 * @returns {Promise<void>} - Une promesse qui résout avec la réponse de la requête
 */
async function createPassObject(req, res) {
  let objectId;
  while (true) {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    const objectSuffix = randomNumber;
    objectId = `${issuerId}.${objectSuffix}`;

    console.log(
      "Tentative de création de l'objet avec l'ID généré : " + objectId
    );

    // Vérifie si l'objet existe déjà
    const objectExists = await checkIfObjectExists(objectId);

    if (!objectExists) {
      console.log("L'objet n'existe pas encore, on peut le créer");
      break;
    } else {
      console.log("L'objet existe déjà, on en génère un nouveau");
    }
  }
  const genericObject = {
    id: objectId,
    classId: classId,
    genericType: "GENERIC_TYPE_UNSPECIFIED",
    hexBackgroundColor: "#6AA517",
    logo: {
      sourceUri: {
        uri: "https://www.espace-social.com/wp-content/uploads/2020/04/mgen-logo.jpg",
      },
    },
    cardTitle: {
      defaultValue: {
        language: "fr-FR",
        value: req.body.nom,
      },
    },
    subheader: {
      defaultValue: {
        language: "fr-FR",
        value: "Carte d'Adhérent",
      },
    },
    header: {
      defaultValue: {
        language: "fr-FR",
        value: "TIERS PAYANT MUTUALISTE",
      },
    },
    textModulesData: [
      {
        id: "numSecuSociale",
        header: "N° SÉCURITÉ SOCIALE",
        body: req.body.numSecuSociale,
      },
      {
        id: "periodeValidite",
        header: "PÉRIODE DE VALIDITÉ",
        body: "du 01/01/2021 au 31/12/2021",
      },
      {
        id: "numAdherent",
        header: "N° ADHÉRENT",
        body: "012284",
      },
      {
        id: "numAmc",
        header: "N° AMC",
        body: "774 734 488",
      },
      {
        id: "typeConv",
        header: "TYPE CONV.",
        body: "MU",
      },
      {
        id: "detailsAnnuaire",
        header: "Mutuelle inscrite dans l'annuaire AMC",
        body: "",
      },
      {
        id: "teletransmission",
        header: "Télétransmission hors sésame vitale",
        body: "Code Télétransmission : 75044075",
      },
      {
        id: "garantieTiersPayant",
        header: "Garantie Santé Tiers Payant",
        body: "Les taux s'appliquent sur la base de remboursement de la Sécurité Sociale",
      },
      {
        id: "sagesFemmes",
        header: "Médecins - Sages Femmes",
        body: "Y compris radiologues",
      },
      {
        id: "percSecuSociale",
        header: "",
        body: "Sécurité sociale à 65% : 100% \nSécurité sociale à 30% : 100% \nSécurité sociale à 15% : 15%",
      },
      {
        id: "dispositifsMedicaux",
        header: "Dispositifs Médicaux",
        body: "(Hors optique et aides auditives) \n100%",
      },
      {
        id: "labos",
        header: "Laboratoires",
        body: "100%",
      },
      {
        id: "transporteurs",
        header: "Transporteurs",
        body: "100%",
      },
      {
        id: "centreSante",
        header: "Centres de santé (hors dentaire)",
        body: "100%",
      },
      {
        id: "soinsExternes",
        header: "Soins externes (hors dentaire)",
        body: "100%",
      },
      {
        id: "cureThermale",
        header: "Cures thermales (hors hébergement)",
        body: "100%",
      },
      {
        id: "autresCategories",
        header: "Autres catégories de professionnels de santé",
        body: "(dentaire, optique, aides auditives : hors dispositifs de conventionnement avec la mutuelle) \n100%",
      },
    ],
    barcode: {
      type: "QR_CODE",
      value: `${objectId}`,
    },
    hexBackgroundColor: "#6AA517",
  };

  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: [],
    typ: "savetowallet",
    payload: {
      genericObjects: [genericObject],
    },
  };

  const token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });
  const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

  res.send(`<a href='${saveUrl}'>Ajouter à Google</a>`);
}

module.exports = {
  createPassClass,
  createPassObject,
};
