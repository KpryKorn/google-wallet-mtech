# Google Wallet MGEN

Cette application permet de générer des "Google Pass" similaire à ceux du Wallet iOS.
Ils viennent s'intégrer dans le compte Google associé et sont utilisables au quotidien.

## Un pass générique

Cette application génère donc des passes dits "génériques" => liberté dans la création de ces derniers, et parfait pour l'utilisation de la carte adhérent MGEN.

---

## Comment utiliser cette application ?

Pour utiliser cette application, il y a plusieurs prérequis :

- Posséder Node et NPM
- Se rendre dans le dossier `web` du projet : `cd web`
- Installer les dépendances nécessaires au projet (Serveur Express, JSON Web Token), dans le dossier web `npm install`
- Ouvrir le fichier `id.txt` et copier la commande Shell (Windows) ou Bash (Mac) en fonction du système d'exploitation, puis éxécuter cette commande dans son terminal
- Exécuter `node app.js` dans son terminal, le serveur run sur `localhost:3000`
- Renseigner le mail à associer au Pass à créer, that's it!
