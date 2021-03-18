(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{274:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return v})),n.d(t,"metadata",(function(){return g})),n.d(t,"toc",(function(){return y})),n.d(t,"default",(function(){return h}));var a=n(3),r=n(8),o=n(0),i=n.n(o),c=n(277),l=n(288),s=n(282),u=n(133),d=n.n(u);var p=37,b=39;var m=function(e){var t=e.lazy,n=e.block,a=e.defaultValue,r=e.values,c=e.groupId,u=e.className,m=Object(l.a)(),f=m.tabGroupChoices,v=m.setTabGroupChoices,g=Object(o.useState)(a),y=g[0],O=g[1],h=o.Children.toArray(e.children),j=[];if(null!=c){var w=f[c];null!=w&&w!==y&&r.some((function(e){return e.value===w}))&&O(w)}var N=function(e){var t=e.target,n=j.indexOf(t),a=h[n].props.value;O(a),null!=c&&(v(c,a),setTimeout((function(){var e,n,a,r,o,i,c,l;(e=t.getBoundingClientRect(),n=e.top,a=e.left,r=e.bottom,o=e.right,i=window,c=i.innerHeight,l=i.innerWidth,n>=0&&o<=l&&r<=c&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(d.a.tabItemActive),setTimeout((function(){return t.classList.remove(d.a.tabItemActive)}),2e3))}),150))},x=function(e){var t,n;switch(e.keyCode){case b:var a=j.indexOf(e.target)+1;n=j[a]||j[0];break;case p:var r=j.indexOf(e.target)-1;n=j[r]||j[j.length-1]}null===(t=n)||void 0===t||t.focus()};return i.a.createElement("div",{className:"tabs-container"},i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},u)},r.map((function(e){var t=e.value,n=e.label;return i.a.createElement("li",{role:"tab",tabIndex:y===t?0:-1,"aria-selected":y===t,className:Object(s.a)("tabs__item",d.a.tabItem,{"tabs__item--active":y===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:x,onFocus:N,onClick:N},n)}))),t?Object(o.cloneElement)(h.filter((function(e){return e.props.value===y}))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},h.map((function(e,t){return Object(o.cloneElement)(e,{key:t,hidden:e.props.value!==y})}))))};var f=function(e){var t=e.children,n=e.hidden,a=e.className;return i.a.createElement("div",{role:"tabpanel",hidden:n,className:a},t)},v={id:"installation",title:"Installation",sidebar_label:"2. Installation"},g={unversionedId:"getting-started/installation",id:"getting-started/installation",isDocsHomePage:!1,title:"Installation",description:"To get started install the package:",source:"@site/docs/getting-started/installation.md",slug:"/getting-started/installation",permalink:"/node/goosetyped/docs/getting-started/installation",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/getting-started/installation.md",version:"current",sidebar_label:"2. Installation",sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/node/goosetyped/docs/getting-started/introduction"},next:{title:"Basic Usage",permalink:"/node/goosetyped/docs/getting-started/basic-example"}},y=[],O={toc:y};function h(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},O,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"To get started install the package:"),Object(c.b)(m,{defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(c.b)(f,{value:"yarn",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"$ yarn add @pebula/goosetyped\n"))),Object(c.b)(f,{value:"npm",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-bash"},"$ npm install @pebula/goosetyped\n")))),Object(c.b)("div",{className:"admonition admonition-info alert alert--info"},Object(c.b)("div",{parentName:"div",className:"admonition-heading"},Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",{parentName:"h5",className:"admonition-icon"},Object(c.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(c.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(c.b)("div",{parentName:"div",className:"admonition-content"},Object(c.b)("p",{parentName:"div"},Object(c.b)("strong",{parentName:"p"},"GooseTyped")," requires ",Object(c.b)("inlineCode",{parentName:"p"},"mongoose")," and it's pre-requisites installed, it does not install them for you."))),Object(c.b)("p",null,"Now, just start defining models using the tools provided by ",Object(c.b)("strong",{parentName:"p"},"GooseTyped"),"."),Object(c.b)("p",null,"By default, all models are attached to the default mongoose connection but you can assign models to a specific connection which\nis also how you can implement deffered model compilation, more on this in future chapters..."))}h.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),u=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=u(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=u(n),b=a,m=d["".concat(i,".").concat(b)]||d[b]||p[b]||o;return n?r.a.createElement(m,c(c({ref:t},s),{},{components:n})):r.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},282:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},288:function(e,t,n){"use strict";var a=n(0),r=n(289);t.a=function(){var e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},289:function(e,t,n){"use strict";var a=n(0),r=Object(a.createContext)(void 0);t.a=r}}]);