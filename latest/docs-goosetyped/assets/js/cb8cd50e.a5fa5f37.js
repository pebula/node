"use strict";(self.webpackChunkdocs_goosetyped=self.webpackChunkdocs_goosetyped||[]).push([[5591],{584:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>d,toc:()=>r});var n=s(6870),o=s(5569);const a={id:"basic-example",title:"Basic Usage",sidebar_label:"3. Basic Usage"},i=void 0,d={id:"getting-started/basic-example",title:"Basic Usage",description:"Let's start with a simple model:",source:"@site/docs/getting-started/basic-example.md",sourceDirName:"getting-started",slug:"/getting-started/basic-example",permalink:"/node/goosetyped/docs/getting-started/basic-example",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/getting-started/basic-example.md",tags:[],version:"current",frontMatter:{id:"basic-example",title:"Basic Usage",sidebar_label:"3. Basic Usage"},sidebar:"sidebar",previous:{title:"2. Installation",permalink:"/node/goosetyped/docs/getting-started/installation"},next:{title:"1. Metadata",permalink:"/node/goosetyped/docs/basics/metadata"}},c={},r=[];function l(e){const t={code:"code",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"Let's start with a simple model:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"import { GtDocument, GtModel } from '@pebula/goosetyped';\n\n@GtDocument()\nexport class Customer extends GtModel() {\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n}\n"})}),"\n",(0,n.jsxs)(t.p,{children:["Here we have a ",(0,n.jsx)(t.code,{children:"Customer"})," class with a name and age columns."]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["We decorate each column with the ",(0,n.jsx)(t.code,{children:"@GtColumn"})," decorator to declare that the property is mapped to a column in the DB."]}),"\n",(0,n.jsxs)(t.li,{children:["We decorate each model with the ",(0,n.jsx)(t.code,{children:"@GtDocument"})," decorator to declare that this is a model."]}),"\n",(0,n.jsxs)(t.li,{children:["We extend the ",(0,n.jsx)(t.code,{children:"Customer"})," class with the expression ",(0,n.jsx)(t.code,{children:"GtModel()"})," which is extending mongoose's ",(0,n.jsx)(t.code,{children:"Model"})," class with a bit of ",(0,n.jsx)(t.strong,{children:"GooseTyped"})," flavor."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["To qualify as a model a class must be decorated with ",(0,n.jsx)(t.code,{children:"@GtDocument"})," and extend ",(0,n.jsx)(t.code,{children:"GtModel()"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"GooseTyped"})," distinguish between documents and sub-documents. This is"]})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},5569:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>d});var n=s(6326);const o={},a=n.createContext(o);function i(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);