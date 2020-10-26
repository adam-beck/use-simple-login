import * as React from "react";

type LoginCredentials = {
  username: string;
  password: string;
};

type State<TUser> = {
  status: "loading" | "authenticated" | "error" | "uninitialized";
  isLoading: boolean;
  user?: TUser;
  error?: string;
  login: (credentials: LoginCredentials) => Promise<void>;
};

type LoginFunction<TUser> = (credentials: LoginCredentials) => Promise<TUser>;
type BuildArguments<TUser> = {
  loginFn: LoginFunction<TUser>;
};

type Actions<TUser> =
  | { type: "INITIALIZE" }
  | { type: "SUCCESS"; user: TUser }
  | { type: "LOGOUT" }
  | { type: "ERROR"; message: string };

function buildAuthenticationContext<TUser>({ loginFn }: BuildArguments<TUser>) {
  function reducer(state: State<TUser>, action: Actions<TUser>): State<TUser> {
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

  const AuthenticationContext = React.createContext<State<TUser> | undefined>(
    undefined
  );

  const AuthenticationProvider = ({
    children,
    value,
  }: React.ProviderProps<{ onLogin?: () => void }>) => {
    const login = async (credentials: LoginCredentials) => {
      dispatch({ type: "INITIALIZE" });

      try {
        const user = await loginFn(credentials);

        dispatch({ type: "SUCCESS", user: user });

        if (value.onLogin) {
          value.onLogin();
        }
      } catch (e: unknown) {
        dispatch({ type: "ERROR", message: "ERROR HAPPENED" });
      }
    };

    const initialState: State<TUser> = {
      isLoading: false,
      status: "uninitialized",
      login: login,
    };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
      <AuthenticationContext.Provider value={state}>
        {children}
      </AuthenticationContext.Provider>
    );
  };

  const useAuthentication = () => {
    const context = React.useContext(AuthenticationContext);

    if (context === undefined) {
      throw new Error(
        "useAuthentication must be used within an AuthenicationProvider!"
      );
    }

    return context;
  };

  return { AuthenticationProvider, useAuthentication };
}

export { buildAuthenticationContext, LoginCredentials, LoginFunction };
