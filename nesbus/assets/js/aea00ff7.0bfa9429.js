(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{157:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return l}));var r=n(3),o=n(8),a=(n(0),n(204)),c={},s={unversionedId:"api-docs/nesbus.sbcontext.resolveclient",id:"api-docs/nesbus.sbcontext.resolveclient",isDocsHomePage:!1,title:"nesbus.sbcontext.resolveclient",description:"Home &gt; @pebula/nesbus &gt; SbContext &gt; resolveClient",source:"@site/docs/api-docs/nesbus.sbcontext.resolveclient.md",slug:"/api-docs/nesbus.sbcontext.resolveclient",permalink:"/node/nesbus/docs/api-docs/nesbus.sbcontext.resolveclient",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbcontext.resolveclient.md",version:"current"},i=[{value:"SbContext.resolveClient() method",id:"sbcontextresolveclient-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],b={toc:i};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbcontext"},"SbContext")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbcontext.resolveclient"},"resolveClient")),Object(a.b)("h2",{id:"sbcontextresolveclient-method"},"SbContext.resolveClient() method"),Object(a.b)("p",null,"Try to resolves a client (queue or topic emitter/sender) based on the entity name."),Object(a.b)("p",null,"If an entity reference is not provided, the default reference is the entity used to emit messages to this subscriber. If this is a queue subscriber, it will be a queue emitter. If this is a subscription, it will be the topic of the subscription."),Object(a.b)("p",null,">"," You can also provide a clientId to look the entity in."),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"resolveClient(emitterReference?: SbEmitterRef): SbEmitterImp | undefined;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"emitterReference"),Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.sbemitterref"},"SbEmitterRef")),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbemitterimp"},"SbEmitterImp")," ","|"," undefined"))}l.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var b=o.a.createContext({}),l=function(e){var t=o.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return o.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||p[d]||a;return n?o.a.createElement(m,s(s({ref:t},b),{},{components:n})):o.a.createElement(m,s({ref:t},b))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,c[1]=s;for(var b=2;b<a;b++)c[b]=n[b];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);