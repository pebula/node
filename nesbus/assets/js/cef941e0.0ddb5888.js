(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{172:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return c})),n.d(r,"metadata",(function(){return s})),n.d(r,"toc",(function(){return b})),n.d(r,"default",(function(){return p}));var t=n(3),o=n(8),a=(n(0),n(204)),c={},s={unversionedId:"api-docs/nesbus.sberrorhandler.onerror",id:"api-docs/nesbus.sberrorhandler.onerror",isDocsHomePage:!1,title:"nesbus.sberrorhandler.onerror",description:"Home &gt; @pebula/nesbus &gt; SbErrorHandler &gt; onError",source:"@site/docs/api-docs/nesbus.sberrorhandler.onerror.md",slug:"/api-docs/nesbus.sberrorhandler.onerror",permalink:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler.onerror",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/nesbus/docs/docs/api-docs/nesbus.sberrorhandler.onerror.md",version:"current"},b=[{value:"SbErrorHandler.onError() method",id:"sberrorhandleronerror-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],l={toc:b};function p(e){var r=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(t.a)({},l,n,{components:r,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler"},"SbErrorHandler")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler.onerror"},"onError")),Object(a.b)("h2",{id:"sberrorhandleronerror-method"},"SbErrorHandler.onError() method"),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"abstract onError(event: SbErrorEvent): Promise<void>;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"event"),Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.sberrorevent"},"SbErrorEvent")),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,"Promise","<","void",">"))}p.isMDXComponent=!0},204:function(e,r,n){"use strict";n.d(r,"a",(function(){return u})),n.d(r,"b",(function(){return m}));var t=n(0),o=n.n(t);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function c(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function b(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var r=o.a.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):s(s({},r),e)),n},u=function(e){var r=p(e.components);return o.a.createElement(l.Provider,{value:r},e.children)},i={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},d=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,a=e.originalType,c=e.parentName,l=b(e,["components","mdxType","originalType","parentName"]),u=p(n),d=t,m=u["".concat(c,".").concat(d)]||u[d]||i[d]||a;return n?o.a.createElement(m,s(s({ref:r},l),{},{components:n})):o.a.createElement(m,s({ref:r},l))}));function m(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var a=n.length,c=new Array(a);c[0]=d;var s={};for(var b in r)hasOwnProperty.call(r,b)&&(s[b]=r[b]);s.originalType=e,s.mdxType="string"==typeof e?e:t,c[1]=s;for(var l=2;l<a;l++)c[l]=n[l];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);