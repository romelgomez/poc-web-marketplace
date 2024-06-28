import { useAuth } from '@clerk/nextjs';

export const useClerkAuth = () => {
  const { getToken } = useAuth();

  const getAuthToken = async () => {
    const token = await getToken({ template: 'access_token' });

    return token;
  };

  return { getAuthToken };
};
