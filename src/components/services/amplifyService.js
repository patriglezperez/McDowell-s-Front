import { Auth } from 'aws-amplify';

let user = {};
const tokenKeyNames = { idToken: 'idToken', refreshToken: 'refreshToken', userId: 'userId' };
const exceptions = { setNewPassword: 'NEW_PASSWORD_REQUIRED', refreshSession: 'NotAuthorizedException', usernameExists: 'UsernameExistsException', userNotConfirmed: 'UserNotConfirmedException', userNotFound: 'UserNotFoundException' };
let defaultLocalStorage;
if (typeof window !== 'undefined') {
    defaultLocalStorage = { ...localStorage };
}

function setInLocalStorage(keys, values) {
    for (let i = 0; i < keys.length; i++) {
        localStorage.setItem(keys[i], values[i]);
    }
}

function removeFromLocalStorage(keys) {
    for (let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
    }
}

function setDefaultLocalStorage() {
    localStorage.clear();
    Object.entries(defaultLocalStorage).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

export default class AmplifyService {
    static failed = 0;
    static success = 1;
    static newPasswordRequired = 2;
    static sessionExpired = 3;
    static userExists = 4;
    static userNotConfirmed = 5;
    static userNotFound = 6;

    static signUp = async (userInput) => {
        try {
            const { user } = await Auth.signUp({
                username: userInput.email,
                password: userInput.password,
                attributes: {
                    email: userInput.email,
                }
            });
            return this.success;
        } catch (error) {
            if (error.name === exceptions.usernameExists) {
                return this.userExists;
            } else {
                return this.failed;
            }
        }
    }

    static signIn = async (userInput) => {
        try {
            user = await Auth.signIn(userInput.email, userInput.password);
            if (user.challengeName === exceptions.setNewPassword) {
                return this.newPasswordRequired;
            } else {
                setDefaultLocalStorage();
                const keys = [tokenKeyNames.idToken, tokenKeyNames.refreshToken, tokenKeyNames.userId];
                const values = [user.signInUserSession.idToken.jwtToken, user.signInUserSession.refreshToken.token, user.attributes.sub]
                setInLocalStorage(keys, values);
                return this.success;
            }
        } catch (error) {
            //remove this depending on final sign up workflow
            if (error.name === exceptions.userNotConfirmed) {
                return this.userNotConfirmed;
            } else if (error.name === exceptions.userNotFound) {
                return this.userNotFound;
            } else {
                return this.failed;
            }
        }
    }

    //This is used when a user is created directly from the cognito console
    //we'll have to decide the workflow we want, but just in case I'll leave it here for now
    static completePassword = async (userInput) => {
        try {
            await Auth.completeNewPassword(
                user,
                userInput.newPassword
            );
            setDefaultLocalStorage();
            const keys = [tokenKeyNames.idToken, tokenKeyNames.refreshToken, tokenKeyNames.userId];
            const values = [user.signInUserSession.idToken.jwtToken, user.signInUserSession.refreshToken.token, user.attributes.sub]
            setInLocalStorage(keys, values);
            return this.success;
        } catch (error) {
            if (error._type === exceptions.refreshSession) {
                return this.sessionExpired;
            }
            return this.failed;
        }
    }

    static signOut = async () => {
        try {
            await Auth.signOut();
            const keys = [tokenKeyNames.idToken, tokenKeyNames.refreshToken, tokenKeyNames.userId];
            removeFromLocalStorage(keys);
            return this.success;
        } catch (error) {
            return this.failed;
        }
    }
}