import { MethodDecoratorOf } from '@pebula/decorate';
import { decoratorStore } from '../store';
import {
  CaseCompleteEvent,
  SuiteStartEvent,
  SuiteAbortEvent,
  SuiteCompleteEvent,
  SuiteErrorEvent,
  SuiteResetEvent,
  TouchStoneStartEvent, TouchStoneEndEvent,
} from '../runner/events';

export const OnStart = decoratorStore.createDecorator<MethodDecoratorOf<[SuiteStartEvent], boolean | void>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnCaseComplete = decoratorStore.createDecorator<MethodDecoratorOf<[CaseCompleteEvent], boolean | void>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnAbort = decoratorStore.createDecorator<MethodDecoratorOf<[SuiteAbortEvent], void>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnError = decoratorStore.createDecorator<MethodDecoratorOf<[SuiteErrorEvent], void>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnReset = decoratorStore.createDecorator<MethodDecoratorOf<[SuiteResetEvent], void>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnComplete = decoratorStore.createDecorator<MethodDecoratorOf<[SuiteCompleteEvent], boolean | void>>({ allowMulti: true, allowedScopes: ['method'] });

export const OnTouchStoneStart = decoratorStore.createDecorator<MethodDecoratorOf<[TouchStoneStartEvent], any>>({ allowMulti: true, allowedScopes: ['method'] });
export const OnTouchStoneEnd = decoratorStore.createDecorator<MethodDecoratorOf<[TouchStoneEndEvent], any>>({ allowMulti: true, allowedScopes: ['method'] });
