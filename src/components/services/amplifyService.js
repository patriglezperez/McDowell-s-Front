import { Auth } from "aws-amplify";

export default class AmplifyService {

    static signUp = async (userInput) => {
        try {
            const { user } = await Auth.signUp({
                username: userInput.email,
                password: userInput.password,
                attributes: {
                    email: userInput.email,
                }
            });
            return [user, undefined];
        } catch (error) {
            return [undefined, error];
        }
    }

    static signIn = async (userInput) => {
        try {
            const user = await Auth.signIn(userInput.email, userInput.password);
            return [user, undefined];
        } catch (error) {
            return [undefined, error];
        }
    }

    static retrieveCurrentUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            return [user, undefined]; 
        } catch (error) {
            return [undefined, error];
        }
    }

    static signOut = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            return error;
        }
    }
}