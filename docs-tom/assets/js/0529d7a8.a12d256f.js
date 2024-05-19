"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[713],{922:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var o=t(4848),a=t(8453);t(6640);const i={id:"basic-usage",title:"Basic Usage",sidebar_label:"2. Basic Usage"},s=void 0,r={id:"validation/basic-usage",title:"Basic Usage",description:"",source:"@site/docs/validation/basic-usage.md",sourceDirName:"validation",slug:"/validation/basic-usage",permalink:"/node/docs-tom/docs/validation/basic-usage",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/tom/docs/docs/validation/basic-usage.md",tags:[],version:"current",frontMatter:{id:"basic-usage",title:"Basic Usage",sidebar_label:"2. Basic Usage"},sidebar:"sidenav",previous:{title:"1. Introduction",permalink:"/node/docs-tom/docs/validation/validation-introduction"},next:{title:"3. Validator",permalink:"/node/docs-tom/docs/validation/validator"}},d={},c=[];function l(e){const n={code:"code",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { P, defaultValidator } from '@pebula/tom/serialization';\n\nexport class BasicModelTom {\n  @P number: number;\n  @P.negative negNumber: number;\n  @P.max(500) maxNumber: number;\n  @P.asArray('string') strings: string[];\n  @P longString: string;\n  @P boolean: boolean;\n  @P.as(() => BasicModelNestedTom) deeplyNested: BasicModelNested;\n}\n\nexport class BasicModelNestedTom {\n  @P foo: string;\n  @P num: number;\n  @P bool: boolean;\n}\n\nconst validator = defaultValidator.factory(BasicModelTom);\n\nconst model = {\n  number: 1,\n  negNumber: -1,\n  maxNumber: 200,\n  strings: ['a', 'b', 'c'],\n  longString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...',\n  boolean: true,\n  deeplyNested: {\n    foo: 'bar',\n    num: 1,\n    bool: false\n  }\n};\n\nconst result = validator(model);\nif (result !== true) {\n  // result contains errors \n}\n"})})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},6640:(e,n,t)=>{t.d(n,{jd:()=>s});t(6540);var o=t(6025),a=(t(4586),t(8774)),i=t(4848);t(1765);function s(e){var n=e.to;return(0,i.jsx)(a.A,{to:(0,o.A)(n),children:e.children})}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>r});var o=t(6540);const a={},i=o.createContext(a);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);