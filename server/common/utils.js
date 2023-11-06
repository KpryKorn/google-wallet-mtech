require("dotenv").config();

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
const token = jwt.sign(
  {
    iss: credentials.client_email,
    aud: "google",
    origins: [],
    typ: "savetowallet",
    payload: {},
  },
  credentials.private_key,
  {
    algorithm: "RS256",
  }
);
/*
/// Récupère tous les objets (pass) de la classe indiquée, sous forme de tableau d'objets "resources"
httpClient
  .request({
    url: `${baseUrl}/genericObject?classId=${classId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    console.log(res.data.resources);
  });
  */

/*
/// Récupère un objet (pass) par son id
httpClient
  .request({
    url: `${baseUrl}/genericObject/3388000000022272047.encoreNouveauPassId`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    console.log(res.data);
  });
  */

// check l'existence ou non d'un objet en fonction de l'id
module.exports = async function checkIfObjectExists(objectId) {
  try {
    const response = await httpClient.request({
      url: `${baseUrl}/genericObject/${objectId}`,
      method: "HEAD", // HEAD pour vérifier uniquement l'existence sans récupérer le contenu
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200; // Retourne true si l'objet existe, sinon false
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};
