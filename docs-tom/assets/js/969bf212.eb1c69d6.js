"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[370],{9045:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(4848),s=t(8453);t(6640);const o={id:"basic-usage",title:"Basic Usage",sidebar_label:"2. Basic Usage"},a=void 0,i={id:"mapping/basic-usage",title:"Basic Usage",description:"",source:"@site/docs/mapping/basic-usage.md",sourceDirName:"mapping",slug:"/mapping/basic-usage",permalink:"/node/docs-tom/docs/mapping/basic-usage",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/tom/docs/docs/mapping/basic-usage.md",tags:[],version:"current",frontMatter:{id:"basic-usage",title:"Basic Usage",sidebar_label:"2. Basic Usage"},sidebar:"sidenav",previous:{title:"1. Introduction",permalink:"/node/docs-tom/docs/mapping/mapping-introduction"}},d={},c=[];function m(e){const n={code:"code",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { defineClassMapping, getMapper } from '@pebula/tom/mapping';\n\nclass OrderDto implements Models.OrderDto {\n  @P id: number;\n  @P date: string;\n  @P shipped: boolean;\n  @P status: string;\n  @P.asArray(() => OrderItemDto) items: OrderItemDto[];\n  @P eTag: string;\n}\n\nclass OrderItemDto implements Models.OrderItemDto {\n  @P sku: string;\n  @P quantity: number;\n  @P price: number;\n}\n\nclass Order implements Models.Order {\n  @P id: number;\n  @P date: Date;\n  @P shipped: boolean;\n  @P.enum(OrderStatus) status: OrderStatus;\n  @P.asArray(() => OrderItem) items: OrderItem[];\n}\n\nclass OrderItem implements Models.OrderItem {\n  @P sku: string;\n  @P quantity: number;\n  @P price: number;\n}\n\ndefineClassMapping(OrderItemDto, OrderItem, { 'strict' })\n  .forMember('sku', 'sku')\n  .forMember('price', 'price')\n  .forMember('quantity', 'quantity')\n  .seal();\n\ndefineClassMapping(OrderDto, Order, { 'strict' })\n  .forMember('id', 'id')\n  .forMember('date', 'date', Types.String) // Convert string to Date\n  .forMember('shipped', 'shipped')\n  .forMember('status', 'status', true) // Convert enum value\n  .forMember('items', 'items')\n  .forMember('eTag', c => c.ignore() ) // We must ignore or we can seal (enforced on design & runtime level)\n  .seal();\n\n\nconst mapper = getMapper(OrderDto, Order);\nconst orderDto = new OrderDto();\n// Assume populating OrderDto and OrderItemDto items\n\nconst order = mapper.transform(orderDto, {});\n"})})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},6640:(e,n,t)=>{t.d(n,{jd:()=>a});t(6540);var r=t(6025),s=(t(4586),t(8774)),o=t(4848);t(1765);function a(e){var n=e.to;return(0,o.jsx)(s.A,{to:(0,r.A)(n),children:e.children})}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var r=t(6540);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);