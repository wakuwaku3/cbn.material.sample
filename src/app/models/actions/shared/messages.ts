export interface Messages {
    errorMessage: string;
}
export interface MessagesStore extends Messages {
    isShow: boolean;
}
export interface MessagesEvent {
    initialize: void;
    handleOpen: Messages;
    handleClose: string;
}
