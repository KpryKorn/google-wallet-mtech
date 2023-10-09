// au chargement de la fenêtre, check si userAgent est un mobile
export const isUserAgentMobile = () => {
  const UA = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    UA
  );
  // renvoie "true" ou "false"
};
