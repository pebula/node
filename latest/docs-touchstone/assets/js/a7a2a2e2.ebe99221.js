"use strict";(self.webpackChunkdocs_touchstone=self.webpackChunkdocs_touchstone||[]).push([[9906],{6955:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var o=t(6870),s=t(5569);const r={id:"events",title:"Events",sidebar_label:"3. Events"},i=void 0,c={id:"using-touchstone/events",title:"Events",description:"Life cycle events are called on various steps of the benchmarking process.",source:"@site/docs/using-touchstone/events.md",sourceDirName:"using-touchstone",slug:"/using-touchstone/events",permalink:"/node/touchstone/docs/using-touchstone/events",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/using-touchstone/events.md",tags:[],version:"current",frontMatter:{id:"events",title:"Events",sidebar_label:"3. Events"},sidebar:"sidebar",previous:{title:"2. Suites & Cases",permalink:"/node/touchstone/docs/using-touchstone/suites-and-cases"},next:{title:"1. Introduction",permalink:"/node/touchstone/docs/reporters/introduction"}},a={},l=[{value:"Naming event methods",id:"naming-event-methods",level:2}];function d(e){const n={admonition:"admonition",br:"br",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["Life cycle events are called on various steps of the benchmarking process.",(0,o.jsx)(n.br,{}),"\n","We register to an event by decorating it with the relevant decorator to the event we want to register to."]}),"\n",(0,o.jsxs)(n.p,{children:["Each event is fired with a fully typed event object, some are enriched (from ",(0,o.jsx)(n.code,{children:"benchmark.js"}),") and some are passed as is."]}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["Except ",(0,o.jsx)(n.code,{children:"OnTouchStoneStart"})," and ",(0,o.jsx)(n.code,{children:"OnTouchStoneEnd"})," all events are originated from ",(0,o.jsx)(n.code,{children:"benchmark.js"}),", you can also\nread the documentation from ",(0,o.jsx)(n.code,{children:"benchmark.js"})," to get better insight on each event."]})}),"\n",(0,o.jsx)(n.p,{children:"Here's a template class with all event decorators and event objects hooked:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import {\n  OnStart,\n  OnCaseComplete,\n  OnComplete,\n  OnTouchStoneStart,\n  OnTouchStoneEnd,\n  OnError,\n  OnAbort,\n  OnReset,\n  SuiteStartEvent,\n  CaseCompleteEvent,\n  SuiteErrorEvent,\n  SuiteAbortEvent,\n  SuiteResetEvent,\n  SuiteCompleteEvent,\n  TouchStoneStartEvent,\n  TouchStoneEndEvent\n} from '@pebula/touchstone';\n\nexport abstract class SimpleConsoleReporter {\n\n  @OnTouchStoneStart() // Do something when we start benchmarking\n  onSimpleConsoleReporterInitialize(event: TouchStoneStartEvent) { }\n\n  @OnStart() // Do something when we start benchmarking a new suite\n  onSimpleConsoleReporterStart(event: SuiteStartEvent) { }\n\n  @OnCaseComplete() // Do something when we end benchmarking a case\n  onSimpleConsoleReporterCycle(event: CaseCompleteEvent) { }\n\n  @OnError() // Do something when there is an error while benchmarking\n  onSimpleConsoleReporterError(event: SuiteErrorEvent) { }\n\n  @OnAbort() // Do something when there is an abort signal\n  onSimpleConsoleReporterAbort(event: SuiteAbortEvent) { }\n\n  @OnReset() // Do something when there is a benchmark.js reset event\n  onSimpleConsoleReporterReset(event: OnAbort) { }\n\n  @OnComplete() // Do something when we end benchmarking a suite\n  onSimpleConsoleReporterComplete(event: SuiteCompleteEvent) { }\n\n  @OnTouchStoneEnd() // Do something when all suites are benchmarked and we're about to end the process\n  onSimpleConsoleReporterFinalize(event: TouchStoneEndEvent) { }\n\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"naming-event-methods",children:"Naming event methods"}),"\n",(0,o.jsx)(n.p,{children:"Since most classes in touchstone are destined to be mixed in to a main container class, it is best to\nset unique names to your decorated methods."}),"\n",(0,o.jsxs)(n.p,{children:["This is true to all events but for decorated ",(0,o.jsx)(n.code,{children:"Case"})," methods as well."]}),"\n",(0,o.jsx)(n.p,{children:"This will prevent type conflicts when mixing them all into a single class."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},5569:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>c});var o=t(6326);const s={},r=o.createContext(s);function i(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);