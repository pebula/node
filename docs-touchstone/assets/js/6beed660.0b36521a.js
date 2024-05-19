"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[6845],{4527:(n,e,o)=>{o.r(e),o.d(e,{contentTitle:()=>c,default:()=>p,frontMatter:()=>r,toc:()=>u});var t=o(4848),s=o(8453);const r={id:"plugins",title:"Plugins",sidebar_label:"6. Plugins"},c=void 0,u=[];function l(n){const e={code:"code",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.p,{children:["The way to declare and bind mongoose plugins to ",(0,t.jsx)(e.strong,{children:"GooseTyped"})," models."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-typescript",children:"import * as mongooseAutopopulate from 'mongoose-autopopulate';\nimport { GtDocument, GtModel, GtColumn, GtPlugin } from '@pebula/goosetyped';\n\n@GtDocument()\n@GtPlugin({ plugin: mongooseAutopopulate })\nexport class Person<T extends string> extends GtModel() {\n\n  @GtColumn() name: string;\n  @GtColumn() age: number;\n}\n"})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},8453:(n,e,o)=>{o.d(e,{R:()=>c,x:()=>u});var t=o(6540);const s={},r=t.createContext(s);function c(n){const e=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function u(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),t.createElement(r.Provider,{value:e},n.children)}}}]);