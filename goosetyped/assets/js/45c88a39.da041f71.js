(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{127:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return d}));var o=n(3),r=n(8),c=(n(0),n(277)),a={},p={unversionedId:"api-docs/goosetyped.stripdoc",id:"api-docs/goosetyped.stripdoc",isDocsHomePage:!1,title:"goosetyped.stripdoc",description:"Home &gt; @pebula/goosetyped &gt; StripDoc",source:"@site/docs/api-docs/goosetyped.stripdoc.md",slug:"/api-docs/goosetyped.stripdoc",permalink:"/node/goosetyped/docs/api-docs/goosetyped.stripdoc",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.stripdoc.md",version:"current"},i=[{value:"StripDoc type",id:"stripdoc-type",children:[]},{value:"Example",id:"example",children:[]}],s={toc:i};function d(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.stripdoc"},"StripDoc")),Object(c.b)("h2",{id:"stripdoc-type"},"StripDoc type"),Object(c.b)("p",null,"A type helper that strips away all members of the mongoose Document instance from the type"),Object(c.b)("b",null,"Signature:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"export declare type StripDoc<T extends Document, TExcept extends keyof Document = never> = Subtract<T, Omit<Document, TExcept>>;\n")),Object(c.b)("h2",{id:"example"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-ts"},'export class Message extends GtModel() {\n id: string;\n text: string;\n myMethod(): void { }\n}\n\nconst msg = new Message(); // Not the msg instance has a lot of members from the Document type (The instance of Model)\nconst m: StripDoc<Message>; // now m has only "myMethod" & "text" but not "id"\n\n// Since "id" also exists in Document, to include it we need to exclude it from the strip.\nconst m: StripDoc<Message, \'id\'>; // now m has "id", "myMethod" & "text"\n\n')))}d.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return y}));var o=n(0),r=n.n(o);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},c=Object.keys(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),d=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=d(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,a=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=o,y=u["".concat(a,".").concat(m)]||u[m]||l[m]||c;return n?r.a.createElement(y,p(p({ref:t},s),{},{components:n})):r.a.createElement(y,p({ref:t},s))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=m;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var s=2;s<c;s++)a[s]=n[s];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);