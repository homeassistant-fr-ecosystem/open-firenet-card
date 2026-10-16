function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,f=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,O=`<${P}>`,M=document,N=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,F=/"/g,D=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),W=new WeakMap,V=M.createTreeWalker(M,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=I;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===I?"!--"===c[1]?r=z:void 0!==c[1]?r=R:void 0!==c[2]?(D.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=n??I,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?F:q):r===F||r===q?r=j:r===z||r===R?r=I:(r=j,n=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===I?i+O:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===B)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Q(this,s[i+r],e,r),a===B&&(a=this._$AH[r]),o||=!T(a)||a!==this._$AH[r],a===L?t=L:t!==L&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??L)===B)return;const i=this._$AH,s=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==L&&(i===L||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Y(e.insertBefore(N(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ht=(t=dt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const _t=["status","climate","temperatures","fans","consumption","mechanics","bridge","schedule"],mt=_t.filter(t=>"status"!==t),ft="open_firenet",gt=_t,bt=["climate","temperatures","consumption"],yt={off:{labelKey:"state.off",icon:"mdi:power",tone:"off",burning:!1},standby:{labelKey:"state.standby",icon:"mdi:sleep",tone:"idle",burning:!1},ignition:{labelKey:"state.ignition",icon:"mdi:fire",tone:"active",burning:!0},flame_start:{labelKey:"state.flame_start",icon:"mdi:fire",tone:"active",burning:!0},heating:{labelKey:"state.heating",icon:"mdi:fire",tone:"active",burning:!0},cleaning:{labelKey:"state.cleaning",icon:"mdi:auto-fix",tone:"busy",burning:!1},burn_off:{labelKey:"state.burn_off",icon:"mdi:fire-off",tone:"idle",burning:!1},splitlog:{labelKey:"state.splitlog",icon:"mdi:fire",tone:"active",burning:!0},splitlog_check:{labelKey:"state.splitlog_check",icon:"mdi:fire",tone:"active",burning:!0},splitlog_refuel:{labelKey:"state.splitlog_refuel",icon:"mdi:fire-alert",tone:"busy",burning:!0},splitlog_no_refuel:{labelKey:"state.splitlog_no_refuel",icon:"mdi:fire-off",tone:"idle",burning:!1},unknown:{labelKey:"state.unknown",icon:"mdi:help-circle-outline",tone:"idle",burning:!1}},vt={labelKey:"state.unknown",icon:"mdi:help-circle-outline",tone:"idle",burning:!1},$t={manual:"preset.manual",auto:"preset.auto",comfort:"preset.comfort"},xt=["auto","1","2","3","4","5"],wt={"card.default_title":"Pellet stove","error.config_missing":"open-firenet-card: configuration is missing","error.no_entities":'No Open Firenet entity found. Make sure the integration is installed, or set the "entity" option.',"badge.connected":"Connected","badge.offline":"Offline","badge.flame":"Flame","badge.hopper_open":"Hopper open","badge.error":"Error","section.status":"Stove status","section.climate":"Heating","section.temperatures":"Temperatures","section.fans":"Fans","section.consumption":"Consumption & maintenance","section.mechanics":"Mechanics","section.bridge":"Bridge","section.schedule":"Schedule & protection","caption.ambient":"Ambient","caption.target":"Target","caption.mode":"Mode","caption.power":"Power","caption.power_set":"(set {value} %)","caption.combustion":"Combustion chamber","caption.board":"Mainboard","caption.pellets":"Pellets consumed","caption.operating_hours":"Operating hours","caption.service":"Maintenance","caption.service_remaining":"remaining {value} kg","caption.draft":"Flue draft","caption.auger":"Auger","caption.flaps":"Air flaps","caption.flaps_target":"Air flaps (target {value} %)","caption.wifi":"Wi-Fi · {quality}","caption.uptime":"Uptime","caption.link":"Stove link","caption.trim":"Convection trim","caption.enabled":"Enabled","caption.disabled":"Disabled","caption.running":"Running","caption.stopped":"Stopped","caption.fan_on":"On","caption.fan_off":"Off","button.start":"Start","button.stop":"Stop","switch.heating_schedule":"Heating schedule","switch.frost_protection":"Frost protection","preset.manual":"Manual","preset.auto":"Auto","preset.comfort":"Comfort","quality.excellent":"Excellent","quality.good":"Good","quality.fair":"Fair","quality.weak":"Weak","quality.very_weak":"Very weak","quality.none":"—","duration.days":"d","duration.hours":"h","duration.minutes":"min","state.off":"Off","state.standby":"Standby","state.ignition":"Ignition","state.flame_start":"Flame start","state.heating":"Heating","state.cleaning":"Cleaning","state.burn_off":"Burn off","state.splitlog":"Split log","state.splitlog_check":"Split log check","state.splitlog_refuel":"Refuel the log","state.splitlog_no_refuel":"Split log — no refuel","state.unknown":"Unknown","editor.anchor":"Anchor entity","editor.anchor_hint":"By default the card finds every entity of the same device.","editor.title":"Title (optional)","editor.title_placeholder":"Pellet stove","editor.show_controls":"Show controls","editor.sections":"Displayed sections","editor.section.status":"Stove status","editor.section.climate":"Heating (on/off, target, mode, power)","editor.section.temperatures":"Temperatures","editor.section.fans":"MultiAir fans","editor.section.consumption":"Consumption & maintenance","editor.section.mechanics":"Mechanics (draft, auger, flaps)","editor.section.bridge":"Bridge (Wi-Fi, uptime, link)","editor.section.schedule":"Schedule & frost protection","editor.expanded_sections":"Expanded by default","editor.expanded_sections_hint":"The other sections start collapsed; click a section header to expand it."},kt={"card.default_title":"Poêle à granulés","error.config_missing":"open-firenet-card : configuration manquante","error.no_entities":"Aucune entité Open Firenet trouvée. Vérifiez que l'intégration est installée ou renseignez l'option « entity ».","badge.connected":"Connecté","badge.offline":"Hors ligne","badge.flame":"Flamme","badge.hopper_open":"Couvercle ouvert","badge.error":"Erreur","section.status":"Statut du poêle","section.climate":"Chauffage","section.temperatures":"Températures","section.fans":"Ventilateurs","section.consumption":"Consommation & entretien","section.mechanics":"Mécanique","section.bridge":"Passerelle","section.schedule":"Planning & protection","caption.ambient":"Ambiante","caption.target":"Consigne","caption.mode":"Mode","caption.power":"Puissance","caption.power_set":"(réglée {value} %)","caption.combustion":"Chambre de combustion","caption.board":"Carte mère","caption.pellets":"Granulés consommés","caption.operating_hours":"Heures de fonctionnement","caption.service":"Entretien","caption.service_remaining":"reste {value} kg","caption.draft":"Tirage","caption.auger":"Vis sans fin","caption.flaps":"Volets d'air","caption.flaps_target":"Volets (cible {value} %)","caption.wifi":"Wi-Fi · {quality}","caption.uptime":"Passerelle","caption.link":"Liaison poêle","caption.trim":"Trim convection","caption.enabled":"Activé","caption.disabled":"Désactivé","caption.running":"En marche","caption.stopped":"À l'arrêt","caption.fan_on":"Marche","caption.fan_off":"Arrêt","button.start":"Démarrer","button.stop":"Arrêter","switch.heating_schedule":"Chauffage programmé","switch.frost_protection":"Hors-gel","preset.manual":"Manuel","preset.auto":"Auto","preset.comfort":"Confort","quality.excellent":"Excellent","quality.good":"Bon","quality.fair":"Moyen","quality.weak":"Faible","quality.very_weak":"Très faible","quality.none":"—","duration.days":"j","duration.hours":"h","duration.minutes":"min","state.off":"Éteint","state.standby":"Veille","state.ignition":"Allumage","state.flame_start":"Démarrage flamme","state.heating":"En chauffe","state.cleaning":"Nettoyage","state.burn_off":"Extinction","state.splitlog":"Bûche","state.splitlog_check":"Contrôle bûche","state.splitlog_refuel":"Recharger la bûche","state.splitlog_no_refuel":"Bûche — pas de rechargement","state.unknown":"Inconnu","editor.anchor":"Entité ancre","editor.anchor_hint":"Par défaut, la carte retrouve toutes les entités du même appareil.","editor.title":"Titre (optionnel)","editor.title_placeholder":"Poêle à granulés","editor.show_controls":"Afficher les contrôles","editor.sections":"Sections affichées","editor.section.status":"Statut du poêle","editor.section.climate":"Chauffage (marche/arrêt, consigne, mode, puissance)","editor.section.temperatures":"Températures","editor.section.fans":"Ventilateurs MultiAir","editor.section.consumption":"Consommation & entretien","editor.section.mechanics":"Mécanique (tirage, vis, volets)","editor.section.bridge":"Passerelle (Wi-Fi, uptime, liaison)","editor.section.schedule":"Planning & protection hors-gel","editor.expanded_sections":"Ouvertes par défaut","editor.expanded_sections_hint":"Les autres sections sont repliées ; cliquez sur l'en-tête d'une section pour la déplier."},At=["en","fr"],St={en:wt,fr:kt},Et={en:{days:wt["duration.days"],hours:wt["duration.hours"],minutes:wt["duration.minutes"]},fr:{days:kt["duration.days"],hours:kt["duration.hours"],minutes:kt["duration.minutes"]}};function Ct(t,e){const i=String(e||t?.locale?.language||t?.language||"en").toLowerCase().split("-")[0];return At.includes(i)?i:"en"}function Pt(t,e,i){let s=(St[t]??wt)[e]??wt[e]??e;if(i)for(const[t,e]of Object.entries(i))s=s.split(`{${t}}`).join(String(e));return s}const Ot={status:"editor.section.status",climate:"editor.section.climate",temperatures:"editor.section.temperatures",fans:"editor.section.fans",consumption:"editor.section.consumption",mechanics:"editor.section.mechanics",bridge:"editor.section.bridge",schedule:"editor.section.schedule"};let Mt=class extends at{constructor(){super(...arguments),this._datalistId=`ofn-entities-${Math.random().toString(36).slice(2,8)}`}setConfig(t){this._config=t}get _lang(){return Ct(this.hass,this._config?.language)}_t(t){return Pt(this._lang,t)}_nameFor(t){const e=this.hass?.states[t];if(e&&this.hass&&"function"==typeof this.hass.formatEntityName){const t=this.hass.formatEntityName(e);if(t)return t}return e?.attributes.friendly_name??t}get _anchorOptions(){const t=this.hass;return t?.entities?Object.keys(t.entities).filter(e=>t.entities[e].platform===ft&&t.states[e]).map(t=>({id:t,name:this._nameFor(t)})).sort((t,e)=>t.name.localeCompare(e.name)):[]}_update(t){if(!this._config)return;const e={...this._config,...t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}get _selectedSections(){const t=this._config?.sections;return t&&t.length?t:[..._t]}_toggleSection(t,e){const i=this._selectedSections,s=e?[...new Set([...i,t])]:i.filter(e=>e!==t);this._update({sections:s})}get _expandedSections(){const t=this._config?.expanded_sections;return t||[...bt]}_toggleExpanded(t,e){const i=this._expandedSections,s=e?[...new Set([...i,t])]:i.filter(e=>e!==t);this._update({expanded_sections:s})}render(){if(!this._config)return L;const t=this._anchorOptions;return K`
      <div class="form">
        <div class="field">
          <label class="title">${this._t("editor.anchor")}</label>
          <input
            type="text"
            list=${this._datalistId}
            .value=${this._config.entity??""}
            placeholder="climate.open_firenet"
            @change=${t=>this._update({entity:t.target.value||void 0})}
          />
          <datalist id=${this._datalistId}>
            ${t.map(t=>K`<option value=${t.id}>${t.name}</option>`)}
          </datalist>
          <span class="hint">${this._t("editor.anchor_hint")}</span>
        </div>

        <div class="field">
          <label class="title">${this._t("editor.title")}</label>
          <input
            type="text"
            .value=${this._config.title??""}
            placeholder=${this._t("editor.title_placeholder")}
            @input=${t=>this._update({title:t.target.value})}
          />
        </div>

        <div class="switch-row">
          <input
            id="show-controls"
            type="checkbox"
            .checked=${!1!==this._config.show_controls}
            @change=${t=>this._update({show_controls:t.target.checked})}
          />
          <label for="show-controls">${this._t("editor.show_controls")}</label>
        </div>

        <div class="field">
          <label class="title">${this._t("editor.sections")}</label>
          ${_t.map(t=>K`<div class="checkbox-row">
              <input
                id=${`section-${t}`}
                type="checkbox"
                .checked=${this._selectedSections.includes(t)}
                @change=${e=>this._toggleSection(t,e.target.checked)}
              />
              <label for=${`section-${t}`}>${this._t(Ot[t])}</label>
            </div>`)}
        </div>

        <div class="field">
          <label class="title">${this._t("editor.expanded_sections")}</label>
          ${mt.map(t=>K`<div class="checkbox-row">
              <input
                id=${`expanded-${t}`}
                type="checkbox"
                .checked=${this._expandedSections.includes(t)}
                @change=${e=>this._toggleExpanded(t,e.target.checked)}
              />
              <label for=${`expanded-${t}`}>${this._t(Ot[t])}</label>
            </div>`)}
          <span class="hint">${this._t("editor.expanded_sections_hint")}</span>
        </div>
      </div>
    `}};Mt.styles=r`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label.title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    input[type='text'] {
      font: inherit;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .switch-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
    }
    .checkbox-row input {
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
  `,t([pt({attribute:!1})],Mt.prototype,"hass",void 0),t([ut()],Mt.prototype,"_config",void 0),Mt=t([lt("open-firenet-card-editor")],Mt);const Nt={climate:{domain:"climate",key:"open_firenet"},stove_state:{domain:"sensor",key:"stove_state"},connected:{domain:"binary_sensor",key:"connected"},burning:{domain:"binary_sensor",key:"burning"},problem:{domain:"binary_sensor",key:"problem"},hopper_lid:{domain:"binary_sensor",key:"hopper_lid"},room_temperature:{domain:"sensor",key:"room_temperature"},combustion_temperature:{domain:"sensor",key:"combustion_temperature"},board_temperature:{domain:"sensor",key:"board_temperature"},pellets_total_kg:{domain:"sensor",key:"pellets_total_kg"},pellet_hours:{domain:"sensor",key:"pellet_hours"},service_countdown_kg:{domain:"sensor",key:"service_countdown_kg"},fan_speed_rpm:{domain:"sensor",key:"fan_speed_rpm"},auger_speed_rpm:{domain:"sensor",key:"auger_speed_rpm"},power_actual_percent:{domain:"sensor",key:"power_actual_percent"},air_flaps_percent:{domain:"sensor",key:"air_flaps_percent"},air_flaps_target_percent:{domain:"sensor",key:"air_flaps_target_percent"},wifi_rssi:{domain:"sensor",key:"wifi_rssi"},uptime_seconds:{domain:"sensor",key:"uptime_seconds"},heating_power:{domain:"number",key:"heating_power"},setback_temperature:{domain:"number",key:"setback_temperature"},frost_protection_temperature:{domain:"number",key:"frost_protection_temperature"},room_temperature_offset:{domain:"number",key:"room_temperature_offset"},bake_target_temperature:{domain:"number",key:"bake_target_temperature"},multiair_1:{domain:"fan",key:"multiair_1"},multiair_2:{domain:"fan",key:"multiair_2"},multiair_1_area:{domain:"number",key:"multiair_1_area"},multiair_2_area:{domain:"number",key:"multiair_2_area"},heating_schedule:{domain:"switch",key:"heating_schedule"},frost_protection:{domain:"switch",key:"frost_protection"}};function Tt(t,e){if(e.entity)return e.entity;const i=t.entities??{};for(const[t,e]of Object.entries(i))if(e.platform===ft&&t.startsWith("climate."))return t;return t.states["climate.open_firenet"]?"climate.open_firenet":void 0}function Ut(t,e){const i={},s=function(t,e){const i=t.entities??{},s=e?i[e]?.device_id??void 0:void 0;if(s){const t=Object.keys(i).filter(t=>i[t].device_id===s);if(t.length)return t}const n=Object.keys(i).filter(t=>i[t].platform===ft);return n.length?n:Object.keys(t.states).filter(t=>(t.split(".")[1]??"").startsWith(`${ft}_`))}(t,Tt(t,e)),n=new Set(s),o=t.entities??{},r=new Map;for(const t of s){const e=o[t],i=e?.translation_key;i&&r.set(`${t.split(".")[0]}.${i}`,t)}for(const[t,o]of Object.entries(Nt)){const a=e[t];if("string"==typeof a&&a){i[t]=a;continue}const c=r.get(`${o.domain}.${o.key}`);if(c){i[t]=c;continue}const l=`.${ft}_${o.key}`,d=s.find(t=>n.has(t)&&t.endsWith(l));d&&(i[t]=d)}return i}function Ht(t){if(!t)return null;const e=t.state;if(""===e||"unknown"===e||"unavailable"===e)return null;const i=Number(e);return Number.isFinite(i)?i:null}function It(t){return!!t&&"unknown"!==t.state&&"unavailable"!==t.state}function zt(t){return"on"===t?.state}function Rt(t,e=1,i){return null!==t&&Number.isFinite(t)?t.toLocaleString(i,{minimumFractionDigits:0,maximumFractionDigits:e}):"—"}const jt=r`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section + .section {
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    padding-top: 14px;
  }

  .section-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  /* ---------- collapsible sections ---------- */
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    text-align: left;
    justify-content: flex-start;
  }

  .section-summary {
    flex: none;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .section-summary.clickable:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .section-toggle:hover {
    background: none;
  }

  .section-toggle .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex: none;
    transition: transform 0.15s ease;
  }

  .section-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ---------- header ---------- */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-title {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .header-title .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-title .model {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .badges {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    color: var(--secondary-text-color);
  }

  .badge ha-icon {
    --mdc-icon-size: 15px;
  }

  .badge.ok {
    color: var(--success-color, #43a047);
  }

  .badge.alarm {
    background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
    color: var(--error-color, #db4437);
  }

  .badge.warn {
    background: color-mix(in srgb, var(--warning-color, #ffa600) 20%, transparent);
    color: var(--warning-color, #ffa600);
  }

  .badge.target {
    color: var(--warning-color, #ffa000);
  }

  .badge.clickable:hover {
    filter: brightness(0.95);
  }

  /* ---------- status ---------- */
  .status {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .state-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 14px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .state-chip ha-icon {
    --mdc-icon-size: 26px;
  }

  .state-chip .label {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .tone-active {
    color: var(--state-climate-heat-color, #ff6d00);
    background: color-mix(in srgb, var(--state-climate-heat-color, #ff6d00) 14%, transparent);
  }

  .tone-busy {
    color: var(--info-color, #039be5);
    background: color-mix(in srgb, var(--info-color, #039be5) 14%, transparent);
  }

  .tone-error {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent);
  }

  .tone-idle,
  .tone-off {
    color: var(--secondary-text-color);
  }

  .flame ha-icon {
    animation: flicker 1.6s ease-in-out infinite;
  }

  @keyframes flicker {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.12);
      opacity: 0.82;
    }
  }

  .temps {
    display: flex;
    gap: 18px;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .temp {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .temp .value {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .temp .caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  /* ---------- generic tiles ---------- */
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 10px;
  }

  .tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .tile ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    flex: none;
  }

  .tile .body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tile .value {
    font-size: 1.02rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .tile .caption {
    font-size: 0.74rem;
    color: var(--secondary-text-color);
  }

  /* ---------- icon accents (per domain) ---------- */
  .tile ha-icon.tone-heat {
    color: var(--state-climate-heat-color, #ff6d00);
  }

  .tile ha-icon.tone-warm {
    color: var(--warning-color, #ffa000);
  }

  .tile ha-icon.tone-teal {
    color: var(--teal-color, #00897b);
  }

  .tile ha-icon.tone-cool {
    color: var(--info-color, #039be5);
  }

  .tile ha-icon.tone-link {
    color: var(--success-color, #43a047);
  }

  .tile ha-icon.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .tile ha-icon.tone-schedule {
    color: var(--purple-color, #8e24aa);
  }

  .tile ha-icon.tone-frost {
    color: var(--light-blue-color, #29b6f6);
  }

  /* ---------- clickable values (open the more-info dialog) ---------- */
  .clickable {
    cursor: pointer;
  }

  .tile.clickable:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }

  .state-chip.clickable:hover {
    filter: brightness(0.96);
  }

  .temp.clickable:hover .value {
    text-decoration: underline;
  }

  .slider-row.clickable:hover .caption {
    color: var(--primary-text-color);
  }

  .clickable:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* ---------- controls ---------- */
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .spacer {
    flex: 1;
  }

  button {
    font: inherit;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  button:hover {
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button ha-icon {
    --mdc-icon-size: 20px;
  }

  button.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  button.primary:hover {
    background: var(--primary-color);
    filter: brightness(1.08);
  }

  button.icon {
    min-width: 40px;
    padding: 8px;
  }

  button.segment {
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 6px 12px;
  }

  button.segment.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  .temp-adjust {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .temp-adjust .consigne {
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 4.5ch;
    text-align: center;
  }

  input[type='range'] {
    width: 100%;
    accent-color: var(--primary-color);
  }

  .slider-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .slider-row .caption {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    color: var(--secondary-text-color);
  }

  /* ---------- fan ---------- */
  .fan {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .fan-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fan-head .name {
    font-weight: 600;
  }

  .spin ha-icon {
    animation: spin 2.2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ---------- progress ---------- */
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color, rgba(0, 0, 0, 0.12));
    overflow: hidden;
  }

  .progress > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  .progress > span.warn {
    background: var(--warning-color, #ffa600);
  }

  .progress > span.danger {
    background: var(--error-color, #db4437);
  }

  /* ---------- signals ---------- */
  .bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  .bars i {
    width: 4px;
    border-radius: 1px;
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
  }

  .bars i.on {
    background: var(--primary-color);
  }

  .bars.tone-ok i.on {
    background: var(--success-color, #43a047);
  }

  .bars.tone-fair i.on {
    background: var(--warning-color, #ffa600);
  }

  .bars.tone-weak i.on {
    background: var(--error-color, #db4437);
  }

  .bars i:nth-child(1) {
    height: 4px;
  }
  .bars i:nth-child(2) {
    height: 7px;
  }
  .bars i:nth-child(3) {
    height: 10px;
  }
  .bars i:nth-child(4) {
    height: 14px;
  }

  .muted {
    color: var(--secondary-text-color);
  }

  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
  }
`,qt=["multiair_1","multiair_2"],Ft={status:"section.status",climate:"section.climate",temperatures:"section.temperatures",fans:"section.fans",consumption:"section.consumption",mechanics:"section.mechanics",bridge:"section.bridge",schedule:"section.schedule"};let Dt=class extends at{constructor(){super(...arguments),this._sectionOverrides=new Map}static async getConfigElement(){return document.createElement("open-firenet-card-editor")}static getStubConfig(t,e=[],i=[]){const s=[...e,...i],n=e=>t?.entities?.[e]?.platform===ft;return{entity:s.find(t=>t.startsWith("climate.")&&n(t))??s.find(t=>n(t))??(n("climate.open_firenet")?"climate.open_firenet":void 0)??"climate.open_firenet",show_controls:!0}}setConfig(t){if(!t)throw new Error(Pt(Ct(this.hass),"error.config_missing"));this._config={show_controls:!0,...t},this._cache=void 0}getCardSize(){return 9}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}connectedCallback(){super.connectedCallback(),this._requestStatesContext()}disconnectedCallback(){this._unsubscribe?.(),this._unsubscribe=void 0,super.disconnectedCallback()}_requestStatesContext(){const t=new CustomEvent("context-request",{bubbles:!0,composed:!0});t.context="states",t.subscribe=!0,t.callback=(t,e)=>{this._unsubscribe=e,this._states=t},this.dispatchEvent(t)}shouldUpdate(t){if(t.has("_config")||t.has("_sectionOverrides"))return!0;if(!this.hass)return!1;if(!this._states)return t.has("hass")||t.has("_states");const e=!this._static||this._static.entities!==this.hass.entities||this._static.devices!==this.hass.devices||this._static.language!==this.hass.language||this._static.locale!==this.hass.locale;return e&&(this._static={entities:this.hass.entities,devices:this.hass.devices,language:this.hass.language,locale:this.hass.locale}),e||t.has("_states")}get _stateMap(){return this._states??this.hass?.states??{}}get _lang(){return Ct(this.hass,this._config?.language)}_t(t,e){return Pt(this._lang,t,e)}get entities(){const t=this._config,e=this.hass?.entities,i=this.hass?.devices,s=this._stateMap,n=this._cache;if(n&&n.config===t&&n.entities===e&&n.devices===i&&n.states===s)return n.result;const o=Ut(this.hass,t);return this._cache={config:t,entities:e,devices:i,states:s,result:o},o}get _controls(){return!1!==this._config.show_controls}get _sections(){const t=this._config.sections;return t&&t.length?t.filter(t=>_t.includes(t)):[...gt]}get _expandedDefaults(){const t=this._config.expanded_sections??bt;return new Set(t.filter(t=>_t.includes(t)))}_isExpanded(t){return this._sectionOverrides.get(t)??this._expandedDefaults.has(t)}_toggleSection(t){const e=new Map(this._sectionOverrides);e.set(t,!this._isExpanded(t)),this._sectionOverrides=e}_entity(t){const e=this.entities[t];return e?this._stateMap[e]:void 0}_device(){const t=Tt(this.hass,this._config),e=t?this.hass.entities?.[t]?.device_id:void 0;return e?this.hass.devices?.[e]:void 0}_presetLabel(t){const e=$t[t];return e?this._t(e):t}_stateLabel(t,e){if(t&&"function"==typeof this.hass.formatEntityState){const e=this.hass.formatEntityState(t);if(e)return e}return this._t(e)}_entityName(t,e){if(t&&"function"==typeof this.hass.formatEntityName){const e=this.hass.formatEntityName(t);if(e)return e}return t?.attributes.friendly_name??e}_call(t,e,i){this.hass.callService(t,e,i)}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_onClickableKey(t,e){e&&("Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._moreInfo(e)))}_setHvac(t){const e=this.entities.climate;e&&this._call("climate","set_hvac_mode",{entity_id:e,hvac_mode:t?"heat":"off"})}_adjustTemp(t){const e=this._entity("climate"),i=this.entities.climate;if(!e||!i)return;const s=Number(e.attributes.target_temp_step??1),n=Number(e.attributes.min_temp??14),o=Number(e.attributes.max_temp??28),r=Number(e.attributes.temperature??n),a=Math.min(o,Math.max(n,r+t*s));this._call("climate","set_temperature",{entity_id:i,temperature:a})}_setPreset(t){const e=this.entities.climate;e&&this._call("climate","set_preset_mode",{entity_id:e,preset_mode:t})}_setNumber(t,e){const i=this.entities[t];i&&this._call("number","set_value",{entity_id:i,value:e})}_toggleSwitch(t,e){const i=this.entities[t];i&&this._call("switch",e?"turn_on":"turn_off",{entity_id:i})}_toggleFan(t,e){const i=this.entities[t];i&&this._call("fan",e?"turn_on":"turn_off",{entity_id:i})}_setFanPreset(t,e){const i=this.entities[t];i&&this._call("fan","set_preset_mode",{entity_id:i,preset_mode:e})}render(){if(!this.hass||!this._config)return L;const t=Tt(this.hass,this._config);return K`
      <ha-card>
        <div class="card">
          ${this._renderHeader()}
          ${t?this._sections.map(t=>this._renderSection(t)):K`<div class="error-text">${this._t("error.no_entities")}</div>`}
        </div>
      </ha-card>
    `}_renderSection(t){const e=this._renderSectionBody(t);if(e===L)return L;if("status"===t)return K`<div class="section">${e}</div>`;const i=this._isExpanded(t),s=i?null:this._sectionSummary(t);return K`
      <div class="section collapsible ${i?"expanded":"collapsed"}">
        <div class="section-header">
          <button
            class="section-toggle"
            aria-expanded=${String(i)}
            @click=${()=>this._toggleSection(t)}
          >
            <ha-icon
              class="chevron"
              icon=${i?"mdi:chevron-down":"mdi:chevron-right"}
            ></ha-icon>
            <span class="section-title">${this._t(Ft[t])}</span>
          </button>
          ${s?K`<span
                class="section-summary ${s.entityId?"clickable":""}"
                role=${s.entityId?"button":L}
                tabindex=${s.entityId?"0":L}
                @click=${s.entityId?()=>this._moreInfo(s.entityId):L}
                @keydown=${s.entityId?t=>this._onClickableKey(t,s.entityId):L}
                >${s.text}</span
              >`:L}
        </div>
        ${i?e:L}
      </div>
    `}_sectionSummary(t){switch(t){case"climate":{const t=this._entity("climate")?.attributes.temperature;return"number"!=typeof t?null:{text:`${Rt(t,1,this._lang)}°C`,entityId:this.entities.climate}}case"temperatures":{const t=this._entity("climate")?.attributes.current_temperature??Ht(this._entity("room_temperature"));return null==t?null:{text:`${Rt(t,1,this._lang)}°C`,entityId:this.entities.room_temperature??this.entities.climate}}case"fans":{const t=qt.map(t=>this._entity(t)).filter(t=>!!t);if(!t.length)return null;const e=t.filter(t=>"on"===t.state).length;return{text:`${e}/${t.length}`,entityId:this.entities.multiair_1}}case"consumption":{const t=this._entity("pellets_total_kg");return It(t)?{text:`${Rt(Ht(t),0,this._lang)} kg`,entityId:this.entities.pellets_total_kg}:null}case"mechanics":{const t=this._entity("fan_speed_rpm");return It(t)?{text:`${Rt(Ht(t),0,this._lang)} rpm`,entityId:this.entities.fan_speed_rpm}:null}case"bridge":{const t=this._entity("wifi_rssi");if(It(t))return{text:`${Rt(Ht(t),0,this._lang)} dBm`,entityId:this.entities.wifi_rssi};const e=this._entity("connected");return e?{text:this._t(zt(e)?"badge.connected":"badge.offline"),entityId:this.entities.connected}:null}case"schedule":{const t=this._entity("heating_schedule");return t?{text:this._t("on"===t.state?"caption.enabled":"caption.disabled"),entityId:this.entities.heating_schedule}:null}default:return null}}_renderSectionBody(t){switch(t){case"status":return this._renderStatus();case"climate":return this._renderClimate();case"temperatures":return this._renderTemperatures();case"fans":return this._renderFans();case"consumption":return this._renderConsumption();case"mechanics":return this._renderMechanics();case"bridge":return this._renderBridge();case"schedule":return this._renderSchedule();default:return L}}_renderHeader(){const t=this._device(),e=this._config.title||t?.name_by_user||t?.name||this._t("card.default_title"),i=t?.model,s=this._entity("connected"),n=this._entity("burning"),o=this._entity("problem"),r=this._entity("hopper_lid"),a=this._entity("climate")?.attributes.temperature,c=this.entities.climate;return K`
      <div class="header">
        <ha-icon
          icon="mdi:fire"
          style="color: var(--state-climate-heat-color, #ff6d00); --mdc-icon-size: 28px"
        ></ha-icon>
        <div class="header-title">
          <span class="name">${e}</span>
          ${i?K`<span class="model">${i}</span>`:L}
        </div>
        <div class="badges">
          ${"number"==typeof a?K`<span
                class="badge target clickable"
                role="button"
                tabindex="0"
                title="${this._t("caption.target")}"
                @click=${()=>this._moreInfo(c)}
                @keydown=${t=>this._onClickableKey(t,c)}
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>${Rt(a,1,this._lang)}°C
              </span>`:L}
          ${s?K`<span class="badge ${zt(s)?"ok":"alarm"}">
                <ha-icon icon=${zt(s)?"mdi:lan-connect":"mdi:lan-disconnect"}></ha-icon>
                ${this._t(zt(s)?"badge.connected":"badge.offline")}
              </span>`:L}
          ${zt(n)?K`<span class="badge ok">
                <ha-icon icon="mdi:fire"></ha-icon>${this._t("badge.flame")}
              </span>`:L}
          ${zt(r)?K`<span class="badge warn">
                <ha-icon icon="mdi:tray-arrow-up"></ha-icon>${this._t("badge.hopper_open")}
              </span>`:L}
          ${zt(o)?K`<span class="badge alarm">
                <ha-icon icon="mdi:alert"></ha-icon>${this._t("badge.error")}
              </span>`:L}
        </div>
      </div>
    `}_renderStatus(){const t=this._entity("stove_state"),e=this._entity("climate");if(!t&&!e)return L;const i=(s=t?.state,s&&s in yt?yt[s]:vt);var s;const n=e?.attributes.current_temperature??Ht(this._entity("room_temperature")),o=e?.attributes.temperature??null,r=this.entities.room_temperature??this.entities.climate,a=this.entities.climate,c=this.entities.stove_state;return K`
      <div class="status">
        ${t?K`<span
              class="state-chip tone-${i.tone} ${i.burning?"flame":""} clickable"
              role="button"
              tabindex="0"
              @click=${()=>this._moreInfo(c)}
              @keydown=${t=>this._onClickableKey(t,c)}
            >
              <ha-icon icon=${i.icon}></ha-icon>
              <span class="label">${this._stateLabel(t,i.labelKey)}</span>
            </span>`:L}
        <div class="temps">
          <div
            class="temp clickable"
            role="button"
            tabindex="0"
            @click=${()=>this._moreInfo(r)}
            @keydown=${t=>this._onClickableKey(t,r)}
          >
            <span class="value">${Rt(n,1,this._lang)}°C</span>
            <span class="caption">${this._t("caption.ambient")}</span>
          </div>
          ${null!==o?K`<div
                class="temp clickable"
                role="button"
                tabindex="0"
                @click=${()=>this._moreInfo(a)}
                @keydown=${t=>this._onClickableKey(t,a)}
              >
                <span class="value">${Rt(o,1,this._lang)}°C</span>
                <span class="caption">${this._t("caption.target")}</span>
              </div>`:L}
        </div>
      </div>
    `}_renderClimate(){const t=this._entity("climate");if(!t)return L;const e="heat"===t.state,i=t.attributes.temperature??null,s=t.attributes.preset_mode??null,n=t.attributes.preset_modes??["manual","auto","comfort"];return K`
      <div class="section-body">
        <div class="row wrap">
          ${this._controls?K`<button class=${e?"":"primary"} @click=${()=>this._setHvac(!e)}>
                <ha-icon icon="mdi:power"></ha-icon>
                ${this._t(e?"button.stop":"button.start")}
              </button>`:K`<span class="muted"
                >${this._t(e?"caption.running":"caption.stopped")}</span
              >`}
          <div class="temp-adjust">
            ${this._controls?K`<button class="icon" @click=${()=>this._adjustTemp(-1)}>
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>`:L}
            <span class="consigne">${Rt(i,1,this._lang)}°C</span>
            ${this._controls?K`<button class="icon" @click=${()=>this._adjustTemp(1)}>
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>`:L}
          </div>
        </div>
        <div class="row wrap">
          <span class="muted">${this._t("caption.mode")}</span>
          ${this._controls?n.map(t=>K`<button
                  class="segment ${s===t?"selected":""}"
                  @click=${()=>this._setPreset(t)}
                >
                  ${this._presetLabel(t)}
                </button>`):K`<span>${s?this._presetLabel(s):"—"}</span>`}
        </div>
        ${this._renderPower()}
      </div>
    `}_renderPower(){const t=this._entity("heating_power"),e=this._entity("power_actual_percent");if(!t&&!e)return L;const i=Ht(t),s=Ht(e),n=s??i,o=Number(t?.attributes.min??30),r=Number(t?.attributes.max??100),a=Number(t?.attributes.step??5),c=i??o;return K`
      <div class="slider-row">
        ${this._controls&&t?K`<input
              type="range"
              min=${o}
              max=${r}
              step=${a}
              .value=${String(c)}
              @change=${t=>this._setNumber("heating_power",Number(t.target.value))}
            />`:K`<div class="progress">
              <span style="width: ${n??0}%"></span>
            </div>`}
        <div class="caption">
          <span>${this._t("caption.power")}</span>
          <span>
            ${Rt(n,0,this._lang)} %${null!==s&&null!==i&&s!==i?K` <span class="muted"
                  >${this._t("caption.power_set",{value:Rt(i,0,this._lang)})}</span
                >`:L}
          </span>
        </div>
      </div>
    `}_renderTemperatures(){const t=[],e=this._entity("room_temperature"),i=this._entity("combustion_temperature"),s=this._entity("board_temperature");return It(e)&&t.push(this._tile("mdi:home-thermometer",`${Rt(Ht(e),1,this._lang)} °C`,this._t("caption.ambient"),this.entities.room_temperature,"warm")),It(i)&&t.push(this._tile("mdi:fire",`${Rt(Ht(i),0,this._lang)} °C`,this._t("caption.combustion"),this.entities.combustion_temperature,"heat")),It(s)&&t.push(this._tile("mdi:chip",`${Rt(Ht(s),0,this._lang)} °C`,this._t("caption.board"),this.entities.board_temperature,"warm")),t.length?K`<div class="tiles">${t}</div>`:L}_renderFans(){const t=qt.map(t=>({role:t,entity:this._entity(t)})).filter(t=>t.entity);return t.length?K`<div class="section-body">
      ${t.map(t=>this._renderFan(t.role,t.entity))}
    </div>`:L}_renderFan(t,e){const i="on"===e.state,s=e.attributes.preset_mode??"auto",n="multiair_1"===t?"multiair_1_area":"multiair_2_area",o=this._entity(n),r=Ht(o);return K`
      <div class="fan">
        <div class="fan-head">
          <ha-icon class=${i?"spin":""} icon="mdi:fan"></ha-icon>
          <span class="name">${this._entityName(e,t)}</span>
          <span class="spacer"></span>
          ${this._controls?K`<button class="icon" @click=${()=>this._toggleFan(t,!i)}>
                <ha-icon icon=${i?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"}></ha-icon>
              </button>`:K`<span class="muted"
                >${this._t(i?"caption.fan_on":"caption.fan_off")}</span
              >`}
        </div>
        ${i?K`<div class="row wrap">
              ${xt.map(e=>K`<button
                  class="segment ${s===e?"selected":""}"
                  @click=${()=>this._setFanPreset(t,e)}
                >
                  ${"auto"===e?this._t("preset.auto"):e}
                </button>`)}
            </div>`:L}
        ${o&&this._controls?K`<div class="slider-row">
              <input
                type="range"
                min=${Number(o.attributes.min??-30)}
                max=${Number(o.attributes.max??30)}
                step=${Number(o.attributes.step??5)}
                .value=${String(r??0)}
                @change=${t=>this._setNumber(n,Number(t.target.value))}
              />
              <div class="caption">
                <span>${this._t("caption.trim")}</span>
                <span
                  >${null!==r&&r>0?"+":""}${Rt(r,0,this._lang)}
                  %</span
                >
              </div>
            </div>`:L}
      </div>
    `}_renderConsumption(){const t=this._entity("pellets_total_kg"),e=this._entity("pellet_hours"),i=this._entity("service_countdown_kg"),s=[];It(t)&&s.push(this._tile("mdi:fire-circle",`${Rt(Ht(t),0,this._lang)} kg`,this._t("caption.pellets"),this.entities.pellets_total_kg,"heat")),It(e)&&s.push(this._tile("mdi:clock-outline",`${Rt(Ht(e),0,this._lang)} h`,this._t("caption.operating_hours"),this.entities.pellet_hours,"teal"));let n=L;if(It(i)){const t=Ht(i),e=Number(this._config.service_interval??1500),s=(r=e,null===(o=t)||!Number.isFinite(o)||r<=0?null:Math.max(0,Math.min(100,o/r*100))),a=function(t){return null===t?"ok":t<10?"danger":t<25?"warn":"ok"}(s);n=K`
        <div
          class="slider-row clickable"
          role="button"
          tabindex="0"
          @click=${()=>this._moreInfo(this.entities.service_countdown_kg)}
          @keydown=${t=>this._onClickableKey(t,this.entities.service_countdown_kg)}
        >
          <div class="progress">
            <span class="${"ok"===a?"":a}" style="width: ${s??0}%"></span>
          </div>
          <div class="caption">
            <span>${this._t("caption.service")}</span>
            <span
              >${this._t("caption.service_remaining",{value:Rt(t,0,this._lang)})}</span
            >
          </div>
        </div>
      `}var o,r;return s.length||n!==L?K`<div class="section-body">
      ${s.length?K`<div class="tiles">${s}</div>`:L} ${n}
    </div>`:L}_renderMechanics(){const t=[],e=this._entity("fan_speed_rpm"),i=this._entity("auger_speed_rpm"),s=this._entity("air_flaps_percent"),n=this._entity("air_flaps_target_percent");if(It(e)&&t.push(this._tile("mdi:fan",`${Rt(Ht(e),0,this._lang)} rpm`,this._t("caption.draft"),this.entities.fan_speed_rpm,"cool")),It(i)&&t.push(this._tile("mdi:screw-machine-flat-top",`${Rt(Ht(i),0,this._lang)} rpm`,this._t("caption.auger"),this.entities.auger_speed_rpm,"cool")),It(s)){const e=Ht(n),i=null!==e?this._t("caption.flaps_target",{value:Rt(e,0,this._lang)}):this._t("caption.flaps");t.push(this._tile("mdi:air-filter",`${Rt(Ht(s),0,this._lang)} %`,i,this.entities.air_flaps_percent,"cool"))}return t.length?K`<div class="tiles">${t}</div>`:L}_renderBridge(){const t=[],e=this._entity("wifi_rssi"),i=this._entity("uptime_seconds"),s=this._entity("connected");if(It(e)){const i=Ht(e),s=function(t){return null===t?{key:"quality.none",level:0}:t>=-50?{key:"quality.excellent",level:4}:t>=-60?{key:"quality.good",level:3}:t>=-70?{key:"quality.fair",level:2}:t>=-80?{key:"quality.weak",level:1}:{key:"quality.very_weak",level:0}}(i),n=this._t(s.key),o=s.level>=3?"ok":2===s.level?"fair":"weak",r=this.entities.wifi_rssi;t.push(K`<div
        class="tile clickable"
        role="button"
        tabindex="0"
        @click=${()=>this._moreInfo(r)}
        @keydown=${t=>this._onClickableKey(t,r)}
      >
        <span class="bars tone-${o}" title="${n}">
          ${[1,2,3,4].map(t=>K`<i class="${t<=s.level?"on":""}"></i>`)}
        </span>
        <div class="body">
          <span class="value">${Rt(i,0,this._lang)} dBm</span>
          <span class="caption">${this._t("caption.wifi",{quality:n})}</span>
        </div>
      </div>`)}return It(i)&&t.push(this._tile("mdi:timer-outline",function(t,e=Et.en){if(null===t||!Number.isFinite(t)||t<0)return"—";const i=Math.floor(t/86400),s=Math.floor(t%86400/3600),n=Math.floor(t%3600/60);return i>0?`${i} ${e.days} ${s} ${e.hours}`:s>0?`${s} ${e.hours} ${n} ${e.minutes}`:`${n} ${e.minutes}`}(Ht(i),Et[this._lang]),this._t("caption.uptime"),this.entities.uptime_seconds,"cool")),s&&t.push(this._tile(zt(s)?"mdi:lan-connect":"mdi:lan-disconnect",this._t(zt(s)?"badge.connected":"badge.offline"),this._t("caption.link"),this.entities.connected,zt(s)?"link":"alarm")),t.length?K`<div class="tiles">${t}</div>`:L}_renderSchedule(){const t=this._entity("heating_schedule"),e=this._entity("frost_protection");return t||e?K`<div class="tiles">
      ${this._renderSwitchRow("heating_schedule","switch.heating_schedule","mdi:calendar-clock","schedule")}
      ${this._renderSwitchRow("frost_protection","switch.frost_protection","mdi:snowflake","frost")}
    </div>`:L}_renderSwitchRow(t,e,i,s){const n=this._entity(t);if(!n)return L;const o="on"===n.state;return K`<div class="tile">
      <ha-icon class="tone-${s}" icon=${i}></ha-icon>
      <div class="body">
        <span class="value">${this._t(e)}</span>
        <span class="caption"
          >${this._t(o?"caption.enabled":"caption.disabled")}</span
        >
      </div>
      <span class="spacer"></span>
      <button class="icon" ?disabled=${!this._controls} @click=${()=>this._toggleSwitch(t,!o)}>
        <ha-icon icon=${o?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"}></ha-icon>
      </button>
    </div>`}_tile(t,e,i,s,n){return K`<div
      class="tile ${s?"clickable":""}"
      role=${s?"button":L}
      tabindex=${s?"0":L}
      @click=${s?()=>this._moreInfo(s):L}
      @keydown=${s?t=>this._onClickableKey(t,s):L}
    >
      <ha-icon class=${n?`tone-${n}`:L} icon=${t}></ha-icon>
      <div class="body">
        <span class="value">${e}</span>
        <span class="caption">${i}</span>
      </div>
    </div>`}};Dt.styles=jt,t([pt({attribute:!1})],Dt.prototype,"hass",void 0),t([ut()],Dt.prototype,"_config",void 0),t([ut()],Dt.prototype,"_states",void 0),t([ut()],Dt.prototype,"_sectionOverrides",void 0),Dt=t([lt("open-firenet-card")],Dt),window.customCards=window.customCards||[],window.customCards.push({type:"open-firenet-card",name:"Open Firenet",description:"RIKA pellet stove via the Open Firenet bridge",preview:!0,documentationURL:"https://github.com/openfirenet/open-firenet-card",getEntitySuggestion:(t,e)=>t?.entities?.[e]?.platform!==ft?null:e.startsWith("climate.")?{config:{type:"custom:open-firenet-card",entity:e}}:null});export{Dt as OpenFirenetCard};
