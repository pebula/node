(window.webpackJsonp=window.webpackJsonp||[]).push([[189],{261:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return d})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return s}));var o=n(3),r=n(8),a=(n(0),n(277)),d={},p={unversionedId:"api-docs/goosetyped.model.findoneandupdate",id:"api-docs/goosetyped.model.findoneandupdate",isDocsHomePage:!1,title:"goosetyped.model.findoneandupdate",description:"Home &gt; @pebula/goosetyped &gt; Model &gt; findOneAndUpdate",source:"@site/docs/api-docs/goosetyped.model.findoneandupdate.md",slug:"/api-docs/goosetyped.model.findoneandupdate",permalink:"/node/goosetyped/docs/api-docs/goosetyped.model.findoneandupdate",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.model.findoneandupdate.md",version:"current"},c=[{value:"Model.findOneAndUpdate() method",id:"modelfindoneandupdate-method",children:[]},{value:"Parameters",id:"parameters",children:[]}],i={toc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.model"},"Model")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.model.findoneandupdate"},"findOneAndUpdate")),Object(a.b)("h2",{id:"modelfindoneandupdate-method"},"Model.findOneAndUpdate() method"),Object(a.b)("p",null,"Issues a mongodb findAndModify update command. Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback. The query executes immediately if callback is passed else a Query object is returned."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate() rather than the deprecated findAndModify(). + ",Object(a.b)("a",{parentName:"li",href:"https://mongoosejs.com/docs/api.html%5C#mongoose%5C_Mongoose-set"},"https://mongoosejs.com/docs/api.html\\#mongoose\\_Mongoose-set"))),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"findOneAndUpdate<T extends Document>(this: Ctor<T>): DocumentQuery<T | null, T, QueryHelpers> & QueryHelpers;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"this"),Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("a",{parentName:"td",href:"/node/goosetyped/docs/api-docs/goosetyped.ctor"},"Ctor"),"<","T",">"),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,"DocumentQuery","<","T ","|"," null, T, QueryHelpers",">"," ","&"," QueryHelpers"))}s.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=r.a.createContext({}),s=function(e){var t=r.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},l=function(e){var t=s(e.components);return r.a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,d=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),l=s(n),b=o,m=l["".concat(d,".").concat(b)]||l[b]||u[b]||a;return n?r.a.createElement(m,p(p({ref:t},i),{},{components:n})):r.a.createElement(m,p({ref:t},i))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,d=new Array(a);d[0]=b;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:o,d[1]=p;for(var i=2;i<a;i++)d[i]=n[i];return r.a.createElement.apply(null,d)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);