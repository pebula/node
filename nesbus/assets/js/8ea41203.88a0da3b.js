(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{142:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return s})),n.d(r,"metadata",(function(){return c})),n.d(r,"toc",(function(){return b})),n.d(r,"default",(function(){return p}));var t=n(3),a=n(8),o=(n(0),n(204)),s={},c={unversionedId:"api-docs/nesbus.sberrorhandler.onmessageerror",id:"api-docs/nesbus.sberrorhandler.onmessageerror",isDocsHomePage:!1,title:"nesbus.sberrorhandler.onmessageerror",description:"Home &gt; @pebula/nesbus &gt; SbErrorHandler &gt; onMessageError",source:"@site/docs/api-docs/nesbus.sberrorhandler.onmessageerror.md",slug:"/api-docs/nesbus.sberrorhandler.onmessageerror",permalink:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler.onmessageerror",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sberrorhandler.onmessageerror.md",version:"current"},b=[{value:"SbErrorHandler.onMessageError() method",id:"sberrorhandleronmessageerror-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],l={toc:b};function p(e){var r=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(t.a)({},l,n,{components:r,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler"},"SbErrorHandler")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sberrorhandler.onmessageerror"},"onMessageError")),Object(o.b)("h2",{id:"sberrorhandleronmessageerror-method"},"SbErrorHandler.onMessageError() method"),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"abstract onMessageError(event: SbMessageErrorEvent): Promise<void>;\n")),Object(o.b)("h2",{id:"parameters"},"Parameters"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Parameter"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"event"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.sbmessageerrorevent"},"SbMessageErrorEvent")),Object(o.b)("td",{parentName:"tr",align:null})))),Object(o.b)("b",null,"Returns:"),Object(o.b)("p",null,"Promise","<","void",">"))}p.isMDXComponent=!0},204:function(e,r,n){"use strict";n.d(r,"a",(function(){return u})),n.d(r,"b",(function(){return m}));var t=n(0),a=n.n(t);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function s(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?s(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function b(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),p=function(e){var r=a.a.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},u=function(e){var r=p(e.components);return a.a.createElement(l.Provider,{value:r},e.children)},i={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},d=a.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,o=e.originalType,s=e.parentName,l=b(e,["components","mdxType","originalType","parentName"]),u=p(n),d=t,m=u["".concat(s,".").concat(d)]||u[d]||i[d]||o;return n?a.a.createElement(m,c(c({ref:r},l),{},{components:n})):a.a.createElement(m,c({ref:r},l))}));function m(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var o=n.length,s=new Array(o);s[0]=d;var c={};for(var b in r)hasOwnProperty.call(r,b)&&(c[b]=r[b]);c.originalType=e,c.mdxType="string"==typeof e?e:t,s[1]=c;for(var l=2;l<o;l++)s[l]=n[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);