!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(n){return e[n]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/",n(n.s="mdyV")}({GFNa:function(){},QfWi:function(e,n,t){"use strict";function o(e){d.b.__h&&d.b.__h(f);var n=f.__H||(f.__H={t:[],u:[]});return e>=n.t.length&&n.t.push({}),n.t[e]}function r(e){return function(e,n,t){var r=o(s++);return r.__c||(r.__c=f,r.i=[t?t(n):a(void 0,n),function(n){var t=e(r.i[0],n);r.i[0]!==t&&(r.i[0]=t,r.__c.setState({}))}]),r.i}(a,e)}function l(e,n){var t=o(s++);c(t.o,n)&&(t.i=e,t.o=n,f.__H.u.push(t))}function u(){h.some((function(e){e.__P&&(e.__H.u.forEach(_),e.__H.u.forEach(i),e.__H.u=[])})),h=[]}function _(e){e.m&&e.m()}function i(e){var n=e.i();"function"==typeof n&&(e.m=n)}function c(e,n){return!e||n.some((function(n,t){return n!==e[t]}))}function a(e,n){return"function"==typeof n?n(e):n}t.r(n);t("GFNa");var s,f,p,d=t("hosL"),h=[],v=d.b.__r,m=d.b.diffed,y=d.b.__c,b=d.b.unmount;d.b.__r=function(e){v&&v(e),s=0,(f=e.__c).__H&&(f.__H.u.forEach(_),f.__H.u.forEach(i),f.__H.u=[])},d.b.diffed=function(e){m&&m(e);var n=e.__c;if(n){var t=n.__H;t&&t.u.length&&(1!==h.push(n)&&p===d.b.requestAnimationFrame||((p=d.b.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(o),cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);"undefined"!=typeof window&&(n=requestAnimationFrame(t))})(u))}},d.b.__c=function(e,n){n.some((function(e){e.__h.forEach(_),e.__h=e.__h.filter((function(e){return!e.i||i(e)}))})),y&&y(e,n)},d.b.unmount=function(e){b&&b(e);var n=e.__c;if(n){var t=n.__H;t&&t.t.forEach((function(e){return e.m&&e.m()}))}};for(var g=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e),w=new Date("May 18, 2018"),k=e=>e/864e5,D=e=>e/1e3,S=(e,n)=>(e+n)/2,x=new Date("January 1, 2018"),T=S(177866e6,232887e6)/365,O=T/86400,j=e=>T*(1+.3093/365)**k(e-x),P=e=>O*(1+.3093/31536e3)**D(e-x),A=(e,n)=>S(P(n),P(e))*D(n-e),H=new Date,E=0,C=0;C<365;C++){var N=new Date(86400*C*1e3+x.getTime());E+=j(N)}console.log("daily growth",1+.3093/365),console.log("secondly growth",1+.3093/31536e3),console.log("estTotalRevenue",g(E)),console.log("actual total revenue",g(177866e6*1.3093)),console.log("rpd start",g(j(x))),console.log("rpd current",g(j(new Date))),console.log("rpd alt",g(232887e6/365)),console.log("rps start",g(P(x))),console.log("rps current",g(P(new Date))),console.log("seconds since start",D(new Date-x)),console.log("growthfact",(1+.3093/31536e3)**D(new Date-x)),console.log("growthfact ht",(1+.3093/31536e3)**D(w-x)),console.log("days since start",k(new Date-x));n.default=()=>{var{response:e,loading:n,error:t}=((e,n)=>{var[t,o]=r(!0),[u,_]=r(null),[i,c]=r(null);return l(async()=>{try{_(await(await fetch(e,n)).json()),o(!1)}catch(e){c(e),o(!1)}},[]),{loading:t,response:u,error:i}})("https://forbes400.herokuapp.com/api/forbes400?limit=10"),[o,u]=r(0),[_,i]=r(0);if(l(()=>{setTimeout(()=>{if(0!==o){var e=(new Date-w)/1e3;i(.7927447995941146*e),u(o+2489)}},1e3)},[o]),n)return Object(d.a)("div",null,"Loading...");if(t)return console.error(t),Object(d.a)("div",null,"Error: ",t);var c=(e=>e.find(e=>"Jeff Bezos"===e.person.name))(e);0===o&&u(1e3*c.finalWorth);var a=Math.floor(_/.3/3e5),s=A(w,new Date),f=100*_/s;return Object(d.a)("div",{id:"app"},Object(d.a)("h1",null,"Net worth of Jeff Bezos: ",g(o)),Object(d.a)("h2",null,"Amazon total revenue since Head Tax Day: ",g(s)),Object(d.a)("h2",null,"Amazon daily revenue, last 24 hours: ",g(j(new Date))),Object(d.a)("h2",null,"Amazon revenue since you visited this page: ",g(A(H,new Date))),Object(d.a)("h2",null,"Amazon revenue, last second: ",g(P(new Date))),Object(d.a)("h2",null,"How much Head Tax revenue Amazon would have paid: ",g(_)," (",f.toFixed(4),"% of revenue)"),Object(d.a)("h2",null,"Total Head Tax revenue from all companies in Seattle: ",g(_/.3)),Object(d.a)("h2",null,"Affordable housing units lost: ",a))}},hosL:function(e,n,t){"use strict";function o(e,n){for(var t in n)e[t]=n[t];return e}function r(e){var n=e.parentNode;n&&n.removeChild(e)}function l(e,n,t){var r,l,_,i,c=arguments;if(n=o({},n),arguments.length>3)for(t=[t],r=3;r<arguments.length;r++)t.push(c[r]);if(null!=t&&(n.children=t),null!=e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===n[l]&&(n[l]=e.defaultProps[l]);return i=n.key,null!=(_=n.ref)&&delete n.ref,null!=i&&delete n.key,u(e,n,i,_)}function u(e,n,t,o){var r={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:null,__c:null,constructor:void 0};return x.vnode&&x.vnode(r),r}function _(e){return e.children}function i(e,n){this.props=e,this.context=n}function c(e,n){if(null==n)return e.__?c(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?c(e):null}function a(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return a(e)}}function s(e){(!e.__d&&(e.__d=!0)&&1===T.push(e)||j!==x.debounceRendering)&&((j=x.debounceRendering)||O)(f)}function f(){var e,n,t,r,l,u,_;for(T.sort((function(e,n){return n.__v.__b-e.__v.__b}));e=T.pop();)e.__d&&(t=void 0,r=void 0,u=(l=(n=e).__v).__e,(_=n.__P)&&(t=[],r=y(_,l,o({},l),n.__n,void 0!==_.ownerSVGElement,null,t,null==u?c(l):u),b(t,l),r!=u&&a(l)))}function p(e,n,t,o,l,u,_,i,a){var s,f,p,h,v,m,b,g=t&&t.__k||H,D=g.length;if(i==A&&(i=null!=u?u[0]:D?c(t,0):null),s=0,n.__k=d(n.__k,(function(t){if(null!=t){if(t.__=n,t.__b=n.__b+1,null===(p=g[s])||p&&t.key==p.key&&t.type===p.type)g[s]=void 0;else for(f=0;f<D;f++){if((p=g[f])&&t.key==p.key&&t.type===p.type){g[f]=void 0;break}p=null}if(h=y(e,t,p=p||A,o,l,u,_,i,a),(f=t.ref)&&p.ref!=f&&(b||(b=[]),p.ref&&b.push(p.ref,null,t),b.push(f,t.__c||h,t)),null!=h){if(null==m&&(m=h),null!=t.__d)h=t.__d,t.__d=null;else if(u==p||h!=i||null==h.parentNode){e:if(null==i||i.parentNode!==e)e.appendChild(h);else{for(v=i,f=0;(v=v.nextSibling)&&f<D;f+=2)if(v==h)break e;e.insertBefore(h,i)}"option"==n.type&&(e.value="")}i=h.nextSibling,"function"==typeof n.type&&(n.__d=h)}}return s++,t})),n.__e=m,null!=u&&"function"!=typeof n.type)for(s=u.length;s--;)null!=u[s]&&r(u[s]);for(s=D;s--;)null!=g[s]&&k(g[s],g[s]);if(b)for(s=0;s<b.length;s++)w(b[s],b[++s],b[++s])}function d(e,n,t){if(null==t&&(t=[]),null==e||"boolean"==typeof e)n&&t.push(n(null));else if(Array.isArray(e))for(var o=0;o<e.length;o++)d(e[o],n,t);else t.push(n?n("string"==typeof e||"number"==typeof e?u(null,e,null,null):null!=e.__e||null!=e.__c?u(e.type,e.props,e.key,null):e):e);return t}function h(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]="number"==typeof t&&!1===E.test(n)?t+"px":null==t?"":t}function v(e,n,t,o,r){var l,u,_,i,c;if(r?"className"===n&&(n="class"):"class"===n&&(n="className"),"key"===n||"children"===n);else if("style"===n)if(l=e.style,"string"==typeof t)l.cssText=t;else{if("string"==typeof o&&(l.cssText="",o=null),o)for(u in o)t&&u in t||h(l,u,"");if(t)for(_ in t)o&&t[_]===o[_]||h(l,_,t[_])}else"o"===n[0]&&"n"===n[1]?(i=n!==(n=n.replace(/Capture$/,"")),c=n.toLowerCase(),n=(c in e?c:n).slice(2),t?(o||e.addEventListener(n,m,i),(e.l||(e.l={}))[n]=t):e.removeEventListener(n,m,i)):"list"!==n&&"tagName"!==n&&"form"!==n&&!r&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/^xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t?e.removeAttribute(n):e.setAttribute(n,t))}function m(e){this.l[e.type](x.event?x.event(e):e)}function y(e,n,t,r,l,u,c,a,s){var f,h,v,m,y,b,w,k,S,T,O=n.type;if(void 0!==n.constructor)return null;(f=x.__b)&&f(n);try{e:if("function"==typeof O){if(k=n.props,S=(f=O.contextType)&&r[f.__c],T=f?S?S.props.value:f.__:r,t.__c?w=(h=n.__c=t.__c).__=h.__E:("prototype"in O&&O.prototype.render?n.__c=h=new O(k,T):(n.__c=h=new i(k,T),h.constructor=O,h.render=D),S&&S.sub(h),h.props=k,h.state||(h.state={}),h.context=T,h.__n=r,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=O.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=o({},h.__s)),o(h.__s,O.getDerivedStateFromProps(k,h.__s))),m=h.props,y=h.state,v)null==O.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==O.getDerivedStateFromProps&&null==h.__e&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(k,T),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(k,h.__s,T)){for(h.props=k,h.state=h.__s,h.__d=!1,h.__v=n,n.__e=t.__e,n.__k=t.__k,h.__h.length&&c.push(h),f=0;f<n.__k.length;f++)n.__k[f]&&(n.__k[f].__=n);break e}null!=h.componentWillUpdate&&h.componentWillUpdate(k,h.__s,T),null!=h.componentDidUpdate&&h.__h.push((function(){h.componentDidUpdate(m,y,b)}))}h.context=T,h.props=k,h.state=h.__s,(f=x.__r)&&f(n),h.__d=!1,h.__v=n,h.__P=e,f=h.render(h.props,h.state,h.context),n.__k=d(null!=f&&f.type==_&&null==f.key?f.props.children:f),null!=h.getChildContext&&(r=o(o({},r),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(b=h.getSnapshotBeforeUpdate(m,y)),p(e,n,t,r,l,u,c,a,s),h.base=n.__e,h.__h.length&&c.push(h),w&&(h.__E=h.__=null),h.__e=null}else n.__e=g(t.__e,n,t,r,l,u,c,s);(f=x.diffed)&&f(n)}catch(e){x.__e(e,n,t)}return n.__e}function b(e,n){x.__c&&x.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){x.__e(e,n.__v)}}))}function g(e,n,t,o,r,l,u,_){var i,c,a,s,f,d=t.props,h=n.props;if(r="svg"===n.type||r,null==e&&null!=l)for(i=0;i<l.length;i++)if(null!=(c=l[i])&&(null===n.type?3===c.nodeType:c.localName===n.type)){e=c,l[i]=null;break}if(null==e){if(null===n.type)return document.createTextNode(h);e=r?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type),l=null}if(null===n.type)null!=l&&(l[l.indexOf(e)]=null),d!==h&&(e.data=h);else if(n!==t){if(null!=l&&(l=H.slice.call(e.childNodes)),a=(d=t.props||A).dangerouslySetInnerHTML,s=h.dangerouslySetInnerHTML,!_){if(d===A)for(d={},f=0;f<e.attributes.length;f++)d[e.attributes[f].name]=e.attributes[f].value;(s||a)&&(s&&a&&s.__html==a.__html||(e.innerHTML=s&&s.__html||""))}(function(e,n,t,o,r){var l;for(l in t)l in n||v(e,l,null,t[l],o);for(l in n)r&&"function"!=typeof n[l]||"value"===l||"checked"===l||t[l]===n[l]||v(e,l,n[l],t[l],o)})(e,h,d,r,_),n.__k=n.props.children,s||p(e,n,t,o,"foreignObject"!==n.type&&r,l,u,A,_),_||("value"in h&&void 0!==h.value&&h.value!==e.value&&(e.value=null==h.value?"":h.value),"checked"in h&&void 0!==h.checked&&h.checked!==e.checked&&(e.checked=h.checked))}return e}function w(e,n,t){try{"function"==typeof e?e(n):e.current=n}catch(e){x.__e(e,t)}}function k(e,n,t){var o,l,u;if(x.unmount&&x.unmount(e),(o=e.ref)&&w(o,null,n),t||"function"==typeof e.type||(t=null!=(l=e.__e)),e.__e=e.__d=null,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){x.__e(e,n)}o.base=o.__P=null}if(o=e.__k)for(u=0;u<o.length;u++)o[u]&&k(o[u],n,t);null!=l&&r(l)}function D(e,n,t){return this.constructor(e,t)}function S(e,n,t){var o,r,u;x.__&&x.__(e,n),r=(o=t===P)?null:t&&t.__k||n.__k,e=l(_,null,[e]),u=[],y(n,(o?n:t||n).__k=e,r||A,A,void 0!==n.ownerSVGElement,t&&!o?[t]:r?null:H.slice.call(n.childNodes),u,t||A,o),b(u,e)}t.d(n,"c",(function(){return S})),t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return x}));var x,T,O,j,P,A={},H=[],E=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;x={__e:function(e,n){for(var t;n=n.__;)if((t=n.__c)&&!t.__)try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError)t.setState(t.constructor.getDerivedStateFromError(e));else{if(null==t.componentDidCatch)continue;t.componentDidCatch(e)}return s(t.__E=t)}catch(n){e=n}throw e}},i.prototype.setState=function(e,n){var t;t=this.__s!==this.state?this.__s:this.__s=o({},this.state),"function"==typeof e&&(e=e(t,this.props)),e&&o(t,e),null!=e&&this.__v&&(this.__e=!1,n&&this.__h.push(n),s(this))},i.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),s(this))},i.prototype.render=_,T=[],O="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,P=A},mdyV:function(e,n,t){"use strict";t.r(n);var o=t("hosL"),r=e=>e&&e.default?e.default:e;if("serviceWorker"in navigator&&navigator.serviceWorker.register(t.p+"sw-esm.js"),"function"==typeof r(t("QfWi"))){var l=document.body.firstElementChild;0,(()=>{var e=r(t("QfWi")),n={},u=document.querySelector('[type="__PREACT_CLI_DATA__"]');u&&(n=JSON.parse(u.innerHTML).preRenderData);var _={preRenderData:n};l=Object(o.c)(Object(o.a)(e,{CLI_DATA:_}),document.body,l)})()}}});
//# sourceMappingURL=bundle.53c81.esm.js.map