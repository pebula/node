"use strict";(self.webpackChunkdocs_touchstone=self.webpackChunkdocs_touchstone||[]).push([[2966],{7227:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=n(6870),r=n(5569),s=n(3634);const i={id:"introduction",title:"Introduction",sidebar_label:"1. Introduction"},c=void 0,l={id:"reporters/introduction",title:"Introduction",description:"Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process.",source:"@site/docs/reporters/introduction.md",sourceDirName:"reporters",slug:"/reporters/introduction",permalink:"/node/touchstone/docs/reporters/introduction",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/reporters/introduction.md",tags:[],version:"current",frontMatter:{id:"introduction",title:"Introduction",sidebar_label:"1. Introduction"},sidebar:"sidebar",previous:{title:"3. Events",permalink:"/node/touchstone/docs/using-touchstone/events"},next:{title:"2. Simple Console Reporter",permalink:"/node/touchstone/docs/reporters/simple-console-reporter"}},a={},d=[{value:"Using a reporter",id:"using-a-reporter",level:2},{value:"External Built-In reporters",id:"external-built-in-reporters",level:2},{value:"Customizing your own reporter",id:"customizing-your-own-reporter",level:2}];function p(e){const t={admonition:"admonition",blockquote:"blockquote",br:"br",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process."}),"\n",(0,o.jsxs)(t.p,{children:["Each report implements it's own output medium (console, file, network, etc...).",(0,o.jsx)(t.br,{}),"\n","A reporter can output into multiple mediums and you can assign any number of reporters to your suite/container."]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"Touchstone"})," comes with one built in reporter and additional external built-in reports which are\nphysically part of the ",(0,o.jsx)(t.code,{children:"@pebula/touchstone"})," package but are not imported from the main module."]}),"\n",(0,o.jsx)(t.admonition,{type:"info",children:(0,o.jsx)(t.p,{children:"This is by design to prevent dependency hell since some reporters require additional 3rd party node modules which are not required by the core module."})}),"\n",(0,o.jsx)(t.h2,{id:"using-a-reporter",children:"Using a reporter"}),"\n",(0,o.jsx)(t.p,{children:"To use a reporter just mix it into a suite/container and it will just work."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-typescript",children:"import { TouchStone, SimpleConsoleReporter } from '@pebula/touchstone';\nimport './suites'; // make sure all suites are loaded\n\n@TouchStone()\nclass MyPerformanceTest extends Mixin(SimpleConsoleReporter) {\n  benchmarkOptions = {\n    delay: 0.5,\n    initCount: 5,\n  };\n}\n"})}),"\n",(0,o.jsxs)(t.admonition,{type:"info",children:[(0,o.jsx)(t.p,{children:"Note that some reporter are configurable (optional or required).\nThis is done through properties or methods provided on the mixin host."}),(0,o.jsx)(t.p,{children:"See the documentation for each reporter for details."})]}),"\n",(0,o.jsx)(t.h2,{id:"external-built-in-reporters",children:"External Built-In reporters"}),"\n",(0,o.jsxs)(t.p,{children:["An external built-int reporter is a reporter which is available when you install the ",(0,o.jsx)(t.code,{children:"@pebula/touchstone"})," module\nbut not as part of the core module. ",(0,o.jsx)(t.strong,{children:"I.E."})," You can't import it from ",(0,o.jsx)(t.code,{children:"@pebula/touchstone"})," directly."]}),"\n",(0,o.jsxs)(t.p,{children:["For example, to use ",(0,o.jsx)(s.jd,{to:"docs/reporters/pretty-console-reporter",children:(0,o.jsx)(t.code,{children:"PrettyConsoleReporter"})})," import it from ",(0,o.jsx)(t.code,{children:"@pebula/touchstone/reporters/pretty-console"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Some external reporters require dependencies and some not, see the documentation for each one to better understand each reporter and the requirements for it."}),"\n",(0,o.jsx)(t.admonition,{type:"warning",children:(0,o.jsxs)(t.p,{children:["If an external built-in reporter require dependencies you must install them.",(0,o.jsx)(t.br,{}),"\n","The dependencies of all external built-in reporters are part of the ",(0,o.jsx)(t.strong,{children:"peerDependencies"})," list of the core module."]})}),"\n",(0,o.jsx)(t.h2,{id:"customizing-your-own-reporter",children:"Customizing your own reporter"}),"\n",(0,o.jsxs)(t.p,{children:["It is easy to customize your own reporter.",(0,o.jsx)(t.br,{}),"\n",'In fact, all reports are "customized" using the same customization format.']}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:"A reporter is nothing but a class hooked into life-cycle events"})}),"\n",(0,o.jsx)(t.p,{children:"Here's the gist of it:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-typescript",children:"import {\n  OnStart,\n  OnCaseComplete,\n  OnComplete,\n  OnTouchStoneStart,\n  OnTouchStoneEnd,\n  OnError,\n  SuiteStartEvent,\n  CaseCompleteEvent,\n  SuiteErrorEvent,\n  SuiteCompleteEvent,\n  TouchStoneStartEvent,\n  TouchStoneEndEvent\n} from '@pebula/touchstone';\n\nexport abstract class SimpleConsoleReporter {\n\n  @OnTouchStoneStart() // Do something when we start benchmarking\n  onSimpleConsoleReporterInitialize(event: TouchStoneStartEvent) { }\n\n  @OnStart() // Do something when we start benchmarking a new suite\n  onSimpleConsoleReporterStart(event: SuiteStartEvent) { }\n\n  @OnCaseComplete() // Do something when we end benchmarking a case\n  onSimpleConsoleReporterCycle(event: CaseCompleteEvent) { }\n\n  @OnError() // Do something when there is an error while benchmarking\n  onSimpleConsoleReporterError(event: SuiteErrorEvent) { }\n\n  @OnComplete() // Do something when we end benchmarking a suite\n  onSimpleConsoleReporterComplete(event: SuiteCompleteEvent) { }\n\n  @OnTouchStoneEnd() // Do something when all suites are benchmarked and we're about to end the process\n  onSimpleConsoleReporterFinalize(event: TouchStoneEndEvent) { }\n\n}\n"})}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsx)(t.p,{children:"Note that not all events we're used in the above template"}),"\n"]})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},3634:(e,t,n)=>{n.d(t,{z7:()=>u,jd:()=>h,O2:()=>m});var o=n(6326),r=n(5519),s=n(828),i=n(3252),c=n(6870);var l=n(1959),a=n(3129);const d={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},p={codeSnippet:"codeSnippet_FY5W"};function u(e){const t=(0,s.A)().siteConfig.themeConfig.prism||{},[n,r]=(0,o.useState)(!1);(0,o.useEffect)((()=>{r(!0)}),[]);const{isDarkTheme:i}=(0,l.G)(),u=t.theme||d,h=t.darkTheme||u,m=i?h:u,{lang:x="yaml",snippet:b}=e;return(0,c.jsx)(a.f4,{theme:m,code:b,language:x,children:e=>{let{className:t,style:n,tokens:o,getLineProps:r,getTokenProps:s}=e;return(0,c.jsx)("pre",{className:`${t} ${p.codeSnippet}`,style:n,children:o.map(((e,t)=>(0,c.jsx)("div",{...r({line:e,key:t}),children:e.map(((e,t)=>(0,c.jsx)("span",{...s({token:e,key:t})})))})))})}})}function h(e){const{to:t}=e;return(0,c.jsx)(i.A,{to:(0,r.A)(t),children:e.children})}function m(e){const{to:t}=e;return(0,c.jsx)("a",{href:(0,r.A)(t),target:"_blank",children:e.children})}},5569:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>c});var o=n(6326);const r={},s=o.createContext(r);function i(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);