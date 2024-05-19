"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[6492],{1842:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var o=n(4848),a=n(8453),s=n(6640);const i={id:"metadata",title:"Metadata",sidebar_label:"1. Metadata"},r=void 0,d={id:"basics/metadata",title:"Metadata",description:"Metadata is the information required to define a model and we can divide it to 2 parts:",source:"@site/docs/basics/metadata.md",sourceDirName:"basics",slug:"/basics/metadata",permalink:"/node/docs-goosetyped/docs/basics/metadata",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/basics/metadata.md",tags:[],version:"current",frontMatter:{id:"metadata",title:"Metadata",sidebar_label:"1. Metadata"},sidebar:"sidebar",previous:{title:"3. Basic Usage",permalink:"/node/docs-goosetyped/docs/getting-started/basic-example"},next:{title:"2. Columns",permalink:"/node/docs-goosetyped/docs/basics/columns"}},c={},l=[{value:"Mongoose metadata",id:"mongoose-metadata",level:2},{value:"GooseTyped metadata",id:"goosetyped-metadata",level:2}];function m(e){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Metadata is the information required to define a model and we can divide it to 2 parts:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Column of the model and metadata about them"}),"\n",(0,o.jsx)(t.li,{children:"Metadata about the model itself (compound index's, collation, versioning, etc...)"}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"mongoose-metadata",children:"Mongoose metadata"}),"\n",(0,o.jsxs)(t.p,{children:["In mongoose we define all the metadata in the ",(0,o.jsx)(t.code,{children:"Schema"})," class."]}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Column metadata is defined by providing a ",(0,o.jsx)(t.code,{children:"SchemaDefinition"})," object."]}),"\n",(0,o.jsxs)(t.li,{children:["Metadata about the model is defined by providing a ",(0,o.jsx)(t.code,{children:"SchemaOptions"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-typescript",children:"import { SchemaDefinition, SchemaOptions, Schema } from 'mongoose';\n\nconst columnMetadata: SchemaDefinition = {\n  name: Schema.Types.String,\n};\n\nconst modelMetadata: SchemaOptions = {\n  collection: 'data',\n};\n\nvar dataSchema = new Schema(columnMetadata, modelMetadata);\n"})}),"\n",(0,o.jsx)(t.h2,{id:"goosetyped-metadata",children:"GooseTyped metadata"}),"\n",(0,o.jsxs)(t.p,{children:["In ",(0,o.jsx)(t.strong,{children:"GooseTyped"})," metadata is defined as part of the class definition, as an additional parameter sent to decorators."]}),"\n",(0,o.jsx)(t.p,{children:"In most cases the decorators does not require additional metadata and provide a default behavior that will usually suffice, however\nif you wish to change it you can."}),"\n",(0,o.jsxs)(t.p,{children:["You'll notice that some metadata options will match directly to mongoose options and some will not. ",(0,o.jsx)(t.strong,{children:"GooseTyped"})," goal is to simplify how\nmodels are defined and it abstracts away some of the options to reduce the complexity."]}),"\n",(0,o.jsxs)(t.p,{children:["For example, the ",(0,o.jsx)(s.pX,{type:"schema",hash:"skipVersioning"})," option is set on the model options\nin mongoose but in ",(0,o.jsx)(t.strong,{children:"GooseTyped"})," it is set per column and ",(0,o.jsx)(t.strong,{children:"GooseTyped"})," will created the proper definition for the entire model\nfrom all of the column."]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}},6640:(e,t,n)=>{n.d(t,{ol:()=>d,z7:()=>u,jd:()=>h,pX:()=>f});var o=n(6540),a=n(6025),s=n(4586),i=n(8774),r=n(4848);function d(e){var t=(0,s.A)(),n=e.symbol;return(0,r.jsx)(i.A,{to:(0,a.A)(""+t.siteConfig.customFields.apiDocPrefix+n.toLowerCase()),children:e.children||n})}var c=n(5293),l=n(1765);const m={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},p={codeSnippet:"codeSnippet_KFiO"};function u(e){var t=(0,s.A)().siteConfig.themeConfig.prism||{},n=(0,o.useState)(!1),a=(n[0],n[1]);(0,o.useEffect)((function(){a(!0)}),[]);var i=(0,c.G)().isDarkTheme,d=t.theme||m,u=t.darkTheme||d,h=i?u:d,f=e.lang,g=void 0===f?"yaml":f,y=e.snippet;return(0,r.jsx)(l.f4,{theme:h,code:y,language:g,children:function(e){var t=e.className,n=e.style,o=e.tokens,a=e.getLineProps,s=e.getTokenProps;return(0,r.jsx)("pre",{className:t+" "+p.codeSnippet,style:n,children:o.map((function(e,t){return(0,r.jsx)("div",Object.assign({},a({line:e,key:t}),{children:e.map((function(e,t){return(0,r.jsx)("span",Object.assign({},s({token:e,key:t})))}))}))}))})}})}function h(e){var t=e.to;return(0,r.jsx)(i.A,{to:(0,a.A)(t),children:e.children})}function f(e){var t=(0,s.A)(),n=e.type,o=e.hash,a=e.display,i=t.siteConfig.customFields.mongooseDocsUrl+"/"+function(e){switch(e){case"schema":return"guide";case"schemaType":return"SchemaTypes";case"connection":return"Connections";case"model":return"Models";case"document":return"Documents";case"subDocument":return"subdocs";case"query":return"Queries";case"validation":return"Validation";case"middleware":return"Middleware";case"populate":return"Populate";case"discriminator":return"Discriminators";case"plugins":return"Plugins"}throw new Error("Unknown link segment type "+e)}(n).toLowerCase()+".html"+(o?"#"+o:"");return(0,r.jsx)("a",{href:i,target:"_blank",children:e.children||a||o||""})}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>r});var o=n(6540);const a={},s=o.createContext(a);function i(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);