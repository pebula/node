(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{146:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),o=r(8),a=(r(0),r(165)),c={id:"chart-js-html-reporter",title:"ChartJS HTML Reporter",sidebar_label:"4. ChartJS HTML Reporter"},i={unversionedId:"reporters/chart-js-html-reporter",id:"reporters/chart-js-html-reporter",isDocsHomePage:!1,title:"ChartJS HTML Reporter",description:"The ChartJsHtmlReporter is a charting reporter which outputs an HTML file that uses the CharJS charting library.",source:"@site/docs/reporters/chart-js-html-reporter.md",slug:"/reporters/chart-js-html-reporter",permalink:"/node/touchstone/docs/reporters/chart-js-html-reporter",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/reporters/chart-js-html-reporter.md",version:"current",sidebar_label:"4. ChartJS HTML Reporter",sidebar:"someSidebar",previous:{title:"Pretty Console Reporter",permalink:"/node/touchstone/docs/reporters/pretty-console-reporter"},next:{title:"Vega Lite Reporter",permalink:"/node/touchstone/docs/reporters/vega-lite-reporter"}},l=[{value:"Configuration",id:"configuration",children:[]}],p={toc:l};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"ChartJsHtmlReporter")," is a charting reporter which outputs an HTML file that uses the ",Object(a.b)("inlineCode",{parentName:"p"},"CharJS")," charting library."),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null}),Object(a.b)("th",{parentName:"tr",align:null}))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"Import"),Object(a.b)("td",{parentName:"tr",align:null},"import { ChartJsHtmlReporter } from '@pebula/touchstone/reporters/chart-js-html'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"Dependencies"),Object(a.b)("td",{parentName:"tr",align:null},"None")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},"Configuration"),Object(a.b)("td",{parentName:"tr",align:null},"Optional")))),Object(a.b)("h2",{id:"configuration"},"Configuration"),Object(a.b)("p",null,"There is only ",Object(a.b)("strong",{parentName:"p"},"one optional")," configuration available, which controls the HTML file output location."),Object(a.b)("p",null,"The default output is set to ",Object(a.b)("inlineCode",{parentName:"p"},'"benchmark-chart.html"'),", which resolved to the current working directory and this filename."),Object(a.b)("p",null,"To change the output path set the ",Object(a.b)("inlineCode",{parentName:"p"},"chartJsHtmlReporterOutputFile")," property on the mixin host to the path you would like to save the file to.",Object(a.b)("br",{parentName:"p"}),"\n","If you set a relative path it will be relative to the current working directory (the folder which executed the process)."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"import { TouchStone } from '@pebula/touchstone';\nimport { ChartJsHtmlReporter } from '@pebula/touchstone/chart-js-html';\nimport './suites'; // make sure all suites are loaded\n\n@TouchStone()\nclass MyPerformanceTest extends Mixin(ChartJsHtmlReporter) {\n  chartJsHtmlReporterOutputFile = `./my-custom-path.html';\n}\n")))}u.isMDXComponent=!0},165:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=o.a.createContext({}),u=function(e){var t=o.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(r),h=n,m=s["".concat(c,".").concat(h)]||s[h]||b[h]||a;return r?o.a.createElement(m,i(i({ref:t},p),{},{components:r})):o.a.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,c=new Array(a);c[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var p=2;p<a;p++)c[p]=r[p];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,r)}h.displayName="MDXCreateElement"}}]);