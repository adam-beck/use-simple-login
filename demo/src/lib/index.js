import * as React from "react";
import axios from "axios";
function buildAuthenticationContext({ login }) {
    function reducer(state, action) {
        switch (action.type) {
            case "INITIALIZE": {
                return {
                    ...state,
                    isLoading: true,
                    status: "loading",
                };
            }
            case "SUCCESS": {
                return {
                    ...state,
                    user: action.user,
                    isLoading: false,
                    status: "authenticated",
                };
            }
            case "LOGOUT": {
                return {
                    ...state,
                    user: undefined,
                    isLoading: false,
                    status: "uninitialized",
                };
            }
            case "ERROR": {
                return {
                    ...state,
                    isLoading: false,
                    error: action.message,
                    user: undefined,
                };
            }
        }
    }
    const AuthenticationContext = React.createContext(undefined);
    const AuthenticationProvider = ({ children, value, }) => {
        const defaultLogin = async (credentials) => {
            let user;
            dispatch({ type: "INITIALIZE" });
            try {
                if (typeof login === "string") {
                    const response = await axios.post(login, credentials);
                    user = response.data.user;
                }
                else {
                    user = await login(credentials);
                }
                dispatch({ type: "SUCCESS", user: user });
                if (value.onLogin) {
                    value.onLogin();
                }
            }
            catch (e) {
                dispatch({ type: "ERROR", message: "ERROR HAPPENED" });
            }
        };
        const initialState = {
            isLoading: false,
            status: "uninitialized",
            login: defaultLogin,
        };
        const [state, dispatch] = React.useReducer(reducer, initialState);
        return (React.createElement(AuthenticationContext.Provider, { value: state }, children));
    };
    const useAuthentication = () => {
        const context = React.useContext(AuthenticationContext);
        if (context === undefined) {
            throw new Error("useAuthentication must be used within an AuthenicationProvider");
        }
        return context;
    };
    return { AuthenticationProvider, useAuthentication };
}
export { buildAuthenticationContext };
