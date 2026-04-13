import {
    GET_PROVIDER_CATEGORIES,
    GET_PROVIDER_SKILLS,
    UPDATE_PROVIDER_PROFILE,
} from "@/src/services/ProviderAuth";

import {
    showSnackbarError,
    showSnackbarSuccess,
} from "@/src/redux/slices/snackbar.slice";

import { getErrorMessage } from "@/src/utils/utils";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useDispatch } from "react-redux";

interface UseProviderApiReturnType {
    isLoading: boolean;
    getCategories: () => any;
    getSkills: (payload: { category: string }) => any;
    updateProviderProfile: (payload: {
        phone: string;
        input: any;
    }) => any;
}

interface ProviderSkillsResponse {
    providerSkills: string[];
}

interface ProviderCategoriesResponse {
    providerCategories: string[];
}

interface UpdateProviderProfileResponse {
    updateProviderProfile: any;
}

export default function useProviderApi(): UseProviderApiReturnType {
    const dispatch = useDispatch();

    const [fetchCategories, { loading: categoriesLoading }] =
        useLazyQuery<ProviderCategoriesResponse>(GET_PROVIDER_CATEGORIES);

    const [fetchSkills, { loading: skillsLoading }] =
        useLazyQuery<ProviderSkillsResponse>(GET_PROVIDER_SKILLS);

    const [updateProfileMutation, { loading: updateLoading }] =
        useMutation<UpdateProviderProfileResponse>(UPDATE_PROVIDER_PROFILE);

    const isLoading =
        categoriesLoading || skillsLoading || updateLoading;

    // ✅ Get Categories
    const getCategories = async () => {
        try {
            const { data } = await fetchCategories();

            return data?.providerCategories || [];
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            dispatch(showSnackbarError({ message: errorMessage }));
            return [];
        }
    };

    // ✅ Get Skills by Category
    const getSkills = async ({ category }: { category: string }) => {
        try {
            const { data } = await fetchSkills({
                variables: { category },
            });

            return data?.providerSkills || [];
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            dispatch(showSnackbarError({ message: errorMessage }));
            return [];
        }
    };

    // ✅ Update Provider Profile
    const updateProviderProfile = async ({
        phone,
        input,
    }: {
        phone: string;
        input: any;
    }) => {
        try {
            const { data } = await updateProfileMutation({
                variables: { phone, input },
            });

            const response = data?.updateProviderProfile;

            if (response) {
                dispatch(
                    showSnackbarSuccess({
                        message: "Profile updated successfully",
                    })
                );
                return true;
            }

            return false;
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            dispatch(showSnackbarError({ message: errorMessage }));
            return false;
        }
    };

    return {
        isLoading,
        getCategories,
        getSkills,
        updateProviderProfile,
    };
}