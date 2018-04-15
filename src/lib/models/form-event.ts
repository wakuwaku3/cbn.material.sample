export interface FormEvent<State> extends Event {
    initialize: void;
    render: Partial<State>;
}
