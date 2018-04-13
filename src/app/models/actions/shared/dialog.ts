export interface DialogStore extends DialogContent {
    mode: 'none' | 'simple' | 'yesno';
    title: string;
    text: string;
    callBack: (yes?: boolean) => void;
}
export interface DialogContent {
    title: string;
    text: string;
    callBack: (yes?: boolean) => void;
}
