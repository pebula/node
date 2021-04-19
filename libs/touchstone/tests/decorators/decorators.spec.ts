import {
  TouchStone,
  Suite,
  Case,
  OnAbort,
  OnCaseComplete,
  OnComplete,
  OnError,
  OnReset,
  OnStart,
  OnTouchStoneEnd,
  OnTouchStoneStart,
} from '../../src/lib/decorators';
import { decoratorStore } from '../../src/lib/store';

  describe('decorators', () => {
    it('should have all decorators registered', () => {
      [
        TouchStone,
        Suite,
        Case,
        OnAbort,
        OnCaseComplete,
        OnComplete,
        OnError,
        OnReset,
        OnStart,
        OnTouchStoneEnd,
        OnTouchStoneStart,
      ].forEach( d => {
        expect(decoratorStore.exists(d)).toBe(true);
      });
    });
});
