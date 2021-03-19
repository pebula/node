(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{138:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(8),o=(n(0),n(204)),c={},s={unversionedId:"api/nesbus.sbcontext.resolveclient",id:"api/nesbus.sbcontext.resolveclient",isDocsHomePage:!1,title:"nesbus.sbcontext.resolveclient",description:"Home &gt; @pebula/nesbus &gt; SbContext &gt; resolveClient",source:"@site/docs/api/nesbus.sbcontext.resolveclient.md",slug:"/api/nesbus.sbcontext.resolveclient",permalink:"/node/nesbus/docs/api/nesbus.sbcontext.resolveclient",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/nesbus.sbcontext.resolveclient.md",version:"current"},i=[{value:"SbContext.resolveClient() method",id:"sbcontextresolveclient-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],b={toc:i};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbcontext"},"SbContext")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbcontext.resolveclient"},"resolveClient")),Object(o.b)("h2",{id:"sbcontextresolveclient-method"},"SbContext.resolveClient() method"),Object(o.b)("p",null,"Try to resolves a client (queue or topic emitter/sender) based on the entity name."),Object(o.b)("p",null,"If an entity reference is not provided, the default reference is the entity used to emit messages to this subscriber. If this is a queue subscriber, it will be a queue emitter. If this is a subscription, it will be the topic of the subscription."),Object(o.b)("p",null,">"," You can also provide a clientId to look the entity in."),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"resolveClient(emitterReference?: SbEmitterRef): SbEmitterImp | undefined;\n")),Object(o.b)("h2",{id:"parameters"},"Parameters"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Parameter"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"emitterReference"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("a",{parentName:"td",href:"/node/nesbus/docs/api/nesbus.sbemitterref"},"SbEmitterRef")),Object(o.b)("td",{parentName:"tr",align:null})))),Object(o.b)("b",null,"Returns:"),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbemitterimp"},"SbEmitterImp")," ","|"," undefined"))}l.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),l=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),u=l(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||p[d]||o;return n?a.a.createElement(m,s(s({ref:t},b),{},{components:n})):a.a.createElement(m,s({ref:t},b))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,c[1]=s;for(var b=2;b<o;b++)c[b]=n[b];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);