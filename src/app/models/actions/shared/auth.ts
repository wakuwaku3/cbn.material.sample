export interface AuthStore {
    authenticated: boolean;
}
export interface LogInEventArgs {
    id: string;
    password: string;
    callBackHasError: (message: string) => void;
}
export interface AuthEvent {
    login: LogInEventArgs;
    logout: void;
}
