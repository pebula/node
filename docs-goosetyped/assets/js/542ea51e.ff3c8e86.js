"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[7739],{2199:(e,o,s)=>{s.r(o),s.d(o,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var n=s(4848),t=s(8453);const r={},d=void 0,i={id:"api-docs/goosetyped.modelextensions.bulkwrite",title:"goosetyped.modelextensions.bulkwrite",description:"Home &gt; @pebula/goosetyped &gt; ModelExtensions &gt; bulkWrite",source:"@site/docs/api-docs/goosetyped.modelextensions.bulkwrite.md",sourceDirName:"api-docs",slug:"/api-docs/goosetyped.modelextensions.bulkwrite",permalink:"/node/docs-goosetyped/docs/api-docs/goosetyped.modelextensions.bulkwrite",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.modelextensions.bulkwrite.md",tags:[],version:"current",frontMatter:{}},c={},l=[{value:"ModelExtensions.bulkWrite() method",id:"modelextensionsbulkwrite-method",level:2},{value:"Parameters",id:"parameters",level:2}];function a(e){const o={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.a,{href:"/node/docs-goosetyped/docs/api-docs/",children:"Home"})," > ",(0,n.jsx)(o.a,{href:"/node/docs-goosetyped/docs/api-docs/goosetyped",children:"@pebula/goosetyped"})," > ",(0,n.jsx)(o.a,{href:"/node/docs-goosetyped/docs/api-docs/goosetyped.modelextensions",children:"ModelExtensions"})," > ",(0,n.jsx)(o.a,{href:"/node/docs-goosetyped/docs/api-docs/goosetyped.modelextensions.bulkwrite",children:"bulkWrite"})]}),"\n",(0,n.jsx)(o.h2,{id:"modelextensionsbulkwrite-method",children:"ModelExtensions.bulkWrite() method"}),"\n",(0,n.jsxs)(o.p,{children:["Sends multiple ",(0,n.jsx)(o.code,{children:"insertOne"}),", ",(0,n.jsx)(o.code,{children:"updateOne"}),", ",(0,n.jsx)(o.code,{children:"updateMany"}),", ",(0,n.jsx)(o.code,{children:"replaceOne"}),", ",(0,n.jsx)(o.code,{children:"deleteOne"}),", and/or ",(0,n.jsx)(o.code,{children:"deleteMany"})," operations to the MongoDB server in one command. This is faster than sending multiple independent operations (e.g. if you use ",(0,n.jsx)(o.code,{children:"create()"}),") because with ",(0,n.jsx)(o.code,{children:"bulkWrite()"})," there is only one network round trip to the MongoDB server."]}),"\n",(0,n.jsx)(o.p,{children:(0,n.jsx)(o.strong,{children:"Signature:"})}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-typescript",children:"bulkWrite<T>(this: Ctor<T>, writes: Array<M.AnyBulkWriteOperation<T extends M.Document ? any : (T extends {} ? T : any)>>, options: M.MongooseBulkWriteOptions & {\r\n        ordered: false;\r\n    }): Promise<mongodb.BulkWriteResult & {\r\n        mongoose?: {\r\n            validationErrors: Error[];\r\n        };\r\n    }>;\n"})}),"\n",(0,n.jsx)(o.h2,{id:"parameters",children:"Parameters"}),"\n",(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:(0,n.jsx)(o.p,{children:"Parameter"})}),(0,n.jsx)("th",{children:(0,n.jsx)(o.p,{children:"Type"})}),(0,n.jsx)("th",{children:(0,n.jsx)(o.p,{children:"Description"})})]})}),(0,n.jsxs)("tbody",{children:[(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(o.p,{children:"this"})}),(0,n.jsx)("td",{children:(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.a,{href:"/node/docs-goosetyped/docs/api-docs/goosetyped.ctor",children:"Ctor"}),"<T>"]})}),(0,n.jsx)("td",{})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(o.p,{children:"writes"})}),(0,n.jsx)("td",{children:(0,n.jsx)(o.p,{children:"Array<M.AnyBulkWriteOperation<T extends M.Document ? any : (T extends {} ? T : any)>>"})}),(0,n.jsx)("td",{})]}),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(o.p,{children:"options"})}),(0,n.jsx)("td",{children:(0,n.jsx)(o.p,{children:"M.MongooseBulkWriteOptions & { ordered: false; }"})}),(0,n.jsx)("td",{})]})]})]}),"\n",(0,n.jsx)(o.p,{children:(0,n.jsx)(o.strong,{children:"Returns:"})}),"\n",(0,n.jsx)(o.p,{children:"Promise<mongodb.BulkWriteResult & { mongoose?: { validationErrors: Error[]; }; }>"})]})}function p(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},8453:(e,o,s)=>{s.d(o,{R:()=>d,x:()=>i});var n=s(6540);const t={},r=n.createContext(t);function d(e){const o=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),n.createElement(r.Provider,{value:o},e.children)}}}]);