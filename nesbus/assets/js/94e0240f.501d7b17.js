(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{149:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return u})),r.d(t,"default",(function(){return b}));var n=r(3),a=r(8),s=(r(0),r(204)),o={},i={unversionedId:"api/nesbus.servicebusmodule.register",id:"api/nesbus.servicebusmodule.register",isDocsHomePage:!1,title:"nesbus.servicebusmodule.register",description:"Home &gt; @pebula/nesbus &gt; ServiceBusModule &gt; register",source:"@site/docs/api/nesbus.servicebusmodule.register.md",slug:"/api/nesbus.servicebusmodule.register",permalink:"/node/nesbus/docs/api/nesbus.servicebusmodule.register",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/nesbus.servicebusmodule.register.md",version:"current"},u=[{value:"ServiceBusModule.register() method",id:"servicebusmoduleregister-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],c={toc:u};function b(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/index"},"Home")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus"},"@pebula/nesbus")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.servicebusmodule"},"ServiceBusModule")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.servicebusmodule.register"},"register")),Object(s.b)("h2",{id:"servicebusmoduleregister-method"},"ServiceBusModule.register() method"),Object(s.b)("p",null,"Register a service bus server/s that will be used as the underlying resources to generate ",Object(s.b)("inlineCode",{parentName:"p"},"Queue")," ","&"," ",Object(s.b)("inlineCode",{parentName:"p"},"Subscription")," listeners."),Object(s.b)("p",null,"You can provide multiple server configurations, however make sure that each of them has a unique name. Note that not setting a name is a unique name by itself."),Object(s.b)("b",null,"Signature:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"static register(options: SbModuleRegisterOptions): DynamicModule;\n")),Object(s.b)("h2",{id:"parameters"},"Parameters"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",{parentName:"tr",align:null},"Parameter"),Object(s.b)("th",{parentName:"tr",align:null},"Type"),Object(s.b)("th",{parentName:"tr",align:null},"Description"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",{parentName:"tr",align:null},"options"),Object(s.b)("td",{parentName:"tr",align:null},Object(s.b)("a",{parentName:"td",href:"/node/nesbus/docs/api/nesbus.sbmoduleregisteroptions"},"SbModuleRegisterOptions")),Object(s.b)("td",{parentName:"tr",align:null})))),Object(s.b)("b",null,"Returns:"),Object(s.b)("p",null,"DynamicModule"))}b.isMDXComponent=!0},204:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,o=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),l=b(r),d=n,m=l["".concat(o,".").concat(d)]||l[d]||p[d]||s;return r?a.a.createElement(m,i(i({ref:t},c),{},{components:r})):a.a.createElement(m,i({ref:t},c))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,o=new Array(s);o[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var c=2;c<s;c++)o[c]=r[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);