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
declare type BuildArguments<TUser> = {
    login: string | ((credentials: LoginCredentials) => Promise<TUser>);
};
declare function buildAuthenticationContext<TUser>({ login }: BuildArguments<TUser>): {
    AuthenticationProvider: ({ children, value, }: React.ProviderProps<{
        onLogin?: () => void;
    }>) => JSX.Element;
    useAuthentication: () => State<TUser>;
};
export { buildAuthenticationContext, LoginCredentials };
//# sourceMappingURL=index.d.ts.map