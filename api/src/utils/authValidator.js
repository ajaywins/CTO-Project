import { AuthenticationError } from 'apollo-server-express';

export const useAuthValidator = (context) => {
    const { currentUser } = context;
    if (!currentUser) {
        throw new AuthenticationError('Authentication is required');
    }
    if (!currentUser._id.role === "Admin"||!currentUser._id.role === "SuperAdmin") {
        throw new AuthenticationError('Authentication is required');
    }
}