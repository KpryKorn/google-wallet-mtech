const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

async function zipAndRename() {
  const output = fs.createWriteStream("CarteAdherent.zip");
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise((resolve, reject) => {
    // Écrit l'archive sur le disque
    output.on("close", () => {
      console.log("Archive créée avec succès");
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Ajoute le dossier à l'archive
    archive.directory(path.join(__dirname, "../iOS/CarteAdherent.pass"), false);

    // Finalise l'archive
    archive.finalize();
  });

  // Après avoir créé l'archive, on la renomme en .pkpass
  await new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(__dirname, "../CarteAdherent.zip"))) {
      fs.rename("CarteAdherent.zip", "CarteAdherent.pass", (err) => {
        if (err) reject(err);
        console.log("Le fichier a été renommé avec succès");
        resolve();
      });
    }
  });
}

module.exports = { zipAndRename };
