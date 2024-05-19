"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[5591],{954:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var s=n(4848),r=n(8453),i=n(6640);const o={id:"basic-example",title:"Basic Usage",sidebar_label:"3. Basic Usage"},a=void 0,c={id:"getting-started/basic-example",title:"Basic Usage",description:"To run a benchmark you need",source:"@site/docs/getting-started/basic-example.md",sourceDirName:"getting-started",slug:"/getting-started/basic-example",permalink:"/node/docs-touchstone/docs/getting-started/basic-example",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/getting-started/basic-example.md",tags:[],version:"current",frontMatter:{id:"basic-example",title:"Basic Usage",sidebar_label:"3. Basic Usage"},sidebar:"sidebar",previous:{title:"2. Installation",permalink:"/node/docs-touchstone/docs/getting-started/installation"},next:{title:"1. Suite Container",permalink:"/node/docs-touchstone/docs/using-touchstone/suite-container"}},l={},d=[{value:"Reports",id:"reports",level:2}];function u(e){const t={admonition:"admonition",br:"br",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"To run a benchmark you need"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["At least one benchmark ",(0,s.jsx)(t.strong,{children:"Case"})]}),"\n",(0,s.jsxs)(t.li,{children:["At least one ",(0,s.jsx)(t.strong,{children:"Suite"}),", grouping the case/s."]}),"\n",(0,s.jsx)(t.li,{children:"A touchstone configuration container, used for configuration, composition, etc... (not mandatory)"}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["We start with a ",(0,s.jsx)(t.strong,{children:"Suite"})," and 2 ",(0,s.jsx)(t.strong,{children:"Cases"})," benchmarks:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"import { Suite, Case, touchStone } from '@pebula/touchstone';\n\n@Suite({ name: 'My First Benchmark Suite' })\nclass MyFirstBenchmarkSuite {\n @Case({ name: 'my-first-benchmark' })\n  firstBenchmark() {\n    /* Benchmarking... */\n  }\n\n  @Case()\n  async secondBenchmark() {\n     // Will automatically detect that it's async. Name is taken from method name.\n    /* Benchmarking... */\n  }\n}\n\n// await touchStone(); // for top level await\ntouchStone()\n    .then( () => console.log('Done') )\n    .catch( err => console.error(err) );\n"})}),"\n",(0,s.jsx)(t.p,{children:"We can add more suites with cases or add cases to the existing suite."}),"\n",(0,s.jsxs)(t.p,{children:["At this point we can call ",(0,s.jsx)(t.code,{children:"await touchStone()"})," to execute the suite/s.",(0,s.jsx)(t.br,{}),"\n",(0,s.jsx)(t.code,{children:"touchStone()"})," will run go over all suites and execute all cases within each suite."]}),"\n",(0,s.jsxs)(t.p,{children:["Something is missing though, it will not report anything, we need a ",(0,s.jsx)(t.strong,{children:"reporter"})," for that..."]}),"\n",(0,s.jsx)(t.h2,{id:"reports",children:"Reports"}),"\n",(0,s.jsx)(t.p,{children:"Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process."}),"\n",(0,s.jsx)(t.p,{children:"Each report implements it's own output medium, let's add the default console reporter:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-typescript",children:"import { Suite, Case, SimpleConsoleReporter } from '@pebula/touchstone';\n\n@Suite({ name: 'My First Benchmark Suite' })\nclass MyFirstBenchmarkSuite extends Mixin(SimpleConsoleReporter) {\n @Case({ name: 'my-first-benchmark' })\n  firstBenchmark() {\n    /* Benchmarking... */\n  }\n\n  @Case()\n  async secondBenchmark() {\n     // Will automatically detect that it's async. Name is taken from method name.\n    /* Benchmarking... */\n  }\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Note that all we do here is ",(0,s.jsx)(t.strong,{children:"extend"})," our suite with the reporter class using the ",(0,s.jsx)(t.code,{children:"Mixin"})," function."]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"A report can output to multiple mediums, it is up to the implementation of each report"}),"\n",(0,s.jsxs)(t.li,{children:["You can ",(0,s.jsx)(t.strong,{children:"mixin"})," multiple reports."]}),"\n"]})}),"\n",(0,s.jsxs)(t.p,{children:["This is pretty simple and will work with multiple suite's as well.",(0,s.jsx)(t.br,{}),"\n","You can configure a different reporter for different suites but it is also harder to manage."]}),"\n",(0,s.jsxs)(t.p,{children:["To help managing the suite, creating a shared configuration and automate execution use the ",(0,s.jsx)(i.jd,{to:"docs/using-touchstone/suite-container",children:"suite container"}),"."]}),"\n",(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsx)(t.p,{children:"A reporter is nothing but a class which hooks into life cycle events from the benchmarking process."})}),"\n",(0,s.jsxs)(t.p,{children:["You can read more about reporters, starting from the ",(0,s.jsx)(i.jd,{to:"docs/reporters/introduction",children:"reporters introduction"})]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},6640:(e,t,n)=>{n.d(t,{z7:()=>h,jd:()=>p,O2:()=>m});var s=n(6540),r=n(6025),i=n(4586),o=n(8774),a=n(4848);var c=n(5293),l=n(1765);const d={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},u={codeSnippet:"codeSnippet_KFiO"};function h(e){var t=(0,i.A)().siteConfig.themeConfig.prism||{},n=(0,s.useState)(!1),r=(n[0],n[1]);(0,s.useEffect)((function(){r(!0)}),[]);var o=(0,c.G)().isDarkTheme,h=t.theme||d,p=t.darkTheme||h,m=o?p:h,g=e.lang,x=void 0===g?"yaml":g,f=e.snippet;return(0,a.jsx)(l.f4,{theme:m,code:f,language:x,children:function(e){var t=e.className,n=e.style,s=e.tokens,r=e.getLineProps,i=e.getTokenProps;return(0,a.jsx)("pre",{className:t+" "+u.codeSnippet,style:n,children:s.map((function(e,t){return(0,a.jsx)("div",Object.assign({},r({line:e,key:t}),{children:e.map((function(e,t){return(0,a.jsx)("span",Object.assign({},i({token:e,key:t})))}))}))}))})}})}function p(e){var t=e.to;return(0,a.jsx)(o.A,{to:(0,r.A)(t),children:e.children})}function m(e){var t=e.to;return(0,a.jsx)("a",{href:(0,r.A)(t),target:"_blank",children:e.children})}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var s=n(6540);const r={},i=s.createContext(r);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);