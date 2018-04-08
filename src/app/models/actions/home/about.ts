export interface HomeAboutStore {
    counter: number;
    header: string;
}
export interface HomeAboutEvent {
    initialize: void;
    clickOperateCounterButton: boolean;
    counterChanged: number;
}
