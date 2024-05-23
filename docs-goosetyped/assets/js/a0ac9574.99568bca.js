"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[6223],{8084:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>m,frontMatter:()=>c,metadata:()=>l,toc:()=>d});var s=t(4848),o=t(8453),r=t(6640);const c={id:"local-column",title:"Local Columns",sidebar_label:"5. Local Columns"},i=void 0,l={id:"advanced/local-column",title:"Local Columns",description:"Up to this point we've only used class properties which we're decorated with @GtColumn.",source:"@site/docs/advanced/local-column.md",sourceDirName:"advanced",slug:"/advanced/local-column",permalink:"/node/docs-goosetyped/docs/advanced/local-column",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/advanced/local-column.md",tags:[],version:"current",frontMatter:{id:"local-column",title:"Local Columns",sidebar_label:"5. Local Columns"},sidebar:"sidebar",previous:{title:"4. Query Methods / Helpers",permalink:"/node/docs-goosetyped/docs/advanced/query-methods"},next:{title:"6. Plugins",permalink:"/node/docs-goosetyped/docs/advanced/plugins"}},a={},d=[{value:"Sub Documents &amp; Embedded Documents",id:"sub-documents--embedded-documents",level:2}];function u(e){const n={admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Up to this point we've only used class properties which we're decorated with ",(0,s.jsx)(n.code,{children:"@GtColumn"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"What will happen if we use non-column properties, can we use initializers?"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import { GtDocument, GtModel, GtColumn } from '@pebula/goosetyped';\n\n@GtDocument()\nexport class Person extends GtModel() {\n  @GtColumn() name: string;\n  @GtColumn() age: number;\n\n  myLocalNumber: number = 99;\n  private myPrivateString = 'STRING!';\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Well, nothing special actually, it will just work, the instance will reflect these values but when saving the model\nthey will not update the database."}),"\n",(0,s.jsx)(n.p,{children:"When we do"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const person = await Person.create({});\nconsole.log(person.myLocalNumber) // Prints 99\n"})}),"\n",(0,s.jsx)(n.p,{children:"The framework will create a new instance for us, which will run through the constructor and initialize the values."}),"\n",(0,s.jsx)(n.p,{children:"Because we use native JS classes as our models they play along nicely!"}),"\n",(0,s.jsx)(n.h2,{id:"sub-documents--embedded-documents",children:"Sub Documents & Embedded Documents"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(r.pX,{type:"subDocument",children:"SubDocuments"})," are a bit different."]}),"\n",(0,s.jsx)(n.p,{children:"When mongoose detects a column that is an embedded document it will treat it differently. It will\nnot use the class defined for it but instead will use a new class it creates for every column that is an embedded document which mimic the behavior of the original class."}),"\n",(0,s.jsx)(n.p,{children:"This how mongoose works for all embedded documents, including simple nested schema, complex discriminators and Array/Map of them."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import {\n  GtSubDocument,\n  GtResource,\n  GtDocument,\n  GtModel,\n  GtColumn,\n} from '@pebula/goosetyped';\n\n@GtSubDocument({ noId: true })\nexport class Address extends GtResource() {\n  @GtColumn()\n  street: string;\n\n  @GtColumn()\n  country: string;\n}\n\n@GtDocument()\nexport class Customer extends GtModel() {\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n\n  @GtColumn()\n  address: Address; // <- Embedded Column\n}\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Address"})," is an embedded column, not because it is wrapped by ",(0,s.jsx)(n.code,{children:"@GtSubDocument"}),", it is an embedded column because it is nested within the root document"]})}),"\n",(0,s.jsxs)(n.p,{children:["In the example above, ",(0,s.jsx)(n.code,{children:"Customer.address"})," will point to class ",(0,s.jsx)(n.code,{children:"SingleNested"})," but it does not really matter because ",(0,s.jsx)(n.strong,{children:"GooseTyped"})," takes care to synchronize and run what's needed."]}),"\n",(0,s.jsxs)(n.p,{children:["It will make sure that the original constructor ran and will also adapt the class to support instanceOf so the expression ",(0,s.jsx)(n.code,{children:"person.address instanceOf Address"})," is ",(0,s.jsx)(n.strong,{children:"true"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The only issue we have is with local columns / properties.\n",(0,s.jsx)(n.strong,{children:"GooseTyped"})," maintains a sync between the original class and the new mongoose class but it can't track the members which are not declared."]}),"\n",(0,s.jsxs)(n.p,{children:["To solve this issue you can use the ",(0,s.jsx)(n.code,{children:"@GtLocalProp"})," decorator which will make the property so it will be synced."]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsx)(n.p,{children:"Using local column or private properties in general is not recommended, avoid them to prevent unfortunate bugs and errors."})})]})}function m(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},6640:(e,n,t)=>{t.d(n,{ol:()=>l,z7:()=>p,jd:()=>h,pX:()=>g});var s=t(6540),o=t(6025),r=t(4586),c=t(8774),i=t(4848);function l(e){var n=(0,r.A)(),t=e.symbol;return(0,i.jsx)(c.A,{to:(0,o.A)(""+n.siteConfig.customFields.apiDocPrefix+t.toLowerCase()),children:e.children||t})}var a=t(5293),d=t(1765);const u={plain:{color:"#f8f8f2",backgroundColor:"#272822"},styles:[{types:["comment"],style:{color:"rgb(136, 132, 111)"}},{types:["string","changed"],style:{color:"rgb(230, 219, 116)"}},{types:["punctuation","tag","deleted"],style:{color:"rgb(249, 38, 114)"}},{types:["number","builtin"],style:{color:"rgb(174, 129, 255)"}},{types:["variable"],style:{color:"rgb(248, 248, 242)"}},{types:["function","attr-name","inserted"],style:{color:"rgb(166, 226, 46)"}}]},m={codeSnippet:"codeSnippet_KFiO"};function p(e){var n=(0,r.A)().siteConfig.themeConfig.prism||{},t=(0,s.useState)(!1),o=(t[0],t[1]);(0,s.useEffect)((function(){o(!0)}),[]);var c=(0,a.G)().isDarkTheme,l=n.theme||u,p=n.darkTheme||l,h=c?p:l,g=e.lang,b=void 0===g?"yaml":g,y=e.snippet;return(0,i.jsx)(d.f4,{theme:h,code:y,language:b,children:function(e){var n=e.className,t=e.style,s=e.tokens,o=e.getLineProps,r=e.getTokenProps;return(0,i.jsx)("pre",{className:n+" "+m.codeSnippet,style:t,children:s.map((function(e,n){return(0,i.jsx)("div",Object.assign({},o({line:e,key:n}),{children:e.map((function(e,n){return(0,i.jsx)("span",Object.assign({},r({token:e,key:n})))}))}))}))})}})}function h(e){var n=e.to;return(0,i.jsx)(c.A,{to:(0,o.A)(n),children:e.children})}function g(e){var n=(0,r.A)(),t=e.type,s=e.hash,o=e.display,c=n.siteConfig.customFields.mongooseDocsUrl+"/"+function(e){switch(e){case"schema":return"guide";case"schemaType":return"SchemaTypes";case"connection":return"Connections";case"model":return"Models";case"document":return"Documents";case"subDocument":return"subdocs";case"query":return"Queries";case"validation":return"Validation";case"middleware":return"Middleware";case"populate":return"Populate";case"discriminator":return"Discriminators";case"plugins":return"Plugins"}throw new Error("Unknown link segment type "+e)}(t).toLowerCase()+".html"+(s?"#"+s:"");return(0,i.jsx)("a",{href:c,target:"_blank",children:e.children||o||s||""})}},8453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>i});var s=t(6540);const o={},r=s.createContext(o);function c(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);