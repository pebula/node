"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[8458],{5532:(t,e,r)=>{r.r(e),r.d(e,{contentTitle:()=>h,default:()=>a,frontMatter:()=>i,toc:()=>c});var n=r(4848),o=r(8453),s=r(6025);const i={id:"chart-js-html-reporter",title:"ChartJS HTML Reporter",sidebar_label:"4. ChartJS HTML Reporter"},h=void 0,c=[{value:"Configuration",id:"configuration",level:2}];function l(t){const e={br:"br",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:["The ",(0,n.jsx)(e.code,{children:"ChartJsHtmlReporter"})," is a charting reporter which outputs an HTML file that uses the ",(0,n.jsx)(e.code,{children:"CharJS"})," charting library."]}),"\n",(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{}),(0,n.jsx)(e.th,{})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"Import"}),(0,n.jsx)(e.td,{children:(0,n.jsx)(e.code,{children:"import { ChartJsHtmlReporter } from '@pebula/touchstone/reporters/chart-js-html'"})})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"Dependencies"}),(0,n.jsx)(e.td,{children:"None"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:"Configuration"}),(0,n.jsx)(e.td,{children:"Optional"})]})]})]}),"\n",(0,n.jsx)(e.h2,{id:"configuration",children:"Configuration"}),"\n",(0,n.jsxs)(e.p,{children:["There is only ",(0,n.jsx)(e.strong,{children:"one optional"})," configuration available, which controls the HTML file output location."]}),"\n",(0,n.jsxs)(e.p,{children:["The default output is set to ",(0,n.jsx)(e.code,{children:'"benchmark-chart.html"'}),", which resolved to the current working directory and this filename."]}),"\n",(0,n.jsxs)(e.p,{children:["To change the output path set the ",(0,n.jsx)(e.code,{children:"chartJsHtmlReporterOutputFile"})," property on the mixin host to the path you would like to save the file to.",(0,n.jsx)(e.br,{}),"\n","If you set a relative path it will be relative to the current working directory (the folder which executed the process)."]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-typescript",children:"import { TouchStone } from '@pebula/touchstone';\nimport { ChartJsHtmlReporter } from '@pebula/touchstone/chart-js-html';\nimport './suites'; // make sure all suites are loaded\n\n@TouchStone()\nclass MyPerformanceTest extends Mixin(ChartJsHtmlReporter) {\n  chartJsHtmlReporterOutputFile = `./my-custom-path.html';\n}\n"})}),"\n",(0,n.jsx)("img",{alt:"ChartJS HTML Reporter",src:(0,s.A)("img/chartjs-html-report.png")})]})}function a(t={}){const{wrapper:e}={...(0,o.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(l,{...t})}):l(t)}},8453:(t,e,r)=>{r.d(e,{R:()=>i,x:()=>h});var n=r(6540);const o={},s=n.createContext(o);function i(t){const e=n.useContext(s);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function h(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:i(t.components),n.createElement(s.Provider,{value:e},t.children)}}}]);