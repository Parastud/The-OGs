import { gql } from "@apollo/client";

export const GET_PROVIDER_CATEGORIES = gql`
  query ProviderCategories {
    providerCategories
  }
`;

export const GET_PROVIDER_SKILLS = gql`
  query ProviderSkills($category: String!) {
    providerSkills(category: $category)
  }
`;

export const GET_ONBOARDING_OPTIONS = gql`
  query OnboardingOptions {
    onboardingOptions {
      categories {
        name
        skills
      }
      govtIdTypes
      availableDays
      preferredWorkHours
      languages
    }
  }
`;

export const UPDATE_PROVIDER_PROFILE = gql`
  mutation UpdateProviderProfile(
    $phone: String!
    $input: UpdateProviderProfileInput!
  ) {
    updateProviderProfile(phone: $phone, input: $input) {
      _id
      fullname
      email
      phone
      role
      providerProfile {
        profilePhotoUrl
        cityArea
        govtId {
          idType
          idNumber
        }
        verificationBadge
        category
        yearsOfExperience
        skills
        bio
        availability {
          availableDays
          preferredWorkHours
        }
        startingPrice
        portfolioPhotos
        certifications {
          text
          photoUrl
        }
        whatsappNumber
        languagesSpoken
      }
    }
  }
`;