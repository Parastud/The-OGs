export const Images = {
  // Onboarding
  onboarding1: require("../assets/images/onboarding1.png"),
  onboarding2: require("../assets/images/onboarding2.png"),
  onboarding3: require("../assets/images/onboarding3.png"),

  // Branding
  logo: require("../assets/images/logo.png"),
  logoWhite: require("../assets/images/logo-white.png"),
  splashBg: require("../assets/images/splash-bg.png"),

  // Avatars (placeholder/default)
  avatarDefault: require("../assets/images/avatar-default.png"),
  avatarProvider: require("../assets/images/avatar-provider.png"),

  // Empty states
  emptyJobs: require("../assets/images/empty-jobs.png"),
  emptyBids: require("../assets/images/empty-bids.png"),
  emptyNotifications: require("../assets/images/empty-notifications.png"),
  emptySearch: require("../assets/images/empty-search.png"),
  errorState: require("../assets/images/error-state.png"),

  // Categories (icons for skill category pills)
  categoryRepairs: require("../assets/images/category-repairs.png"),
  categoryTutoring: require("../assets/images/category-tutoring.png"),
  categoryDesign: require("../assets/images/category-design.png"),
  categoryTechHelp: require("../assets/images/category-tech-help.png"),
  categoryCleaning: require("../assets/images/category-cleaning.png"),
  categoryDelivery: require("../assets/images/category-delivery.png"),
  categoryPhotography: require("../assets/images/category-photography.png"),
  categoryLegal: require("../assets/images/category-legal.png"),
  categoryFitness: require("../assets/images/category-fitness.png"),
};

export type ImageKeys = keyof typeof Images;
