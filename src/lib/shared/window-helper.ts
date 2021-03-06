import { EventSubject } from './frxp';

interface WindowEvent {
  resize: UIEvent;
  beforeunload: BeforeUnloadEvent;
  storage: StorageEvent;
}
const subject = new EventSubject<WindowEvent>();
window.addEventListener('resize', e => {
  subject.next('resize', e);
});
window.addEventListener('beforeunload', e => {
  subject.next('beforeunload', e);
});
window.addEventListener('storage', e => {
  subject.next('storage', e);
});
export const observeWindow = <TKey extends keyof WindowEvent>(key: TKey) =>
  subject.observe(key);
export function getScrollBarWidth() {
  const inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 === w2) { w2 = outer.clientWidth; }

  document.body.removeChild(outer);

  return w1 - w2;
}
