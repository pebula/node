(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{138:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return l}));var o=n(3),r=n(8),c=(n(0),n(277)),s={},a={unversionedId:"api-docs/goosetyped.stripdocolumns",id:"api-docs/goosetyped.stripdocolumns",isDocsHomePage:!1,title:"goosetyped.stripdocolumns",description:"Home &gt; @pebula/goosetyped &gt; StripDoColumns",source:"@site/docs/api-docs/goosetyped.stripdocolumns.md",slug:"/api-docs/goosetyped.stripdocolumns",permalink:"/node/goosetyped/docs/api-docs/goosetyped.stripdocolumns",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.stripdocolumns.md",version:"current"},p=[{value:"StripDoColumns type",id:"stripdocolumns-type",children:[]},{value:"Example",id:"example",children:[]}],i={toc:p};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(o.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.stripdocolumns"},"StripDoColumns")),Object(c.b)("h2",{id:"stripdocolumns-type"},"StripDoColumns type"),Object(c.b)("p",null,"A type helper that strips away all members of the mongoose Document instance from the type as well as all methods."),Object(c.b)("b",null,"Signature:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"export declare type StripDoColumns<T extends Document, TExcept extends keyof Document = never> = Pick<T, SetDifference<NonFunctionKeys<T>, Exclude<keyof Document, TExcept>>>;\n")),Object(c.b)("h2",{id:"example"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},'export class Message extends GtModel() {\n id: string;\n text: string;\n myMethod(): void { }\n}\n\nconst msg = new Message(); // Not the msg instance has a lot of members from the Document type (The instance of Model)\nconst m: StripDoColumns<Message>; // now m has only "text" but not "id"\n\n// Since "id" also exists in Document, to include it we need to exclude it from the strip.\nconst m: StripDoColumns<Message, \'id\'>; // now m has "id" & "text"\n\n')))}l.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return y}));var o=n(0),r=n.n(o);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},c=Object.keys(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=r.a.createContext({}),l=function(e){var t=r.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return r.a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,s=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||c;return n?r.a.createElement(y,a(a({ref:t},i),{},{components:n})):r.a.createElement(y,a({ref:t},i))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,s=new Array(c);s[0]=m;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:o,s[1]=a;for(var i=2;i<c;i++)s[i]=n[i];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);