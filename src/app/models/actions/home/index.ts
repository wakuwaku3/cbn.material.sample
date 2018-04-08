export interface HomeIndexStore {
    name: string;
    count: number;
}
export interface HomeIndexEvent {
    setName: string;
    initialize: void;
    count: void;
}
