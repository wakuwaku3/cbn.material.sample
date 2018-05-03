export interface FormEvent<State> {
  initialize: void;
  render: Partial<State>;
}
