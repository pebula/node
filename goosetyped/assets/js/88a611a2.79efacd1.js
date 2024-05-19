(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{178:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return c})),o.d(t,"metadata",(function(){return p})),o.d(t,"toc",(function(){return i})),o.d(t,"default",(function(){return d}));var n=o(3),r=o(8),a=(o(0),o(277)),c={},p={unversionedId:"api-docs/goosetyped.gttojson",id:"api-docs/goosetyped.gttojson",isDocsHomePage:!1,title:"goosetyped.gttojson",description:"Home &gt; @pebula/goosetyped &gt; GtToJSON",source:"@site/docs/api-docs/goosetyped.gttojson.md",slug:"/api-docs/goosetyped.gttojson",permalink:"/node/goosetyped/docs/api-docs/goosetyped.gttojson",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/goosetyped/docs/docs/api-docs/goosetyped.gttojson.md",version:"current"},i=[{value:"GtToJSON() function",id:"gttojson-function",children:[]},{value:"Parameters",id:"parameters",children:[]}],s={toc:i};function d(e){var t=e.components,o=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/index"},"Home")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped"},"@pebula/goosetyped")," ",">"," ",Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.gttojson"},"GtToJSON")),Object(a.b)("h2",{id:"gttojson-function"},"GtToJSON() function"),Object(a.b)("p",null,"A decorator for ",Object(a.b)("inlineCode",{parentName:"p"},"toJSON")," with a prototype bound implementation for the ",Object(a.b)("inlineCode",{parentName:"p"},"transform")," function."),Object(a.b)("p",null,"Note that it recommended to avoid using a transform function (through schema options) or a transform method through this decorator and instead apply a transformation by overriding the ",Object(a.b)("inlineCode",{parentName:"p"},"toJSON"),". Call the super method and apply changed to the returned value, this is much better then using an out of context transformer."),Object(a.b)("p",null," ",Object(a.b)("a",{parentName:"p",href:"https://mongoosejs.com/docs/4.x/docs/guide.html%5C#toJSON"},"https://mongoosejs.com/docs/4.x/docs/guide.html\\#toJSON")),Object(a.b)("b",null,"Signature:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"export declare function GtToJSON(config?: Omit<mongoose.ToObjectOptions, 'transform'>): MethodDecoratorOf<[any, any]>;\n")),Object(a.b)("h2",{id:"parameters"},"Parameters"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Parameter"),Object(a.b)("th",{parentName:"tr",align:null},"Type"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"config"),Object(a.b)("td",{parentName:"tr",align:null},"Omit","<","mongoose.ToObjectOptions, 'transform'",">"),Object(a.b)("td",{parentName:"tr",align:null})))),Object(a.b)("b",null,"Returns:"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/node/goosetyped/docs/api-docs/goosetyped.methoddecoratorof"},"MethodDecoratorOf"),"<","[","any, any","]",">"))}d.isMDXComponent=!0},277:function(e,t,o){"use strict";o.d(t,"a",(function(){return l})),o.d(t,"b",(function(){return m}));var n=o(0),r=o.n(n);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function p(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=r.a.createContext({}),d=function(e){var t=r.a.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):p(p({},t),e)),o},l=function(e){var t=d(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),l=d(o),b=n,m=l["".concat(c,".").concat(b)]||l[b]||u[b]||a;return o?r.a.createElement(m,p(p({ref:t},s),{},{components:o})):r.a.createElement(m,p({ref:t},s))}));function m(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,c=new Array(a);c[0]=b;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,c[1]=p;for(var s=2;s<a;s++)c[s]=o[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,o)}b.displayName="MDXCreateElement"}}]);