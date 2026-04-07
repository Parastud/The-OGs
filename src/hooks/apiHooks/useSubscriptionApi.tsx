import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { showSnackbarError } from '../../redux/slices/snackbar.slice';
import { getErrorMessage, getErrors } from '../../utils/utils';
import { getCurrentSubscriptionsService } from '../../services/newServices/SubscriptionApiServices';

interface Plan {
  owner_id: number;
  plan_id: number;
  plan_name: string;
  description: string;
  price: number;
  duration: number;
  no_of_site: number;
  no_of_tenant: number;
  features: string;
}

interface useSubscriptionApiReturnType {
  plans: Plan[];
  isLoading: boolean;
  getCurrentSubscriptions: () => Promise<void>;
}

export default function useSubscriptionApi(): useSubscriptionApiReturnType {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentSubscriptions = async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      const res = await getCurrentSubscriptionsService({});
      setPlans(res?.data?.plans ?? []);
    } catch (err: any) {
      dispatch(showSnackbarError({ message: getErrorMessage(err) }));
      console.log('getCurrentSubscriptions error:', getErrors(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    plans,
    isLoading,
    getCurrentSubscriptions,
  };
}