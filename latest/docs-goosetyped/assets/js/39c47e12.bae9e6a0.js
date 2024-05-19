"use strict";(self.webpackChunkdocs_goosetyped=self.webpackChunkdocs_goosetyped||[]).push([[4451],{8026:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>m,frontMatter:()=>i,metadata:()=>r,toc:()=>l});var o=t(6870),s=t(5569),c=t(3634);const i={id:"documents-and-sub-documents",title:"Documents And SubDocuments",sidebar_label:"3. Documents & SubDocuments"},d=void 0,r={id:"basics/documents-and-sub-documents",title:"Documents And SubDocuments",description:"GooseType provide support for mongoose's Document & Sub Document",source:"@site/docs/basics/documents-and-sub-documents.md",sourceDirName:"basics",slug:"/basics/documents-and-sub-documents",permalink:"/node/goosetyped/docs/basics/documents-and-sub-documents",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/basics/documents-and-sub-documents.md",tags:[],version:"current",frontMatter:{id:"documents-and-sub-documents",title:"Documents And SubDocuments",sidebar_label:"3. Documents & SubDocuments"},sidebar:"sidebar",previous:{title:"2. Columns",permalink:"/node/goosetyped/docs/basics/columns"},next:{title:"4. Mixins",permalink:"/node/goosetyped/docs/basics/mixins"}},a={},l=[{value:"Document Options (metadata)",id:"document-options-metadata",level:2},{value:"GtSubDocumentMetadataArgs.noId",id:"gtsubdocumentmetadataargsnoid",level:4},{value:"GtDocumentMetadataArgs.connectionId",id:"gtdocumentmetadataargsconnectionid",level:4}];function u(e){const n={admonition:"admonition",code:"code",h2:"h2",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"GooseType"})," provide support for mongoose's ",(0,o.jsx)(c.pX,{type:"document",children:"Document"})," & ",(0,o.jsx)(c.pX,{type:"subDocument",children:"Sub Document"})]}),"\n",(0,o.jsx)("div",{class:"container",children:(0,o.jsxs)("div",{class:"row",children:[(0,o.jsxs)("div",{class:"col col-6",children:[(0,o.jsxs)(n.p,{children:["A ",(0,o.jsx)("strong",{children:"Document"})," is a class:"]}),(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:"Decorated with @GtDocument"}),(0,o.jsx)("li",{children:"Extends GtModel()"})]})]}),(0,o.jsxs)("div",{class:"col col-6",children:[(0,o.jsxs)(n.p,{children:["A ",(0,o.jsx)("strong",{children:"Subdocument"})," is a class:"]}),(0,o.jsxs)("ul",{children:[(0,o.jsx)("li",{children:"Decorated with @GtSubDocument"}),(0,o.jsx)("li",{children:"Extends GtResource()"})]})]})]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { GtSubDocument, GtResource, GtDocument, GtModel, GtColumn } from '@pebula/goosetyped';\n\n@GtSubDocument({ noId: true })\nexport class Address extends GtResource() {\n  @GtColumn()\n  street: string;\n\n  @GtColumn()\n  country: string;\n}\n\n@GtDocument()\nexport class Customer extends GtModel() {\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n\n  @GtColumn()\n  address: Address;\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"document-options-metadata",children:"Document Options (metadata)"}),"\n",(0,o.jsx)(n.p,{children:"Most of the metadata options are straight-forward and well documented in the Api Docs."}),"\n",(0,o.jsxs)(n.p,{children:["For depp inspection check ",(0,o.jsx)(c.ol,{type:"interface",symbol:"GtDocumentMetadataArgs"})," & ",(0,o.jsx)(c.ol,{type:"interface",symbol:"GtSubDocumentMetadataArgs"})]}),"\n",(0,o.jsx)(n.p,{children:"We will cover some of them here:"}),"\n",(0,o.jsx)(n.h4,{id:"gtsubdocumentmetadataargsnoid",children:"GtSubDocumentMetadataArgs.noId"}),"\n",(0,o.jsxs)(n.p,{children:["This will disable the automatic ",(0,o.jsx)(n.code,{children:"_id"})," set for every sub document. ",(0,o.jsx)(c.pX,{type:"schema",hash:"_id",children:"Read more here..."})]}),"\n",(0,o.jsx)(n.admonition,{type:"caution",children:(0,o.jsx)(n.p,{children:"Since Document model must have an id, this is only valid for SubDocuments"})}),"\n",(0,o.jsx)(n.h4,{id:"gtdocumentmetadataargsconnectionid",children:"GtDocumentMetadataArgs.connectionId"}),"\n",(0,o.jsx)(n.p,{children:"The connection id to use when creating the model."}),"\n",(0,o.jsxs)(n.p,{children:["When not set, ",(0,o.jsx)(n.strong,{children:"GooseTyped"})," will use the default connection.\nWhen set, ",(0,o.jsx)(n.strong,{children:"GooseTyped"})," will use the registered connection to compile the model at the defined stage in the connections life."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import mongoose from 'mongoose';\nimport { GtDocument, GtModel, GtColumn, addConnection } from '@pebula/goosetyped';\n\n@GtDocument({\n  connectionId: 'myConnection',\n})\nexport class Customer extends GtModel() {\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n}\n"})}),"\n",(0,o.jsxs)(n.p,{children:["At this point the model class is available, but it ",(0,o.jsx)(n.strong,{children:"is not connect"})," to mongoose so no point of creating new instances of it..."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"const connection = mongoose.createConnection('localhost',{ /* ...*/ });\nconst ready = addConnection('myConnection', () => connection);\nawait ready;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Once ",(0,o.jsx)(n.code,{children:"ready"})," resolves we have a guarantee that all models are compiled and bound to the connection."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["Deffered model compilation is explained in more detail in the ",(0,o.jsx)(c.jd,{to:"docs/advanced/async-model-compilation",children:"Async Model Compilation"}),"."]})})]})}function m(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},3634:(e,n,t)=>{t.d(n,{ol:()=>r,z7:()=>p,jd:()=>h,pX:()=>g});var o=t(6326),s=t(5519),c=t(828),i=t(3252),d=t(6870);function r(e){const n=(0,c.A)(),{symbol:t}=e;return(0,d.jsx)(i.A,{to:(0,s.A)(`${n.siteConfig.customFields.apiDocPrefix}${t.toLowerCase()}`),children:e.children||t})}var a=t(1959),l=t(3129);const u={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},m={codeSnippet:"codeSnippet_FY5W"};function p(e){const n=(0,c.A)().siteConfig.themeConfig.prism||{},[t,s]=(0,o.useState)(!1);(0,o.useEffect)((()=>{s(!0)}),[]);const{isDarkTheme:i}=(0,a.G)(),r=n.theme||u,p=n.darkTheme||r,h=i?p:r,{lang:g="yaml",snippet:x}=e;return(0,d.jsx)(l.f4,{theme:h,code:x,language:g,children:e=>{let{className:n,style:t,tokens:o,getLineProps:s,getTokenProps:c}=e;return(0,d.jsx)("pre",{className:`${n} ${m.codeSnippet}`,style:t,children:o.map(((e,n)=>(0,d.jsx)("div",{...s({line:e,key:n}),children:e.map(((e,n)=>(0,d.jsx)("span",{...c({token:e,key:n})})))})))})}})}function h(e){const{to:n}=e;return(0,d.jsx)(i.A,{to:(0,s.A)(n),children:e.children})}function g(e){const n=(0,c.A)(),{type:t,hash:o,display:s}=e,i=`${n.siteConfig.customFields.mongooseDocsUrl}/${function(e){switch(e){case"schema":return"guide";case"schemaType":return"SchemaTypes";case"connection":return"Connections";case"model":return"Models";case"document":return"Documents";case"subDocument":return"subdocs";case"query":return"Queries";case"validation":return"Validation";case"middleware":return"Middleware";case"populate":return"Populate";case"discriminator":return"Discriminators";case"plugins":return"Plugins"}throw new Error(`Unknown link segment type ${e}`)}(t).toLowerCase()}.html${o?"#"+o:""}`;return(0,d.jsx)("a",{href:i,target:"_blank",children:e.children||s||o||""})}},5569:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>d});var o=t(6326);const s={},c=o.createContext(s);function i(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);