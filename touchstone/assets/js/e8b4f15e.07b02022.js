(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{155:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return p}));var a=n(3),o=n(8),r=(n(0),n(172)),c={},s={unversionedId:"api-docs/touchstone.suitemetadataargs.caseinvoketype",id:"api-docs/touchstone.suitemetadataargs.caseinvoketype",isDocsHomePage:!1,title:"touchstone.suitemetadataargs.caseinvoketype",description:"Home &gt; @pebula/touchstone &gt; SuiteMetadataArgs &gt; caseInvokeType",source:"@site/docs/api-docs/touchstone.suitemetadataargs.caseinvoketype.md",slug:"/api-docs/touchstone.suitemetadataargs.caseinvoketype",permalink:"/node/touchstone/docs/api-docs/touchstone.suitemetadataargs.caseinvoketype",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/touchstone/docs/docs/api-docs/touchstone.suitemetadataargs.caseinvoketype.md",version:"current"},i=[{value:"SuiteMetadataArgs.caseInvokeType property",id:"suitemetadataargscaseinvoketype-property",children:[]}],u={toc:i};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"/node/touchstone/docs/api-docs/index"},"Home")," ",">"," ",Object(r.b)("a",{parentName:"p",href:"/node/touchstone/docs/api-docs/touchstone"},"@pebula/touchstone")," ",">"," ",Object(r.b)("a",{parentName:"p",href:"/node/touchstone/docs/api-docs/touchstone.suitemetadataargs"},"SuiteMetadataArgs")," ",">"," ",Object(r.b)("a",{parentName:"p",href:"/node/touchstone/docs/api-docs/touchstone.suitemetadataargs.caseinvoketype"},"caseInvokeType")),Object(r.b)("h2",{id:"suitemetadataargscaseinvoketype-property"},"SuiteMetadataArgs.caseInvokeType property"),Object(r.b)("p",null,"Define how cases in the suite are invoked."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"function: Invoke like standalone function, no context (this) is set - method: Invoke as part of the class with the context (this). I.E: A new instance of the suite is created and used as the context for all cases.")),Object(r.b)("b",null,"Signature:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-typescript"},"caseInvokeType?: 'method' | 'function';\n")))}p.isMDXComponent=!0},172:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,b=d["".concat(c,".").concat(f)]||d[f]||l[f]||r;return n?o.a.createElement(b,s(s({ref:t},u),{},{components:n})):o.a.createElement(b,s({ref:t},u))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,c=new Array(r);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,c[1]=s;for(var u=2;u<r;u++)c[u]=n[u];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);