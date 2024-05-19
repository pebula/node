(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{277:function(e,t,o){"use strict";o.d(t,"a",(function(){return l})),o.d(t,"b",(function(){return b}));var r=o(0),n=o.n(r);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function p(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function c(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?p(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):p(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var d=n.a.createContext({}),s=function(e){var t=n.a.useContext(d),o=t;return e&&(o="function"==typeof e?e(t):c(c({},t),e)),o},l=function(e){var t=s(e.components);return n.a.createElement(d.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},y=n.a.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),l=s(o),y=r,b=l["".concat(p,".").concat(y)]||l[y]||u[y]||a;return o?n.a.createElement(b,c(c({ref:t},d),{},{components:o})):n.a.createElement(b,c({ref:t},d))}));function b(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,p=new Array(a);p[0]=y;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,p[1]=c;for(var d=2;d<a;d++)p[d]=o[d];return n.a.createElement.apply(null,p)}return n.a.createElement.apply(null,o)}y.displayName="MDXCreateElement"},87:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return p})),o.d(t,"metadata",(function(){return c})),o.d(t,"toc",(function(){return i})),o.d(t,"default",(function(){return s}));var r=o(3),n=o(8),a=(o(0),o(277)),p={},c={unversionedId:"api-docs/goosetyped.validator",id:"api-docs/goosetyped.validator",isDocsHomePage:!1,title:"goosetyped.validator",description:"Home &gt; @pebula/goosetyped &gt; Validator",source:"@site/docs/api-docs/goosetyped.validator.md",slug:"/api-docs/goosetyped.validator",permalink:"/node/goosetyped/docs/api-docs/goosetyped.validator",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.validator.md",version:"current"},i=[{value:"Validator type",id:"validator-type",children:[]}],d={toc:i};function s(e){var t=e.components,o=Object(n.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},d,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.validator"},"Validator")),Object(a.b)("h2",{id:"validator-type"},"Validator type"),Object(a.b)("p",null," ",Object(a.b)("a",{parentName:"p",href:"https://mongoosejs.com/docs/api.html%5C#schematype%5C_SchemaType-validate"},"https://mongoosejs.com/docs/api.html\\#schematype\\_SchemaType-validate")),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"export declare type Validator = RegExp | ValidatorFn | ValidatorOpts | ValidatorOpts[];\n")),Object(a.b)("b",null,"References:")," [ValidatorFn](/node/goosetyped/docs/api-docs/goosetyped.validatorfn), [ValidatorOpts](/node/goosetyped/docs/api-docs/goosetyped.validatoropts)")}s.isMDXComponent=!0}}]);