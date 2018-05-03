export class EventReducer {
  private flag = false;
  constructor(private duration: number) {}
  public reduce = (callback: () => any) => {
    if (!this.flag) {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, this.duration);
      callback();
    }
  };
}
