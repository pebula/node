"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[6064],{6907:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>i});var n=s(4848),a=s(8453);const o={},r=void 0,c={id:"api-docs/touchstone.casemetadataargs",title:"touchstone.casemetadataargs",description:"Home &gt; @pebula/touchstone &gt; CaseMetadataArgs",source:"@site/docs/api-docs/touchstone.casemetadataargs.md",sourceDirName:"api-docs",slug:"/api-docs/touchstone.casemetadataargs",permalink:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/api-docs/touchstone.casemetadataargs.md",tags:[],version:"current",frontMatter:{}},d={},i=[{value:"CaseMetadataArgs interface",id:"casemetadataargs-interface",level:2},{value:"Properties",id:"properties",level:2}];function h(e){const t={a:"a",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/",children:"Home"})," > ",(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone",children:"@pebula/touchstone"})," > ",(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs",children:"CaseMetadataArgs"})]}),"\n",(0,n.jsx)(t.h2,{id:"casemetadataargs-interface",children:"CaseMetadataArgs interface"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"Signature:"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"export interface CaseMetadataArgs \n"})}),"\n",(0,n.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(t.p,{children:"Property"})}),(0,n.jsx)("th",{children:(0,n.jsx)(t.p,{children:"Modifiers"})}),(0,n.jsx)("th",{children:(0,n.jsx)(t.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(t.p,{children:"Description"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs.benchmarkoptions",children:"benchmarkOptions?"})})}),(0,n.jsx)("td",{}),(0,n.jsx)("td",{children:(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.benchmarkoptions",children:"BenchmarkOptions"})})}),(0,n.jsxs)("td",{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"(Optional)"})," The default benchmark options for the ",(0,n.jsx)(t.code,{children:"Case"}),"."]}),(0,n.jsx)(t.p,{children:"## Options resolution process:"}),(0,n.jsxs)(t.p,{children:["For each ",(0,n.jsx)(t.code,{children:"Case"})," select the options by merging the following objects (first one wins):"]}),(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Use options defined on the Case (WE ARE HERE) - Use options defined on the Suite - Use options defined for the entire run - Use the default options defined by the library (static)"}),"\n"]})]})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs.name",children:"name?"})})}),(0,n.jsx)("td",{}),(0,n.jsx)("td",{children:(0,n.jsx)(t.p,{children:"string"})}),(0,n.jsx)("td",{children:(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"(Optional)"})," The name of the performance test. This is not mandatory, if not set the method name is used."]})})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs.variants",children:"variants?"})})}),(0,n.jsx)("td",{}),(0,n.jsx)("td",{children:(0,n.jsxs)(t.p,{children:["Array<Required<Omit<",(0,n.jsx)(t.a,{href:"/node/docs-touchstone/docs/api-docs/touchstone.casemetadataargs",children:"CaseMetadataArgs"}),", 'variants'>>>"]})}),(0,n.jsxs)("td",{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"(Optional)"})," A list of variants that will run in the suite, each as a separate case. I.E. run the same method as a new case but with a different benchmark configuration set."]}),(0,n.jsx)(t.p,{children:"> Note that each variant must have a unique name across the entire suite and must not match the original name or any other variant name for this method and other methods within the Suite."}),(0,n.jsx)(t.p,{children:"> Note that filters apply on each variant like it will on any regular case."})]})]})]})]})]})}function l(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>c});var n=s(6540);const a={},o=n.createContext(a);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);