import * as React from "react";
declare type LoginCredentials = {
    username: string;
    password: string;
};
declare type State<TUser> = {
    status: "loading" | "authenticated" | "error" | "uninitialized";
    isLoading: boolean;
    user?: TUser;
    error?: string;
    login: (credentials: LoginCredentials) => Promise<void>;
};
declare type LoginFunction<TUser> = (credentials: LoginCredentials) => Promise<TUser>;
declare type BuildArguments<TUser> = {
    loginFn: LoginFunction<TUser>;
};
declare function buildAuthenticationContext<TUser>({ loginFn }: BuildArguments<TUser>): {
    AuthenticationProvider: ({ children, value, }: React.ProviderProps<{
        onLogin?: () => void;
    }>) => JSX.Element;
    useAuthentication: () => State<TUser>;
};
export { buildAuthenticationContext, LoginCredentials, LoginFunction };
//# sourceMappingURL=index.d.ts.map