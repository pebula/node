"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[8315],{8765:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var s=t(4848),o=t(8453),r=t(6640);const i={id:"indexes",title:"Indexes",sidebar_label:"1. Indexes"},d="WIP",c={id:"advanced/indexes",title:"Indexes",description:"Single Index",source:"@site/docs/advanced/indexs.md",sourceDirName:"advanced",slug:"/advanced/indexes",permalink:"/node/docs-goosetyped/docs/advanced/indexes",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/advanced/indexs.md",tags:[],version:"current",frontMatter:{id:"indexes",title:"Indexes",sidebar_label:"1. Indexes"},sidebar:"sidebar",previous:{title:"4. Mixins",permalink:"/node/docs-goosetyped/docs/basics/mixins"},next:{title:"2. Middleware (Hooks)",permalink:"/node/docs-goosetyped/docs/advanced/hooks"}},a={},l=[{value:"Single Index",id:"single-index",level:2},{value:"Compound Index",id:"compound-index",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"wip",children:"WIP"}),"\n",(0,s.jsx)(n.h2,{id:"single-index",children:"Single Index"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import { GtDocument, GtModel } from '@pebula/goosetyped';\n\n@GtDocument()\nexport class Person extends GtModel() {\n\n  @GtIndex({ sort: 'asc' })\n  @GtColumn()\n  name: string;\n\n  @GtIndex({ sort: 'desc' })\n  @GtColumn()\n  age: number;\n\n  @GtIndex() // defaults to 'asc'\n  @GtColumn()\n  nickname: string;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Metadata: ",(0,s.jsx)(r.ol,{type:"interface",symbol:"GtSingleIndexMetadataArgs"})]}),"\n",(0,s.jsx)(n.h2,{id:"compound-index",children:"Compound Index"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import { GtDocument, GtModel } from '@pebula/goosetyped';\n\n@GtIndex({\n  indices: {\n    name: 'asc';\n    nickname: 'desc';\n  },\n  options: {\n    test: true,\n  }\n})\n@GtDocument()\nexport class Person extends GtModel() {\n\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n\n  @GtColumn()\n  nickname: string;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Metadta: ",(0,s.jsx)(r.ol,{type:"interface",symbol:"GtCompoundIndexMetadataArgs"})]})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},6640:(e,n,t)=>{t.d(n,{ol:()=>c,z7:()=>m,jd:()=>x,pX:()=>g});var s=t(6540),o=t(6025),r=t(4586),i=t(8774),d=t(4848);function c(e){var n=(0,r.A)(),t=e.symbol;return(0,d.jsx)(i.A,{to:(0,o.A)(""+n.siteConfig.customFields.apiDocPrefix+t.toLowerCase()),children:e.children||t})}var a=t(5293),l=t(1765);const u={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},p={codeSnippet:"codeSnippet_KFiO"};function m(e){var n=(0,r.A)().siteConfig.themeConfig.prism||{},t=(0,s.useState)(!1),o=(t[0],t[1]);(0,s.useEffect)((function(){o(!0)}),[]);var i=(0,a.G)().isDarkTheme,c=n.theme||u,m=n.darkTheme||c,x=i?m:c,g=e.lang,h=void 0===g?"yaml":g,f=e.snippet;return(0,d.jsx)(l.f4,{theme:x,code:f,language:h,children:function(e){var n=e.className,t=e.style,s=e.tokens,o=e.getLineProps,r=e.getTokenProps;return(0,d.jsx)("pre",{className:n+" "+p.codeSnippet,style:t,children:s.map((function(e,n){return(0,d.jsx)("div",Object.assign({},o({line:e,key:n}),{children:e.map((function(e,n){return(0,d.jsx)("span",Object.assign({},r({token:e,key:n})))}))}))}))})}})}function x(e){var n=e.to;return(0,d.jsx)(i.A,{to:(0,o.A)(n),children:e.children})}function g(e){var n=(0,r.A)(),t=e.type,s=e.hash,o=e.display,i=n.siteConfig.customFields.mongooseDocsUrl+"/"+function(e){switch(e){case"schema":return"guide";case"schemaType":return"SchemaTypes";case"connection":return"Connections";case"model":return"Models";case"document":return"Documents";case"subDocument":return"subdocs";case"query":return"Queries";case"validation":return"Validation";case"middleware":return"Middleware";case"populate":return"Populate";case"discriminator":return"Discriminators";case"plugins":return"Plugins"}throw new Error("Unknown link segment type "+e)}(t).toLowerCase()+".html"+(s?"#"+s:"");return(0,d.jsx)("a",{href:i,target:"_blank",children:e.children||o||s||""})}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>d});var s=t(6540);const o={},r=s.createContext(o);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);