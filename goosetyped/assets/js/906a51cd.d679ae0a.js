(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{181:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return d})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return i}));var o=n(3),r=n(8),a=(n(0),n(277)),d={},c={unversionedId:"api-docs/goosetyped.model.findoneanddelete",id:"api-docs/goosetyped.model.findoneanddelete",isDocsHomePage:!1,title:"goosetyped.model.findoneanddelete",description:"Home &gt; @pebula/goosetyped &gt; Model &gt; findOneAndDelete",source:"@site/docs/api-docs/goosetyped.model.findoneanddelete.md",slug:"/api-docs/goosetyped.model.findoneanddelete",permalink:"/node/goosetyped/docs/api-docs/goosetyped.model.findoneanddelete",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.model.findoneanddelete.md",version:"current"},l=[{value:"Model.findOneAndDelete() method",id:"modelfindoneanddelete-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],p={toc:l};function i(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.model"},"Model")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.model.findoneanddelete"},"findOneAndDelete")),Object(a.b)("h2",{id:"modelfindoneanddelete-method"},"Model.findOneAndDelete() method"),Object(a.b)("p",null,"Issues a mongodb findOneAndDelete command. Finds a matching document, removes it, passing the found document (if any) to the callback. Executes immediately if callback is passed."),Object(a.b)("p",null,"Note: same signatures as findOneAndRemove"),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"findOneAndDelete<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"this"),Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("a",{parentName:"td",href:"/node/goosetyped/docs/api-docs/goosetyped.ctor"},"Ctor"),"<","T",">"),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,"DocumentQuery","<","T ","|"," null, T, QueryHelpers",">"," ","&"," QueryHelpers"))}i.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),i=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=i(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=i(n),b=o,m=s["".concat(d,".").concat(b)]||s[b]||u[b]||a;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,d=new Array(a);d[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,d[1]=c;for(var p=2;p<a;p++)d[p]=n[p];return r.a.createElement.apply(null,d)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);