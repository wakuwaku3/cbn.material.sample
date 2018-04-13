import { Message } from './messages';

export interface AuthStore {
    authenticated: boolean;
}
export interface LogInEventArgs {
    id: string;
    password: string;
    callBackHasError: (message: Message) => void;
}
export interface AuthEvent {
    login: LogInEventArgs;
    logout: void;
}
