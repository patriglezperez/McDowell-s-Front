import { Auth } from 'aws-amplify';

let user = {};
// key names of the entries we'll keep in the localStorage;
const tokenKeyNames = { idToken: 'idToken', refreshToken: 'refreshToken', userId: 'userId' };
// all posible exceptions for our current amplify functions;
const exceptions = { refreshSession: 'NotAuthorizedException', userExists: 'UsernameExistsException', userNotConfirmed: 'UserNotConfirmedException', userNotFound: 'UserNotFoundException' };

let defaultLocalStorage;
if (typeof window !== 'undefined') {
    defaultLocalStorage = { ...localStorage };
}

// used to save idToken, refreshToken and userId in the localStorage;
function setInLocalStorage(keys, values) {
    for (let i = 0; i < keys.length; i++) {
        localStorage.setItem(keys[i], values[i]);
    }
}

// used to remove idToken, refreshToken and userId from the localStorage;
function removeFromLocalStorage(keys) {
    for (let i = 0; i < keys.length; i++) {
        localStorage.removeItem(keys[i]);
    }
}

// wipes localStorage to avoid saving not needed data from amplify;
// but keeps any non-amplify-related entries;
function setDefaultLocalStorage() {
    localStorage.clear();
    Object.entries(defaultLocalStorage).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
}

export default class AmplifyService {
    static responses = { failed: 0, success: 1, newPasswordRequired: 2, sessionExpired: 3, userExists: 4, userNotConfirmed: 5, userNotFound: 6 };

    static signUp = async (userInput) => {
        try {
            const { user } = await Auth.signUp({
                username: userInput.email,
                password: userInput.password,
                attributes: {
                    email: userInput.email,
                }
            });
            return this.responses.success;
        } catch (error) {
            if (error.name === exceptions.userExists) {
                return this.responses.userExists;
            } else {
                return this.responses.failed;
            }
        }
    }

    static signIn = async (userInput) => {
        try {
            user = await Auth.signIn(userInput.email, userInput.password);
            setDefaultLocalStorage();
            const keys = [tokenKeyNames.idToken, tokenKeyNames.refreshToken, tokenKeyNames.userId];
            const values = [user.signInUserSession.idToken.jwtToken, user.signInUserSession.refreshToken.token, user.attributes.sub]
            setInLocalStorage(keys, values);
            return this.responses.success;
        } catch (error) {
            if (error.name === exceptions.userNotConfirmed) {
                return this.responses.userNotConfirmed;
            } else if (error.name === exceptions.userNotFound) {
                return this.responses.userNotFound;
            } else {
                return this.responses.failed;
            }
        }
    }

    static signOut = async () => {
        try {
            await Auth.signOut();
            const keys = [tokenKeyNames.idToken, tokenKeyNames.refreshToken, tokenKeyNames.userId];
            removeFromLocalStorage(keys);
            return this.responses.success;
        } catch (error) {
            return this.responses.failed;
        }
    }
}