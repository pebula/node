(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{119:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(8),s=(n(0),n(204)),o={},i={unversionedId:"api/nesbus.sbemitterimp.send",id:"api/nesbus.sbemitterimp.send",isDocsHomePage:!1,title:"nesbus.sbemitterimp.send",description:"Home &gt; @pebula/nesbus &gt; SbEmitterImp &gt; send",source:"@site/docs/api/nesbus.sbemitterimp.send.md",slug:"/api/nesbus.sbemitterimp.send",permalink:"/node/nesbus/docs/api/nesbus.sbemitterimp.send",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/nesbus.sbemitterimp.send.md",version:"current"},b=[{value:"SbEmitterImp.send() method",id:"sbemitterimpsend-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],c={toc:b};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/index"},"Home")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus"},"@pebula/nesbus")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbemitterimp"},"SbEmitterImp")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbemitterimp.send"},"send")),Object(s.b)("h2",{id:"sbemitterimpsend-method"},"SbEmitterImp.send() method"),Object(s.b)("b",null,"Signature:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"send(message: SendableMessageInfo): Promise<void>;\n")),Object(s.b)("h2",{id:"parameters"},"Parameters"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",{parentName:"tr",align:null},"Parameter"),Object(s.b)("th",{parentName:"tr",align:null},"Type"),Object(s.b)("th",{parentName:"tr",align:null},"Description"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",{parentName:"tr",align:null},"message"),Object(s.b)("td",{parentName:"tr",align:null},"SendableMessageInfo"),Object(s.b)("td",{parentName:"tr",align:null})))),Object(s.b)("b",null,"Returns:"),Object(s.b)("p",null,"Promise","<","void",">"))}p.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},l=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),u=p(n),l=r,d=u["".concat(o,".").concat(l)]||u[l]||m[l]||s;return n?a.a.createElement(d,i(i({ref:t},c),{},{components:n})):a.a.createElement(d,i({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=l;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<s;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"}}]);