

import { getProfileService } from "@/src/services/profileServices";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface useProfileApiReturnType {
    isLoading: boolean;
    profile: any;
    getProfile: () => any;
}

export default function useProfileApi(): useProfileApiReturnType {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setprofile] = useState<any>(null);

    // ✅ Get Categories
    const getProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getProfileService();
            setprofile(data?.profile || data);
            return true
        } catch (error) {
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    return {
        isLoading,
        profile,
        getProfile,
    };
}
