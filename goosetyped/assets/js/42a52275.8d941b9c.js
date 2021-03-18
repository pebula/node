(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{125:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return l}));var o=n(3),r=n(8),a=(n(0),n(277)),c={},p={unversionedId:"api/goosetyped.gttojson",id:"api/goosetyped.gttojson",isDocsHomePage:!1,title:"goosetyped.gttojson",description:"Home &gt; @pebula/goosetyped &gt; GtToJSON",source:"@site/docs/api/goosetyped.gttojson.md",slug:"/api/goosetyped.gttojson",permalink:"/node/goosetyped/docs/api/goosetyped.gttojson",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/goosetyped.gttojson.md",version:"current"},i=[{value:"GtToJSON() function",id:"gttojson-function",children:[]},{value:"Parameters",id:"parameters",children:[]}],s={toc:i};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api/goosetyped.gttojson"},"GtToJSON")),Object(a.b)("h2",{id:"gttojson-function"},"GtToJSON() function"),Object(a.b)("p",null,"A decorator for ",Object(a.b)("inlineCode",{parentName:"p"},"toJSON")," with a prototype bound implementation for the ",Object(a.b)("inlineCode",{parentName:"p"},"transform")," function."),Object(a.b)("p",null,"Note that it recommended to avoid using a transform function (through schema options) or a transform method through this decorator and instead apply a transformation by overriding the ",Object(a.b)("inlineCode",{parentName:"p"},"toJSON"),". Call the super method and apply changed to the returned value, this is much better then using an out of context transformer."),Object(a.b)("p",null," ",Object(a.b)("a",{parentName:"p",href:"https://mongoosejs.com/docs/4.x/docs/guide.html%5C#toJSON"},"https://mongoosejs.com/docs/4.x/docs/guide.html\\#toJSON")),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"export declare function GtToJSON(config?: Omit<mongoose.ToObjectOptions, 'transform'>): MethodDecoratorOf<[any, any]>;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"config"),Object(a.b)("td",{parentName:"tr",align:null},"Omit","<","mongoose.ToObjectOptions, 'transform'",">"),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api/goosetyped.methoddecoratorof"},"MethodDecoratorOf"),"<","[","any, any","]",">"))}l.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),l=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=l(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=l(n),b=o,m=u["".concat(c,".").concat(b)]||u[b]||d[b]||a;return n?r.a.createElement(m,p(p({ref:t},s),{},{components:n})):r.a.createElement(m,p({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=b;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:o,c[1]=p;for(var s=2;s<a;s++)c[s]=n[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);