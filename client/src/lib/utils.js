/**
 * Check si l'utilisateur se connecte via PC ou Mobile
 * @returns {boolean} true si userAgent est un mobile
 */
export const isUserAgentMobile = () => {
  const UA = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    UA
  );
};

/**
 * Check si l'utilisateur est sur un iPhone ou un Android
 * @returns {boolean} true si userAgent est un mobile Apple
 */
export const isUserAgentIOS = () => {
  const platformOS = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(platformOS);
};
