import api from './api';

// Fetch provider categories used during onboarding
export const getProviderCategoriesService = async () => {
  const response = await api.get('/api/providers/categories');
  return response.data;
};

// Fetch skills for a selected provider category
export const getProviderSkillsService = async (payload: { category: string }) => {
  const response = await api.get('/api/providers/skills', {
    params: payload,
  });
  return response.data;
};

// Fetch onboarding options for providers
export const getOnboardingOptionsService = async () => {
  const response = await api.get('/api/providers/onboarding-options');
  return response.data;
};
