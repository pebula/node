(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{105:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return b})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return s}));var r=n(3),a=n(8),c=(n(0),n(204)),o={},b={unversionedId:"api-docs/nesbus.sbinterceptor.intercept",id:"api-docs/nesbus.sbinterceptor.intercept",isDocsHomePage:!1,title:"nesbus.sbinterceptor.intercept",description:"Home &gt; @pebula/nesbus &gt; SbInterceptor &gt; intercept",source:"@site/docs/api-docs/nesbus.sbinterceptor.intercept.md",slug:"/api-docs/nesbus.sbinterceptor.intercept",permalink:"/node/nesbus/docs/api-docs/nesbus.sbinterceptor.intercept",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbinterceptor.intercept.md",version:"current"},p=[{value:"SbInterceptor.intercept() method",id:"sbinterceptorintercept-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],i={toc:p};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbinterceptor"},"SbInterceptor")," ",">"," ",Object(c.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbinterceptor.intercept"},"intercept")),Object(c.b)("h2",{id:"sbinterceptorintercept-method"},"SbInterceptor.intercept() method"),Object(c.b)("b",null,"Signature:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"intercept(context: SbContext, next: CallHandler<T>): Observable<R> | Promise<Observable<R>>;\n")),Object(c.b)("h2",{id:"parameters"},"Parameters"),Object(c.b)("table",null,Object(c.b)("thead",{parentName:"table"},Object(c.b)("tr",{parentName:"thead"},Object(c.b)("th",{parentName:"tr",align:null},"Parameter"),Object(c.b)("th",{parentName:"tr",align:null},"Type"),Object(c.b)("th",{parentName:"tr",align:null},"Description"))),Object(c.b)("tbody",{parentName:"table"},Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"context"),Object(c.b)("td",{parentName:"tr",align:null},Object(c.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.sbcontext"},"SbContext")),Object(c.b)("td",{parentName:"tr",align:null})),Object(c.b)("tr",{parentName:"tbody"},Object(c.b)("td",{parentName:"tr",align:null},"next"),Object(c.b)("td",{parentName:"tr",align:null},"CallHandler","<","T",">"),Object(c.b)("td",{parentName:"tr",align:null})))),Object(c.b)("b",null,"Returns:"),Object(c.b)("p",null,"Observable","<","R",">"," ","|"," Promise","<","Observable","<","R",">",">"))}s.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=a.a.createContext({}),s=function(e){var t=a.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):b(b({},t),e)),n},l=function(e){var t=s(e.components);return a.a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),l=s(n),d=r,m=l["".concat(o,".").concat(d)]||l[d]||u[d]||c;return n?a.a.createElement(m,b(b({ref:t},i),{},{components:n})):a.a.createElement(m,b({ref:t},i))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,o=new Array(c);o[0]=d;var b={};for(var p in t)hasOwnProperty.call(t,p)&&(b[p]=t[p]);b.originalType=e,b.mdxType="string"==typeof e?e:r,o[1]=b;for(var i=2;i<c;i++)o[i]=n[i];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);