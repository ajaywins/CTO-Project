import { AuthenticationError } from 'apollo-server-express';

export const useAuthValidator = (context) => {
    const { currentUser } = context;
    if (!currentUser) {
        throw new AuthenticationError('Authentication is required');
    }
    if (currentUser._id || currentUser.organizationId) {
        throw new AuthenticationError('Authentication is required');
    }
}
