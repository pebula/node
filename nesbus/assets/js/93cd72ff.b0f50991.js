(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{145:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return a})),n.d(r,"metadata",(function(){return i})),n.d(r,"toc",(function(){return c})),n.d(r,"default",(function(){return u}));var t=n(3),s=n(8),o=(n(0),n(204)),a={},i={unversionedId:"api-docs/nesbus.sbserveroptions.registerhandlers",id:"api-docs/nesbus.sbserveroptions.registerhandlers",isDocsHomePage:!1,title:"nesbus.sbserveroptions.registerhandlers",description:"Home &gt; @pebula/nesbus &gt; SbServerOptions &gt; registerHandlers",source:"@site/docs/api-docs/nesbus.sbserveroptions.registerhandlers.md",slug:"/api-docs/nesbus.sbserveroptions.registerhandlers",permalink:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.registerhandlers",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbserveroptions.registerhandlers.md",version:"current"},c=[{value:"SbServerOptions.registerHandlers property",id:"sbserveroptionsregisterhandlers-property",children:[]}],p={toc:c};function u(e){var r=e.components,n=Object(s.a)(e,["components"]);return Object(o.b)("wrapper",Object(t.a)({},p,n,{components:r,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions"},"SbServerOptions")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.registerhandlers"},"registerHandlers")),Object(o.b)("h2",{id:"sbserveroptionsregisterhandlers-property"},"SbServerOptions.registerHandlers property"),Object(o.b)("p",null,"How handlers are registers in service bus. - sequence: register one after the other - parallel: register all at once"),Object(o.b)("p",null,"The default value is parallel"),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"registerHandlers?: 'sequence' | 'parallel';\n")))}u.isMDXComponent=!0},204:function(e,r,n){"use strict";n.d(r,"a",(function(){return l})),n.d(r,"b",(function(){return f}));var t=n(0),s=n.n(t);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function i(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,s=function(e,r){if(null==e)return{};var n,t,s={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(s[n]=e[n]);return s}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var p=s.a.createContext({}),u=function(e){var r=s.a.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):i(i({},r),e)),n},l=function(e){var r=u(e.components);return s.a.createElement(p.Provider,{value:r},e.children)},b={inlineCode:"code",wrapper:function(e){var r=e.children;return s.a.createElement(s.a.Fragment,{},r)}},d=s.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,o=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=u(n),d=t,f=l["".concat(a,".").concat(d)]||l[d]||b[d]||o;return n?s.a.createElement(f,i(i({ref:r},p),{},{components:n})):s.a.createElement(f,i({ref:r},p))}));function f(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var o=n.length,a=new Array(o);a[0]=d;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:t,a[1]=i;for(var p=2;p<o;p++)a[p]=n[p];return s.a.createElement.apply(null,a)}return s.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);