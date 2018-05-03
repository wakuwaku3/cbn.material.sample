import { Observable } from 'rxjs/Observable';
import { RenderEvent } from './render-event';

export interface RenderObservable {
  observeRender(): Observable<RenderEvent['render']>;
}
