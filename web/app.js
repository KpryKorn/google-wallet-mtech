/*
 * Copyright 2022 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// TODO: Define Issuer ID
const issuerId = "3388000000022272047";

// TODO: Define Class ID
const classId = `${issuerId}.test_class`;

const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";

const credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

async function createPassClass(req, res) {
  // TODO: Create a Generic pass class

  let genericClass = {
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

  let response;
  try {
    // Check if the class exists already
    response = await httpClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: "GET",
    });

    console.log("Class already exists");
  } catch (err) {
    if (err.response && err.response.status === 404) {
      // Class does not exist
      // Create it now
      response = await httpClient.request({
        url: `${baseUrl}/genericClass`,
        method: "POST",
        data: genericClass,
      });

      console.log("Class insert response");
      console.log(response);
    } else {
      // Something else went wrong
      console.log(err);
      res.send("Something went wrong...check the console logs!");
    }
  }
}

async function createPassObject(req, res) {
  // TODO: Create a new Generic pass for the user
  let objectSuffix = `${req.body.email.replace(/[^\w.-]/g, "_")}`;
  let objectId = `${issuerId}.${objectSuffix}`;

  let genericObject = {
    id: `${objectId}`,
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
        value: "MCFLY Marty",
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
        body: "2 73 12 22 000 000 55",
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

  // TODO: Create the signed JWT and link
  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: [],
    typ: "savetowallet",
    payload: {
      genericObjects: [genericObject],
    },
  };

  // FIX : le wallet généré dépend de l'adresse mail (et donc de l'ID) utilisé et non du code ??
  const token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });
  const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

  res.send(`<a href='${saveUrl}'><img src='wallet-button.png'></a>`);
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/", async (req, res) => {
  await createPassClass(req, res);
  await createPassObject(req, res);
});
app.listen(3000);
