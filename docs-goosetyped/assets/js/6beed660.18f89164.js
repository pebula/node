"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[6845],{2542:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>u,frontMatter:()=>d,metadata:()=>l,toc:()=>c});var t=o(4848),s=o(8453);const d={id:"plugins",title:"Plugins",sidebar_label:"6. Plugins"},a=void 0,l={id:"advanced/plugins",title:"Plugins",description:"The way to declare and bind mongoose plugins to GooseTyped models.",source:"@site/docs/advanced/plugins.md",sourceDirName:"advanced",slug:"/advanced/plugins",permalink:"/node/docs-goosetyped/docs/advanced/plugins",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/advanced/plugins.md",tags:[],version:"current",frontMatter:{id:"plugins",title:"Plugins",sidebar_label:"6. Plugins"},sidebar:"sidebar",previous:{title:"5. Local Columns",permalink:"/node/docs-goosetyped/docs/advanced/local-column"},next:{title:"7. Async Model Compilation",permalink:"/node/docs-goosetyped/docs/advanced/async-model-compilation"}},i={},c=[];function r(e){const n={code:"code",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["The way to declare and bind mongoose plugins to ",(0,t.jsx)(n.strong,{children:"GooseTyped"})," models."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import * as mongooseAutopopulate from 'mongoose-autopopulate';\nimport { GtDocument, GtModel, GtColumn, GtPlugin } from '@pebula/goosetyped';\n\n@GtDocument()\n@GtPlugin({ plugin: mongooseAutopopulate })\nexport class Person<T extends string> extends GtModel() {\n\n  @GtColumn() name: string;\n  @GtColumn() age: number;\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>a,x:()=>l});var t=o(6540);const s={},d=t.createContext(s);function a(e){const n=t.useContext(d);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(d.Provider,{value:n},e.children)}}}]);