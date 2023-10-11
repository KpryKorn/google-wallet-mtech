const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

// monte les routes API sous le préfixe /api
app.use("/api", apiRoutes);

// middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
