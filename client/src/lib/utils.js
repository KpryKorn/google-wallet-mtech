/**
 * Check si l'utilisateur se connecte via PC ou Mobile
 * @returns {boolean} true si userAgent est un mobile
 */
export const isUserAgentMobile = () => {
  return navigator.userAgentData.mobile;
};

/**
 * Check si l'utilisateur est sur un iPhone ou un Android
 * @returns {boolean} true si userAgent est un mobile Apple
 */
export const isUserAgentIOS = () => {
  const platformOS = navigator.userAgentData.platform;
  return /iPhone|iPad|iPod/i.test(platformOS);
};
