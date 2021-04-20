(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{108:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return l}));var r=n(3),o=n(8),a=(n(0),n(277)),s=n(284),i={id:"query-methods",title:"Query Methods / Helpers",sidebar_label:"4. Query Methods / Helpers"},c={unversionedId:"advanced/query-methods",id:"advanced/query-methods",isDocsHomePage:!1,title:"Query Methods / Helpers",description:"WIP",source:"@site/docs/advanced/query-methods.md",slug:"/advanced/query-methods",permalink:"/node/goosetyped/docs/advanced/query-methods",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/advanced/query-methods.md",version:"current",sidebar_label:"4. Query Methods / Helpers",sidebar:"someSidebar",previous:{title:"Discriminators",permalink:"/node/goosetyped/docs/advanced/discriminators"},next:{title:"Local Columns",permalink:"/node/goosetyped/docs/advanced/local-column"}},u=[],d={toc:u};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"wip"},"WIP"),Object(a.b)(s.a,{type:"schema",hash:"query-helpers",mdxType:"MongooseDocsLink"},"Query methods")," (also called Query Helpers) is a simple but powerful mechanism to compose custom queries.",Object(a.b)("p",null,"All query methods are added to the mongoose ",Object(a.b)("inlineCode",{parentName:"p"},"Query")," class and not the Model so they don't effect the type directly\nhowever the ",Object(a.b)("inlineCode",{parentName:"p"},"Query")," type is used on the Model so there is an indirect effect which is why we register query methods\nis a different way."),Object(a.b)("p",null,"Let's define some query methods:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"import { Document, DocumentQuery } from 'mongoose';\nimport { GtDocument, GtModel, GtColumn, GtQuery } from '@pebula/goosetyped';\n\nexport class MyQueries {\n  byName<T extends Document & { name: string }>(this: DocumentQuery<T[], T, MyQueries> & MyQueries, name: string): DocumentQuery<T[], T, MyQueries> & MyQueries {\n    return this.where({ name: new RegExp(name, 'i') });\n  }\n\n  byAge<T extends Document & { age: number }>(this: DocumentQuery<T[], T, MyQueries> & MyQueries, age: number): DocumentQuery<T[], T, MyQueries> & MyQueries {\n    return this.where({ age: age });\n  }\n}\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"@GtDocument()\nexport class Person extends GtQuery(MyQueries)(GtModel()) {\n  @GtColumn() name: string;\n\n  @GtColumn() age: number;\n}\n")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"Person.find().byName('test').byAge(15);\n")),Object(a.b)("p",null,"The declaration might look a bit cumbersome but it enables use to apply the additional query methods type members\non the ",Object(a.b)("inlineCode",{parentName:"p"},"Query")," object returned by the Model's ",Object(a.b)("inlineCode",{parentName:"p"},"find()")," method."),Object(a.b)("div",{className:"admonition admonition-info alert alert--info"},Object(a.b)("div",{parentName:"div",className:"admonition-heading"},Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",{parentName:"h5",className:"admonition-icon"},Object(a.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(a.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(a.b)("div",{parentName:"div",className:"admonition-content"},Object(a.b)("p",{parentName:"div"},"Note that you can still add mixins through ",Object(a.b)("inlineCode",{parentName:"p"},"GtModel()")))))}l.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),d=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=d(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),l=d(n),p=r,b=l["".concat(s,".").concat(p)]||l[p]||m[p]||a;return n?o.a.createElement(b,i(i({ref:t},u),{},{components:n})):o.a.createElement(b,i({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var u=2;u<a;u++)s[u]=n[u];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},284:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(16);n(57);t.a=function(e){var t=Object(a.default)(),n=e.type,r=e.hash,s=e.display,i=t.siteConfig.customFields.mongooseDocsUrl+"/"+function(e){switch(e){case"schema":return"guide";case"schemaType":return"SchemaTypes";case"connection":return"Connections";case"model":return"Models";case"document":return"Documents";case"subDocument":return"subdocs";case"query":return"Queries";case"validation":return"Validation";case"middleware":return"Middleware";case"populate":return"Populate";case"discriminator":return"Discriminators";case"plugins":return"Plugins"}throw new Error("Unknown link segment type "+e)}(n).toLowerCase()+".html"+(r?"#"+r:"");return o.a.createElement("a",{href:i,target:"_blank"},e.children||s||r||"")}}}]);