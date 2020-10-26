import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
function buildAuthenticationContext({ loginFn }) {
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
        const login = async (credentials) => {
            dispatch({ type: "INITIALIZE" });
            try {
                const user = await loginFn(credentials);
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
            login: login,
        };
        const [state, dispatch] = React.useReducer(reducer, initialState);
        return (_jsx(AuthenticationContext.Provider, Object.assign({ value: state }, { children: children }), void 0));
    };
    const useAuthentication = () => {
        const context = React.useContext(AuthenticationContext);
        if (context === undefined) {
            throw new Error("useAuthentication must be used within an AuthenicationProvider!");
        }
        return context;
    };
    return { AuthenticationProvider, useAuthentication };
}
export { buildAuthenticationContext };
//# sourceMappingURL=index.js.map