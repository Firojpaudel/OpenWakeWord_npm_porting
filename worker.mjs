var Og=Object.defineProperty;var St=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var Bg=(e,t)=>{for(var r in t)Og(e,r,{get:t[r],enumerable:!0})};var ln={};Bg(ln,{InferenceSession:()=>_t,TRACE:()=>hr,TRACE_EVENT_BEGIN:()=>mt,TRACE_EVENT_END:()=>gt,TRACE_FUNC_BEGIN:()=>Ze,TRACE_FUNC_END:()=>Ue,Tensor:()=>Te,default:()=>Jy,env:()=>ge,registerBackend:()=>Ot});var Ra=Object.defineProperty,Rg=Object.getOwnPropertyDescriptor,Mg=Object.getOwnPropertyNames,Ng=Object.prototype.hasOwnProperty,Dg=(e=>typeof St<"u"?St:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof St<"u"?St:t)[r]}):e)(function(e){if(typeof St<"u")return St.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),Gt=(e,t)=>{for(var r in t)Ra(e,r,{get:t[r],enumerable:!0})},Pg=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Mg(t))!Ng.call(e,a)&&a!==r&&Ra(e,a,{get:()=>t[a],enumerable:!(i=Rg(t,a))||i.enumerable});return e},cr=e=>Pg(Ra({},"__esModule",{value:!0}),e),Qt,ct,Ot,io,Dd,Pd=P(()=>{"use strict";Qt=new Map,ct=[],Ot=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Qt.get(e);if(i===void 0)Qt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=ct.indexOf(e);a!==-1&&ct.splice(a,1);for(let s=0;s<ct.length;s++)if(Qt.get(ct[s]).priority<=r){ct.splice(s,0,e);return}ct.push(e)}return}throw new TypeError("not a valid backend")},io=async e=>{let t=Qt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Dd=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?ct:r,a,s=[],n=new Set;for(let l of i){let p=await io(l);typeof p=="string"?s.push({name:l,err:p}):(a||(a=p),a===p&&n.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of s)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>n.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),Ug=P(()=>{"use strict";Pd()}),Ud,Wg=P(()=>{"use strict";Ud="1.24.1"}),vi,Ee,Wd=P(()=>{"use strict";Wg(),vi="warning",Ee={wasm:{},webgl:{},webgpu:{},versions:{common:Ud},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);vi=e}},get logLevel(){return vi}},Object.defineProperty(Ee,"logLevel",{enumerable:!0})}),ge,Lg=P(()=>{"use strict";Wd(),ge=Ee}),Ld,qd,qg=P(()=>{"use strict";Ld=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let n=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let h=s*a,f=0,g=h,_=h*2,y=-1;n==="RGBA"?(f=0,g=h,_=h*2,y=h*3):n==="RGB"?(f=0,g=h,_=h*2):n==="RBG"&&(f=0,_=h,g=h*2);for(let $=0;$<s;$++)for(let S=0;S<a;S++){let v=(e.data[f++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],k=(e.data[_++]-p[2])*l[2],I=y===-1?255:(e.data[y++]-p[3])*l[3];i.fillStyle="rgba("+v+","+w+","+k+","+I+")",i.fillRect(S,$,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},qd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,s,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,h;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?h=[0,0,0,0]:typeof l.bias=="number"?h=[l.bias,l.bias,l.bias,l.bias]:(h=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(h[3]=l.bias[3]));let f=s*a;if(t!==void 0&&(t.format!==void 0&&n===4&&t.format!=="RGBA"||n===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,y=1,$=2,S=3,v=0,w=f,k=f*2,I=-1;u==="RGBA"?(v=0,w=f,k=f*2,I=f*3):u==="RGB"?(v=0,w=f,k=f*2):u==="RBG"&&(v=0,k=f,w=f*2),i=r.createImageData(a,s);for(let E=0;E<s*a;_+=g,y+=g,$+=g,S+=g,E++)i.data[_]=(e.data[v++]-h[0])*p[0],i.data[y]=(e.data[w++]-h[1])*p[1],i.data[$]=(e.data[k++]-h[2])*p[2],i.data[S]=I===-1?255:(e.data[I++]-h[3])*p[3]}else throw new Error("Can not access image data");return i}}),Er,Vd,Gd,Fd,Hd,jd,Vg=P(()=>{"use strict";Ma(),Er=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},s,n;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?n=[a.bias,a.bias,a.bias,a.bias]:n=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,h=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),f=4,g=0,_=1,y=2,$=3,S=0,v=p,w=p*2,k=-1;u==="RGB"&&(f=3,g=0,_=1,y=2,$=-1),l==="RGBA"?k=p*3:l==="RBG"?(S=0,w=p,v=p*2):l==="BGR"&&(w=0,v=p,S=p*2);for(let I=0;I<p;I++,g+=f,y+=f,_+=f,$+=f)h[S++]=(e[g]+n[0])/s[0],h[v++]=(e[_]+n[1])/s[1],h[w++]=(e[y]+n[2])/s[2],k!==-1&&$!==-1&&(h[k++]=(e[$]+n[3])/s[3]);return l==="RGBA"?new Me("float32",h,[1,4,r,i]):new Me("float32",h,[1,3,r,i])},Vd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",n,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=l();h.width=e.width,h.height=e.height;let f=p(h);if(f!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;f.drawImage(e,0,0),n=f.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(i){let h,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,f=t.resizedWidth):(h=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=f,t!==void 0){let g=l();g.width=f,g.height=h;let _=p(g);if(_!=null)_.putImageData(e,0,0),n=_.getImageData(0,0,f,h).data;else throw new Error("Can not access image data")}else n=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=l();h.width=e.width,h.height=e.height;let f=p(h);if(f!=null){let g=e.height,_=e.width;return f.drawImage(e,0,0,_,g),n=f.getImageData(0,0,_,g).data,u.height=g,u.width=_,Er(n,u)}else throw new Error("Can not access image data")}else{if(s)return new Promise((h,f)=>{let g=l(),_=p(g);if(!e||!_)return f();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{g.width=y.width,g.height=y.height,_.drawImage(y,0,0,g.width,g.height);let $=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,h(Er($.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(n!==void 0)return Er(n,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Gd=(e,t)=>{let{width:r,height:i,download:a,dispose:s}=t,n=[1,i,r,4];return new Me({location:"texture",type:"float32",texture:e,dims:n,download:a,dispose:s})},Fd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Me({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:s})},Hd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Me({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:s})},jd=(e,t,r)=>new Me({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),zt,or,xi,Kd,Gg=P(()=>{"use strict";zt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),or=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xi=!1,Kd=()=>{if(!xi){xi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(zt.set("int64",BigInt64Array),or.set(BigInt64Array,"int64")),t&&(zt.set("uint64",BigUint64Array),or.set(BigUint64Array,"uint64")),i?(zt.set("float16",r),or.set(r,"float16")):zt.set("float16",Uint16Array)}}}),Zd,Qd,Fg=P(()=>{"use strict";Ma(),Zd=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Qd=(e,t)=>{switch(e.location){case"cpu":return new Me(e.type,e.data,t);case"cpu-pinned":return new Me({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Me({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Me({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Me({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Me,Ma=P(()=>{"use strict";qg(),Vg(),Gg(),Fg(),Me=class{constructor(e,t,r){Kd();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let n=zt.get(i);if(!n)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof n))throw new TypeError(`buffer should be of type ${n.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");n=t}else{let l=zt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?n=l.from(t,BigInt):n=l.from(t)}else if(t instanceof l)n=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")n=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)n=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",n=e;else if(l==="boolean")i="bool",n=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",n=Uint8Array.from(e);else{let l=or.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,n=e}if(u===void 0)u=[n.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=n,this.dataLocation="cpu"}let s=Zd(a);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=s}static async fromImage(e,t){return Vd(e,t)}static fromTexture(e,t){return Gd(e,t)}static fromGpuBuffer(e,t){return Fd(e,t)}static fromMLTensor(e,t){return Hd(e,t)}static fromPinnedBuffer(e,t,r){return jd(e,t,r)}toDataURL(e){return Ld(this,e)}toImageData(e){return qd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Qd(this,e)}}}),Te,Xd=P(()=>{"use strict";Ma(),Te=Me}),hr,Si,Ze,Ue,mt,gt,Yd=P(()=>{"use strict";Wd(),hr=(e,t)=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.timeStamp(`${e}::ORT::${t}`)},Si=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),hr("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},Ze=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||Si("BEGIN",e)},Ue=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||Si("END",e)},mt=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.time(`ORT::${e}`)},gt=e=>{(typeof Ee.trace>"u"?!Ee.wasm.trace:!Ee.trace)||console.timeEnd(`ORT::${e}`)}}),Jd,Hg=P(()=>{"use strict";Pd(),Xd(),Yd(),Jd=class ep{constructor(t){this.handler=t}async run(t,r,i){Ze(),mt("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof Te||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Te)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");n=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,h=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(h.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof Te)&&(p=!0,n=!1,a[f]=g)}if(p){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(n)for(let p of this.outputNames)a[p]=null;let u=await this.handler.run(t,a,s),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let h=u[p];h instanceof Te?l[p]=h:l[p]=new Te(h.type,h.data,h.dims)}return gt("InferenceSession.run"),Ue(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){Ze(),mt("InferenceSession.create");let s,n={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)n=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(g=t.byteLength-f,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-f}].`);if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(h,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Dd(n),p=await u.createInferenceSessionHandler(s,l);return gt("InferenceSession.create"),Ue(),new ep(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),_t,jg=P(()=>{"use strict";Hg(),_t=Jd}),Kg=P(()=>{"use strict"}),Zg=P(()=>{"use strict"}),Qg=P(()=>{"use strict"}),Xg=P(()=>{"use strict"}),tp={};Gt(tp,{InferenceSession:()=>_t,TRACE:()=>hr,TRACE_EVENT_BEGIN:()=>mt,TRACE_EVENT_END:()=>gt,TRACE_FUNC_BEGIN:()=>Ze,TRACE_FUNC_END:()=>Ue,Tensor:()=>Te,env:()=>ge,registerBackend:()=>Ot});var We=P(()=>{"use strict";Ug(),Lg(),jg(),Xd(),Kg(),Zg(),Yd(),Qg(),Xg()}),Na=P(()=>{"use strict"}),rp={};Gt(rp,{default:()=>ip});var Ti,Ii,ip,Yg=P(()=>{"use strict";lf(),Nt(),Da(),Ti="ort-wasm-proxy-worker",Ii=globalThis.self?.name===Ti,Ii&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Pa(r.wasm).then(()=>{tn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;rn(a,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,a=Zr(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;an(i,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":nn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:n,options:u}=r;sn(i,a,s,n,new Array(n.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},un([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":on(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),ip=Ii?null:e=>new Worker(e??Re,{type:"module",name:Ti})}),ap={};Gt(ap,{default:()=>np});async function ao(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Zc||(t.Zc=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let s=o=>async(...d)=>{try{if(t.$c)throw Error("Session already started");let m=t.$c={Nd:d[0],errors:[]},c=await o(...d);if(t.$c!==m)throw Error("Session mismatch");t.gd?.flush();let b=m.errors;if(0<b.length){let T=await Promise.all(b);if(T=T.filter(z=>z),0<T.length)throw Error(T.join(`
`))}return c}finally{t.$c=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=d;let m=t.gd;t.jsepRegisterBuffer=(c,b,T,z)=>m.registerBuffer(c,b,T,z),t.jsepGetBuffer=c=>m.getBuffer(c),t.jsepCreateDownloader=(c,b,T)=>m.createDownloader(c,b,T),t.jsepOnCreateSession=c=>{m.onCreateSession(c)},t.jsepOnReleaseSession=c=>{m.onReleaseSession(c)},t.jsepOnRunStart=c=>m.onRunStart(c),t.Ld=(c,b)=>{m.upload(c,b)}}else if(o==="webnn"){let m=d[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=c=>m.onRunStart(c),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=c=>{m.onReleaseSession(c)},t.webnnCreateMLTensorDownloader=(c,b)=>m.createMLTensorDownloader(c,b),t.webnnRegisterMLTensor=(c,b,T,z)=>m.registerMLTensor(c,b,T,z),t.webnnCreateMLContext=c=>m.createMLContext(c),t.webnnRegisterMLConstant=(c,b,T,z,R,W)=>m.registerMLConstant(c,b,T,z,R,t.Zc,W),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let n=()=>{let o=d=>(...m)=>{let c=Xe;return m=d(...m),Xe!=c?new Promise((b,T)=>{li={resolve:b,reject:T}}):m};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[d]=o(t[d])})(),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),n=void 0};t.asyncInit=()=>{n?.()};var u,l,p=(o,d)=>{throw d},h=import.meta.url,f="";if(r||i){try{f=new URL(".",h).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(O(o))return new Promise((m,c)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?m(b.response):c(b.status)},b.onerror=c,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,_,y,$,S,v,w=console.log.bind(console),k=console.error.bind(console),I=w,E=k,C=!1,O=o=>o.startsWith("file://");function x(){ut.buffer!=Q.buffer&&J()}if(a){let o=function(d){try{var m=d.data,c=m.Uc;if(c==="load"){let b=[];self.onmessage=T=>b.push(T),v=()=>{postMessage({Uc:"loaded"});for(let T of b)o(T);self.onmessage=o};for(let T of m.Ad)t[T]&&!t[T].proxy||(t[T]=(...z)=>{postMessage({Uc:"callHandler",zd:T,args:z})},T=="print"&&(I=t[T]),T=="printErr"&&(E=t[T]));ut=m.Vd,J(),_=m.Wd,Le(),kr()}else if(c==="run"){(function(b){var T=(x(),U)[b+52>>>2>>>0];b=(x(),U)[b+56>>>2>>>0],cs(T,T-b),ae(T)})(m.Tc),fi(m.Tc,0,0,1,0,0),hn(),si(m.Tc),L||(ss(),L=!0);try{$f(m.Pd,m.dd)}catch(b){if(b!="unwind")throw b}}else m.target!=="setimmediate"&&(c==="checkMailbox"?L&&br():c&&(E(`worker: received unknown command ${c}`),E(m)))}catch(b){throw os(),b}};var D=o,L=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var Q,q,K,se,A,U,ee,X,H,le,N,V=!1;function J(){var o=ut.buffer;t.HEAP8=Q=new Int8Array(o),K=new Int16Array(o),t.HEAPU8=q=new Uint8Array(o),se=new Uint16Array(o),t.HEAP32=A=new Int32Array(o),t.HEAPU32=U=new Uint32Array(o),ee=new Float32Array(o),X=new Float64Array(o),H=new BigInt64Array(o),le=new BigUint64Array(o)}function de(){V=!0,a?v():rt.tb()}function Ie(o){throw E(o="Aborted("+o+")"),C=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),S?.(o),o}function Be(){return{a:{ma:Hm,hb:Fm,g:vf,J:xf,f:Sf,o:Tf,h:If,ha:kf,b:Ef,T:zf,Ia:wn,n:Cf,_:xn,Ya:Sn,Ea:Tn,Ga:In,Za:kn,Wa:En,Pa:zn,Va:Cn,ka:An,Fa:On,Ca:Bn,Xa:Rn,Da:Mn,cb:Af,ea:Bf,xa:Rf,va:Nf,da:Pf,O:Uf,H:Wf,wa:Lf,Z:Kf,ya:Zf,Sa:Qf,Aa:Yf,Ja:Jf,ta:em,fa:tm,Ra:si,$a:rm,R:sm,s:pm,c:ai,ib:cm,y:hm,M:fm,D:mm,m:gm,t:Vn,jb:ym,I:_m,S:wm,j:bm,v:$m,r:vm,l:xm,Ma:Sm,Na:Tm,Oa:Im,Ka:jn,La:Kn,ua:Zn,eb:Em,bb:Am,u:Om,aa:Bm,ga:Rm,ab:zm,V:Mm,_a:Nm,Ba:Dm,F:km,U:Pm,la:Tr,za:Wm,gb:Um,fb:Lm,Ta:Jn,Ua:es,Ha:Jr,$:ts,ja:rs,Qa:is,ia:as,lb:zg,na:vg,mb:Eg,oa:$g,G:cg,d:Qm,q:Km,w:jm,B:sg,pb:_g,K:lg,x:Ym,pa:wg,X:xg,ba:yg,nb:kg,ob:Ig,ra:hg,qa:gg,qb:fg,N:dg,Y:bg,e:Xm,A:Jm,k:Zm,kb:Cg,p:tg,z:rg,C:eg,E:ig,L:og,rb:pg,Q:Sg,ca:ug,W:Tg,sb:ng,sa:ag,P:mg,i:Vm,a:ut,db:Yr}}}async function Le(){function o(c,b){var T=rt=c.exports;c={};for(let[z,R]of Object.entries(T))typeof R=="function"?(T=im(R),c[z]=T):c[z]=R;return rt=c,rt=(function(){var z=rt,R=G=>ie=>G(ie)>>>0,W=G=>()=>G()>>>0;return(z=Object.assign({},z)).ub=R(z.ub),z.Yb=W(z.Yb),z._b=R(z._b),z.mc=R(z.mc),z.nc=W(z.nc),z.rc=R(z.rc),z})(),pn.push(rt.$b),ns=(c=rt).ub,ss=c.vb,t._OrtInit=c.wb,t._OrtGetLastError=c.xb,t._OrtCreateSessionOptions=c.yb,t._OrtAppendExecutionProvider=c.zb,t._OrtAddFreeDimensionOverride=c.Ab,t._OrtAddSessionConfigEntry=c.Bb,t._OrtReleaseSessionOptions=c.Cb,t._OrtCreateSession=c.Db,t._OrtReleaseSession=c.Eb,t._OrtGetInputOutputCount=c.Fb,t._OrtGetInputOutputMetadata=c.Gb,t._OrtFree=c.Hb,t._OrtCreateTensor=c.Ib,t._OrtGetTensorData=c.Jb,t._OrtReleaseTensor=c.Kb,t._OrtCreateRunOptions=c.Lb,t._OrtAddRunConfigEntry=c.Mb,t._OrtReleaseRunOptions=c.Nb,t._OrtCreateBinding=c.Ob,t._OrtBindInput=c.Pb,t._OrtBindOutput=c.Qb,t._OrtClearBoundOutputs=c.Rb,t._OrtReleaseBinding=c.Sb,t._OrtRunWithBinding=c.Tb,t._OrtRun=c.Ub,t._OrtEndProfiling=c.Vb,t._JsepOutput=c.Wb,t._JsepGetNodeName=c.Xb,Ir=c.Yb,Ye=t._free=c.Zb,Kt=t._malloc=c._b,fi=c.bc,os=c.cc,us=c.dc,ls=c.ec,mi=c.fc,ds=c.gc,ps=c.hc,oe=c.ic,Zt=c.jc,cs=c.kc,ae=c.lc,gi=c.mc,ne=c.nc,hs=c.oc,yi=c.pc,fs=c.qc,ms=c.rc,gs=c.sc,_i=c.tc,ys=c.uc,_s=c.vc,ws=c.wc,bs=c.xc,$s=c.yc,vs=c.zc,xs=c.Ac,Ss=c.Bc,Ts=c.Cc,Is=c.Dc,ks=c.Ec,Es=c.Fc,zs=c.Gc,Cs=c.Hc,As=c.Ic,Os=c.Jc,Bs=c.Kc,Rs=c.Lc,Ms=c.Mc,Ns=c.Nc,Ds=c.Oc,Ps=c.Pc,Us=c.Rc,Ws=c.Sc,Ls=c.bd,qs=c.cd,Vs=c.hd,Gs=c.kd,Fs=c.ld,Hs=c.md,js=c.nd,Ks=c.od,Zs=c.pd,Qs=c.qd,Xs=c.rd,Ys=c.wd,Js=c.Rd,eo=c.Sd,to=c.Td,ro=c.Ud,_=b,rt}var d,m=Be();return t.instantiateWasm?new Promise(c=>{t.instantiateWasm(m,(b,T)=>{c(o(b,T))})}):a?o(new WebAssembly.Instance(_,Be()),_):(N??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,d=await(async function(c){var b=N;if(!g&&!O(b))try{var T=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,c)}catch(z){E(`wasm streaming compile failed: ${z}`),E("falling back to ArrayBuffer instantiation")}return(async function(z,R){try{var W=await(async function(G){if(!g)try{var ie=await u(G);return new Uint8Array(ie)}catch{}if(G==N&&g)G=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";G=l(G)}return G})(z);return await WebAssembly.instantiate(W,R)}catch(G){E(`failed to asynchronously prepare wasm: ${G}`),Ie(G)}})(b,c)})(m),o(d.instance,d.module))}class et{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var xe=o=>{o.terminate(),o.onmessage=()=>{}},be=[],Oe=0,bt=null,mr=o=>{ot.length==0&&(mn(),fn(ot[0]));var d=ot.pop();if(!d)return 6;Ht.push(d),$t[o.Tc]=d,d.Tc=o.Tc;var m={Uc:"run",Pd:o.Od,dd:o.dd,Tc:o.Tc};return d.postMessage(m,o.ud),0},st=0,we=(o,d,...m)=>{var c,b=16*m.length,T=ne(),z=gi(b),R=z>>>3;for(c of m)typeof c=="bigint"?((x(),H)[R++>>>0]=1n,(x(),H)[R++>>>0]=c):((x(),H)[R++>>>0]=0n,(x(),X)[R++>>>0]=c);return o=us(o,0,b,z,d),ae(T),o};function Yr(o){if(a)return we(0,1,o);if(y=o,!(0<st)){for(var d of Ht)xe(d);for(d of ot)xe(d);ot=[],Ht=[],$t={},C=!0}p(0,new et(o))}function dn(o){if(a)return we(1,0,o);Jr(o)}var Jr=o=>{if(y=o,a)throw dn(o),"unwind";Yr(o)},ot=[],Ht=[],pn=[],$t={},cn=o=>{var d=o.Tc;delete $t[d],ot.push(o),Ht.splice(Ht.indexOf(o),1),o.Tc=0,ls(d)};function hn(){pn.forEach(o=>o())}var fn=o=>new Promise(d=>{o.onmessage=b=>{var T=b.data;if(b=T.Uc,T.ad&&T.ad!=Ir()){var z=$t[T.ad];z?z.postMessage(T,T.ud):E(`Internal error! Worker sent a message "${b}" to target pthread ${T.ad}, but that thread no longer exists!`)}else b==="checkMailbox"?br():b==="spawnThread"?mr(T):b==="cleanupThread"?wr(()=>{cn($t[T.Qd])}):b==="loaded"?(o.loaded=!0,d(o)):T.target==="setimmediate"?o.postMessage(T):b==="uncaughtException"?o.onerror(T.error):b==="callHandler"?t[T.zd](...T.args):b&&E(`worker sent an unknown command ${b}`)},o.onerror=b=>{throw E(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var m,c=[];for(m of[])t.propertyIsEnumerable(m)&&c.push(m);o.postMessage({Uc:"load",Ad:c,Vd:ut,Wd:_})});function mn(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ot.push(o)}var ut,$f=(o,d)=>{st=0,o=_i(o,d),0<st?y=o:mi(o)},gr=[],yr=0;function vf(o){var d=new ei(o>>>=0);return(x(),Q)[d.Vc+12>>>0]==0&&(gn(d,!0),yr--),yn(d,!1),gr.push(d),ms(o)}var Pt=0,xf=()=>{oe(0,0);var o=gr.pop();hs(o.ed),Pt=0};function gn(o,d){d=d?1:0,(x(),Q)[o.Vc+12>>>0]=d}function yn(o,d){d=d?1:0,(x(),Q)[o.Vc+13>>>0]=d}class ei{constructor(d){this.ed=d,this.Vc=d-24}}var ti=o=>{var d=Pt;if(!d)return Zt(0),0;var m=new ei(d);(x(),U)[m.Vc+16>>>2>>>0]=d;var c=(x(),U)[m.Vc+4>>>2>>>0];if(!c)return Zt(0),d;for(var b of o){if(b===0||b===c)break;if(fs(b,c,m.Vc+16))return Zt(b),d}return Zt(c),d};function Sf(){return ti([])}function Tf(o){return ti([o>>>0])}function If(o,d,m,c){return ti([o>>>0,d>>>0,m>>>0,c>>>0])}var kf=()=>{var o=gr.pop();o||Ie("no exception to throw");var d=o.ed;throw(x(),Q)[o.Vc+13>>>0]==0&&(gr.push(o),yn(o,!0),gn(o,!1),yr++),yi(d),Pt=d};function Ef(o,d,m){var c=new ei(o>>>=0);throw d>>>=0,m>>>=0,(x(),U)[c.Vc+16>>>2>>>0]=0,(x(),U)[c.Vc+4>>>2>>>0]=d,(x(),U)[c.Vc+8>>>2>>>0]=m,yi(o),yr++,Pt=o}var zf=()=>yr;function _n(o,d,m,c){return a?we(2,1,o,d,m,c):wn(o,d,m,c)}function wn(o,d,m,c){if(o>>>=0,d>>>=0,m>>>=0,c>>>=0,!globalThis.SharedArrayBuffer)return 6;var b=[];return a&&b.length===0?_n(o,d,m,c):(o={Od:m,Tc:o,dd:c,ud:b},a?(o.Uc="spawnThread",postMessage(o,b),0):mr(o))}function Cf(o){throw Pt||=o>>>0,Pt}var bn=globalThis.TextDecoder&&new TextDecoder,$n=(o,d,m,c)=>{if(m=d+m,c)return m;for(;o[d]&&!(d>=m);)++d;return d},vn=(o,d=0,m,c)=>{if(16<(m=$n(o,d>>>=0,m,c))-d&&o.buffer&&bn)return bn.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,m):o.slice(d,m));for(c="";d<m;){var b=o[d++];if(128&b){var T=63&o[d++];if((224&b)==192)c+=String.fromCharCode((31&b)<<6|T);else{var z=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|T<<6|z:(7&b)<<18|T<<12|z<<6|63&o[d++])?c+=String.fromCharCode(b):(b-=65536,c+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else c+=String.fromCharCode(b)}return c},Se=(o,d,m)=>(o>>>=0)?vn((x(),q),o,d,m):"";function xn(o,d,m){return a?we(3,1,o,d,m):0}function Sn(o,d){if(a)return we(4,1,o,d)}function Tn(o,d){if(a)return we(5,1,o,d)}function In(o,d,m){if(a)return we(6,1,o,d,m)}function kn(o,d,m){return a?we(7,1,o,d,m):0}function En(o,d){if(a)return we(8,1,o,d)}function zn(o,d,m){if(a)return we(9,1,o,d,m)}function Cn(o,d,m,c){if(a)return we(10,1,o,d,m,c)}function An(o,d,m,c){if(a)return we(11,1,o,d,m,c)}function On(o,d,m,c){if(a)return we(12,1,o,d,m,c)}function Bn(o){if(a)return we(13,1,o)}function Rn(o,d){if(a)return we(14,1,o,d)}function Mn(o,d,m){if(a)return we(15,1,o,d,m)}var Af=()=>Ie(""),Qe=o=>{o>>>=0;for(var d="";;){var m=(x(),q)[o++>>>0];if(!m)return d;d+=String.fromCharCode(m)}},ri={},ii={},Of={},Ut=class extends Error{constructor(o){super(o),this.name="BindingError"}};function tt(o,d,m={}){return(function(c,b,T={}){var z=b.name;if(!c)throw new Ut(`type "${z}" must have a positive integer typeid pointer`);if(ii.hasOwnProperty(c)){if(T.Bd)return;throw new Ut(`Cannot register type '${z}' twice`)}ii[c]=b,delete Of[c],ri.hasOwnProperty(c)&&(b=ri[c],delete ri[c],b.forEach(R=>R()))})(o,d,m)}var Nn=(o,d,m)=>{switch(d){case 1:return m?c=>(x(),Q)[c>>>0]:c=>(x(),q)[c>>>0];case 2:return m?c=>(x(),K)[c>>>1>>>0]:c=>(x(),se)[c>>>1>>>0];case 4:return m?c=>(x(),A)[c>>>2>>>0]:c=>(x(),U)[c>>>2>>>0];case 8:return m?c=>(x(),H)[c>>>3>>>0]:c=>(x(),le)[c>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function Bf(o,d,m,c,b){o>>>=0,m>>>=0,d=Qe(d>>>0);let T=z=>z;if(c=c===0n){let z=8*m;T=R=>BigInt.asUintN(z,R),b=T(b)}tt(o,{name:d,Qc:T,Xc:(z,R)=>(typeof R=="number"&&(R=BigInt(R)),R),Wc:Nn(d,m,!c),Yc:null})}function Rf(o,d,m,c){tt(o>>>=0,{name:d=Qe(d>>>0),Qc:function(b){return!!b},Xc:function(b,T){return T?m:c},Wc:function(b){return this.Qc((x(),q)[b>>>0])},Yc:null})}var Dn=[],vt=[0,1,,1,null,1,!0,1,!1,1];function ai(o){9<(o>>>=0)&&--vt[o+1]==0&&(vt[o]=void 0,Dn.push(o))}var De=o=>{if(!o)throw new Ut(`Cannot use deleted val. handle = ${o}`);return vt[o]},qe=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=Dn.pop()||vt.length;return vt[d]=o,vt[d+1]=1,d}};function ni(o){return this.Qc((x(),U)[o>>>2>>>0])}var Mf={name:"emscripten::val",Qc:o=>{var d=De(o);return ai(o),d},Xc:(o,d)=>qe(d),Wc:ni,Yc:null};function Nf(o){return tt(o>>>0,Mf)}var Df=(o,d)=>{switch(d){case 4:return function(m){return this.Qc((x(),ee)[m>>>2>>>0])};case 8:return function(m){return this.Qc((x(),X)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function Pf(o,d,m){m>>>=0,tt(o>>>=0,{name:d=Qe(d>>>0),Qc:c=>c,Xc:(c,b)=>b,Wc:Df(d,m),Yc:null})}function Uf(o,d,m,c,b){o>>>=0,m>>>=0,d=Qe(d>>>0);let T=R=>R;if(c===0){var z=32-8*m;T=R=>R<<z>>>z,b=T(b)}tt(o,{name:d,Qc:T,Xc:(R,W)=>W,Wc:Nn(d,m,c!==0),Yc:null})}function Wf(o,d,m){function c(T){var z=(x(),U)[T>>>2>>>0];return T=(x(),U)[T+4>>>2>>>0],new b((x(),Q).buffer,T,z)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];tt(o>>>=0,{name:m=Qe(m>>>0),Qc:c,Wc:c},{Bd:!0})}var lt=(o,d,m)=>{var c=(x(),q);if(d>>>=0,0<m){var b=d;m=d+m-1;for(var T=0;T<o.length;++T){var z=o.codePointAt(T);if(127>=z){if(d>=m)break;c[d++>>>0]=z}else if(2047>=z){if(d+1>=m)break;c[d++>>>0]=192|z>>6,c[d++>>>0]=128|63&z}else if(65535>=z){if(d+2>=m)break;c[d++>>>0]=224|z>>12,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z}else{if(d+3>=m)break;c[d++>>>0]=240|z>>18,c[d++>>>0]=128|z>>12&63,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z,T++}}c[d>>>0]=0,o=d-b}else o=0;return o},_r=o=>{for(var d=0,m=0;m<o.length;++m){var c=o.charCodeAt(m);127>=c?d++:2047>=c?d+=2:55296<=c&&57343>=c?(d+=4,++m):d+=3}return d};function Lf(o,d){tt(o>>>=0,{name:d=Qe(d>>>0),Qc(m){var c=(x(),U)[m>>>2>>>0];return c=Se(m+4,c,!0),Ye(m),c},Xc(m,c){c instanceof ArrayBuffer&&(c=new Uint8Array(c));var b=typeof c=="string";if(!(b||ArrayBuffer.isView(c)&&c.BYTES_PER_ELEMENT==1))throw new Ut("Cannot pass non-string to std::string");var T=b?_r(c):c.length,z=Kt(4+T+1),R=z+4;return(x(),U)[z>>>2>>>0]=T,b?lt(c,R,T+1):(x(),q).set(c,R>>>0),m!==null&&m.push(Ye,z),z},Wc:ni,Yc(m){Ye(m)}})}var Pn=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,qf=(o,d,m)=>{if(o>>>=1,16<(d=$n((x(),se),o,d/2,m))-o&&Pn)return Pn.decode((x(),se).slice(o,d));for(m="";o<d;++o){var c=(x(),se)[o>>>0];m+=String.fromCharCode(c)}return m},Vf=(o,d,m)=>{if(m??=2147483647,2>m)return 0;var c=d;m=(m-=2)<2*o.length?m/2:o.length;for(var b=0;b<m;++b){var T=o.charCodeAt(b);(x(),K)[d>>>1>>>0]=T,d+=2}return(x(),K)[d>>>1>>>0]=0,d-c},Gf=o=>2*o.length,Ff=(o,d,m)=>{var c="";o>>>=2;for(var b=0;!(b>=d/4);b++){var T=(x(),U)[o+b>>>0];if(!T&&!m)break;c+=String.fromCodePoint(T)}return c},Hf=(o,d,m)=>{if(d>>>=0,m??=2147483647,4>m)return 0;var c=d;m=c+m-4;for(var b=0;b<o.length;++b){var T=o.codePointAt(b);if(65535<T&&b++,(x(),A)[d>>>2>>>0]=T,(d+=4)+4>m)break}return(x(),A)[d>>>2>>>0]=0,d-c},jf=o=>{for(var d=0,m=0;m<o.length;++m)65535<o.codePointAt(m)&&m++,d+=4;return d};function Kf(o,d,m){if(o>>>=0,d>>>=0,m=Qe(m>>>=0),d===2)var c=qf,b=Vf,T=Gf;else c=Ff,b=Hf,T=jf;tt(o,{name:m,Qc:z=>{var R=(x(),U)[z>>>2>>>0];return R=c(z+4,R*d,!0),Ye(z),R},Xc:(z,R)=>{if(typeof R!="string")throw new Ut(`Cannot pass non-string to C++ string type ${m}`);var W=T(R),G=Kt(4+W+d);return(x(),U)[G>>>2>>>0]=W/d,b(R,G+4,W+d),z!==null&&z.push(Ye,G),G},Wc:ni,Yc(z){Ye(z)}})}function Zf(o,d){tt(o>>>=0,{Cd:!0,name:d=Qe(d>>>0),Qc:()=>{},Xc:()=>{}})}function Qf(o){fi(o>>>0,!i,1,!r,131072,!1),hn()}var wr=o=>{if(!C)try{if(o(),!(0<st))try{a?Ir()&&mi(y):Jr(y)}catch(d){d instanceof et||d=="unwind"||p(0,d)}}catch(d){d instanceof et||d=="unwind"||p(0,d)}},Xf=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function si(o){o>>>=0,Xf||(Atomics.waitAsync((x(),A),o>>>2,o).value.then(br),o+=128,Atomics.store((x(),A),o>>>2,1))}var br=()=>wr(()=>{var o=Ir();o&&(si(o),ps())});function Yf(o,d){(o>>>=0)==d>>>0?setTimeout(br):a?postMessage({ad:o,Uc:"checkMailbox"}):(o=$t[o])&&o.postMessage({Uc:"checkMailbox"})}var oi=[];function Jf(o,d,m,c,b){for(d>>>=0,b>>>=0,oi.length=0,m=b>>>3,c=b+c>>>3;m<c;){var T;T=(x(),H)[m++>>>0]?(x(),H)[m++>>>0]:(x(),X)[m++>>>0],oi.push(T)}return(d?wi[d]:Gm[o])(...oi)}var em=()=>{st=0};function tm(o){o>>>=0,a?postMessage({Uc:"cleanupThread",Qd:o}):cn($t[o])}function rm(o){}var $r=o=>{try{o()}catch(d){Ie(d)}};function im(o){var d=(...m)=>{vr.push(o);try{return o(...m)}finally{C||(vr.pop(),Xe&&dt===1&&vr.length===0&&(dt=0,st+=1,$r(eo),typeof Fibers<"u"&&Fibers.ce()))}};return Ln.set(o,d),d}var dt=0,Xe=null,Un=0,vr=[],ui=new Map,Wn=new Map,Ln=new Map,am=0,li=null,nm=[],qn=o=>(function(d){if(!C){if(dt===0){var m=!1,c=!1;d((b=0)=>{if(!C&&(Un=b,m=!0,c)){dt=2,$r(()=>to(Xe)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),b=!1;try{var T=(function(){var W=(x(),A)[Xe+8>>>2>>>0];return W=Wn.get(W),W=Ln.get(W),--st,W()})()}catch(W){T=W,b=!0}var z=!1;if(!Xe){var R=li;R&&(li=null,(b?R.reject:R.resolve)(T),z=!0)}if(b&&!z)throw T}}),c=!0,m||(dt=1,Xe=(function(){var b=Kt(65548),T=b+12;if((x(),U)[b>>>2>>>0]=T,(x(),U)[b+4>>>2>>>0]=T+65536,T=vr[0],!ui.has(T)){var z=am++;ui.set(T,z),Wn.set(z,T)}return T=ui.get(T),(x(),A)[b+8>>>2>>>0]=T,b})(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),$r(()=>Js(Xe)))}else dt===2?(dt=0,$r(ro),Ye(Xe),Xe=null,nm.forEach(wr)):Ie(`invalid state: ${dt}`);return Un}})(d=>{o().then(d)});function sm(o){return o>>>=0,qn(async()=>{var d=await De(o);return qe(d)})}var di=[],om=o=>{var d=di.length;return di.push(o),d},um=(o,d)=>{for(var m=Array(o),c=0;c<o;++c){var b=c,T=(x(),U)[d+4*c>>>2>>>0],z=ii[T];if(z===void 0)throw o=`parameter ${c}`,T=ns(T),d=Qe(T),Ye(T),new Ut(`${o} has unknown type ${d}`);m[b]=z}return m},lm=(o,d,m)=>{var c=[];return o=o(c,m),c.length&&((x(),U)[d>>>2>>>0]=qe(c)),o},dm={},xr=o=>{var d=dm[o];return d===void 0?Qe(o):d};function pm(o,d,m){var[c,...b]=um(o,d>>>0);d=c.Xc.bind(c);var T=b.map(W=>W.Wc.bind(W));o--;var z={toValue:De};switch(o=T.map((W,G)=>{var ie=`argFromPtr${G}`;return z[ie]=W,`${ie}(args${G?"+"+8*G:""})`}),m){case 0:var R="toValue(handle)";break;case 2:R="new (toValue(handle))";break;case 3:R="";break;case 1:z.getStringOrSymbol=xr,R="toValue(handle)[getStringOrSymbol(methodName)]"}return R+=`(${o})`,c.Cd||(z.toReturnWire=d,z.emval_returnValue=lm,R=`return emval_returnValue(toReturnWire, destructorsRef, ${R})`),R=`return function (handle, methodName, destructorsRef, args) {
  ${R}
  }`,m=new Function(Object.keys(z),R)(...Object.values(z)),R=`methodCaller<(${b.map(W=>W.name)}) => ${c.name}>`,om(Object.defineProperty(m,"name",{value:R}))}function cm(o,d){return d>>>=0,(o=De(o>>>0))==De(d)}function hm(o){return(o>>>=0)?(o=xr(o),qe(globalThis[o])):qe(globalThis)}function fm(o){return o=xr(o>>>0),qe(t[o])}function mm(o,d){return d>>>=0,o=De(o>>>0),d=De(d),qe(o[d])}function gm(o){9<(o>>>=0)&&(vt[o+1]+=1)}function Vn(o,d,m,c,b){return di[o>>>0](d>>>0,m>>>0,c>>>0,b>>>0)}function ym(o,d,m,c,b){return Vn(o>>>0,d>>>0,m>>>0,c>>>0,b>>>0)}function _m(){return qe([])}function wm(o){o=De(o>>>0);for(var d=Array(o.length),m=0;m<o.length;m++)d[m]=o[m];return qe(d)}function bm(o){return qe(xr(o>>>0))}function $m(){return qe({})}function vm(o){for(var d=De(o>>>=0);d.length;){var m=d.pop();d.pop()(m)}ai(o)}function xm(o,d,m){d>>>=0,m>>>=0,o=De(o>>>0),d=De(d),m=De(m),o[d]=m}function Sm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),A)[d>>>2>>>0]=o.getUTCSeconds(),(x(),A)[d+4>>>2>>>0]=o.getUTCMinutes(),(x(),A)[d+8>>>2>>>0]=o.getUTCHours(),(x(),A)[d+12>>>2>>>0]=o.getUTCDate(),(x(),A)[d+16>>>2>>>0]=o.getUTCMonth(),(x(),A)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),A)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),A)[d+28>>>2>>>0]=o}var Gn=o=>o%4==0&&(o%100!=0||o%400==0),Fn=[0,31,60,91,121,152,182,213,244,274,305,335],Hn=[0,31,59,90,120,151,181,212,243,273,304,334];function Tm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),A)[d>>>2>>>0]=o.getSeconds(),(x(),A)[d+4>>>2>>>0]=o.getMinutes(),(x(),A)[d+8>>>2>>>0]=o.getHours(),(x(),A)[d+12>>>2>>>0]=o.getDate(),(x(),A)[d+16>>>2>>>0]=o.getMonth(),(x(),A)[d+20>>>2>>>0]=o.getFullYear()-1900,(x(),A)[d+24>>>2>>>0]=o.getDay();var m=(Gn(o.getFullYear())?Fn:Hn)[o.getMonth()]+o.getDate()-1|0;(x(),A)[d+28>>>2>>>0]=m,(x(),A)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var c=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=c&&o.getTimezoneOffset()==Math.min(c,m)),(x(),A)[d+32>>>2>>>0]=o}function Im(o){o>>>=0;var d=new Date((x(),A)[o+20>>>2>>>0]+1900,(x(),A)[o+16>>>2>>>0],(x(),A)[o+12>>>2>>>0],(x(),A)[o+8>>>2>>>0],(x(),A)[o+4>>>2>>>0],(x(),A)[o>>>2>>>0],0),m=(x(),A)[o+32>>>2>>>0],c=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),T=new Date(d.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(T,b);return 0>m?(x(),A)[o+32>>>2>>>0]=+(b!=T&&z==c):0<m!=(z==c)&&(b=Math.max(T,b),d.setTime(d.getTime()+6e4*((0<m?z:b)-c))),(x(),A)[o+24>>>2>>>0]=d.getDay(),m=(Gn(d.getFullYear())?Fn:Hn)[d.getMonth()]+d.getDate()-1|0,(x(),A)[o+28>>>2>>>0]=m,(x(),A)[o>>>2>>>0]=d.getSeconds(),(x(),A)[o+4>>>2>>>0]=d.getMinutes(),(x(),A)[o+8>>>2>>>0]=d.getHours(),(x(),A)[o+12>>>2>>>0]=d.getDate(),(x(),A)[o+16>>>2>>>0]=d.getMonth(),(x(),A)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function jn(o,d,m,c,b,T,z){return a?we(16,1,o,d,m,c,b,T,z):-52}function Kn(o,d,m,c,b,T){if(a)return we(17,1,o,d,m,c,b,T)}var jt={},km=()=>performance.timeOrigin+performance.now();function Zn(o,d){if(a)return we(18,1,o,d);if(jt[o]&&(clearTimeout(jt[o].id),delete jt[o]),!d)return 0;var m=setTimeout(()=>{delete jt[o],wr(()=>ds(o,performance.timeOrigin+performance.now()))},d);return jt[o]={id:m,be:d},0}function Em(o,d,m,c){o>>>=0,d>>>=0,m>>>=0,c>>>=0;var b=new Date().getFullYear(),T=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var z=Math.max(T,b);(x(),U)[o>>>2>>>0]=60*z,(x(),A)[d>>>2>>>0]=+(T!=b),o=(d=R=>{var W=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(W/60)).padStart(2,"0")}${String(W%60).padStart(2,"0")}`})(T),d=d(b),b<T?(lt(o,m,17),lt(d,c,17)):(lt(o,c,17),lt(d,m,17))}var zm=()=>Date.now(),Cm=1;function Am(o,d,m){if(m>>>=0,!(0<=o&&3>=o))return 28;if(o===0)o=Date.now();else{if(!Cm)return 52;o=performance.timeOrigin+performance.now()}return o=Math.round(1e6*o),(x(),H)[m>>>3>>>0]=BigInt(o),0}var pi=[],Qn=(o,d)=>{pi.length=0;for(var m;m=(x(),q)[o++>>>0];){var c=m!=105;d+=(c&=m!=112)&&d%8?4:0,pi.push(m==112?(x(),U)[d>>>2>>>0]:m==106?(x(),H)[d>>>3>>>0]:m==105?(x(),A)[d>>>2>>>0]:(x(),X)[d>>>3>>>0]),d+=c?8:4}return pi};function Om(o,d,m){return o>>>=0,d=Qn(d>>>0,m>>>0),wi[o](...d)}function Bm(o,d,m){return o>>>=0,d=Qn(d>>>0,m>>>0),wi[o](...d)}var Rm=()=>{};function Mm(o,d){return E(Se(o>>>0,d>>>0))}var Nm=()=>{throw st+=1,"unwind"};function Dm(){return 4294901760}var Pm=()=>navigator.hardwareConcurrency,xt={},Sr=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},Xn=o=>{for(var d of o)(o=Sr(d))&&(xt[o]=d)};function Um(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),Xn(o),xt.sd=Sr(o[3]),xt.Md=o,xt.sd}function Tr(o){if(!(o=xt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}Ye(Tr.td??0),d=_r(o)+1;var m=Kt(d);return m&&lt(o,m,d),Tr.td=m,Tr.td}function Wm(o){o>>>=0;var d=(x(),q).length;if(o<=d||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var c=d*(1+.2/m);c=Math.min(c,o+100663296);e:{c=(Math.min(4294901760,65536*Math.ceil(Math.max(o,c)/65536))-ut.buffer.byteLength+65535)/65536|0;try{ut.grow(c),J();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}function Lm(o,d,m){if(o>>>=0,d>>>=0,xt.sd==o)var c=xt.Md;else(c=Error().stack.toString().split(`
`))[0]=="Error"&&c.shift(),Xn(c);for(var b=3;c[b]&&Sr(c[b])!=o;)++b;for(o=0;o<m&&c[o+b];++o)(x(),A)[d+4*o>>>2>>>0]=Sr(c[o+b]);return o}var ci,hi={},Yn=()=>{if(!ci){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in hi)hi[o]===void 0?delete d[o]:d[o]=hi[o];var m=[];for(o in d)m.push(`${o}=${d[o]}`);ci=m}return ci};function Jn(o,d){if(a)return we(19,1,o,d);o>>>=0,d>>>=0;var m,c=0,b=0;for(m of Yn()){var T=d+c;(x(),U)[o+b>>>2>>>0]=T,c+=lt(m,T,1/0)+1,b+=4}return 0}function es(o,d){if(a)return we(20,1,o,d);o>>>=0,d>>>=0;var m=Yn();for(var c of((x(),U)[o>>>2>>>0]=m.length,o=0,m))o+=_r(c)+1;return(x(),U)[d>>>2>>>0]=o,0}function ts(o){return a?we(21,1,o):52}function rs(o,d,m,c){return a?we(22,1,o,d,m,c):52}function is(o,d,m,c){return a?we(23,1,o,d,m,c):70}var qm=[null,[],[]];function as(o,d,m,c){if(a)return we(24,1,o,d,m,c);d>>>=0,m>>>=0,c>>>=0;for(var b=0,T=0;T<m;T++){var z=(x(),U)[d>>>2>>>0],R=(x(),U)[d+4>>>2>>>0];d+=8;for(var W=0;W<R;W++){var G=o,ie=(x(),q)[z+W>>>0],pe=qm[G];ie===0||ie===10?((G===1?I:E)(vn(pe)),pe.length=0):pe.push(ie)}b+=R}return(x(),U)[c>>>2>>>0]=b,0}function Vm(o){return o>>>0}a||(function(){for(var o=t.numThreads-1;o--;)mn();be.push(async()=>{var d=(async function(){if(!a)return Promise.all(ot.map(fn))})();Oe++,await d,--Oe==0&&bt&&(d=bt,bt=null,d())})})(),a||(ut=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),J()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>ne(),t.stackRestore=o=>ae(o),t.stackAlloc=o=>gi(o),t.setValue=function(o,d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(x(),Q)[o>>>0]=d;break;case"i16":(x(),K)[o>>>1>>>0]=d;break;case"i32":(x(),A)[o>>>2>>>0]=d;break;case"i64":(x(),H)[o>>>3>>>0]=BigInt(d);break;case"float":(x(),ee)[o>>>2>>>0]=d;break;case"double":(x(),X)[o>>>3>>>0]=d;break;case"*":(x(),U)[o>>>2>>>0]=d;break;default:Ie(`invalid type for setValue: ${m}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(x(),Q)[o>>>0];case"i16":return(x(),K)[o>>>1>>>0];case"i32":return(x(),A)[o>>>2>>>0];case"i64":return(x(),H)[o>>>3>>>0];case"float":return(x(),ee)[o>>>2>>>0];case"double":return(x(),X)[o>>>3>>>0];case"*":return(x(),U)[o>>>2>>>0];default:Ie(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Se,t.stringToUTF8=lt,t.lengthBytesUTF8=_r;var ns,ss,Ir,Ye,Kt,fi,os,us,ls,mi,ds,ps,oe,Zt,cs,ae,gi,ne,hs,yi,fs,ms,gs,_i,ys,_s,ws,bs,$s,vs,xs,Ss,Ts,Is,ks,Es,zs,Cs,As,Os,Bs,Rs,Ms,Ns,Ds,Ps,Us,Ws,Ls,qs,Vs,Gs,Fs,Hs,js,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,rt,Gm=[Yr,dn,_n,xn,Sn,Tn,In,kn,En,zn,Cn,An,On,Bn,Rn,Mn,jn,Kn,Zn,Jn,es,ts,rs,is,as],wi={927244:(o,d,m,c,b)=>{if(t===void 0||!t.Zc)return 1;if((o=Se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Zc.get(o)))return 2;if(d=Number(d>>>0),m=Number(m>>>0),c=Number(c>>>0),d+m>o.byteLength)return 3;try{let T=o.subarray(d,d+m);switch(b){case 0:(x(),q).set(T,c>>>0);break;case 1:t.Xd?t.Xd(c,T):t.Ld(c,T);break;default:return 4}return 0}catch{return 4}},928068:(o,d,m)=>{t.xd(o,(x(),q).subarray(d>>>0,d+m>>>0))},928132:()=>t.Zd(),928174:o=>{t.vd(o)},928211:()=>{t.Ed()},928242:()=>{t.Fd()},928271:()=>{t.Jd()},928296:o=>t.Dd(o),928329:o=>t.Hd(o),928361:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m),!0)},928424:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m))},928481:()=>typeof wasmOffsetConverter<"u",928538:o=>{t.ac("Abs",o,void 0)},928589:o=>{t.ac("Neg",o,void 0)},928640:o=>{t.ac("Floor",o,void 0)},928693:o=>{t.ac("Ceil",o,void 0)},928745:o=>{t.ac("Reciprocal",o,void 0)},928803:o=>{t.ac("Sqrt",o,void 0)},928855:o=>{t.ac("Exp",o,void 0)},928906:o=>{t.ac("Erf",o,void 0)},928957:o=>{t.ac("Sigmoid",o,void 0)},929012:(o,d,m)=>{t.ac("HardSigmoid",o,{alpha:d,beta:m})},929091:o=>{t.ac("Log",o,void 0)},929142:o=>{t.ac("Sin",o,void 0)},929193:o=>{t.ac("Cos",o,void 0)},929244:o=>{t.ac("Tan",o,void 0)},929295:o=>{t.ac("Asin",o,void 0)},929347:o=>{t.ac("Acos",o,void 0)},929399:o=>{t.ac("Atan",o,void 0)},929451:o=>{t.ac("Sinh",o,void 0)},929503:o=>{t.ac("Cosh",o,void 0)},929555:o=>{t.ac("Asinh",o,void 0)},929608:o=>{t.ac("Acosh",o,void 0)},929661:o=>{t.ac("Atanh",o,void 0)},929714:o=>{t.ac("Tanh",o,void 0)},929766:o=>{t.ac("Not",o,void 0)},929817:(o,d,m)=>{t.ac("Clip",o,{min:d,max:m})},929886:o=>{t.ac("Clip",o,void 0)},929938:(o,d)=>{t.ac("Elu",o,{alpha:d})},929996:o=>{t.ac("Gelu",o,void 0)},930048:o=>{t.ac("Relu",o,void 0)},930100:(o,d)=>{t.ac("LeakyRelu",o,{alpha:d})},930164:(o,d)=>{t.ac("ThresholdedRelu",o,{alpha:d})},930234:(o,d)=>{t.ac("Cast",o,{to:d})},930292:o=>{t.ac("Add",o,void 0)},930343:o=>{t.ac("Sub",o,void 0)},930394:o=>{t.ac("Mul",o,void 0)},930445:o=>{t.ac("Div",o,void 0)},930496:o=>{t.ac("Pow",o,void 0)},930547:o=>{t.ac("Equal",o,void 0)},930600:o=>{t.ac("Greater",o,void 0)},930655:o=>{t.ac("GreaterOrEqual",o,void 0)},930717:o=>{t.ac("Less",o,void 0)},930769:o=>{t.ac("LessOrEqual",o,void 0)},930828:(o,d,m,c,b)=>{t.ac("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931003:(o,d,m,c,b)=>{t.ac("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931177:(o,d,m,c,b)=>{t.ac("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931351:(o,d,m,c,b)=>{t.ac("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931526:(o,d,m,c,b)=>{t.ac("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931700:(o,d,m,c,b)=>{t.ac("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},931873:(o,d,m,c,b)=>{t.ac("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932046:(o,d,m,c,b)=>{t.ac("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932223:(o,d,m,c,b)=>{t.ac("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932403:(o,d,m,c,b)=>{t.ac("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},932583:o=>{t.ac("Where",o,void 0)},932636:(o,d,m)=>{t.ac("Transpose",o,{perm:d?Array.from((x(),A).subarray(Number(d)>>>0,Number(m)>>>0)):[]})},932760:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},932893:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},933026:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e,pt)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[b],pads:[T,z],strides:[R],wIsConst:()=>!!(x(),Q)[G>>>0],outputPadding:ie?Array.from((x(),A).subarray(Number(ie)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((x(),A).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(pt)})},933459:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),A).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((x(),A).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from((x(),A).subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from((x(),A).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(x(),Q)[W>>>0],outputPadding:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],outputShape:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},934120:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e,pt)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[b],pads:[T,z],strides:[R],wIsConst:()=>!!(x(),Q)[G>>>0],outputPadding:ie?Array.from((x(),A).subarray(Number(ie)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from((x(),A).subarray(Number(me)>>>0,Number(_e)>>>0)):[],activation:Se(pt)})},934553:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),A).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((x(),A).subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from((x(),A).subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from((x(),A).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(x(),Q)[W>>>0],outputPadding:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],outputShape:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:Se(_e)})},935214:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},935305:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((x(),A).subarray(Number(R)>>>0,Number(W)>>>0)):[],pads:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},935784:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},935875:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((x(),A).subarray(Number(R)>>>0,Number(W)>>>0)):[],pads:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936354:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},936441:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((x(),A).subarray(Number(R)>>>0,Number(W)>>>0)):[],pads:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},936916:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},937003:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:b,dilations:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((x(),A).subarray(Number(R)>>>0,Number(W)>>>0)):[],pads:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],strides:pe?Array.from((x(),A).subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},937478:(o,d,m,c,b)=>{t.ac("Gemm",o,{alpha:d,beta:m,transA:c,transB:b})},937582:o=>{t.ac("MatMul",o,void 0)},937636:(o,d,m,c)=>{t.ac("ArgMax",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},937744:(o,d,m,c)=>{t.ac("ArgMin",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},937852:(o,d)=>{t.ac("Softmax",o,{axis:d})},937915:(o,d)=>{t.ac("Concat",o,{axis:d})},937975:(o,d,m,c,b)=>{t.ac("Split",o,{axis:d,numOutputs:m,splitSizes:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},938131:o=>{t.ac("Expand",o,void 0)},938185:(o,d)=>{t.ac("Gather",o,{axis:Number(d)})},938256:(o,d)=>{t.ac("GatherElements",o,{axis:Number(d)})},938335:(o,d)=>{t.ac("GatherND",o,{batch_dims:Number(d)})},938414:(o,d,m,c,b,T,z,R,W,G,ie)=>{t.ac("Resize",o,{antialias:d,axes:m?Array.from((x(),A).subarray(Number(m)>>>0,Number(c)>>>0)):[],coordinateTransformMode:Se(b),cubicCoeffA:T,excludeOutside:z,extrapolationValue:R,keepAspectRatioPolicy:Se(W),mode:Se(G),nearestMode:Se(ie)})},938776:(o,d,m,c,b,T,z)=>{t.ac("Slice",o,{starts:d?Array.from((x(),A).subarray(Number(d)>>>0,Number(m)>>>0)):[],ends:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[],axes:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[]})},939040:o=>{t.ac("Tile",o,void 0)},939092:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939206:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},939320:o=>{t.ac("Range",o,void 0)},939373:(o,d)=>{t.ac("Einsum",o,{equation:Se(d)})},939454:(o,d,m,c,b)=>{t.ac("Pad",o,{mode:d,value:m,pads:c?Array.from((x(),A).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},939597:(o,d,m,c,b,T)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!c,format:T?"NHWC":"NCHW"})},939766:(o,d,m,c,b,T)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!b,trainingMode:!!c,format:T?"NHWC":"NCHW"})},939935:(o,d,m)=>{t.ac("CumSum",o,{exclusive:Number(d),reverse:Number(m)})},940032:(o,d,m)=>{t.ac("DequantizeLinear",o,{axis:d,blockSize:m})},940122:(o,d,m,c,b)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:b?"NHWC":"NCHW"})},940292:(o,d,m,c,b)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:b?"NHWC":"NCHW"})},940462:(o,d)=>{t.ac("ScatterND",o,{reduction:Se(d)})},940547:(o,d,m,c,b,T,z,R,W)=>{t.ac("Attention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:b,doRotary:T,qkvHiddenSizes:z?Array.from((x(),A).subarray(Number(R)>>>0,Number(R)+z>>>0)):[],pastPresentShareBuffer:!!W})},940819:o=>{t.ac("BiasAdd",o,void 0)},940874:o=>{t.ac("BiasSplitGelu",o,void 0)},940935:o=>{t.ac("FastGelu",o,void 0)},940991:(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e,pt,bi)=>{t.ac("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:m?Array.from((x(),A).subarray(Number(m)>>>0,Number(c)>>>0)):[],group:b,kernel_shape:T?Array.from((x(),A).subarray(Number(T)>>>0,Number(z)>>>0)):[],pads:R?Array.from((x(),A).subarray(Number(R)>>>0,Number(W)>>>0)):[],strides:G?Array.from((x(),A).subarray(Number(G)>>>0,Number(ie)>>>0)):[],w_is_const:()=>!!(x(),Q)[Number(me)>>>0],activation:Se(_e),activation_params:pt?Array.from((x(),ee).subarray(Number(pt)>>>0,Number(bi)>>>0)):[]})},941575:o=>{t.ac("Gelu",o,void 0)},941627:(o,d,m,c,b,T,z,R,W)=>{t.ac("GroupQueryAttention",o,{numHeads:d,kvNumHeads:m,scale:c,softcap:b,doRotary:T,rotaryInterleaved:z,smoothSoftmax:R,localWindowSize:W})},941844:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},941955:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},942066:(o,d,m,c,b,T)=>{t.ac("MatMulNBits",o,{k:d,n:m,accuracyLevel:c,bits:b,blockSize:T})},942193:(o,d,m,c,b,T)=>{t.ac("MultiHeadAttention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:b,doRotary:T})},942352:(o,d)=>{t.ac("QuickGelu",o,{alpha:d})},942416:(o,d,m,c,b)=>{t.ac("RotaryEmbedding",o,{interleaved:!!d,numHeads:m,rotaryEmbeddingDim:c,scale:b})},942555:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},942657:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},942759:(o,d,m,c)=>{t.ac("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:m,blockSize:c})},942880:o=>{t.Id(o)},942914:(o,d)=>t.Kd(Number(o),Number(d),t.$c.Nd,t.$c.errors)};function Fm(o,d,m){return qn(async()=>{await t.Gd(Number(o),Number(d),Number(m))})}function Hm(){return typeof wasmOffsetConverter<"u"}function jm(o,d,m,c){var b=ne();try{return Ss(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function Km(o,d,m){var c=ne();try{return bs(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;oe(1,0)}}function Zm(o,d,m){var c=ne();try{gs(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;oe(1,0)}}function Qm(o,d){var m=ne();try{return _i(o,d)}catch(c){if(ae(m),c!==c+0)throw c;oe(1,0)}}function Xm(o){var d=ne();try{ys(o)}catch(m){if(ae(d),m!==m+0)throw m;oe(1,0)}}function Ym(o,d,m,c,b,T,z){var R=ne();try{return vs(o,d,m,c,b,T,z)}catch(W){if(ae(R),W!==W+0)throw W;oe(1,0)}}function Jm(o,d){var m=ne();try{Ts(o,d)}catch(c){if(ae(m),c!==c+0)throw c;oe(1,0)}}function eg(o,d,m,c,b,T){var z=ne();try{_s(o,d,m,c,b,T)}catch(R){if(ae(z),R!==R+0)throw R;oe(1,0)}}function tg(o,d,m,c){var b=ne();try{xs(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function rg(o,d,m,c,b){var T=ne();try{ws(o,d,m,c,b)}catch(z){if(ae(T),z!==z+0)throw z;oe(1,0)}}function ig(o,d,m,c,b,T,z){var R=ne();try{ks(o,d,m,c,b,T,z)}catch(W){if(ae(R),W!==W+0)throw W;oe(1,0)}}function ag(o,d,m,c,b,T,z){var R=ne();try{Es(o,d,m,c,b,T,z)}catch(W){if(ae(R),W!==W+0)throw W;oe(1,0)}}function ng(o,d,m,c,b,T,z,R){var W=ne();try{Os(o,d,m,c,b,T,z,R)}catch(G){if(ae(W),G!==G+0)throw G;oe(1,0)}}function sg(o,d,m,c,b){var T=ne();try{return Is(o,d,m,c,b)}catch(z){if(ae(T),z!==z+0)throw z;oe(1,0)}}function og(o,d,m,c,b,T,z,R){var W=ne();try{Bs(o,d,m,c,b,T,z,R)}catch(G){if(ae(W),G!==G+0)throw G;oe(1,0)}}function ug(o,d,m,c,b,T,z,R,W,G,ie,pe){var me=ne();try{zs(o,d,m,c,b,T,z,R,W,G,ie,pe)}catch(_e){if(ae(me),_e!==_e+0)throw _e;oe(1,0)}}function lg(o,d,m,c,b,T){var z=ne();try{return Cs(o,d,m,c,b,T)}catch(R){if(ae(z),R!==R+0)throw R;oe(1,0)}}function dg(o,d,m){var c=ne();try{return Rs(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;return oe(1,0),0n}}function pg(o,d,m,c,b,T,z,R,W){var G=ne();try{$s(o,d,m,c,b,T,z,R,W)}catch(ie){if(ae(G),ie!==ie+0)throw ie;oe(1,0)}}function cg(o){var d=ne();try{return Ms(o)}catch(m){if(ae(d),m!==m+0)throw m;oe(1,0)}}function hg(o,d,m){var c=ne();try{return Ns(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;oe(1,0)}}function fg(o,d){var m=ne();try{return Ys(o,d)}catch(c){if(ae(m),c!==c+0)throw c;return oe(1,0),0n}}function mg(o,d,m,c,b){var T=ne();try{Ds(o,d,m,c,b)}catch(z){if(ae(T),z!==z+0)throw z;oe(1,0)}}function gg(o){var d=ne();try{return Ps(o)}catch(m){if(ae(d),m!==m+0)throw m;return oe(1,0),0n}}function yg(o,d,m,c,b,T){var z=ne();try{return Gs(o,d,m,c,b,T)}catch(R){if(ae(z),R!==R+0)throw R;oe(1,0)}}function _g(o,d,m,c,b,T){var z=ne();try{return Fs(o,d,m,c,b,T)}catch(R){if(ae(z),R!==R+0)throw R;oe(1,0)}}function wg(o,d,m,c,b,T,z,R){var W=ne();try{return As(o,d,m,c,b,T,z,R)}catch(G){if(ae(W),G!==G+0)throw G;oe(1,0)}}function bg(o,d,m,c,b){var T=ne();try{return Hs(o,d,m,c,b)}catch(z){if(ae(T),z!==z+0)throw z;return oe(1,0),0n}}function $g(o,d,m,c){var b=ne();try{return js(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function vg(o,d,m,c){var b=ne();try{return Ks(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function xg(o,d,m,c,b,T,z,R,W,G,ie,pe){var me=ne();try{return Zs(o,d,m,c,b,T,z,R,W,G,ie,pe)}catch(_e){if(ae(me),_e!==_e+0)throw _e;oe(1,0)}}function Sg(o,d,m,c,b,T,z,R,W,G,ie){var pe=ne();try{qs(o,d,m,c,b,T,z,R,W,G,ie)}catch(me){if(ae(pe),me!==me+0)throw me;oe(1,0)}}function Tg(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e,pt,bi){var Ag=ne();try{Vs(o,d,m,c,b,T,z,R,W,G,ie,pe,me,_e,pt,bi)}catch($i){if(ae(Ag),$i!==$i+0)throw $i;oe(1,0)}}function Ig(o,d,m,c){var b=ne();try{return Qs(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function kg(o,d,m,c,b){var T=ne();try{return Xs(o,d,m,c,b)}catch(z){if(ae(T),z!==z+0)throw z;oe(1,0)}}function Eg(o,d,m){var c=ne();try{return Us(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;oe(1,0)}}function zg(o,d,m){var c=ne();try{return Ws(o,d,m)}catch(b){if(ae(c),b!==b+0)throw b;oe(1,0)}}function Cg(o,d,m,c){var b=ne();try{Ls(o,d,m,c)}catch(T){if(ae(b),T!==T+0)throw T;oe(1,0)}}function kr(){if(0<Oe)bt=kr;else if(a)$?.(t),de();else{for(var o=be;0<o.length;)o.shift()(t);0<Oe?bt=kr:(t.calledRun=!0,C||(de(),$?.(t)))}}return a||(rt=await Le(),kr()),t.PTR_SIZE=4,V?t:new Promise((o,d)=>{$=o,S=d})}var np,no,Jg=P(()=>{"use strict";np=ao,no=globalThis.self?.name?.startsWith("em-pthread"),no&&ao()}),ki,_a,so,Re,sp,zr,oo,uo,Ei,lo,zi,op,Ci,up,Da=P(()=>{"use strict";Na(),ki=typeof location>"u"?void 0:location.origin,_a=import.meta.url>"file:"&&import.meta.url<"file;",so=()=>{if(_a){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ki).href}return import.meta.url},Re=so(),sp=()=>{if(Re&&!Re.startsWith("blob:"))return Re.substring(0,Re.lastIndexOf("/")+1)},zr=(e,t)=>{try{let r=t??Re;return(r?new URL(e,r):new URL(e)).origin===ki}catch{return!1}},oo=(e,t)=>{let r=t??Re;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},uo=(e,t)=>`${t??"./"}${e}`,Ei=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},lo=async e=>(await import(e)).default,zi=(Yg(),cr(rp)).default,op=async()=>{if(!Re)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(zr(Re))return[void 0,zi()];let e=await Ei(Re);return[e,zi(e)]},Ci=(Jg(),cr(ap)).default,up=async(e,t,r,i)=>{let a=Ci&&!(e||t);if(a)if(Re)a=zr(Re);else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Ci];{let s="ort-wasm-simd-threaded.jsep.mjs",n=e??oo(s,t),u=r&&n&&!zr(n,t),l=u?await Ei(n):n??uo(s,t);return[u?l:void 0,await lo(l)]}}}),Ai,Cr,Xt,Oi,po,co,ho,Pa,ye,Nt=P(()=>{"use strict";Da(),Cr=!1,Xt=!1,Oi=!1,po=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},co=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ho=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Pa=async e=>{if(Cr)return Promise.resolve();if(Xt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Oi)throw new Error("previous call to 'initializeWebAssembly()' failed.");Xt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!ho())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!co())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=po();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,n=a?.mjs,u=n?.href??n,l=a?.wasm,p=l?.href??l,h=e.wasmBinary,[f,g]=await up(u,s,r>1,!!h||!!p),_=!1,y=[];if(t>0&&y.push(new Promise($=>{setTimeout(()=>{_=!0,$()},t)})),y.push(new Promise(($,S)=>{let v={numThreads:r};if(h)v.wasmBinary=h;else if(p||s)v.locateFile=w=>p??s+w;else if(u&&u.indexOf("blob:")!==0)v.locateFile=w=>new URL(w,u).href;else if(f){let w=sp();w&&(v.locateFile=k=>w+k)}g(v).then(w=>{Xt=!1,Cr=!0,Ai=w,$(),f&&URL.revokeObjectURL(f)},w=>{Xt=!1,Oi=!0,S(w)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Cr&&Ai)return Ai;throw new Error("WebAssembly is not initialized yet.")}}),Ke,Vr,fe,Ua=P(()=>{"use strict";Nt(),Ke=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Vr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,s])=>{let n=t?t+a:a;if(typeof s=="object")Vr(s,n+".",r,i);else if(typeof s=="string"||typeof s=="number")i(n,s.toString());else if(typeof s=="boolean")i(n,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},fe=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let s=Number(t.getValue(a,i===4?"i32":"i64")),n=t.getValue(a+i,"*"),u=n?t.UTF8ToString(n):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),lp,ey=P(()=>{"use strict";Nt(),Ua(),lp=e=>{let t=ye(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Ke(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&fe("Can't create run options."),e?.extra!==void 0&&Vr(e.extra,"",new WeakSet,(n,u)=>{let l=Ke(n,i),p=Ke(u,i);t._OrtAddRunConfigEntry(r,l,p)!==0&&fe(`Can't set a run config entry: ${n} - ${u}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(n=>t._free(n)),s}}}),fo,mo,go,Yt,yo,dp,ty=P(()=>{"use strict";Nt(),Ua(),fo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},mo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},go=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Yt=(e,t,r,i)=>{let a=Ke(t,i),s=Ke(r,i);ye()._OrtAddSessionConfigEntry(e,a,s)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},yo=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let s=typeof a=="string"?a:a.name,n=[];switch(s){case"webnn":if(s="WEBNN",typeof a!="string"){let f=a?.deviceType;f&&Yt(e,"deviceType",f,r)}break;case"webgpu":if(s="JS",typeof a!="string"){let f=a;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Yt(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let u=Ke(s,r),l=n.length,p=0,h=0;if(l>0){p=ye()._malloc(l*ye().PTR_SIZE),r.push(p),h=ye()._malloc(l*ye().PTR_SIZE),r.push(h);for(let f=0;f<l;f++)ye().setValue(p+f*ye().PTR_SIZE,n[f][0],"*"),ye().setValue(h+f*ye().PTR_SIZE,n[f][1],"*")}await ye()._OrtAppendExecutionProvider(e,u,p,h,l)!==0&&fe(`Can't append execution provider: ${s}.`)}},dp=async e=>{let t=ye(),r=0,i=[],a=e||{};go(a);try{let s=fo(a.graphOptimizationLevel??"all"),n=mo(a.executionMode??"sequential"),u=typeof a.logId=="string"?Ke(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=a.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let h=typeof a.optimizedModelFilePath=="string"?Ke(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,n,!!a.enableProfiling,0,u,l,p,h),r===0&&fe("Can't create session options."),a.executionProviders&&await yo(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Yt(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[f,g]of Object.entries(a.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=Ke(f,i);t._OrtAddFreeDimensionOverride(r,_,g)!==0&&fe(`Can't set a free dimension override: ${f} - ${g}.`)}return a.extra!==void 0&&Vr(a.extra,"",new WeakSet,(f,g)=>{Yt(r,f,g,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),i.forEach(n=>t._free(n)),s}}}),Ct,at,At,Qr,Gr,Wa,La,wa,Y=P(()=>{"use strict";Ct=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},at=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},At=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return r>0?Math.ceil(i*r):void 0},Qr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Gr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Wa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",La=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",wa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),qa,pp=P(()=>{"use strict";Na(),qa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let n=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let p=l.byteLength;new Uint8Array(s,n,p).set(l),n+=p}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),_o,wo,bo,$o,Va,vo,ue,nt=P(()=>{"use strict";Y(),_o=["V","I","W","E","F"],wo=(e,t)=>{console.log(`[${_o[e]},${new Date().toISOString()}]${t}`)},Va=(e,t)=>{bo=e,$o=t},vo=(e,t)=>{let r=Gr(e),i=Gr(bo);r>=i&&wo(r,typeof t=="function"?t():t)},ue=(...e)=>{$o&&vo(...e)}}),xo,qt,B,Fr,cp,hp,fp,te=P(()=>{"use strict";xo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},qt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let s=Math.max(e.length,t.length),n=new Array(s);if(r){if(i<2||a<2)return;let u=xo.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[n[s-2],n[s-1]]=u}for(let u=r?3:1;u<=s;u++){let l=i-u<0?1:e[i-u],p=a-u<0?1:t[a-u];if(l!==p&&l>1&&p>1)return;let h=Math.max(l,p);if(l&&p)n[s-u]=Math.max(l,p);else{if(h>1)return;n[s-u]=0}}return n}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},B=class Lr{static size(t){return Lr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){a[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");a[s]=1,r/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Lr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Lr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,s)=>a+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},Fr=class ur{static adjustPoolAttributes(t,r,i,a,s,n){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<s.length){if(s[u]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let u=0;u<i.length*2;u++)if(u<n.length){if(n[u]<0)throw new Error("pad should be greater than or equal to 1")}else n.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(n[u]>=i[u]||n[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,s,n,u){if(u){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)ur.adjustPadAndReturnShape(t[l+(n?1:2)],r[l],i[l],a[l],s,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,s,n,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return ur.computeShapeHelper(t,r,l,i,a,s,n,u),l}static computeConvOutputShape(t,r,i,a,s,n,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return ur.computeShapeHelper(!1,t,l,i,a,s,n,u),l}static computeShapeHelper(t,r,i,a,s,n,u,l){if(t)for(let p=0;p<r.length-2;p++)i.push(1);else for(let p=0;p<r.length-2;p++)i.push(ur.adjustPadAndReturnShape(r[p+2],a[p],s[p],n[p],u,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,s,n,u,l){let p=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[n]=0,s[u]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+a-t;return s[n]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),s[u]=h-s[n],Math.floor((t+h-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[n]+s[u]-p)/r+1)}},cp=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,n,u;t?(s=e[1],n=e[0]):(s=e[0],n=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==n)throw new Error("dimension mismatch");if(s<=0||u<=0||n<=0)throw new Error("invalid shape specified");if(a&&!qt.isValidBroadcast(a,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,n]}},hp=-34028234663852886e22,fp=34028234663852886e22}),Ga,mp=P(()=>{"use strict";Y(),Ga=(e,t)=>new(Qr(t))(e)}),Bi,ba,Ri,So,Mi,To,Ni,Di,Pi,Io,gp,ry=P(()=>{"use strict";Y(),nt(),Bi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ba=(e,t)=>{if(t==="int32")return e;let r=Bi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,s=new(Qr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let n=new Int32Array(a);for(let u=0;u<a;u++){let l=s[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");n[u]=Number(l)}return new Uint8Array(n.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let n=Int32Array.from(s,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ri=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},So=1,Mi=()=>So++,To=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ni=(e,t)=>{let r=Bi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Di=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:s,fallbackDataType:n}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=s,this.fallbackDataType=n}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ni(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ri(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},Pi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),n;if(!s?.input.dataTypes.includes(t)){if(n=To.get(t),!n||s?.input.dataTypes.includes(n))throw new Error(`WebNN backend does not support data type: ${t}`);ue("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Ni(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,n),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ba(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Ri(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Io=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Mi();return this.tensorTrackersById.set(e,new Pi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),s=Mi(),n=new Di({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new Pi(this,n)),this.externalTensors.add(n),s}async getCachedTensor(e,t,r,i,a,s,n){let u=this.getMLContext(e);for(let[p,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=e,f}ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:n??t,shape:r,dimensions:r,usage:i,writable:a,readable:s});return new Di({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},gp=(...e)=>new Io(...e)}),Jt,ko,yp,iy=P(()=>{"use strict";Y(),Nt(),mp(),ry(),nt(),Jt=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ko=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,s)=>a===i[s]&&e[a]===t[a])},yp=class{constructor(e){this.tensorManager=gp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Va(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ue("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ue("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)ue("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>ko(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let s=Jt.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,a)}async createTemporaryTensor(e,t,r){ue("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=Jt.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ga(r,t)}}registerMLTensor(e,t,r,i){let a=Jt.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,a,i);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,i,a,s,n=!1){if(!s)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+r).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(p);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":h=new Int32Array(p);break;case"uint32":h=new Uint32Array(p);break;case"int64":if(n){let f=ba(new Uint8Array(p),"int64");h=new Int32Array(f.buffer),a.dataType="int32"}else h=new BigInt64Array(p);break;case"uint64":h=new BigUint64Array(p);break;case"int8":h=new Int8Array(p);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${n?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=Jt.get(Ct(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!a?.input.dataTypes.includes(i):!!a?.output.dataTypes.includes(i)}flush(){}}}),Fa=P(()=>{"use strict"}),Ui,Ar,Or,Eo,zo,Wi,$a,Co,_p,ay=P(()=>{"use strict";nt(),Fa(),Ui=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ar=[],Or=e=>Math.ceil(Number(e)/16)*16,Eo=e=>{for(let t=0;t<Ar.length;t++){let r=Ar[t];if(e<=r)return r}return Math.ceil(e/16)*16},zo=1,Wi=()=>zo++,$a=async(e,t,r,i)=>{let a=Or(r),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let n=e.getCommandEncoder();e.endComputePass(),n.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{s.destroy()}},Co=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ui)Ar.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,s=Or(a),n=this.storageCache.get(e);if(!n)throw new Error("gpu data for uploading does not exist");if(Number(n.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${n.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,a)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,n.gpuData.buffer,0,s),this.backend.device.queue.submit([p.finish()]),u.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Or(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Wi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Eo(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let n={id:Wi(),type:0,buffer:i};return this.storageCache.set(n.id,{gpuData:n,originalSize:Number(e)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${n.id}`),n}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await $a(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ui.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},_p=(...e)=>new Co(...e)}),Ao,he,ve=P(()=>{"use strict";Ao=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Ao(e)}),Vt,Br,ke,Ce,Z,$e,va,Lt,yt,j,er,M,F,wp,Ha,Oo,bp,re=P(()=>{"use strict";Y(),te(),Vt=64,Br=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ke=(e,t=1)=>{let r=Br(e,t);return typeof r=="string"?r:r[0]},Ce=(e,t=1)=>{let r=Br(e,t);return typeof r=="string"?r:r[1]},Z=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,va=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Lt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,yt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,er=(e,t,r,i,a)=>{let s=typeof r=="number",n=s?r:r.length,u=[...new Array(n).keys()],l=n<2?"u32":n<=4?`vec${n}<u32>`:`array<u32, ${n}>`,p=Br(t,a),h=typeof p=="string"?p:p[1],f=typeof p=="string"?p:p[0],g={indices:l,value:h,storage:f,tensor:t},_=N=>typeof N=="string"?N:`${N}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=s?"uniforms.":"",S=`${$}${e}_shape`,v=`${$}${e}_strides`,w="";for(let N=0;N<n-1;N++)w+=`
    let dim${N} = current / ${j(v,N,n)};
    let rest${N} = current % ${j(v,N,n)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;w+=`indices[${n-1}] = current;`;let k=n<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,I=N=>(y.offsetToIndices=!0,n<2?N:`o2i_${e}(${N})`),E=[];if(n>=2)for(let N=n-1;N>=0;N--)E.push(`${j(v,N,n)} * (indices[${N}])`);let C=n<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`,O=N=>(y.indicesToOffset=!0,n<2?N:`i2o_${e}(${N})`),x=(...N)=>n===0?"0u":`${g.indices}(${N.map(_).join(",")})`,D=(N,V)=>n<2?`${N}`:`${j(N,V,n)}`,L=(N,V,J)=>n<2?`${N}=${J};`:`${j(N,V,n)}=${J};`,Q={},q=(N,V)=>{y.broadcastedIndicesToOffset=!0;let J=`${V.name}broadcastedIndicesTo${e}Offset`;if(J in Q)return`${J}(${N})`;let de=[];for(let Ie=n-1;Ie>=0;Ie--){let Be=V.indicesGet("outputIndices",Ie+V.rank-n);de.push(`${D(v,Ie)} * (${Be} % ${D(S,Ie)})`)}return Q[J]=`fn ${J}(outputIndices: ${V.type.indices}) -> u32 {
             return ${de.length>0?de.join("+"):"0u"};
           }`,`${J}(${N})`},K=(N,V)=>(()=>{if(g.storage===g.value)return`${e}[${N}]=${V};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${N}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${N}]=vec2<u32>(u32(${V}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),se=N=>(()=>{if(g.storage===g.value)return`${e}[${N}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${N}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${N}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${N}] & 0xFFu), bool(${e}[${N}] & 0xFF00u), bool(${e}[${N}] & 0xFF0000u), bool(${e}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),A=n<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${h} {
    return ${se(`i2o_${e}(indices)`)};
  }`,U=n<2?"":(()=>{let N=u.map(J=>`d${J}: u32`).join(", "),V=u.map(J=>`d${J}`).join(", ");return`
  fn get_${e}(${N}) -> ${h} {
    return get_${e}ByIndices(${x(V)});
  }`})(),ee=(...N)=>{if(N.length!==n)throw new Error(`indices length must be ${n}`);let V=N.map(_).join(",");return n===0?se("0u"):n===1?se(V[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${V})`)},X=N=>n<2?se(N):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${N})`),H=n<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${h}) {
    ${K(`i2o_${e}(indices)`,"value")}
  }`,le=n<2?"":(()=>{let N=u.map(J=>`d${J}: u32`).join(", "),V=u.map(J=>`d${J}`).join(", ");return`
  fn set_${e}(${N}, value: ${h}) {
    set_${e}ByIndices(${x(V)}, value);
  }`})();return{impl:()=>{let N=[],V=!1;return y.offsetToIndices&&(N.push(k),V=!0),y.indicesToOffset&&(N.push(C),V=!0),y.broadcastedIndicesToOffset&&(Object.values(Q).forEach(J=>N.push(J)),V=!0),y.set&&(N.push(le),V=!0),y.setByIndices&&(N.push(H),V=!0),y.get&&(N.push(U),V=!0),y.getByIndices&&(N.push(A),V=!0),!s&&V&&N.unshift(`const ${S} = ${g.indices}(${r.join(",")});`,`const ${v} = ${g.indices}(${B.computeStrides(r).join(",")});`),N.join(`
`)},type:g,offsetToIndices:I,indicesToOffset:O,broadcastedIndicesToOffset:q,indices:x,indicesGet:D,indicesSet:L,set:(...N)=>{if(N.length!==n+1)throw new Error(`indices length must be ${n}`);let V=N[n];if(typeof V!="string")throw new Error("value must be string");let J=N.slice(0,n).map(_).join(",");return n===0?K("0u",V):n===1?K(J[0],V):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${J}, ${V})`)},setByOffset:K,setByIndices:(N,V)=>n<2?K(N,V):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${N}, ${V});`),get:ee,getByOffset:se,getByIndices:X,usage:i,name:e,strides:v,shape:S,rank:n}},M=(e,t,r,i=1)=>er(e,t,r,"input",i),F=(e,t,r,i=1)=>er(e,t,r,"output",i),wp=(e,t,r)=>er(e,t,r,"atomicOutput",1),Ha=(e,t,r,i=1)=>er(e,t,r,"internal",i),Oo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Vt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,n=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${n}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},bp=(e,t)=>new Oo(e,t)}),Bo,Li,Ro,Mo,No,Do,Ne,$p,vp,wt=P(()=>{"use strict";Y(),te(),ve(),re(),Bo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Li=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Ro=(e,t)=>B.sortBasedOnPerm(e,Li(e.length,t)),Mo=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)a+=`a[${e[s]}]=i[${s}];`;return a+="return a;}"},No=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},Do=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Ne=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Li(i,t),s=Ro(e.dims,a),n=e.dims,u=s,l=i<2||Do(a,e.dims),p;if(l)return p=y=>{let $=M("input",r,n,4),S=F("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables($,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:p};let{newShape:h,newPerm:f}=No(e.dims,a),g=B.areEqual(f,[2,3,1]),_=B.areEqual(f,[3,1,2]);if(h.length===2||g||_){n=g?[h[0],h[1]*h[2]]:_?[h[0]*h[1],h[2]]:h,u=[n[1],n[0]];let y=16;return p=$=>{let S=M("a",r,n.length),v=F("output",r,u.length);return`
  ${$.registerUniform("output_size","u32").declareVariables(S,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${y+1}>, ${y}>;
  ${$.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let $=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:$},...Z(n,u)]}},getShaderSource:p}}return p=y=>{let $=M("a",r,n.length),S=F("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables($,S)}

  ${Mo(a,i,$,S)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",$.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=B.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(n,u)]}},getShaderSource:p}},$p=(e,t)=>{Bo(e.inputs,t.perm),e.compute(Ne(e.inputs[0],t.perm))},vp=e=>he({perm:e.perm})}),Po,Uo,Wo,Lo,qo,Vo,Go,Fo,Ho,jo,Ve,xp,Sp,Tp,Ip,kp,Ep,zp,Cp,Ap,Op,ny=P(()=>{"use strict";Y(),te(),re(),ja(),wt(),Po={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Uo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Wo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Lo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},qo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Vo=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let a=t.map(s=>e[s]);return[r,a]},Go=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[a++]):i.push(1);return i},Fo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Ho=(e,t)=>{let r=[];if(!Fo(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},jo=(e,t,r,i,a,s,n)=>{let u=r[0].dims,l=B.size(s),p=B.size(n),h=M("_A",r[0].dataType,u),f=F("output",a,s),g=64;l===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,y=$=>`
        ${$.registerUniform("reduceSize","u32").declareVariables(h,f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Wo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${Po[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Uo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Lo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},Ve=(e,t,r,i)=>{let a=e.inputs.length===1?r:xa(e.inputs,r),s=a.axes;s.length===0&&!a.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((_,y)=>y));let n=B.normalizeAxes(s,e.inputs[0].dims.length),u=n,l=e.inputs[0],p=Ho(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Ne(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=qo(u.length,l.dims.length));let[h,f]=Vo(l.dims,u),g=h;a.keepDims&&(g=Go(h,n)),e.compute(jo(t,a.cacheKey,[l],i,e.inputs[0].dataType,g,f),{inputs:[l]})},xp=(e,t)=>{Ve(e,"ReduceMeanShared",t,"mean")},Sp=(e,t)=>{Ve(e,"ReduceL1Shared",t,"l1")},Tp=(e,t)=>{Ve(e,"ReduceL2Shared",t,"l2")},Ip=(e,t)=>{Ve(e,"ReduceLogSumExpShared",t,"logSumExp")},kp=(e,t)=>{Ve(e,"ReduceMaxShared",t,"max")},Ep=(e,t)=>{Ve(e,"ReduceMinShared",t,"min")},zp=(e,t)=>{Ve(e,"ReduceProdShared",t,"prod")},Cp=(e,t)=>{Ve(e,"ReduceSumShared",t,"sum")},Ap=(e,t)=>{Ve(e,"ReduceSumSquareShared",t,"sumSquare")},Op=(e,t)=>{Ve(e,"ReduceLogSumShared",t,"logSum")}}),Ge,Ko,Hr,xa,Fe,Zo,Qo,Xo,Yo,Jo,eu,tu,ru,iu,au,He,Bp,Rp,Mp,Np,Dp,Pp,Up,Wp,Lp,qp,ja=P(()=>{"use strict";Y(),te(),ve(),re(),ny(),Ge=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Ko=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Hr=(e,t,r,i,a,s,n=!1,u=!1)=>{let l=[],p=r[0].dims,h=p.length,f=B.normalizeAxes(a,h),g=!u&&f.length===0;p.forEach(($,S)=>{g||f.indexOf(S)>=0?n&&l.push(1):l.push($)});let _=l.length,y=B.size(l);return{name:e,shaderCache:t,getShaderSource:$=>{let S=[],v=M("_A",r[0].dataType,h),w=F("output",s,_),k=i(v,w,f),I=k[2];for(let E=0,C=0;E<h;E++)g||f.indexOf(E)>=0?(n&&C++,I=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${k[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${v.indicesSet("input_indices",E,`j${E}`)}
                  ${I}
                }`):(S.push(`${v.indicesSet("input_indices",E,w.indicesGet("output_indices",C))};`),C++);return`

        ${$.registerUniform("output_size","u32").declareVariables(v,w)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${I}
          ${k[3]}
          ${k.length===4?w.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(p,l)]})}},xa=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Fe=(e,t,r,i)=>{let a=e.inputs,s=a.length===1?r:xa(a,r);e.compute(Hr(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&s.axes.length===0?Ko:i,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},Zo=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Qo=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Xo=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Yo=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Jo=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceMax",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",n,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},eu=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceMean",t,(r,i,a)=>{let s=1;for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&(s*=e.inputs[0].dims[n]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},tu=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceMin",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(`input_indices[${n}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},ru=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},iu=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},au=(e,t)=>{Ge(e.inputs),Fe(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},He=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:a*=e[s];return a<32&&i>1024},Bp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?eu(e,t):xp(e,t)},Rp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qo(e,t):Sp(e,t)},Mp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Tp(e,t)},Np=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):Ip(e,t)},Dp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jo(e,t):kp(e,t)},Pp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tu(e,t):Ep(e,t)},Up=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ru(e,t):zp(e,t)},Wp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?iu(e,t):Cp(e,t)},Lp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?au(e,t):Ap(e,t)},qp=(e,t)=>{He(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Op(e,t)}}),qi,Vp,Gp,Sa,sy=P(()=>{"use strict";Y(),ve(),ja(),qi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Vp=(e,t)=>{qi(e.inputs);let r=(i,a,s)=>{let n=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&n.push(`input_indices[${u}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Hr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Gp=(e,t)=>{qi(e.inputs);let r=(i,a,s)=>{let n=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&n.push(`input_indices[${u}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Hr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Sa=e=>he(e)}),nu,Rr,su,ou,uu,fr,lu,Fp,Ka=P(()=>{"use strict";Y(),te(),Fa(),re(),nu=(e,t)=>{let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4],u=e[5];if(n&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],h=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=a.dims[0]/3,g=f,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==f+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let $=0;if(n){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(n.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(n.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(n.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(n.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(n.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||($=n.dims[3])}let S=y+$,v=-1,w=0;if(s)throw new Error("Mask not supported");if(n)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:$,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:v,inputHiddenSize:h,hiddenSize:f,vHiddenSize:_,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Rr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,su=(e,t,r,i,a,s,n,u)=>{let l=$e(n?1:s),p=64,h=s/l;h<p&&(p=32);let f=Math.ceil(s/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:h},{type:12,data:f}],_=ke(e.dataType,l),y=Ce(1,l),$=["type"];n&&$.push("type"),u&&$.push("type");let S=v=>{let w=F("x",e.dataType,e.dims,l),k=[w],I=n?M("seq_lens",n.dataType,n.dims):void 0;I&&k.push(I);let E=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;E&&k.push(E);let C=Ce(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${v.registerUniforms(O).declareVariables(...k)}
  ${v.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Rr(I,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${n?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${n?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:$},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:g})}},ou=(e,t,r,i,a,s,n,u,l)=>{let p=n+s.kvSequenceLength,h=[s.batchSize,s.numHeads,s.sequenceLength,p],f=e>1&&i,g=s.kvNumHeads?s.kvNumHeads:s.numHeads,_=f?[s.batchSize,g,p,s.headSize]:void 0,y=s.nReps?s.nReps:1,$=s.scale===0?1/Math.sqrt(s.headSize):s.scale,S=$e(s.headSize),v=s.headSize/S,w=12,k={x:Math.ceil(p/w),y:Math.ceil(s.sequenceLength/w),z:s.batchSize*s.numHeads},I=[{type:12,data:s.sequenceLength},{type:12,data:v},{type:12,data:p},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:$},{type:12,data:n},{type:12,data:s.kvSequenceLength},{type:12,data:y}],E=f&&i&&B.size(i.dims)>0,C=["type","type"];E&&C.push("type"),a&&C.push("type"),u&&C.push("type"),l&&C.push("type");let O=[{dims:h,dataType:t.dataType,gpuDataType:0}];f&&O.push({dims:_,dataType:t.dataType,gpuDataType:0});let x=D=>{let L=M("q",t.dataType,t.dims,S),Q=M("key",r.dataType,r.dims,S),q=[L,Q];if(E){let H=M("past_key",i.dataType,i.dims,S);q.push(H)}a&&q.push(M("attention_bias",a.dataType,a.dims));let K=u?M("seq_lens",u.dataType,u.dims):void 0;K&&q.push(K);let se=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;se&&q.push(se);let A=F("output",t.dataType,h),U=[A];f&&U.push(F("present_key",t.dataType,_,S));let ee=Ce(1,S),X=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${L.type.storage}, ${w*w}>;
  ${D.registerUniforms(X).declareVariables(...q,...U)}
  ${D.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Rr(K,se,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${A.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${a!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:O,dispatchGroup:k,programUniforms:I}),getShaderSource:x}},uu=(e,t,r,i,a,s,n=void 0,u=void 0)=>{let l=s+a.kvSequenceLength,p=a.nReps?a.nReps:1,h=a.vHiddenSize*p,f=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=f?[a.batchSize,g,l,a.headSize]:void 0,y=[a.batchSize,a.sequenceLength,h],$=12,S={x:Math.ceil(a.vHeadSize/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:p}],w=f&&i&&B.size(i.dims)>0,k=["type","type"];w&&k.push("type"),n&&k.push("type"),u&&k.push("type");let I=[{dims:y,dataType:t.dataType,gpuDataType:0}];f&&I.push({dims:_,dataType:t.dataType,gpuDataType:0});let E=C=>{let O=M("probs",t.dataType,t.dims),x=M("v",r.dataType,r.dims),D=[O,x];w&&D.push(M("past_value",i.dataType,i.dims));let L=n?M("seq_lens",n.dataType,n.dims):void 0;n&&D.push(L);let Q=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;u&&D.push(Q);let q=[F("output",t.dataType,y)];f&&q.push(F("present_value",t.dataType,_));let K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${O.type.value}, ${$*$}>;
  var<workgroup> tileV: array<${O.type.value}, ${$*$}>;
  ${C.registerUniforms(K).declareVariables(...D,...q)}
  ${C.mainStart([$,$,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Rr(L,Q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:I,dispatchGroup:S,programUniforms:v}),getShaderSource:E}},fr=(e,t,r,i,a,s,n,u,l,p,h=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(n?1:0)+(u?1:0)),_=g>1?p.pastSequenceLength:0,y=_+p.kvSequenceLength,$=l&&B.size(l.dims)>0?l:void 0,S=[t,r];g>1&&n&&B.size(n.dims)>0&&S.push(n),$&&S.push($),h&&S.push(h),f&&S.push(f);let v=e.compute(ou(g,t,r,n,$,p,_,h,f),{inputs:S,outputs:g>1?[-1,1]:[-1]})[0];e.compute(su(v,p.batchSize,p.numHeads,_,p.sequenceLength,y,h,f),{inputs:h&&f?[v,h,f]:[v],outputs:[]});let w=[v,i];g>1&&u&&B.size(u.dims)>0&&w.push(u),h&&w.push(h),f&&w.push(f),e.compute(uu(g,v,i,u,p,_,h,f),{inputs:w,outputs:g>1?[0,2]:[0]})},lu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,s=t.headSize,n=12,u={x:Math.ceil(t.headSize/n),y:Math.ceil(t.sequenceLength/n),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=f=>{let g=F("output_q",l[0].dataType,r),_=F("output_k",l[0].dataType,r),y=F("output_v",l[0].dataType,r),$=M("input",l[0].dataType,l[0].dims),S=M("weight",l[1].dataType,l[1].dims),v=M("bias",l[2].dataType,l[2].dims),w=$.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${n}u;
  var<workgroup> tileInput: array<${w}, ${n*n}>;
  var<workgroup> tileWeightQ: array<${w}, ${n*n}>;
  var<workgroup> tileWeightK: array<${w}, ${n*n}>;
  var<workgroup> tileWeightV: array<${w}, ${n*n}>;
  ${f.registerUniforms(k).declareVariables($,S,v,g,_,y)}
  ${f.mainStart([n,n,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:h},{inputs:l,outputs:[-1,-1,-1]})},Fp=(e,t)=>{let r=nu(e.inputs,t),[i,a,s]=lu(e,r);return fr(e,i,a,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),du,pu,cu,Hp,oy=P(()=>{"use strict";We(),Y(),te(),ve(),re(),du=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,s)=>{let n=a.length;if(n!==i.length)throw new Error(`${s}: num dimensions != ${n}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},pu=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,s=e[0].dims,n=i?$e(s[s.length-1]):1,u=a==="NHWC"&&s.length>1?n:1,l=B.size(s)/n,p=i,h=p?s.length:s,f=M("x",e[0].dataType,e[0].dims,n),g=M("scale",e[1].dataType,e[1].dims,u),_=M("bias",e[2].dataType,e[2].dims,u),y=M("inputMean",e[3].dataType,e[3].dims,u),$=M("inputVar",e[4].dataType,e[4].dims,u),S=F("y",e[0].dataType,h,n),v=()=>{let k="";if(i)k=`let cOffset = ${s.length===1?"0u":a==="NHWC"?`outputIndices[${s.length-1}] / ${n}`:"outputIndices[1]"};`;else if(a==="NCHW")k=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let I=1;I<g.rank;I++)k+=`cIndices[${I}] = outputIndices[${I}];`;k+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return k},w=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(f,g,_,y,$,S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${n}`)};
    ${v()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${n}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Z(s)]:[{type:12,data:l}]})}},cu=e=>he(e),Hp=(e,t)=>{let{inputs:r,outputCount:i}=e,a=cu({...t,outputCount:i});if(ge.webgpu.validateInputContent&&du(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(pu(r,a))}}),hu,fu,jp,uy=P(()=>{"use strict";te(),re(),hu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},fu=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,a=e[0].dataType,s=M("input",a,t,4),n=M("bias",a,[r],4),u=M("residual",a,t,4),l=F("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(s,n,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${n.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},jp=e=>{hu(e.inputs),e.compute(fu(e.inputs))}}),mu,ce,Kp,Zp,Qp,Xp,Yp,Jp,ec,tc,rc,gu,ic,ac,nc,sc,lr,oc,qr,uc,lc,dc,pc,cc,hc,fc,mc,gc,yc,_c,wc,bc,$c,vc,xc,Vi,Sc,Ta,Ia,Tc,Ic,kc,yu,_u,Ec,Za=P(()=>{"use strict";Y(),te(),ve(),re(),mu=(e,t,r,i,a,s,n)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let p=M("inputData",r,[u],4),h=F("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return n&&f.push(...n),`
      ${e.registerUniforms(f).declareVariables(p,h)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,a,s=e.dataType,n,u)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return n&&l.push(...n),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:p=>mu(p,B.size(e.dims),e.dataType,s,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(B.size(p[0].dims)/64/4)},programUniforms:l})}},Kp=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},Zp=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},Qp=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},Xp=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},Yp=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},Jp=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},ec=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},tc=e=>he(e),rc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},gu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},ic=(e,t)=>{let r=t||gu(e.inputs),i=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},ac=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},nc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},sc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},lr=e=>he(e),oc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},qr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,uc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,qr(t)))},lc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},dc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},pc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,qr(t)))},cc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},hc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},fc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},mc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},gc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},yc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},_c=e=>he(e),wc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},bc=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},$c=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},vc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},xc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Vi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Sc=e=>{e.compute(ce(e.inputs[0],"Tanh",Vi))},Ta=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Vi("v")};
}
`,Ia=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Tc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Ia,Ta(t),void 0,e.inputs[0].dataType))},Ic=(e,t)=>{let r=Ce(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},kc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},yu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,_u=e=>`quick_gelu_impl(${e})`,Ec=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",_u,yu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),wu,bu,zc,ly=P(()=>{"use strict";te(),re(),Za(),wu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},bu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=M("input",e[0].dataType,e[0].dims,4),i=M("bias",e[0].dataType,[e[0].dims[2]],4),a=F("output",e[0].dataType,t,4),s=B.size(t)/4,n=ke(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${qr(n)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},zc=e=>{wu(e.inputs),e.compute(bu(e.inputs))}}),$u,vu,je,Cc,Ac,Oc,Bc,Rc,Mc,Nc,Dc,Pc,Uc,dy=P(()=>{"use strict";Y(),te(),re(),$u=(e,t,r,i,a,s,n,u,l,p,h,f)=>{let g,_;typeof u=="string"?g=_=(w,k)=>`${u}((${w}),(${k}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let y=F("outputData",h,i.length,4),$=M("aData",l,t.length,4),S=M("bData",p,r.length,4),v;if(a)if(s){let w=B.size(t)===1,k=B.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;w||k?v=y.setByOffset("global_idx",_(w?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"),k?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(n||I?$.getByOffset("offsetA / 4u"):`${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`,n||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",_($.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(k,I,E="")=>{let C=`aData[indexA${I}][componentA${I}]`,O=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${y.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${$.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${k}[${I}] = ${E}(${g(C,O)});
          `};h===9?v=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables($,S,y)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},vu=(e,t,r,i,a,s,n=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!B.areEqual(u,l),h=u,f=B.size(u),g=!1,_=!1,y=[p];if(p){let $=qt.calcShape(u,l,!1);if(!$)throw new Error("Can't perform binary op on the given tensors");h=$.slice(),f=B.size(h);let S=B.size(u)===1,v=B.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,k=l.length>0&&l[l.length-1]%4===0;y.push(S),y.push(v),y.push(w),y.push(k);let I=1;for(let E=1;E<h.length;E++){let C=u[u.length-E],O=l[l.length-E];if(C===O)I*=C;else break}I%4===0?(_=!0,g=!0):(S||v||w||k)&&(g=!0)}else g=!0;return y.push(g),{name:e,shaderCache:{hint:t+y.map($=>$.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:$=>$u($,u,l,h,g,p,_,a,r.dataType,i.dataType,n,s),getRunData:()=>({outputs:[{dims:h,dataType:n}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(h)/4)},...Z(u,l,h)]})}},je=(e,t,r,i,a,s)=>{e.compute(vu(t,a??"",e.inputs[0],e.inputs[1],r,i,s))},Cc=e=>{je(e,"Add",(t,r)=>`${t}+${r}`)},Ac=e=>{je(e,"Div",(t,r)=>`${t}/${r}`)},Oc=e=>{je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Bc=e=>{je(e,"Mul",(t,r)=>`${t}*${r}`)},Rc=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Mc=e=>{je(e,"Sub",(t,r)=>`${t}-${r}`)},Nc=e=>{je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Dc=e=>{je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Pc=e=>{je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Uc=e=>{je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),xu,Su,Tu,Iu,Wc,Lc,py=P(()=>{"use strict";Y(),te(),ve(),re(),xu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,s=i.dims.length;e.forEach((n,u)=>{if(u!==r){if(n.dataType!==a)throw new Error("input tensors should be one type");if(n.dims.length!==s)throw new Error("input tensors should have the same shape");n.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Su=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Tu=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(s):a===0?i.push(`if (inputIndex == ${a}u) { ${s} }`):a===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${a}) { ${s} }`)}return i.join(`
`)},Iu=(e,t,r,i)=>{let a=B.size(r),s=new Array(e.length),n=new Array(e.length),u=0,l=[],p=[],h=[{type:12,data:a}];for(let $=0;$<e.length;++$)u+=e[$].dims[t],s[$]=u,p.push(e[$].dims.length),n[$]=M(`input${$}`,i,p[$]),l.push("rank"),h.push({type:12,data:s[$]});for(let $=0;$<e.length;++$)h.push(...Z(e[$].dims));h.push(...Z(r));let f=F("output",i,r.length),g=f.indicesGet("indices",t),_=Array.from(Array(s.length).keys()).map($=>`uniforms.sizeInConcatAxis${$}`).join(","),y=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)$.registerUniform(`sizeInConcatAxis${S}`,"u32");return $.declareVariables(...n,f)})()}

  ${Su(s.length,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${_});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Tu(n,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:y}},Wc=(e,t)=>{let r=e.inputs,i=r[0].dims,a=B.normalizeAxis(t.axis,i.length);xu(r,a);let s=i.slice();s[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let n=r.filter(u=>B.size(u.dims)>0);e.compute(Iu(n,a,s,r[0].dataType),{inputs:n})},Lc=e=>he({axis:e.axis})}),Bt,Rt,Mt,Qa,Dt=P(()=>{"use strict";Y(),te(),Bt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Rt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Mt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Qa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[hp,fp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),ze,qc,Xa=P(()=>{"use strict";ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},qc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Vc,cy=P(()=>{"use strict";Vc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),pr,Ya,Ja=P(()=>{"use strict";Y(),te(),re(),Dt(),pr=(e,t,r,i,a)=>{let s=i-r;return`
      ${Array.from({length:r}).map((n,u)=>`
      if (${j(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,j(a,u+s,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Ya=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,u=e[1].dims,l=n[n.length-2],p=u[u.length-1],h=n[n.length-1],f=$e(p),g=$e(h),_=$e(l),y=B.size(r)/f/_,$=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),v=[B.size(S),l,p],w=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:h}];Rt(t,w),w.push(...Z(S,n,u)),$&&w.push(...Z(e[2].dims)),w.push(...Z(v));let k=I=>{let E=Ha("batch_dims",e[0].dataType,S.length),C=M("a",e[0].dataType,n.length,g),O=M("b",e[1].dataType,u.length,f),x=F("output",e[0].dataType,v.length,f),D=ke(x.type.tensor),L=Bt(t,x.type.value,D),Q=[C,O],q="";if($){let A=a?f:1;Q.push(M("bias",e[2].dataType,e[2].dims.length,A)),q=`${a?`value += bias[col / ${A}];`:`value += ${x.type.value}(bias[row + i]);`}`}let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Mt(t,K);let se=()=>{let A=`var a_data: ${C.type.value};`;for(let U=0;U<g;U++)A+=`
              let b_data${U} = b[(b_offset + (k + ${U}) * uniforms.N + col) / ${f}];`;for(let U=0;U<_;U++){A+=`a_data = a[(a_offset + (row + ${U}) * uniforms.K + k) / ${g}];`;for(let ee=0;ee<g;ee++)A+=`
            values[${U}] = fma(${O.type.value}(a_data${g===1?"":`[${ee}]`}), b_data${ee}, values[${U}]);
`}return A};return`
  ${I.registerUniforms(K).registerInternalVariables(E).declareVariables(...Q,x)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${pr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${pr("b_indices",O,O.rank-2,E.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${se()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${q}
      ${L}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${_};${a}`,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:w}),getShaderSource:k}}}),ku,Eu,ka,Gi,zu,Ea,Cu,jr,en=P(()=>{"use strict";Y(),te(),re(),Dt(),Ja(),Xa(),ku=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Eu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ka=(e,t,r="f32",i,a=!1,s=32,n=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],h=a?l:s,f=a?s:l,g=h/t[0],_=s/t[1];if(!((a&&g===4&&e[1]===4||!a&&(g===3||g===4))&&h%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${h/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${n?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${n?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${n?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ku(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Eu(a,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Gi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,zu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ea=(e,t,r="f32",i,a=!1,s=32,n=!1,u=32,l=!1)=>{let p=e[1]*t[1],h=e[0]*t[0],f=a?p:s,g=a?s:p;if(!(g%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],y=f/t[0],$=s/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Gi(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Gi(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${zu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${n?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${n?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${n?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Cu=(e,t,r,i,a=!1)=>{let[s,n,u,l]=i,p=ke(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${n.type.indices};
        ${pr("aIndices",n,n.rank-2,s.rank,"batchIndices")}
        ${n.indicesSet("aIndices",n.rank-2,"u32(row)")}
        ${n.indicesSet("aIndices",n.rank-1,"u32(colIn)")}
        value = ${n.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${pr("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${ze(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},jr=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,u=e[1].dims,l=n.slice(0,-2),p=u.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),f=B.size(h),g=n[n.length-2],_=n[n.length-1],y=u[u.length-1],$=_%4===0&&y%4===0,S=g<=8?[4,1,1]:[4,4,1],v=[8,8,1],w=[Math.ceil(y/v[0]/S[0]),Math.ceil(g/v[1]/S[1]),Math.ceil(f/v[2]/S[2])],k=$?4:1,I=[...l,g,_/k],E=I.length,C=[...p,_,y/k],O=C.length,x=[f,g,y/k],D=[{type:6,data:g},{type:6,data:y},{type:6,data:_}];Rt(t,D),D.push(...Z(h,I,C));let L=["rank","rank"],Q=e.length>2;Q&&(D.push(...Z(e[2].dims)),L.push("rank")),D.push(...Z(x));let q=K=>{let se=h.length,A=Ha("batchDims",e[0].dataType,se,1),U=ke(e[0].dataType),ee=M("a",e[0].dataType,E,k),X=M("b",e[1].dataType,O,k),H=F("result",e[0].dataType,x.length,k),le=[ee,X];if(Q){let Ie=a?k:1;le.push(M("bias",e[2].dataType,e[2].dims.length,Ie))}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Mt(t,N);let V=ke(H.type.tensor),J=Bt(t,H.type.value,V),de=Cu(k,Q,J,[A,ee,X,H],a);return`
  ${K.registerUniforms(N).registerInternalVariables(A).declareVariables(...le,H)}
  ${de}
  ${$?ka(S,v,U,A):Ea(S,v,U,A)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${$};${a}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:D}),getShaderSource:q}}}),Au,Gc,hy=P(()=>{"use strict";Y(),nt(),re(),Dt(),Xa(),cy(),en(),Au=(e,t,r,i,a=!1,s,n=4,u=4,l=4,p="f32")=>{let h=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},f=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",$=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",v=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${ze(n,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${$}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(n)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${n};
    ${w}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${ze(n,p)}(0.0);`:i&&r?`
    let col = colIn * ${n};
    ${w}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${ze(n,p)}(0.0);`,I=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${ze(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${ze(u,p)}(0.0);`,E=ze(l,p),C=ze(e?n:u,p),O=ze(e?u:n,p),x=Bt(s,E,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?k:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?I:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${qc(a)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gc=(e,t,r,i,a,s,n,u,l)=>{let p=t.format==="NHWC",h=p?e[0].dims[3]:e[0].dims[1],f=r[0],g=p?r[2]:r[3],_=p?r[1]:r[2],y=p?r[3]:r[1],$=p&&(h%4===0||h%3===0)&&y%4===0,S=p?y:g*_,v=p?g*_:y,w=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],I=[Math.ceil(S/w[0]/k[0]),Math.ceil(v/w[1]/k[1]),Math.ceil(f/w[2]/k[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let E=$?p&&h%4!==0?3:4:1,C=w[1]*k[1],O=w[0]*k[0],x=Math.max(w[0]*E,w[1]),D=i%C===0,L=a%O===0,Q=s%x===0,q=$?[E,4,4]:[1,1,1],K=[{type:6,data:i},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Rt(t,K),K.push(...Z(e[0].dims,e[1].dims));let se=["rank","rank"];n&&(K.push(...Z(e[2].dims)),se.push("rank")),K.push(...Z(r));let A=U=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Mt(t,ee);let X=$?4:1,H=ke(e[0].dataType),le=`
      fn setOutputAtIndex(flatIndex : i32, value : ${$?`vec4<${H}>`:H}) {
        result[flatIndex] = ${$?`vec4<${H}>`:H}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$?`vec4<${H}>`:H}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$?"/ 4":""}, value);
      }`,N=M("x",e[0].dataType,e[0].dims.length,E===3?1:E),V=M("w",e[1].dataType,e[1].dims.length,X),J=[N,V],de=F("result",e[0].dataType,r.length,X);if(n){let Ie=M("bias",e[2].dataType,e[2].dims.length,X);J.push(Ie),le+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$?`vec4<${H}>`:H} {
          return bias[coords.${p?"w":"y"}${$?"/ 4":""}];
        }`}return`
        ${Vc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${U.registerUniforms(ee).declareVariables(...J,de)}
        ${le}
        ${Au(p,D,L,Q,n,t,q[0],q[1],q[2],H)}
        ${$?ka(k,w,H,void 0,!p,x):Ea(k,w,H,void 0,!p,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${$};${D};${L};${Q};${C};${O};${x}`,inputDependencies:se},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:K}),getShaderSource:A}}}),Ou,Fi,tr,Bu,Hi,Ru,Fc,Hc,fy=P(()=>{"use strict";Y(),nt(),te(),re(),Dt(),Xa(),Ou=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Fi=e=>typeof e=="number"?[e,e,e]:e,tr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Bu=(e,t,r,i=1)=>{let a=tr(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Hi=(e,t,r,i,a)=>{a==null&&(a=Bu(e,t[0],i[0]));let s=[0,0,0,r];for(let n=0;n<3;n++)e[n]+2*a>=t[n]&&(s[n]=Math.trunc((e[n]-t[n]+2*a)/i[n]+1));return s},Ru=(e,t,r,i,a,s,n,u,l,p)=>{let h,f,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Hi([t,r,i,1],[u,l,p],1,[a,s,n],e);f=y[0],g=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every(($,S,v)=>$===v[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Hi([t,r,i,1],[u,l,p],1,[a,s,n],e[0]);f=y[0],g=y[1],_=y[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/a),g=Math.ceil(r/s),_=Math.ceil(i/n);let y=(f-1)*a+u-t,$=(g-1)*s+l-r,S=(_-1)*n+p-i,v=Math.floor(y/2),w=y-v,k=Math.floor($/2),I=$-k,E=Math.floor(S/2),C=S-E;h={top:k,bottom:I,left:E,right:C,front:v,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:f,outHeight:g,outWidth:_}},Fc=(e,t,r,i,a,s=!1,n="channelsLast")=>{let u,l,p,h,f;if(n==="channelsLast")[u,l,p,h,f]=e;else if(n==="channelsFirst")[u,f,l,p,h]=e;else throw new Error(`Unknown dataFormat ${n}`);let[g,,_,y,$]=t,[S,v,w]=Fi(r),[k,I,E]=Fi(i),C=tr(_,k),O=tr(y,I),x=tr($,E),{padInfo:D,outDepth:L,outHeight:Q,outWidth:q}=Ru(a,l,p,h,S,v,w,C,O,x),K=s?g*f:g,se=[0,0,0,0,0];return n==="channelsFirst"?se=[u,K,L,Q,q]:n==="channelsLast"&&(se=[u,L,Q,q,K]),{batchSize:u,dataFormat:n,inDepth:l,inHeight:p,inWidth:h,inChannels:f,outDepth:L,outHeight:Q,outWidth:q,outChannels:K,padInfo:D,strideDepth:S,strideHeight:v,strideWidth:w,filterDepth:_,filterHeight:y,filterWidth:$,effectiveFilterDepth:C,effectiveFilterHeight:O,effectiveFilterWidth:x,dilationDepth:k,dilationHeight:I,dilationWidth:E,inShape:e,outShape:se,filterShape:t}},Hc=(e,t,r,i,a,s)=>{let n=s==="channelsLast",u=n?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],h={x:r.map((w,k)=>k)},f=[Math.ceil(Ou(h.x.map(w=>r[w]))/p[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let g=l?n&&u%4!==0?3:4:1,_=B.size(r),y=[{type:12,data:_},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Rt(t,y),y.push(...Z(e[0].dims,e[1].dims));let $=["rank","rank"],S=e.length===3;S&&(y.push(...Z(e[2].dims)),$.push("rank")),y.push(...Z(r));let v=w=>{let k=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Mt(t,k);let I=l?4:1,E=ke(e[0].dataType),C=M("x",e[0].dataType,e[0].dims.length,g===3?1:g),O=M("W",e[1].dataType,e[1].dims.length,I),x=[C,O],D=F("result",e[0].dataType,r.length,I),L="";if(S){let K=M("bias",e[2].dataType,e[2].dims.length,I);x.push(K),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${E}>`:E} {
          return bias[${n?j("coords",4,5):j("coords",1,5)}${l?"/ 4":""}];
        }`}let Q=ze(g,E),q=Bt(t,Q,E);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${w.registerUniforms(k).declareVariables(...x,D)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${D.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,C.rank)};
              let d2 = ${n?j("coords",C.rank-1,C.rank):j("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${n?j("coords",1,C.rank):j("coords",2,C.rank)},
              ${n?j("coords",2,C.rank):j("coords",3,C.rank)},
              ${n?j("coords",3,C.rank):j("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${n?j("uniforms.x_shape",1,C.rank):j("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${n?j("uniforms.x_shape",2,C.rank):j("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${n?j("uniforms.x_shape",3,C.rank):j("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${n?j("uniforms.x_shape",4,C.rank):j("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${n?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${n?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${n?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${n?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${n};${g};${S}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:y}),getShaderSource:v}}}),jc,Kc,my=P(()=>{"use strict";Y(),te(),re(),Dt(),jc=(e,t,r,i)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",n=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],h=p/t.group,f=l&&h>=4?$e(p):1,g=B.size(r)/f,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];Rt(t,_),_.push(...Z(n,[u[0],u[1],u[2],u[3]/f]));let y=a?["rank","rank","rank"]:["rank","rank"];_.push(...Z([r[0],r[1],r[2],r[3]/f]));let $=S=>{let v=F("output",e[0].dataType,r.length,f),w=ke(v.type.tensor),k=Bt(t,v.type.value,w),I=M("x",e[0].dataType,n.length),E=M("w",e[1].dataType,u.length,f),C=[I,E];a&&C.push(M("b",e[2].dataType,e[2].dims,f));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Mt(t,O);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(O).declareVariables(...C,v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${x}
    ${s}
    ${k}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:$}},Kc=(e,t,r,i)=>{let a=e.length>2,s=$e(r[3]),n=$e(r[2]),u=B.size(r)/s/n,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],h=[r[0],r[1],r[2],r[3]/s],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Rt(t,f),f.push(...Z(l,p,h));let g=(n-1)*t.strides[1]+p[1],_=y=>{let $=F("output",e[0].dataType,h.length,s),S=ke($.type.tensor),v=Bt(t,$.type.value,S),w=M("x",e[0].dataType,l.length,s),k=M("w",e[1].dataType,p.length,s),I=[w,k];a&&I.push(M("b",e[2].dataType,e[2].dims,s));let E=a?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Mt(t,C),`
  ${y.registerUniforms(C).declareVariables(...I,$)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${n}u;
    let col = (index1 % width1) * ${n}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${$.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${n}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${E}
      ${v}
      ${$.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${n};${g};${p[0]};${p[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:_}}}),Mu,Mr,Nu,Nr,za,ji,Du,Pu,Ca,gy=P(()=>{"use strict";te(),hy(),fy(),en(),my(),Dt(),Ja(),wt(),Mu=(e,t,r,i,a,s)=>{let n=e[0],u=e.slice(s?1:2,s?3:4),l=u.length,p=t[0],h=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),f=u.map((g,_)=>g+i[_]+i[_+l]).map((g,_)=>Math.floor((g-h[_]+a[_])/a[_]));return f.splice(0,0,n),f.splice(s?3:1,0,p),f},Mr=[2,3,1,0],Nu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Nr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();Fr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},za=e=>{let t=Qa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,n=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ji=(e,t,r,i)=>{let a=r.format==="NHWC",s=Mu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let C=[t[0]];if(a){let O=e.kernelCustomData.wT??e.compute(Ne(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),C.push(O)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Kc(C,r,s,i),{inputs:C}):e.compute(jc(C,r,s,i),{inputs:C});return}let n=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],p=t[0].dims[a?3:1],h=t[1].dims[2],f=t[1].dims[3],g=s[a?1:2],_=s[a?2:3],y=s[a?3:1],$=a&&h===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if($||h===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=s[0],O,x,D,L=[];if(a){let K=e.kernelCustomData.wT??e.compute(Ne(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=K),$){let se=u*l*p;O=t[0].reshape([1,C,se]),x=K.reshape([1,se,y]),D=[1,C,y]}else O=t[0].reshape([C,u*l,p]),x=K.reshape([1,p,y]),D=[C,g*_,y];L.push(O),L.push(x)}else O=t[0].reshape([C,p,u*l]),x=t[1].reshape([1,y,p]),D=[C,y,g*_],L.push(x),L.push(O);n&&L.push(t[2]);let Q=D[2],q=L[0].dims[L[0].dims.length-1];Q<8&&q<8?e.compute(Ya(L,r,s,D,a,i),{inputs:L}):e.compute(jr(L,r,s,D,a,i),{inputs:L});return}let S=!0,v=e.kernelCustomData.wT??e.compute(Ne(t[1],Mr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let w=[t[0],v];n&&w.push(t[2]);let k=a?g*_:y,I=a?y:g*_,E=h*f*p;e.compute(Gc(w,r,s,k,I,E,n,S,i),{inputs:w})},Du=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),n=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Nr({...t,pads:a,strides:s,dilations:n,kernelShape:u},i);ji(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Pu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Nr(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,n=Fc(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(Hc(t,a,n.outShape,[n.filterDepth,n.filterHeight,n.filterWidth],[n.padInfo.front,n.padInfo.top,n.padInfo.left],i))},Ca=(e,t)=>{if(Nu(e.inputs,t),e.inputs[0].dims.length===3)Du(e,t);else if(e.inputs[0].dims.length===5)Pu(e,e.inputs,t);else{let r=Nr(t,e.inputs);ji(e,e.inputs,r)}}}),Zc,yy=P(()=>{"use strict";Y(),nt(),te(),re(),Zc=(e,t,r)=>{let i=e.length>2,a=t.outputShape,s=t.format==="NHWC",n=t.group,u=e[1].dims,l=u[2]/n,p=u[3],h=s?$e(l):1,f=s&&p===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/h)*h,_=l-g,y=s?$e(p):1,$=s?p===1?h:y:1,S=B.size(a)/y,v=[Math.ceil(S/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let w=["rank","rank"],k=[t.strides[0],t.strides[1]],I=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],E=[t.dilations[0],t.dilations[1]],C=[I[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],O=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:S},{type:12,data:k},{type:12,data:I},{type:12,data:E},{type:12,data:C},{type:6,data:O},{type:12,data:g},{type:12,data:l},{type:12,data:p},...Z(e[0].dims,e[1].dims)];i&&(x.push(...Z(e[2].dims)),w.push("rank")),x.push(...Z(a));let D=L=>{let Q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:O.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],q=ke(e[0].dataType),K=s?1:2,se=s?2:3,A=s?3:1,U=M("W",e[1].dataType,e[1].dims.length,$),ee=M("Dy",e[0].dataType,e[0].dims.length,h),X=[ee,U];i&&X.push(M("bias",e[2].dataType,[a[A]].length,y));let H=F("result",e[0].dataType,a.length,y),le=()=>{let J="";if(f)h===4?J+=`
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${U.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?J+=`
          dotProd = dotProd + dot(vec4<${q}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${q}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(J+=`
          dotProd = dotProd + dot(vec4<${q}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${q}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}, ${U.getByOffset("w_offset + 2u")}, ${U.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(J+=`
                  let xValue = ${s?ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):ee.get("batch","inputChannel","idyR","idyC")};
        `,h===1)J+=`
          let w_offset = ${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${U.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let de=0;de<h;de++)J+=`
            let wValue${de} = ${U.getByOffset(`${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${de}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${de}] * wValue${de};`;return J},N=()=>{if(_===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let J="";if(h===1){J+="dotProd = dotProd";for(let de=0;de<_;de++)J+=`
            + ${ee.getByOffset(`x_offset + ${de}`)} * ${U.getByOffset(`w_offset + ${de}`)}`;J+=";"}else if(h===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);J+=`
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${U.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return J},V=`
            let outputIndices = ${H.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${H.indicesGet("outputIndices",0)};
            let d1 = ${H.indicesGet("outputIndices",A)};
            let r = ${H.indicesGet("outputIndices",K)};
            let c = ${H.indicesGet("outputIndices",se)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${H.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${q}(dyRCorner) + ${q}(wR)) / ${q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${q}(uniforms.Dy_shape[${K}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${q}(dyCCorner) + ${q}(wC)) / ${q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${q}(uniforms.Dy_shape[${se}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${U.indicesToOffset(`${U.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:h}) {
                  ${le()}
                  inputChannel = inputChannel + ${f?4:h};
                }
                ${N()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${y}]`:""};
            ${H.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(Q).declareVariables(...X,H)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${V}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${$}${y}${f}${_}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:D}}}),Uu,Wu,Lu,Ki,Qc,qu,Zi,Vu,Xc,_y=P(()=>{"use strict";yy(),Dt(),wt(),Uu=(e,t,r,i,a,s)=>(e-1)*t+r+(i-1)*a+1-s,Wu=(e,t,r,i,a)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[a]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[a]=s)},Lu=(e,t,r,i,a,s,n,u,l,p)=>{let h=e.length-2,f=p.length===0;l.length<h&&l.push(...Array(h-l.length).fill(0));let g=e[0],_=t[u?3:1]*a;for(let y=0,$=e.length-h-(u?1:0);y<h;++y,++$){let S=e[$],v=f?S*n[y]:p[y],w=Uu(S,n[y],s[y],t[$],r[y],v);Wu(w,i,s,y,y+h),f&&p.push(n[y]*(S-1)+l[y]+(t[$]-1)*r[y]+1-s[y]-s[y+h])}p.splice(0,0,g),p.splice(u?3:1,0,_)},Ki=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),n=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let p=e.strides.slice();if(p.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;p=new Array(f).fill(1)}Lu(u,r,l,e.autoPad,e.group,a,p,i,n,s);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:a,outputPadding:n,outputShape:s,dilations:l,strides:p}),h},Qc=e=>{let t=Qa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group,n=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),h=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,outputPadding:h,outputShape:f,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},qu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((n,u)=>n+u,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((n,u)=>n+u,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((n,u)=>n+u,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((n,u)=>n+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Zi=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Ne(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];t.length===3&&s.push(t[2]),e.compute(Zc(s,r,i),{inputs:s})},Vu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let n=t.strides;(n.length===0||n[0]===0)&&(n=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],n=[1].concat(n),s=[1].concat(s),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let p=Ki({...t,pads:u,strides:n,dilations:s,kernelShape:a,outputPadding:l},i);Zi(e,i,p,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Xc=(e,t)=>{if(qu(e.inputs,t),e.inputs[0].dims.length===3)Vu(e,t);else{let r=Ki(t,e.inputs);Zi(e,e.inputs,r)}}}),Gu,Yc,Jc,wy=P(()=>{"use strict";Y(),te(),ve(),re(),Gu=(e,t,r,i)=>{let a=B.size(t),s=t.length,n=M("input",e,s),u=F("output",e,s),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=B.normalizeAxis(l,s),h=f=>{let g=` i32(${n.indicesGet("inputIndices","uniforms.axis")}) `,_=j("uniforms.input_shape","uniforms.axis",s),y=i.reverse?g+(i.exclusive?" + 1":""):"0",$=i.reverse?_:g+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(n,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${n.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${n.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...Z(t,t)]}),getShaderSource:h}},Yc=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(Gu(i,r,a,t),{inputs:[0]})},Jc=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),Fu,Hu,ju,eh,th,by=P(()=>{"use strict";Y(),te(),ve(),re(),Fu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Hu=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)a.push(r.indicesSet("a",e[s],`i[${s}]`));return a.push("return a;}"),a.join(`
`)},ju=(e,t)=>{let r,i,a,s,n,u,l=t.format==="NHWC",p=t.blocksize,h=t.mode==="DCR";l?([r,i,a,s]=e.dims,n=h?[r,i,a,p,p,s/p**2]:[r,i,a,s/p**2,p,p],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],n=h?[r,p,p,s/p**2,i,a]:[r,s/p**2,p,p,i,a],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(n),g=f.dims.length,_=e.dataType,y=M("a",_,g),$=F("output",_,g),S=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,$)}

  ${Hu(u,g,y,$)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let w=l?[r,i*p,a*p,s/p**2]:[r,s/p**2,i*p,a*p],k=B.size(w),I=f.dims,E=B.sortBasedOnPerm(I,u);return{outputs:[{dims:w,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Z(I,E)]}},getShaderSource:S}},eh=(e,t)=>{Fu(e.inputs),e.compute(ju(e.inputs[0],t))},th=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Dr,rr,Qi,Ku,Zu,Qu,Xu,Xi,Yu,rh,ih,$y=P(()=>{"use strict";Y(),te(),ve(),re(),Dr="[a-zA-Z]|\\.\\.\\.",rr="("+Dr+")+",Qi="^"+rr+"$",Ku="("+rr+",)*"+rr,Zu="^"+Ku+"$",Qu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Xu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Zu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let n=e[s].dims.slice();if(!a.match(RegExp(Qi)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,n,s);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(rr)))throw new Error("Invalid RHS");i.match(RegExp(Dr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,s=!1,n=[],u=0;if(!e.match(RegExp(Qi))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Dr,"g")),p=new Qu(i);return l?.forEach((h,f)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=a-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(n=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==n.length||this.ellipsisDims.toString()!==n.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=n;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<n.length;_++){let y=String.fromCharCode(48+_);p.addSymbol(y,f+_),this.addSymbol(y,r[u++],i)}}else p.addSymbol(h,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],i)}),p}},Xi=e=>e+"_max",Yu=(e,t,r,i)=>{let a=e.map(p=>p.length).map((p,h)=>M(`input${h}`,t,p)),s=B.size(i),n=F("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let h=[],f="var prod = 1.0;",g="var sum = 0.0;",_="sum += prod;",y=[],$=[],S=[],v=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,E)=>{if(r.rhs.symbolToIndices.has(E)){let C=r.rhs.symbolToIndices.get(E)?.[0];C!==void 0&&r.lhs.forEach((O,x)=>{if(I.inputIndices.includes(x)){let D=O.symbolToIndices.get(E);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(L=>{h.push(`${a[x].indicesSet(`input${x}Indices`,L,n.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,O)=>{if(I.inputIndices.includes(O)){let x=C.symbolToIndices.get(E);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(D=>{y.push(`${a[O].indicesSet(`input${O}Indices`,D,`${E}`)}`)}),v.push(`prod *= ${a[O].getByIndices(`input${O}Indices`)};`)}}),$.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${Xi(E)}; ${E}++) {`),S.push("}")});let k=w?[...h,`let sum = ${a.map((I,E)=>I.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...h,g,...$,...y,f,...v,_,...S];return`
            ${p.registerUniforms(u.map(I=>({name:`${Xi(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,n)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${n.offsetToIndices("global_idx")};
            ${a.map((I,E)=>`var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${n.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:s});let h=e.map((f,g)=>[...Z(f)]).reduce((f,g)=>f.concat(g),p);return h.push(...Z(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:l}},rh=(e,t)=>{let r=new Xu(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((s,n)=>s.dims);e.compute(Yu(a,e.inputs[0].dataType,r,i))},ih=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),Ju,Yi,el,tl,ah,vy=P(()=>{"use strict";Y(),te(),re(),Ju=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Yi=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},el=(e,t)=>e.length>t.length?Yi(e,t):Yi(t,e),tl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=el(t,r),a=e[0].dataType,s=a===9||B.size(t)===1,n=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=s||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(B.size(i)/u),p=f=>{let g=M("input",a,t.length,n),_=F("output",a,i.length,u),y;if(a===9){let $=(S,v,w="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${w}(${g.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data",0,"u32")}
        ${$("data",1,"u32")}
        ${$("data",2,"u32")}
        ${$("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${n}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},h=[{type:12,data:l},...Z(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${n}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},ah=e=>{Ju(e.inputs),e.compute(tl(e.inputs),{inputs:[0]})}}),rl,nh,xy=P(()=>{"use strict";Y(),te(),re(),Za(),rl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),a=i%4===0,s=n=>{let u=M("x",t,[1],4),l=M("bias",t,[1],4),p=F("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${n.registerUniforms(h).declareVariables(u,l,p)}

    ${Ta(Ce(t))}

    ${n.mainStart(Vt)}
      ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Ia("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:n=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Vt/4)}})}},nh=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Tc(e):e.compute(rl(e.inputs))}}),il,al,sh,oh,Sy=P(()=>{"use strict";Y(),te(),ve(),re(),il=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},al=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=B.normalizeAxis(t.axis,a),n=r.slice(0);n.splice(s,1,...i);let u=r[s],l=e[0].dataType===9?4:1,p=Math.ceil(B.size(n)/l),h=[{type:12,data:p},{type:6,data:u},{type:12,data:s},...Z(e[0].dims,e[1].dims,n)],f=g=>{let _=M("data",e[0].dataType,e[0].dims.length,l),y=M("inputIndices",e[1].dataType,e[1].dims.length),$=F("output",e[0].dataType,n.length,l),S=w=>{let k=i.length,I=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let E=0;E<k;E++)I+=`${k>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${n.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;I+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${_.type.indices};
        `;for(let E=0,C=0;E<a;E++)E===s?(I+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,C+=k):(I+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${n.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return I},v;if(e[0].dataType===9){let w=(k,I,E="")=>`
          let outputIndices${I} = ${$.offsetToIndices(`outputOffset + ${I}u`)};
          ${S(I)};
          let offset${I} = ${_.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${k}[${I}] = ${E}(${_.getByOffset(`index${I}`)}[component${I}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${$.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,$)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},sh=e=>he({axis:e.axis}),oh=(e,t)=>{let r=e.inputs;il(r),e.compute(al(e.inputs,t))}}),nl,uh,lh,Ty=P(()=>{"use strict";Y(),te(),re(),nl=(e,t,r,i,a,s,n,u,l)=>{let p=[{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:n},{type:12,data:u},{type:12,data:l}],h=[s];p.push(...Z(t.dims,h));let f=g=>{let _=M("indices_data",t.dataType,t.dims.length),y=F("input_slice_offsets_data",12,1,1),$=[_,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(S).declareVariables(...$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},uh=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,s=r[1].dims,n=s[s.length-1],u=B.sizeToDimension(s,s.length-1),l=B.sizeFromDimension(i,t.batchDims+n),p=B.sizeToDimension(i,t.batchDims),h=B.sizeFromDimension(i,t.batchDims),f=u/p,g=new Array(n),_=l;for(let I=0;I<n;++I)g[n-1-I]=_,_*=i[t.batchDims+n-1-I];let y=nl(e,r[1],g,t.batchDims,i,u,f,h,n),$=t.batchDims+n;if($>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=s.slice(0,-1).concat(i.slice($)),v=B.size(S),w=[{type:12,data:v},{type:12,data:l},...Z(r[0].dims,y.dims,S)],k=I=>{let E=M("data",r[0].dataType,r[0].dims.length),C=M("slice_offsets",12,y.dims.length),O=F("output",r[0].dataType,S.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,O)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:w}),getShaderSource:k},{inputs:[r[0],y]})},lh=e=>({batchDims:e.batch_dims,cacheKey:""})}),sl,ol,dh,ph,Iy=P(()=>{"use strict";Y(),te(),ve(),re(),sl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],s=e[2],n=e.length===4?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===s.dims[l]:u===s.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(n){if(n.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(n.dims.length!==s.dims.length||!n.dims.map((u,l)=>u===s.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ol=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=B.normalizeAxis(t.gatherAxis,a),n=B.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(s,1,...i);let l=B.size(u),p=e[2].dataType,h=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:n},{type:12,data:s},{type:12,data:t.blockSize},...Z(...e.map((_,y)=>_.dims),u)],g=_=>{let y=M("data",e[0].dataType,e[0].dims.length),$=M("inputIndices",e[1].dataType,e[1].dims.length),S=M("scales",e[2].dataType,e[2].dims.length),v=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=F("output",p,u.length),k=[y,$,S];v&&k.push(v);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(I).declareVariables(...k,w)}
        ${_.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ce(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},dh=(e,t)=>{let r=e.inputs;sl(r,t),e.compute(ol(e.inputs,t))},ph=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),ul,ll,ch,hh,ky=P(()=>{"use strict";Y(),te(),ve(),re(),ul=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ll=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,s=e[1].dims,n=e[1].dataType,u=B.normalizeAxis(t.axis,a),l=r[u],p=s.slice(0),h=B.size(p),f=M("input",i,a),g=M("indicesInput",n,s.length),_=F("output",i,p.length),y=[{type:12,data:h},{type:6,data:l},{type:12,data:u}];return y.push(...Z(r,s,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},ch=e=>he({axis:e.axis}),hh=(e,t)=>{let r=e.inputs;ul(r),e.compute(ll(e.inputs,t))}}),dl,pl,fh,mh,Ey=P(()=>{"use strict";Y(),te(),re(),dl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},pl=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,s,n]=cp.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,s];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(s/l),h=Math.ceil(a/l),f=!0,g=B.size(u),_=[{type:12,data:f?p:g},{type:12,data:a},{type:12,data:s},{type:12,data:n},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...Z(e[2].dims)),y.push("rank")),_.push(...Z(u));let $=v=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",I=M("a",e[0].dataType,e[0].dims),E=M("b",e[1].dataType,e[1].dims),C=I.type.value,O=null,x=[I,E];e.length===3&&(O=M("c",e[2].dataType,e[2].dims.length),x.push(O));let D=F("output",e[0].dataType,u.length);x.push(D);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(L).declareVariables(...x)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${k}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${C}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=v=>{let w=M("a",e[0].dataType,e[0].dims),k=M("b",e[1].dataType,e[1].dims),I=null,E=[w,k];e.length===3&&(I=M("c",e[2].dataType,e[2].dims.length),E.push(I));let C=F("output",e[0].dataType,u.length);E.push(C);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",D="";t.transA&&t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(O).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*h},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:$}},fh=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},mh=(e,t)=>{dl(e.inputs),e.compute(pl(e.inputs,t))}}),Je,it,Tt,It,cl,hl,fl,ml,gl,yl,_l,wl,gh,yh,zy=P(()=>{"use strict";Y(),te(),ve(),re(),[Je,it,Tt,It]=[0,1,2,3],cl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},hl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,fl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,ml=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,gl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,yl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Je}] = batch;
     indices[${it}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Tt}] = u32(r);
            indices[${It}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Tt}] = u32(clamp(r, 0, H - 1));
          indices[${It}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Tt}] = gs_reflect(r, border[1], border[3]);
          indices[${It}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,_l=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Je}], indices[${it}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Je}], indices[${it}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Je}], indices[${it}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Je}], indices[${it}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Je}], indices[${it}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Je}], indices[${it}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,wl=(e,t)=>{let r=M("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=M("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Je,it,Tt,It]=[0,3,1,2]);let n=F("output",e[0].dataType,s.length),u=r.type.value,l=B.size(s),p=[{type:12,data:l},...Z(e[0].dims,i,s)],h=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,a,n)}
  ${hl}
  ${fl(u)}
  ${ml(t)}
  ${gl(t)}
  ${yl(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Tt}]);
      let W_in = i32(uniforms.x_shape[${It}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${n.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Je}], indices[${Tt}], indices[${It}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${_l(n,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=B.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:h}},gh=(e,t)=>{cl(e.inputs),e.compute(wl(e.inputs,t))},yh=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ae,bl,_h,Ji,$l,dr,wh,bh=P(()=>{"use strict";Y(),te(),ve(),Fa(),Ka(),re(),wt(),Ae=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,bl=(e,t)=>{let r=e[0],i=Ae(e,1),a=Ae(e,2),s=Ae(e,3),n=Ae(e,4),u=Ae(e,5),l=Ae(e,6),p=Ae(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=f,y=0,$=0,S=Math.floor(g/t.numHeads);if(l&&p&&B.size(l.dims)&&B.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==h||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],$=l.dims[2]}else if(l&&B.size(l.dims)||p&&B.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(s&&B.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+_,k=0;if(n&&B.size(n.dims)>0){k=8;let O=n.dims;throw O.length===1?O[0]===h?k=1:O[0]===3*h+2&&(k=3):O.length===2&&O[0]===h&&O[1]===w&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,E=g;if(a&&B.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(_!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=a.dims[2]}else{if(_!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=a.dims[1]*a.dims[3],I=!0}}let C=!1;if(n&&B.size(n.dims)>0)throw new Error("Key padding mask is not supported");if(u&&B.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:f,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:w,maxSequenceLength:$,inputHiddenSize:0,hiddenSize:g,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:C,passPastInKv:I,qkvFormat:v}},_h=e=>he({...e}),Ji=he({perm:[0,2,1,3]}),$l=(e,t,r,i,a,s,n)=>{let u=[i,a,s],l=B.size(u),p=[{type:12,data:l},{type:12,data:n},{type:12,data:s}],h=f=>{let g=F("qkv_with_bias",t.dataType,u),_=M("qkv",t.dataType,u),y=M("bias",r.dataType,u),$=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms($).declareVariables(_,y,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},dr=(e,t,r,i,a,s,n,u)=>{let l=s;if(n&&B.size(n.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=$l(e,s,n,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(Ne(l,Ji.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,i,r,a])),r===1||i===1?l:e.compute(Ne(l,Ji.perm),{inputs:[l],outputs:[-1]})[0]},wh=(e,t)=>{let r=bl(e.inputs,t),i=e.inputs[0],a=Ae(e.inputs,1),s=Ae(e.inputs,2),n=Ae(e.inputs,3),u=Ae(e.inputs,4),l=Ae(e.inputs,5),p=Ae(e.inputs,6),h=Ae(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let f=a&&s&&a.dims.length===4&&s.dims.length===4,g=dr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,n,0);if(f)return fr(e,g,a,s,u,void 0,p,h,l,r);if(!a||!s)throw new Error("key and value must be provided");let _=dr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,n,r.hiddenSize),y=dr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,n,2*r.hiddenSize);fr(e,g,_,y,u,void 0,p,h,l,r)}}),vl,xl,Sl,Tl,Aa,$h,vh,xh=P(()=>{"use strict";Y(),te(),ve(),re(),vl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},xl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},Sl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Tl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Aa=(e,t)=>{let r=e[0].dims,i=B.size(r),a=e[0].dataType,s=B.normalizeAxis(t.axis,r.length),n=new Array(t.numOutputs),u=M("input",a,r.length),l=new Array(t.numOutputs),p=[],h=[],f=0,g=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){f+=t.splitSizes[y],l[y]=f;let $=r.slice();$[s]=t.splitSizes[y],h.push($),n[y]=F(`output${y}`,a,$.length),p.push({dims:h[y],dataType:e[0].dataType})}g.push({type:12,data:l},...Z(r,...h));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...n)}
  ${Sl(l.length)}
  ${Tl(n)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},$h=(e,t)=>{vl(e.inputs);let r=e.inputs.length===1?t:xl(e.inputs,t);e.compute(Aa(e.inputs,r),{inputs:[0]})},vh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Il,Kr,Sh,Th=P(()=>{"use strict";Y(),te(),ve(),re(),Il=(e,t)=>{let[r,i,a,s]=e,{numHeads:n,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!B.areEqual(a.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&n===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],h=a.dims[0],f=B.sizeFromDimension(r.dims,1)/p,g=u===0?a.dims[1]*2:f/n;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(p>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Kr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:s}=t,n=e[0].dims[0],u=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,h=e[2].dims[1],f=a===0?h*2:p/i,g=new Array(n,l,p/f,f-h),_=B.computeStrides(g),y=[{type:1,data:s},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,p,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...Z(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],$=S=>{let v=M("input",e[0].dataType,e[0].dims.length),w=M("position_ids",e[1].dataType,e[1].dims.length),k=M("cos_cache",e[2].dataType,e[2].dims.length),I=M("sin_cache",e[3].dataType,e[3].dims.length),E=F("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables(v,w,k,I,E)}

        ${S.mainStart(Vt)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",F("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(g)/Vt)},programUniforms:y})}},Sh=(e,t)=>{Il(e.inputs,t),e.compute(Kr(e.inputs,t))}}),kl,El,ea,zl,Ih,Cy=P(()=>{"use strict";ve(),Y(),Ka(),bh(),xh(),wt(),Th(),re(),kl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,g=0,_=!i||i.dims.length===0,y=Math.floor(_?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);_&&(h=y*t.numHeads);let $=s&&s.dims.length!==0,S=n&&n.dims.length!==0;if($&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if($&&S){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(n.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=s.dims[2]}else if($||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let w=0,k=!1,I=t.kvNumHeads?y*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],k=!0}}let E=e.length>4?e[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:I,headSize:y,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:v}},El=he({perm:[0,2,1,3]}),ea=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Ne(i,El.perm),{inputs:[i],outputs:[-1]})[0]),i},zl=(e,t,r,i)=>{let a=7,s=["type","type"],n=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=h=>{let f=M("seq_lens",r.dataType,r.dims),g=M("total_seq_lens",i.dataType,i.dims),_=F("pos_ids",a,n),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(y).declareVariables(f,g,_)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Ih=(e,t)=>{let r=kl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,n=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[g,_,y]=!a&&!s?e.compute(Aa([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,s],$,S;if(t.doRotary){let I=e.compute(zl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],E=e.inputs[7],C=e.inputs[8],O=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[g,I,E,C],D=[-1];$=e.compute(Kr(x,O),{inputs:x,outputs:D})[0],x.splice(0,1,_);let L=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(Kr(x,L),{inputs:x,outputs:D})[0]}let v=dr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?$:g,void 0,0),w=ea(e,t.doRotary?S:_,r),k=ea(e,y,r);fr(e,v,w,k,void 0,void 0,n,u,void 0,r,l,p)}}),ta,Cl,Al,kh,Ay=P(()=>{"use strict";Y(),te(),wt(),re(),ta=(e,t,r,i,a,s,n,u)=>{let l=$e(s),p=l===1?"f32":`vec${l}f`,h=l===1?"vec2f":`mat2x${l}f`,f=a*n,g=64;f===1&&(g=256);let _=[a,n,s/l],y=[a,n,2],$=["rank","type","type"],S=[];S.push(...Z(_,y));let v=w=>{let k=M("x",t.dataType,3,l),I=M("scale",r.dataType,r.dims),E=M("bias",i.dataType,i.dims),C=F("output",1,3,2),O=[k,I,E,C];return`
  var<workgroup> workgroup_shared : array<${h}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...O)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${yt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${yt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:f},programUniforms:S}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},Cl=(e,t,r)=>{let i=t[0].dims,a=i,s=2,n=i[0],u=i[1],l=B.sizeFromDimension(i,s),p=$e(l),h=B.size(a)/p,f=ta(e,t[0],t[1],t[2],n,l,u,r.epsilon),g=[n,u,l/p],_=[n,u],y=["type","none"],$=S=>{let v=M("x",t[0].dataType,g.length,p),w=M("scale_shift",1,_.length,2),k=F("output",t[0].dataType,g.length,p),I=[v,w,k];return`
  ${S.registerUniform("output_size","u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...Z(g,_,g)]}),getShaderSource:$},{inputs:[t[0],f]})},Al=(e,t,r)=>{let i=t[0].dims,a=i,s=i[0],n=i[i.length-1],u=B.sizeFromDimension(i,1)/n,l=$e(n),p=B.size(a)/l,h=[{type:12,data:u},{type:12,data:Math.floor(n/l)}],f=["type","type"],g=!1,_=[0,i.length-1];for(let v=0;v<i.length-2;v++)g=g||i[v+1]!==1,_.push(v+1);g=g&&i[i.length-1]!==1;let y=g?e.compute(Ne(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,w)=>i[_[w]])),$=ta(e,y,t[1],t[2],s,u,n,r.epsilon),S=v=>{let w=ke(t[0].dataType),k=l===1?"vec2f":`mat${l}x2f`,I=O=>{let x=O===0?"x":"y",D=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${D}(scale.${x}))`;case 2:return`vec2<${w}>(${D}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${w}>(${D}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=M("input",t[0].dataType,t[0].dims,l),C=F("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:S},{inputs:[t[0],$]})},kh=(e,t)=>{t.format==="NHWC"?Al(e,e.inputs,t):Cl(e,e.inputs,t)}}),Ol,Bl,Eh,Oy=P(()=>{"use strict";Y(),te(),re(),Ol=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Bl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,s=e[1],n=!i&&e[2],u=a,l=B.normalizeAxis(t.axis,a.length),p=B.sizeToDimension(a,l),h=B.sizeFromDimension(a,l),f=B.size(s.dims),g=n?B.size(n.dims):0;if(f!==h||n&&g!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let _=[];for(let E=0;E<a.length;++E)E<l?_.push(a[E]):_.push(1);let y=$e(h),$=["type","type"],S=[{type:12,data:p},{type:1,data:h},{type:12,data:Math.floor(h/y)},{type:1,data:t.epsilon}];n&&$.push("type");let v=r>1,w=r>2,k=E=>{let C=ke(e[0].dataType),O=[M("x",e[0].dataType,e[0].dims,y),M("scale",s.dataType,s.dims,y)];n&&O.push(M("bias",n.dataType,n.dims,y)),O.push(F("output",e[0].dataType,u,y)),v&&O.push(F("mean_data_output",1,_)),w&&O.push(F("inv_std_output",1,_));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(x).declareVariables(...O)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${va("f32",y)};
    var mean_square_vector = ${va("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Lt(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${yt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${yt("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Lt(C,y,"x[j + offset]")};
      let f32scale = ${Lt(C,y,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${n?`+ ${Lt(C,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:u,dataType:e[0].dataType}];return v&&I.push({dims:_,dataType:1}),w&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:$},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:k}},Eh=(e,t)=>{Ol(e.inputs),e.compute(Bl(e.inputs,t,e.outputCount))}}),Rl,zh,By=P(()=>{"use strict";te(),Ja(),en(),Rl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},zh=e=>{Rl(e.inputs);let t=qt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Ya(e.inputs,{activation:""},t));else{let a=t[t.length-2],s=B.size(e.inputs[0].dims.slice(0,-2)),n=B.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&a===1&&n===1){let u=e.inputs[0].reshape([1,s,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,s,r],h=[u,l];e.compute(jr(h,{activation:""},t,p),{inputs:h})}else e.compute(jr(e.inputs,{activation:""},t))}}}),Ml,Nl,Dl,Ch,Ah,Ry=P(()=>{"use strict";Y(),te(),ve(),re(),Ml=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,n=e[1];if(!B.areEqual(n.dims,[t.n,a,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(B.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(B.size(l)!==p)throw new Error("zeroPoints input size error.")}},Nl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(p),_=$e(n),y=u.concat([a,n]),$=a>1&&n/_%2===0?2:1,S=B.size(y)/_/$,v=64,w=[],k=[l,a,s/f],I=B.convertShape(e[1].dims).slice();I.splice(-1,1,p/g),w.push(...Z(k)),w.push(...Z(I)),w.push(...Z(e[2].dims)),e.length===4&&w.push(...Z(B.convertShape(e[3].dims)));let E=[l,a,n/_];w.push(...Z(E));let C=O=>{let x=k.length,D=M("a",e[0].dataType,x,f),L=M("b",12,I.length,g),Q=M("scales",e[2].dataType,e[2].dims.length),q=[D,L,Q],K=e.length===4?M("zero_points",12,e[3].dims.length):void 0;K&&q.push(K);let se=E.length,A=F("output",e[0].dataType,se,_),U=ke(e[0].dataType),ee=(()=>{switch(f){case 1:return`array<${U}, 8>`;case 2:return`mat4x2<${U}>`;case 4:return`mat2x4<${U}>`;default:throw new Error(`${f}-component is not supported.`)}})(),X=()=>{let N=`
          // reuse a data
            var input_offset = ${D.indicesToOffset(`${D.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ee};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${D.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let V=0;V<_*$;V++)N+=`
            b_value = ${g===1?`b${V}_data`:`b${V}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ee}(${Array.from({length:4},(J,de)=>`${U}(b_value_lower[${de}]), ${U}(b_value_upper[${de}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ee}(${Array.from({length:8},(J,de)=>`(b_quantized_values[${de}] - ${K?`zero_point${V}`:"zero_point"}) * scale${V}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${K?`zero_point${V}`:"zero_point"}`).join(",")})) * scale${V};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(V/_)}]${_>1?`[${V%_}]`:""} += ${Array.from({length:8/f},(J,de)=>`${f===1?`a_data[${de}] * b_dequantized_values[${de}]`:`dot(a_data[${de}], b_dequantized_values[${de}])`}`).join(" + ")};
          `;return N},H=()=>{let N=`
            var col_index = col * ${_};
            ${K?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${U}(8);`}
            `;for(let V=0;V<_*$;V++)N+=`
            let scale${V} = ${Q.getByOffset("col_index * nBlocksPerCol + block")};
            ${K?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${U}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return N},le=()=>{let N=`col_index = col * ${_};`;for(let V=0;V<_*$;V++)N+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return N+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,N};return`
        var<workgroup> workgroup_shared: array<${A.type.value}, ${$*v}>;
        ${O.declareVariables(...q,A)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${A.offsetToIndices(`(global_idx / ${v}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${H()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${le()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${X()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${A.type.value} = ${A.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${A.setByIndices(`${A.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${_};${$};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:S},programUniforms:w}),getShaderSource:C}},Dl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(p),_=u.concat([a,n]),y=128,$=n%8===0?8:n%4===0?4:1,S=y/$,v=S*g*8,w=v/f,k=v/t.blockSize,I=B.size(_)/$,E=[],C=[l,a,s/f],O=B.convertShape(e[1].dims).slice();O.splice(-1,1,p/g),E.push(...Z(C)),E.push(...Z(O)),E.push(...Z(e[2].dims)),e.length===4&&E.push(...Z(B.convertShape(e[3].dims)));let x=[l,a,n];E.push(...Z(x));let D=L=>{let Q=C.length,q=M("a",e[0].dataType,Q,f),K=M("b",12,O.length,g),se=M("scales",e[2].dataType,e[2].dims.length),A=[q,K,se],U=e.length===4?M("zero_points",12,e[3].dims.length):void 0;U&&A.push(U);let ee=x.length,X=F("output",e[0].dataType,ee),H=ke(e[0].dataType),le=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${H}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${H}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${q.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${S}>, ${$}>;
        ${L.declareVariables(...A,X)}
        ${L.mainStart([S,$,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${q.getByIndices(`${q.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${q.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${U?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${U.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${H}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${H}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${K.getByIndices(`${K.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${le()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${H}>(${Array.from({length:4},(N,V)=>`${H}(b_value_lower[${V}]), ${H}(b_value_upper[${V}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${H}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(N,V)=>`${`dot(a_data${V}, b_dequantized_values[${V}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${S};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x:I},programUniforms:E}),getShaderSource:D}},Ch=(e,t)=>{Ml(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Dl(e.inputs,t)):e.compute(Nl(e.inputs,t))},Ah=e=>he(e)}),Pl,Ul,Wl,Ll,ql,Vl,Gl,Fl,Oh,My=P(()=>{"use strict";Y(),te(),re(),Pl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Ul=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Wl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Ll=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k = i32(${j("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ql=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k -= i32(${j("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Vl=(e,t,r)=>{switch(r.mode){case 0:return Ul(e,t,r.pads.length);case 1:return Wl(e,t,r.pads.length);case 2:return Ll(e,t,r.pads.length);case 3:return ql(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Gl=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=B.size(r),s=[{type:12,data:a},{type:6,data:t.pads}],n=e.length>=3&&e[2].data;t.mode===0&&s.push({type:n?e[2].dataType:1,data:t.value}),s.push(...Z(e[0].dims,r));let u=["rank"],l=p=>{let h=F("output",e[0].dataType,r.length),f=M("x",e[0].dataType,i.length),g=f.type.value,_=Vl(h,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:n?g:"f32"}),`
            ${p.registerUniforms(y).declareVariables(f,h)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${n}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:s}),getShaderSource:l}},Fl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)s[Number(u[l])]=Number(r[l]),s[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>s[Number(l)]=Number(u));let n=[];return s.forEach(u=>n.push(u)),{mode:t.mode,value:i,pads:n}}else return t},Oh=(e,t)=>{Pl(e.inputs);let r=Fl(e.inputs,t);e.compute(Gl(e.inputs,r),{inputs:[0]})}}),ir,ra,ia,aa,na,Hl,jl,sa,oa,Bh,Rh,ua,Mh,Nh,la,Dh,Ph,Uh,Wh,Ny=P(()=>{"use strict";We(),Y(),te(),re(),ir=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ra=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),u=t.strides.slice(),l=s?t.dilations.slice():[],p=t.pads.slice();Fr.adjustPoolAttributes(r,a,n,u,l,p);let h=Fr.computePoolOutputShape(r,a,u,l,n,p,t.autoPad),f=Object.assign({},t);s?Object.assign(f,{kernelShape:n,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:n,strides:u,pads:p,cacheKey:t.cacheKey});let g=h.slice();return g.push(g.splice(1,1)[0]),[f,i?g:h]},ia=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),a=B.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:a}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],f=!!(p+h);s.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:h}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],$=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];g=!!($+S),s.push({type:12,data:_},{type:12,data:y},{type:12,data:$},{type:12,data:S}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,n,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=B.computeStrides(t.kernelShape);s.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),n.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,h)=>p+h);return[s,n,!!l,!1,!1]}},aa=(e,t,r,i,a,s,n,u,l,p,h,f)=>{let g=a.format==="NHWC",_=t.type.value,y=F("output",t.type.tensor,i);if(a.kernelShape.length<=2){let $="",S="",v="",w=r-(g?2:1);if(h?$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,a.kernelShape.length===2){let k=r-(g?3:2);f?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${S}
              ${$}
              ${v}
              ${n}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let $=a.kernelShape.length,S=a.pads.length,v="";return p?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$-1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",$)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",$)};
                }
                offsets[${$-1}] = offset;

                isPad = false;
                for (var j = ${r-$}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-$}u`,$)}
                    + offsets[j - ${r-$}u] - ${j("uniforms.pads","j - 2u",S)};
                  ${v}
              }
              ${n}

              output[global_idx] = value;
            }`}},na=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Hl=e=>`${na(e)};${e.countIncludePad}`,jl=e=>`${na(e)};${e.storageOrder};${e.dilations}`,sa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),oa=(e,t,r,i)=>{let[a,s]=ra(t,i,r),n=M("x",t.dataType,t.dims.length),u=n.type.value,l="value += x_val;",p="";a.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,f,g,_,y]=ia(s,a);h.push(...Z(t.dims,s));let $=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(s)/64)},programUniforms:h}),getShaderSource:S=>aa(S,n,t.dims.length,s.length,a,l,p,0,f,g,_,y)}},Bh=e=>{let t=e.count_include_pad!==0,r=sa(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Hl(i)}},Rh=(e,t)=>{ir(e.inputs),e.compute(oa("AveragePool",e.inputs[0],!1,t))},ua={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Mh=e=>{let t=e.format;return{format:t,...ua,cacheKey:t}},Nh=(e,t)=>{ir(e.inputs),e.compute(oa("GlobalAveragePool",e.inputs[0],!0,t))},la=(e,t,r,i)=>{let[a,s]=ra(t,i,r),n=`
      value = max(x_val, value);
    `,u="",l=M("x",t.dataType,t.dims.length),p=["rank"],[h,f,g,_,y]=ia(s,a);return h.push(...Z(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(s)/64)},programUniforms:h}),getShaderSource:$=>aa($,l,t.dims.length,s.length,a,n,u,t.dataType===10?-65504:-1e5,f,g,_,y)}},Dh=(e,t)=>{ir(e.inputs),e.compute(la("MaxPool",e.inputs[0],!1,t))},Ph=e=>{let t=e.storage_order,r=e.dilations,i=sa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:jl(a)}},Uh=e=>{let t=e.format;return{format:t,...ua,cacheKey:t}},Wh=(e,t)=>{ir(e.inputs),e.compute(la("GlobalMaxPool",e.inputs[0],!0,t))}}),Kl,Zl,Lh,qh,Dy=P(()=>{"use strict";Y(),te(),ve(),re(),Kl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,s)=>s===t.axis||a===e[0].dims[s]).reduce((a,s)=>a&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Zl=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,s=e[0].dims,n=e[1].dataType,u=B.size(s),l=i===3||i===2,p=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(B.size(f.dims)/4)]:f.dims:void 0,_=h.length===0||h.length===1&&h[0]===1,y=_===!1&&h.length===1,$=$e(u),S=_&&(!l||$===4),v=S?$:1,w=S&&!l?$:1,k=M("input",l?12:i,p.length,w),I=M("scale",n,h.length),E=f?M("zero_point",l?12:i,g.length):void 0,C=F("output",n,s.length,v),O=[k,I];E&&O.push(E);let x=[p,h];f&&x.push(g);let D=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...Z(...x,s)],L=Q=>{let q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Q.registerUniforms(q).declareVariables(...O,C)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${I.getByOffset("0")}`:y?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?_?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:y?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:D})}},Lh=(e,t)=>{Kl(e.inputs,t),e.compute(Zl(e.inputs,t))},qh=e=>he({axis:e.axis,blockSize:e.blockSize})}),Ql,Xl,Vh,Py=P(()=>{"use strict";We(),Y(),re(),Ql=(e,t,r)=>{let i=e===t,a=e<t&&r<0,s=e>t&&r>0;if(i||a||s)throw new Error("Range these inputs' contents are invalid.")},Xl=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),s=[a],n=a,u=[{type:12,data:n},{type:i,data:e},{type:i,data:r},...Z(s)],l=p=>{let h=F("output",i,s.length),f=h.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${p.registerUniforms(g).declareVariables(h)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:u})}},Vh=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&Ql(t,r,i),e.compute(Xl(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Yl,Jl,Gh,Fh,Uy=P(()=>{"use strict";Y(),te(),ve(),re(),Yl=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Jl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,s=1,n=Math.ceil(B.sizeToDimension(i,i.length-1)/s),u=i[i.length-1],l=B.sizeFromDimension(r,u),p=[{type:12,data:n},{type:12,data:u},{type:12,data:l},...Z(e[1].dims,e[2].dims,a)],h=f=>{let g=M("indices",e[1].dataType,e[1].dims.length),_=M("updates",e[2].dataType,e[2].dims.length,s),y=t.reduction!=="none"&&t.reduction!==""?wp("output",e[0].dataType,a.length):F("output",e[0].dataType,a.length,s);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,y)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Yl(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:h}},Gh=e=>he({reduction:e.reduction}),Fh=(e,t)=>{e.compute(Jl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ed,td,rd,da,id,ad,nd,sd,od,ud,ld,dd,pa,pd,cd,hd,fd,md,Hh,jh,Wy=P(()=>{"use strict";Y(),te(),ve(),re(),ed=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},td=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,s)=>i[a]=e[s]),i},rd=(e,t,r,i,a,s)=>{let[n,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(n>0&&e.length>n&&e[n].dims.length>0)e[n].getFloat32Array().forEach(h=>s.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");ed(i,t),t.axes.length>0&&td(i,t.axes,p).forEach((h,f)=>i[f]=h)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},da=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,id=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${da("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${da("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ad=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",nd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,n)=>{i[s]=a[n],i[n+r]=a[t.length+n]}),i):a},sd=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>a.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,n)=>a[s]=r[n])}else r.forEach(s=>a.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((s,n)=>Math.round(s*t[n]))}return a},od=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>a[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),a.forEach((s,n)=>a[n]=Math.round(s*t[n]))),a},ud=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",i)};
        var roi_low = ${j("uniforms.roi","i",a)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ld=(e,t,r,i,a,s,n)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",s)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${n} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,dd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,pa=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",pd=(e,t,r,i,a)=>{let[s,n,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(row, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${pa(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${n}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[n]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[n]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},cd=(e,t,r,i,a,s,n,u,l,p)=>{let h=r.length===2,f=!0,[g,_]=h?[0,1]:f?[2,3]:[1,2],y=e.type.value,$=S=>{let v=S===g?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[S]},
        ${i[S]}, ${r[S]}, ${s[S]}, ${s[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${y} = originalIdx + ${y}(i);
          if (${v} < 0 || ${v} >= ${r[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${v} = max(0, min(${v}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${v})`)};
          data[i + 1] = ${S===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${$(g)};
    ${$(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${n} * onePlusAbsS - 5 * ${n}) * onePlusAbsS + 8 * ${n}) * onePlusAbsS - 4 * ${n};
    coeffs[1] = ((${n} + 2) * absS - (${n} + 3)) * absS * absS + 1;
    coeffs[2] = ((${n} + 2) * oneMinusAbsS - (${n} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${n} * twoMinusAbsS - 5 * ${n}) * twoMinusAbsS + 8 * ${n}) * twoMinusAbsS - 4 * ${n};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},hd=(e,t,r,i,a)=>{let[s,n,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(depth, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${pa(e,p,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${n}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[n]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[n]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},fd=(e,t,r,i,a,s)=>{let n=e.dims,u=nd(s,t.axes,n.length),l=sd(n,i,a,t.axes),p=i.slice();i.length===0&&(p=n.map((w,k)=>w===0?1:l[k]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=od(n,p,t)));let h=F("output",e.dataType,l.length),f=M("input",e.dataType,n.length),g=B.size(l),_=n.length===l.length&&n.every((w,k)=>w===l[k]),y=t.coordinateTransformMode==="tf_crop_and_resize",$=t.extrapolationValue,S=f.type.value,v=w=>`
      ${_?"":`
      ${id(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${dd(f,n)};
              ${ad(t.nearestMode,r,S)};
              ${ld(f,h,n,l,p.length,u.length,y)};
              `;case"linear":return`
              ${ud(h,n,l,p.length,u.length)};
              ${(()=>{if(n.length===2||n.length===4)return`${pd(f,h,n,y,$)}`;if(n.length===3||n.length===5)return`${hd(f,h,n,y,$)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(n.length===2||n.length===4)return`${cd(f,h,n,l,p,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(f,h)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${n.length===2||n.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?n.length:n}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Z(n,l)]})}},md=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Hh=(e,t)=>{let r=[],i=[],a=[],s=md(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");rd(e.inputs,t,s,r,i,a),e.compute(fd(e.inputs[0],t,s,r,i,a),{inputs:[0]})},jh=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,s=e.excludeOutside!==0,n=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:s,extrapolationValue:n,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),gd,yd,Kh,Ly=P(()=>{"use strict";Y(),te(),re(),gd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let n=e[3];if(n.dims.length!==1)throw new Error("Beta must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let n=e[4];if(n.dims.length!==1)throw new Error("Bias must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},yd=(e,t,r,i)=>{let a=t.simplified,s=e[0].dims,n=B.size(s),u=s,l=n,p=s.slice(-1)[0],h=i?s.slice(0,-1).concat(1):[],f=!a&&e.length>3,g=e.length>4,_=i&&r>1,y=i&&r>2,$=r>3,S=64,v=$e(p),w=[{type:12,data:l},{type:12,data:v},{type:12,data:p},{type:1,data:t.epsilon}],k=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[M("x",e[0].dataType,e[0].dims,v),M("skip",e[1].dataType,e[1].dims,v),M("gamma",e[2].dataType,e[2].dims,v)];f&&O.push(M("beta",e[3].dataType,e[3].dims,v)),g&&O.push(M("bias",e[4].dataType,e[4].dims,v)),O.push(F("output",e[0].dataType,u,v)),_&&O.push(F("mean_output",1,h)),y&&O.push(F("inv_std_output",1,h)),$&&O.push(F("input_skip_bias_sum",e[0].dataType,u,v));let x=ke(e[0].dataType),D=ke(1,v);return`

      ${E.registerUniforms(C).declareVariables(...O)}
      var<workgroup> sum_shared : array<${D}, ${S}>;
      var<workgroup> sum_squared_shared : array<${D}, ${S}>;

      ${E.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Lt(x,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${yt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${yt("square_sum",v)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:u,dataType:e[0].dataType}];return r>1&&I.push({dims:h,dataType:1}),r>2&&I.push({dims:h,dataType:1}),r>3&&I.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${y};${$}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:k,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},Kh=(e,t)=>{gd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(yd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),_d,ar,wd,ca,bd,$d,Zh,Qh,qy=P(()=>{"use strict";Y(),te(),ve(),re(),_d=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},ar=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},wd=(e,t)=>{if(e.length>1){let r=ar(e,1),i=ar(e,2),a=ar(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:a})}else return t},ca=(e,t,r,i,a)=>{let s=e;return e<0&&(s+=r[i[t]]),a[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},bd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",r.length)};
            let steps_i = ${j("uniforms.steps","i",r.length)};
            let signs_i = ${j("uniforms.signs","i",r.length)};
            let starts_i = ${j("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,$d=(e,t)=>{let r=e[0].dims,i=B.size(r),a=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=ar(e,4);s.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(a.length).fill(1));let n=t.starts.map((v,w)=>ca(v,w,r,a,s)),u=t.ends.map((v,w)=>ca(v,w,r,a,s));if(a.length!==n.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let v=0;v<r.length;++v)a.includes(v)||(n.splice(v,0,0),u.splice(v,0,r[v]),s.splice(v,0,1));let l=s.map(v=>Math.sign(v));s.forEach((v,w,k)=>{if(v<0){let I=(u[w]-n[w])/v,E=n[w],C=E+I*s[w];n[w]=C,u[w]=E,k[w]=-v}});let p=r.slice(0);a.forEach((v,w)=>{p[v]=Math.ceil((u[v]-n[v])/s[v])});let h={dims:p,dataType:e[0].dataType},f=F("output",e[0].dataType,p.length),g=M("input",e[0].dataType,e[0].dims.length),_=B.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:n.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],$=[{type:12,data:_},{type:12,data:n},{type:6,data:l},{type:12,data:s},...Z(e[0].dims,p)],S=v=>`
      ${v.registerUniforms(y).declareVariables(g,f)}
        ${bd(g,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${n.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:$})}},Zh=(e,t)=>{_d(e.inputs,t);let r=wd(e.inputs,t);e.compute($d(e.inputs,r),{inputs:[0]})},Qh=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),vd,xd,Xh,Yh,Vy=P(()=>{"use strict";Y(),te(),ve(),wt(),re(),vd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},xd=(e,t)=>{let r=e.inputs[0],i=r.dims,a=B.size(i),s=i.length,n=B.normalizeAxis(t.axis,s),u=n<i.length-1,l,p=[];u?(p=Array.from({length:s},(O,x)=>x),p[n]=s-1,p[s-1]=n,l=e.compute(Ne(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let h=l.dims,f=h[s-1],g=a/f,_=$e(f),y=f/_,$=64;g===1&&($=256);let S=(O,x)=>x===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:x===2?`max(${O}.x, ${O}.y)`:x===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,v=M("x",l.dataType,l.dims,_),w=F("result",l.dataType,l.dims,_),k=v.type.value,I=ke(l.dataType)==="f32"?`var threadMax = ${k}(-3.4028234663852886e+38f);`:`var threadMax = ${k}(-65504.0h);`,E=O=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables(v,w)}
      ${O.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${I}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${yt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${k}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${_};${$}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:y}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Ne(C,p),{inputs:[C]})},Xh=(e,t)=>{vd(e.inputs),xd(e,t)},Yh=e=>he({axis:e.axis})}),ha,Sd,Td,Id,Jh,Gy=P(()=>{"use strict";Y(),te(),re(),ha=e=>Array.from(e.getBigInt64Array(),Number),Sd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ha(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Td=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Id=(e,t)=>{let r=e[0].dims,i=t??ha(e[1]),a=Td(r,i),s=B.size(a),n=e[0].dataType,u=M("input",n,r.length),l=F("output",n,a.length),p=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,l)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...Z(e[0].dims,a)]}),getShaderSource:p}},Jh=e=>{Sd(e.inputs),e.compute(Id(e.inputs),{inputs:[0]})}}),kd,Ed,ef,Fy=P(()=>{"use strict";Y(),te(),re(),kd=(e,t,r,i,a)=>{let s=F("output_data",a,r.length,4),n=M("a_data",t[1].dataType,t[1].dims.length,4),u=M("b_data",t[2].dataType,t[2].dims.length,4),l=M("c_data",t[0].dataType,t[0].dims.length,4),p,h=(f,g,_)=>`select(${g}, ${f}, ${_})`;if(!i)p=s.setByOffset("global_idx",h(n.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,_,y="")=>{let $=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${s.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${n.broadcastedIndicesToOffset(`output_indices${_}`,s)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,s)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,s)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${y}(${h($,S,v)});
          `};a===9?p=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,n,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Ed=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,s=!(B.areEqual(t,r)&&B.areEqual(r,i)),n=t,u=B.size(t);if(s){let p=qt.calcShape(qt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");n=p,u=B.size(n)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>kd(p,e,n,s,a),getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Z(i,t,r,n)]})}},ef=e=>{e.compute(Ed(e.inputs))}}),tf,Hy=P(()=>{"use strict";sy(),Ka(),oy(),uy(),ly(),dy(),py(),gy(),_y(),wy(),by(),$y(),vy(),xy(),Sy(),Ty(),Iy(),ky(),Ey(),zy(),Cy(),Ay(),Oy(),By(),Ry(),bh(),My(),Ny(),Dy(),Py(),Uy(),ja(),Wy(),Th(),Ly(),qy(),Vy(),xh(),Gy(),wt(),Za(),Fy(),tf=new Map([["Abs",[Kp]],["Acos",[Zp]],["Acosh",[Qp]],["Add",[Cc]],["ArgMax",[Gp,Sa]],["ArgMin",[Vp,Sa]],["Asin",[Xp]],["Asinh",[Yp]],["Atan",[Jp]],["Atanh",[ec]],["Attention",[Fp]],["AveragePool",[Rh,Bh]],["BatchNormalization",[Hp]],["BiasAdd",[jp]],["BiasSplitGelu",[zc]],["Cast",[rc,tc]],["Ceil",[ac]],["Clip",[ic]],["Concat",[Wc,Lc]],["Conv",[Ca,za]],["ConvTranspose",[Xc,Qc]],["Cos",[nc]],["Cosh",[sc]],["CumSum",[Yc,Jc]],["DepthToSpace",[eh,th]],["DequantizeLinear",[Lh,qh]],["Div",[Ac]],["Einsum",[rh,ih]],["Elu",[oc,lr]],["Equal",[Oc]],["Erf",[uc]],["Exp",[lc]],["Expand",[ah]],["FastGelu",[nh]],["Floor",[dc]],["FusedConv",[Ca,za]],["Gather",[oh,sh]],["GatherElements",[hh,ch]],["GatherBlockQuantized",[dh,ph]],["GatherND",[uh,lh]],["Gelu",[pc]],["Gemm",[mh,fh]],["GlobalAveragePool",[Nh,Mh]],["GlobalMaxPool",[Wh,Uh]],["Greater",[Nc]],["GreaterOrEqual",[Pc]],["GridSample",[gh,yh]],["GroupQueryAttention",[Ih]],["HardSigmoid",[wc,_c]],["InstanceNormalization",[kh]],["LayerNormalization",[Eh]],["LeakyRelu",[cc,lr]],["Less",[Dc]],["LessOrEqual",[Uc]],["Log",[kc]],["MatMul",[zh]],["MatMulNBits",[Ch,Ah]],["MaxPool",[Dh,Ph]],["Mul",[Bc]],["MultiHeadAttention",[wh,_h]],["Neg",[fc]],["Not",[hc]],["Pad",[Oh]],["Pow",[Rc]],["QuickGelu",[Ec,lr]],["Range",[Vh]],["Reciprocal",[mc]],["ReduceMin",[Pp]],["ReduceMean",[Bp]],["ReduceMax",[Dp]],["ReduceSum",[Wp]],["ReduceProd",[Up]],["ReduceL1",[Rp]],["ReduceL2",[Mp]],["ReduceLogSum",[qp]],["ReduceLogSumExp",[Np]],["ReduceSumSquare",[Lp]],["Relu",[gc]],["Resize",[Hh,jh]],["RotaryEmbedding",[Sh]],["ScatterND",[Fh,Gh]],["Sigmoid",[yc]],["Sin",[bc]],["Sinh",[$c]],["Slice",[Zh,Qh]],["SkipLayerNormalization",[Kh]],["Split",[$h,vh]],["Sqrt",[vc]],["Softmax",[Xh,Yh]],["Sub",[Mc]],["Tan",[xc]],["Tanh",[Sc]],["ThresholdedRelu",[Ic,lr]],["Tile",[Jh]],["Transpose",[$p,vp]],["Where",[ef]]])}),rf,jy=P(()=>{"use strict";We(),nt(),re(),rf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){Ze(e.programInfo.name);let s=this.backend.device,n=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});a&&u.push({binding:u.length,resource:a});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}n.setPipeline(e.computePipeline),n.setBindGroup(0,l),n.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ue(e.programInfo.name)}dispose(){}build(e,t){Ze(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let a=bp(t,this.backend.device.limits),s=e.getShaderSource(a),n=`${i.join(`
`)}
${a.additionalImplementations}
${s}`,u=r.createShaderModule({code:n,label:e.name});ue("verbose",()=>`[WebGPU] ${e.name} shader code: ${n}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ue(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let s=t*r*i,n=Math.ceil(Math.sqrt(s));if(n>a){if(n=Math.ceil(Math.cbrt(s)),n>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[n,n,n]}else return[n,n,1]}}}),af={};Gt(af,{WebGpuBackend:()=>nf});var zd,Cd,Ad,nf,Ky=P(()=>{"use strict";We(),Y(),nt(),mp(),ay(),Hy(),jy(),zd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let s=e[i].dims.length;r.push(`${a};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${a};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Cd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${zd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Ad=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},nf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>t.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Ad(t.info||await t.requestAdapterInfo()),this.gpuDataManager=_p(this),this.programManager=new rf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Va(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ze(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],s=a.kernelId,n=this.kernels.get(s),u=n.kernelType,l=n.kernelName,p=a.programName,h=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],_=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let y=Number(g-this.queryTimeBase),$=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(S=>({dims:S.dims,dataType:at(S.dataType)})),outputsMetadata:f.map(S=>({dims:S.dims,dataType:at(S.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:p,startTime:y,endTime:$});else{let S="";h.forEach((w,k)=>{S+=`input[${k}]: [${w.dims}] | ${at(w.dataType)}, `});let v="";f.forEach((w,k)=>{v+=`output[${k}]: [${w.dims}] | ${at(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${p}" ${S}${v}start time: ${y} ns, execution time: ${$-y} ns`)}hr("GPU",`${p}::${g}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),Ue()}run(e,t,r,i,a,s){Ze(e.name);let n=[];for(let w=0;w<t.length;++w){let k=t[w].data;if(k===0)continue;let I=this.gpuDataManager.get(k);if(!I)throw new Error(`no GPU data for input: ${k}`);n.push(I)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),h=r.length===0?u.map((w,k)=>k):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let f=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(h[w])||h[w]<-3||h[w]>=s)throw new Error(`Invalid output index: ${h[w]}`);if(h[w]===-3)continue;let k=h[w]===-1,I=h[w]===-2,E=k||I?a(u[w].dataType,u[w].dims):i(h[w],u[w].dataType,u[w].dims);if(f.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(k&&this.temporaryData.push(C),I){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(C)}g.push(C)}if(n.length!==t.length||g.length!==f.length){if(g.length===0)return Ue(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let w=0,k=[];p.forEach(O=>{let x=typeof O.data=="number"?[O.data]:O.data;if(x.length===0)return;let D=O.type===10?2:4,L,Q;O.type===10?(Q=x.length>4?16:x.length>2?8:x.length*D,L=x.length>4?16:D*x.length):(Q=x.length<=2?x.length*D:16,L=16),w=Math.ceil(w/Q)*Q,k.push(w);let q=O.type===10?8:4;w+=x.length>4?Math.ceil(x.length/q)*L:x.length*D});let I=16;w=Math.ceil(w/I)*I;let E=new ArrayBuffer(w);p.forEach((O,x)=>{let D=k[x],L=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(E,D,L.length).set(L);else if(O.type===12)new Uint32Array(E,D,L.length).set(L);else if(O.type===10)new Uint16Array(E,D,L.length).set(L);else if(O.type===1)new Float32Array(E,D,L.length).set(L);else throw new Error(`Unsupported uniform type: ${at(O.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,w),this.gpuDataManager.release(C.id),_={offset:0,size:w,buffer:C.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),$=y[1]===1&&y[2]===1,S=Cd(e,t,$),v=this.programManager.getArtifact(S);if(v||(v=this.programManager.build(e,y),this.programManager.setArtifact(S,v),ue("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let w=0;w<p.length;w++){let k=p[w],I=k.type,E=typeof k.data=="number"?1:k.data.length,[C,O]=v.uniformVariablesInfo[w];if(I!==C||E!==O)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${O}, got type ${I} with size ${E} in program "${v.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(v,n,g,y,_),Ue(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=tf.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,s=i.kernelName,n=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),n(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${a}] ${s}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),n=this.gpuDataManager.registerExternalBuffer(r,i,s);return a.set(t,[n,r]),n}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await $a(this,e,t);return Ga(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),sf={};Gt(sf,{init:()=>of});var Pr,Od,of,Zy=P(()=>{"use strict";Y(),nt(),te(),iy(),Pr=class uf{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new uf(this.module,this.dataType,this.data,t)}},Od=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,s));let n=Number(e.getValue(i*a++,s));this.outputCount=Number(e.getValue(i*a++,s)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,s));let u=[];for(let l=0;l<n;l++){let p=Number(e.getValue(i*a++,s)),h=Number(e.getValue(i*a++,"*")),f=Number(e.getValue(i*a++,s)),g=[];for(let _=0;_<f;_++)g.push(Number(e.getValue(i*a++,s)));u.push(new Pr(e,p,h,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(n=>typeof n=="number"?this.inputs[n]:n)??this.inputs,i=t?.outputs??[],a=(n,u,l)=>new Pr(this.module,u,this.output(n,l),l),s=(n,u)=>{let l=At(n,u);if(!l)throw new Error(`Unsupported data type: ${n}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Pr(this.module,n,p,u)};return this.backend.run(e,r,i,a,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,a);for(let n=0;n<t.length;n++)this.module.setValue(s+i*(n+1),t[n],a);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},of=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(Ky(),cr(af)).WebGpuBackend,n=new s;await n.initialize(r,i),a("webgpu",[n,u=>n.alloc(Number(u)),u=>n.free(u),(u,l,p,h=!1)=>{if(h)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),n.memcpy(Number(u),Number(l));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));n.upload(Number(l),f)}},async(u,l,p)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await n.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>n.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>n.releaseKernel(u),(u,l,p,h)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let f=new Od(t,n,Number(l));return n.computeKernel(Number(u),f,h)},()=>n.captureBegin(),()=>n.captureEnd(),()=>n.replay()])}else{let s=new yp(r);a("webnn",[s,()=>s.reserveTensorId(),n=>s.releaseTensorId(n),async(n,u,l,p,h)=>s.ensureTensor(n,u,l,p,h),(n,u)=>{s.uploadTensor(n,u)},async(n,u)=>s.downloadTensor(n,u),(n,u)=>s.registerMLContext(n,u),!!r.trace])}}}),Bd,tn,rn,ht,Rd,fa,Zr,an,nn,ma,sn,on,un,lf=P(()=>{"use strict";We(),ey(),ty(),Y(),Nt(),Ua(),pp(),Bd=(e,t)=>{ye()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},tn=async e=>{Bd(e.wasm.numThreads,Gr(e.logLevel))},rn=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(Zy(),cr(sf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},ht=new Map,Rd=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&fe("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+i,s))]}finally{t.stackRestore(r)}},fa=(e,t)=>{let r=ye(),i=r.stackSave(),a=0;try{let s=r.PTR_SIZE,n=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,n,n+s)!==0&&fe("Can't get session input/output metadata.");let u=Number(r.getValue(n,"*"));a=Number(r.getValue(n+s,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let p=r.HEAPU32[a/4+1],h=[];for(let f=0;f<p;f++){let g=Number(r.getValue(a+8+f*s,"*"));h.push(g!==0?r.UTF8ToString(g):Number(r.getValue(a+8+(f+p)*s,"*")))}return[u,l,h]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Zr=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},an=async(e,t)=>{let r,i,a=ye();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Zr(e);let s=0,n=0,u=0,l=[],p=[],h=[];try{if([n,l]=await dp(t),t?.externalData&&a.mountExternalData){let I=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path;I.push(qa(typeof E=="string"?E:E.data).then(O=>{a.mountExternalData(C,O)}))}await Promise.all(I)}for(let I of t?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof I!="string"){let E=I,C=E?.context,O=E?.gpuDevice,x=E?.deviceType,D=E?.powerPreference;C?a.currentContext=C:O?a.currentContext=await a.webnnCreateMLContext(O):a.currentContext=await a.webnnCreateMLContext({deviceType:x,powerPreference:D})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(r,i,n),a.webgpuOnCreateSession?.(s),s===0&&fe("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[f,g]=Rd(s),_=!!t?.enableGraphCapture,y=[],$=[],S=[],v=[],w=[];for(let I=0;I<f;I++){let[E,C,O]=fa(s,I);E===0&&fe("Can't get an input name."),p.push(E);let x=a.UTF8ToString(E);y.push(x),S.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:at(C),shape:O})}for(let I=0;I<g;I++){let[E,C,O]=fa(s,I+f);E===0&&fe("Can't get an output name."),h.push(E);let x=a.UTF8ToString(E);$.push(x),v.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:at(C),shape:O});{if(_&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",L=a.webnnIsGraphOutput;if(D==="cpu"&&L&&L(s,x)){w.push("ml-tensor-cpu-output");continue}if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(_&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(D)}}let k=null;return w.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(s),u===0&&fe("Can't create IO binding."),k={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>wa(I))}),ht.set(s,[s,p,h,k,_,!1]),[s,y,$,S,v]}catch(f){throw p.forEach(g=>a._OrtFree(g)),h.forEach(g=>a._OrtFree(g)),u!==0&&a._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&fe("Can't release session."),f}finally{a._free(r),n!==0&&a._OrtReleaseSessionOptions(n)!==0&&fe("Can't release session options."),l.forEach(f=>a._free(f)),a.unmountExternalData?.()}},nn=e=>{let t=ye(),r=ht.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,s,n,u]=r;n&&(u&&t._OrtClearBoundOutputs(n.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(n.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&fe("Can't release session."),ht.delete(e)},ma=async(e,t,r,i,a,s,n=!1)=>{if(!e){t.push(0);return}let u=ye(),l=u.PTR_SIZE,p=e[0],h=e[1],f=e[3],g=f,_,y;if(p==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(n&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;y=At(Ct(p),h);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=w(i,s,v,y)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;y=At(Ct(p),h);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=w(i,v,Ct(p),h)}else{let v=e[2];if(Array.isArray(v)){y=l*v.length,_=u._malloc(y),r.push(_);for(let w=0;w<v.length;w++){if(typeof v[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(_+w*l,Ke(v[w],r),"*")}}else{let w=u.webnnIsGraphInput,k=u.webnnIsGraphOutput;if(p!=="string"&&w&&k){let I=u.UTF8ToString(a);if(w(i,I)||k(i,I)){let E=Ct(p);y=At(E,h),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,O=u.webnnUploadTensor;if(!C||!O)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await C(i,E,h);O(x,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),_=x}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}}let $=u.stackSave(),S=u.stackAlloc(4*h.length);try{h.forEach((w,k)=>u.setValue(S+k*l,w,l===4?"i32":"i64"));let v=u._OrtCreateTensor(Ct(p),_,y,S,h.length,wa(g));v===0&&fe(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push(v)}finally{u.stackRestore($)}},sn=async(e,t,r,i,a,s)=>{let n=ye(),u=n.PTR_SIZE,l=ht.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],h=l[1],f=l[2],g=l[3],_=l[4],y=l[5],$=t.length,S=i.length,v=0,w=[],k=[],I=[],E=[],C=[],O=n.stackSave(),x=n.stackAlloc($*u),D=n.stackAlloc($*u),L=n.stackAlloc(S*u),Q=n.stackAlloc(S*u);try{[v,w]=lp(s),mt("wasm prepareInputOutputTensor");for(let A=0;A<$;A++)await ma(r[A],k,E,e,h[t[A]],t[A],_);for(let A=0;A<S;A++)await ma(a[A],I,E,e,f[i[A]],$+i[A],_);gt("wasm prepareInputOutputTensor");for(let A=0;A<$;A++)n.setValue(x+A*u,k[A],"*"),n.setValue(D+A*u,h[t[A]],"*");for(let A=0;A<S;A++)n.setValue(L+A*u,I[A],"*"),n.setValue(Q+A*u,f[i[A]],"*");if(g&&!y){let{handle:A,outputPreferredLocations:U,outputPreferredLocationsEncoded:ee}=g;if(h.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${h.length}).`);mt("wasm bindInputsOutputs");for(let X=0;X<$;X++){let H=t[X];await n._OrtBindInput(A,h[H],k[X])!==0&&fe(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<S;X++){let H=i[X];a[X]?.[3]?(C.push(I[X]),n._OrtBindOutput(A,f[H],I[X],0)!==0&&fe(`Can't bind pre-allocated output[${X}] for session=${e}.`)):n._OrtBindOutput(A,f[H],0,ee[H])!==0&&fe(`Can't bind output[${X}] to ${U[X]} for session=${e}.`)}gt("wasm bindInputsOutputs"),ht.set(e,[p,h,f,g,_,!0])}n.jsepOnRunStart?.(p),n.webnnOnRunStart?.(p);let q;g?q=await n._OrtRunWithBinding(p,g.handle,S,L,v):q=await n._OrtRun(p,D,x,$,Q,S,L,v),q!==0&&fe("failed to call OrtRun().");let K=[],se=[];mt("wasm ProcessOutputTensor");for(let A=0;A<S;A++){let U=Number(n.getValue(L+A*u,"*"));if(U===I[A]||C.includes(I[A])){K.push(a[A]),U!==I[A]&&n._OrtReleaseTensor(U)!==0&&fe("Can't release tensor.");continue}let ee=n.stackSave(),X=n.stackAlloc(4*u),H=!1,le,N=0;try{n._OrtGetTensorData(U,X,X+u,X+2*u,X+3*u)!==0&&fe(`Can't access output tensor data on index ${A}.`);let V=u===4?"i32":"i64",J=Number(n.getValue(X,V));N=n.getValue(X+u,"*");let de=n.getValue(X+u*2,"*"),Ie=Number(n.getValue(X+u*3,V)),Be=[];for(let xe=0;xe<Ie;xe++)Be.push(Number(n.getValue(de+xe*u,V)));n._OrtFree(de)!==0&&fe("Can't free memory for tensor dims.");let Le=Be.reduce((xe,be)=>xe*be,1);le=at(J);let et=g?.outputPreferredLocations[i[A]];if(le==="string"){if(et==="gpu-buffer"||et==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let be=0;be<Le;be++){let Oe=n.getValue(N+be*u,"*"),bt=n.getValue(N+(be+1)*u,"*"),mr=be===Le-1?void 0:bt-Oe;xe.push(n.UTF8ToString(Oe,mr))}K.push([le,Be,xe,"cpu"])}else if(et==="gpu-buffer"&&Le>0){let xe=n.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=xe(N),Oe=At(J,Le);if(Oe===void 0||!Wa(le))throw new Error(`Unsupported data type: ${le}`);H=!0,K.push([le,Be,{gpuBuffer:be,download:n.jsepCreateDownloader(be,Oe,le),dispose:()=>{n._OrtReleaseTensor(U)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(et==="ml-tensor"&&Le>0){let xe=n.webnnEnsureTensor,be=n.webnnIsGraphInputOutputTypeSupported;if(!xe||!be)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(At(J,Le)===void 0||!La(le))throw new Error(`Unsupported data type: ${le}`);if(!be(e,le,!1))throw new Error(`preferredLocation "ml-tensor" for ${le} output is not supported by current WebNN Context.`);let Oe=await xe(e,N,J,Be,!1);H=!0,K.push([le,Be,{mlTensor:Oe,download:n.webnnCreateMLTensorDownloader(N,le),dispose:()=>{n.webnnReleaseTensorId(N),n._OrtReleaseTensor(U)}},"ml-tensor"])}else if(et==="ml-tensor-cpu-output"&&Le>0){let xe=n.webnnCreateMLTensorDownloader(N,le)(),be=K.length;H=!0,se.push((async()=>{let Oe=[be,await xe];return n.webnnReleaseTensorId(N),n._OrtReleaseTensor(U),Oe})()),K.push([le,Be,[],"cpu"])}else{let xe=Qr(le),be=new xe(Le);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(n.HEAPU8.subarray(N,N+be.byteLength)),K.push([le,Be,be,"cpu"])}}finally{n.stackRestore(ee),le==="string"&&N&&n._free(N),H||n._OrtReleaseTensor(U)}}g&&!_&&(n._OrtClearBoundOutputs(g.handle)!==0&&fe("Can't clear bound outputs."),ht.set(e,[p,h,f,g,_,!1]));for(let[A,U]of await Promise.all(se))K[A][2]=U;return gt("wasm ProcessOutputTensor"),K}finally{n.webnnOnRunEnd?.(p),n.stackRestore(O),k.forEach(q=>n._OrtReleaseTensor(q)),I.forEach(q=>n._OrtReleaseTensor(q)),E.forEach(q=>n._free(q)),v!==0&&n._OrtReleaseRunOptions(v),w.forEach(q=>n._free(q))}},on=e=>{let t=ye(),r=ht.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&fe("Can't get an profile file name."),t._OrtFree(a)},un=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),ft,Pe,Wt,nr,sr,Ur,ga,Wr,kt,Et,Md,df,pf,cf,hf,ff,mf,gf,yf=P(()=>{"use strict";We(),lf(),Nt(),Da(),ft=()=>!!ge.wasm.proxy&&typeof document<"u",Wt=!1,nr=!1,sr=!1,Wr=new Map,kt=(e,t)=>{let r=Wr.get(e);r?r.push(t):Wr.set(e,[t])},Et=()=>{if(Wt||!nr||sr||!Pe)throw new Error("worker not ready")},Md=e=>{switch(e.data.type){case"init-wasm":Wt=!1,e.data.err?(sr=!0,ga[1](e.data.err)):(nr=!0,ga[0]()),Ur&&(URL.revokeObjectURL(Ur),Ur=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Wr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},df=async()=>{if(!nr){if(Wt)throw new Error("multiple calls to 'initWasm()' detected.");if(sr)throw new Error("previous call to 'initWasm()' failed.");if(Wt=!0,ft())return new Promise((e,t)=>{Pe?.terminate(),op().then(([r,i])=>{try{Pe=i,Pe.onerror=s=>t(s),Pe.onmessage=Md,ga=[e,t];let a={type:"init-wasm",in:ge};!a.in.wasm.wasmPaths&&(r||_a)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Pe.postMessage(a),Ur=r}catch(a){t(a)}},t)});try{await Pa(ge.wasm),await tn(ge),nr=!0}catch(e){throw sr=!0,e}finally{Wt=!1}}},pf=async e=>{if(ft())return Et(),new Promise((t,r)=>{kt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ge}};Pe.postMessage(i)});await rn(ge,e)},cf=async e=>ft()?(Et(),new Promise((t,r)=>{kt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Pe.postMessage(i,[e.buffer])})):Zr(e),hf=async(e,t)=>{if(ft()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Et(),new Promise((r,i)=>{kt("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Pe.postMessage(a,s)})}else return an(e,t)},ff=async e=>{if(ft())return Et(),new Promise((t,r)=>{kt("release",[t,r]);let i={type:"release",in:e};Pe.postMessage(i)});nn(e)},mf=async(e,t,r,i,a,s)=>{if(ft()){if(r.some(n=>n[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(n=>n))throw new Error("pre-allocated output tensor is not supported for proxy.");return Et(),new Promise((n,u)=>{kt("run",[n,u]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:s}};Pe.postMessage(p,un(l))})}else return sn(e,t,r,i,a,s)},gf=async e=>{if(ft())return Et(),new Promise((t,r)=>{kt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Pe.postMessage(i)});on(e)}}),ya,Nd,_f,Qy=P(()=>{"use strict";We(),yf(),Y(),Na(),pp(),ya=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Nd=e=>{switch(e[3]){case"cpu":return new Te(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Wa(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Te.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!La(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Te.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},_f=class{async fetchModelAndCopyToWasmMemory(e){return cf(await qa(e))}async loadModel(e,t){Ze();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await hf(r,t),Ue()}async dispose(){return ff(this.sessionId)}async run(e,t,r){Ze();let i=[],a=[];Object.entries(e).forEach(f=>{let g=f[0],_=f[1],y=this.inputNames.indexOf(g);if(y===-1)throw new Error(`invalid input '${g}'`);i.push(_),a.push(y)});let s=[],n=[];Object.entries(t).forEach(f=>{let g=f[0],_=f[1],y=this.outputNames.indexOf(g);if(y===-1)throw new Error(`invalid output '${g}'`);s.push(_),n.push(y)});let u=i.map((f,g)=>ya(f,()=>`input "${this.inputNames[a[g]]}"`)),l=s.map((f,g)=>f?ya(f,()=>`output "${this.outputNames[n[g]]}"`):null),p=await mf(this.sessionId,a,u,n,l,r),h={};for(let f=0;f<p.length;f++)h[this.outputNames[n[f]]]=s[f]??Nd(p[f]);return Ue(),h}startProfiling(){}endProfiling(){gf(this.sessionId)}}}),wf={};Gt(wf,{OnnxruntimeWebAssemblyBackend:()=>Ba,initializeFlags:()=>Oa,wasmBackend:()=>bf});var Oa,Ba,bf,Xy=P(()=>{"use strict";We(),yf(),Qy(),Oa=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?Dg("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ba=class{async init(e){Oa(),await df(),await pf(e)}async createInferenceSessionHandler(e,t){let r=new _f;return await r.loadModel(e,t),r}},bf=new Ba});We();We();We();var Yy="1.24.1",Jy=tp;{let e=(Xy(),cr(wf)).wasmBackend;Ot("webgpu",e,5),Ot("webnn",e,5),Ot("cpu",e,10),Ot("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:Yy,enumerable:!0});var Xr=class{constructor(t){this.options=t;let r=ge?ln:globalThis.ort;r&&t.wasmPaths&&(r.env.wasm.wasmPaths=t.wasmPaths),this.melContextBuffer=new Float32Array(this.MEL_CONTEXT).fill(0)}melSession=null;embeddingSession=null;vadSession=null;customSessions=new Map;embeddingWindowSizes=new Map;melBuffer=[];embeddingBuffers=[];predictionBuffers=new Map;vadBuffer=[];rawAudioRemainder=new Float32Array(0);melContextBuffer;noiseSeededEmbeddings=[];CHUNK_SIZE=1280;MEL_CONTEXT=480;SAMPLE_RATE=16e3;MEL_BINS=32;FRAMES_PER_CHUNK=8;MEL_WINDOW_SIZE=76;EMBEDDING_WINDOW_SIZE=24;MAX_MEL_FRAMES=970;INITIAL_FRAMES_SUPPRESS=5;PREDICTION_BUFFER_MAX=30;GLOBAL_MAX_EMBEDDING_WINDOW=50;vadStateH=new Float32Array(128).fill(0);vadStateC=new Float32Array(128).fill(0);isLoaded=!1;async init(){try{this.melSession=await _t.create(this.options.melspectrogramModelPath),this.embeddingSession=await _t.create(this.options.embeddingModelPath),this.options.vadModelPath&&this.options.vadThreshold&&this.options.vadThreshold>0&&(this.vadSession=await _t.create(this.options.vadModelPath)),this.melBuffer=Array(this.MEL_WINDOW_SIZE).fill(0).map(()=>new Float32Array(this.MEL_BINS).fill(1));let t=new Float32Array(this.SAMPLE_RATE*4);for(let a=0;a<t.length;a++)t[a]=Math.random()*2e3-1e3;let r=new Float32Array(this.MEL_CONTEXT).fill(0),i=[];for(let a=0;a<=t.length-this.CHUNK_SIZE;a+=this.CHUNK_SIZE){let s=t.subarray(a,a+this.CHUNK_SIZE),n=new Float32Array(this.CHUNK_SIZE+this.MEL_CONTEXT);n.set(r),n.set(s,this.MEL_CONTEXT),r.set(s.subarray(this.CHUNK_SIZE-this.MEL_CONTEXT));let u=await this.runMelSpectrogram(n);for(let p=0;p<this.FRAMES_PER_CHUNK;p++){let h=new Float32Array(this.MEL_BINS);for(let f=0;f<this.MEL_BINS;f++){let g=p*this.MEL_BINS+f;h[f]=u[g]/10+2}this.melBuffer.push(h)}for(;this.melBuffer.length>this.MAX_MEL_FRAMES;)this.melBuffer.shift();let l=await this.runEmbeddingModel();i.push(l)}this.noiseSeededEmbeddings=i.slice(-this.GLOBAL_MAX_EMBEDDING_WINDOW).map(a=>new Float32Array(a)),this.embeddingBuffers=this.noiseSeededEmbeddings.map(a=>new Float32Array(a));for(let a of this.options.wakewordModels){let s=await _t.create(a),n=this.extractModelName(a);this.customSessions.set(n,s);let u=s.inputNames[0],l=24;try{let p=new Te("float32",new Float32Array(2304),[1,24,96]);await s.run({[u]:p})}catch(p){let h=p.toString(),f=h.match(/Got: \d+ Expected: (\d+)/);f?(l=parseInt(f[1],10),console.log(`Model [${n}] dimension auto-corrected from 24 to ${l} via runtime inspection`)):h.includes("Expected")&&console.warn(`Model [${n}] dummy run failed, but couldn't parse exact dimension. Error: ${h}`)}console.log(`Model [${n}] initialized with dynamic window size: ${l}`),this.embeddingWindowSizes.set(n,l),this.predictionBuffers.set(n,[])}this.isLoaded=!0,console.log("OpenWakeWord models loaded with dynamic dimensionality support")}catch(t){throw console.error("Failed to initialize OpenWakeWord models:",t),t}}async predict(t){if(!this.isLoaded)throw new Error("Model not initialized");let r;if(t instanceof Int16Array){r=new Float32Array(t.length);for(let n=0;n<t.length;n++)r[n]=t[n]}else{let n=0;for(let u=0;u<Math.min(t.length,1e3);u++){let l=Math.abs(t[u]);l>n&&(n=l)}if(n<=1){r=new Float32Array(t.length);for(let u=0;u<t.length;u++)r[u]=t[u]*32768}else r=t}let i=new Float32Array(this.rawAudioRemainder.length+r.length);i.set(this.rawAudioRemainder),i.set(r,this.rawAudioRemainder.length);let a={};for(let n of this.customSessions.keys())a[n]=0;let s=0;for(;s+this.CHUNK_SIZE<=i.length;){let n=i.subarray(s,s+this.CHUNK_SIZE);s+=this.CHUNK_SIZE;let u=new Float32Array(this.CHUNK_SIZE+this.MEL_CONTEXT);if(u.set(this.melContextBuffer),u.set(n,this.MEL_CONTEXT),this.melContextBuffer.set(n.subarray(this.CHUNK_SIZE-this.MEL_CONTEXT)),this.vadSession&&this.options.vadThreshold){let h=await this.runVAD(n);for(this.vadBuffer.push(h);this.vadBuffer.length>30;)this.vadBuffer.shift()}let l=await this.runMelSpectrogram(u);for(let h=0;h<this.FRAMES_PER_CHUNK;h++){let f=new Float32Array(this.MEL_BINS);for(let g=0;g<this.MEL_BINS;g++){let _=h*this.MEL_BINS+g;f[g]=l[_]/10+2}this.melBuffer.push(f)}for(;this.melBuffer.length>this.MAX_MEL_FRAMES;)this.melBuffer.shift();let p=await this.runEmbeddingModel();for(this.embeddingBuffers.push(p);this.embeddingBuffers.length>this.GLOBAL_MAX_EMBEDDING_WINDOW;)this.embeddingBuffers.shift();for(let[h,f]of this.customSessions.entries()){let g=this.embeddingWindowSizes.get(h)||24,_=await this.runClassifier(h,f,g);if(this.vadSession&&this.options.vadThreshold){let $=this.vadBuffer.slice(-7,-4);($.length>0?Math.max(...$):0)<this.options.vadThreshold&&(_=0)}let y=this.predictionBuffers.get(h);for(y.push(_);y.length>this.PREDICTION_BUFFER_MAX;)y.shift();if(y.length<this.INITIAL_FRAMES_SUPPRESS)_=0;else if(this.options.patience?.[h]||this.options.debounceTime&&this.options.debounceTime>0){let $=this.options.thresholds?.[h]??.5;if(this.options.patience?.[h]){let S=this.options.patience[h];y.slice(-S).filter(k=>k>=$).length<S&&(_=0)}else if(this.options.debounceTime){let S=Math.ceil(this.options.debounceTime/.08),w=y.slice(-S-1,-1).some(k=>k>=$);_>=$&&w&&(_=0)}}a[h]=Math.max(a[h],_)}}return this.rawAudioRemainder=i.slice(s),a}async runMelSpectrogram(t){let r=new Te("float32",t,[1,t.length]);return(await this.melSession.run({[this.melSession.inputNames[0]]:r}))[this.melSession.outputNames[0]].data}async runEmbeddingModel(){let t=new Float32Array(this.MEL_WINDOW_SIZE*this.MEL_BINS),r=this.melBuffer.length-this.MEL_WINDOW_SIZE;for(let u=0;u<this.MEL_WINDOW_SIZE;u++)t.set(this.melBuffer[r+u],u*this.MEL_BINS);let i=new Te("float32",t,[1,this.MEL_WINDOW_SIZE,this.MEL_BINS,1]),s=(await this.embeddingSession.run({[this.embeddingSession.inputNames[0]]:i}))[this.embeddingSession.outputNames[0]].data,n=new Float32Array(96);for(let u=0;u<96;u++){let l=s[u]??0;(isNaN(l)||!isFinite(l))&&(l=0),n[u]=l}return n}async runClassifier(t,r,i){let a=new Float32Array(i*96),s=this.embeddingBuffers.length-i;for(let l=0;l<i;l++)a.set(this.embeddingBuffers[s+l],l*96);let n=new Te("float32",a,[1,i,96]);return(await r.run({[r.inputNames[0]]:n}))[r.outputNames[0]].data[0]}async runVAD(t){let r=new Float32Array(t.length);for(let p=0;p<t.length;p++)r[p]=t[p]/32768;let i=new Te("int64",BigInt64Array.from([BigInt(this.SAMPLE_RATE)]),[1]),a=new Te("float32",this.vadStateH,[2,1,64]),s=new Te("float32",this.vadStateC,[2,1,64]),n=new Te("float32",r,[1,t.length]),u={[this.vadSession.inputNames[0]]:n,[this.vadSession.inputNames[1]]:i,[this.vadSession.inputNames[2]]:a,[this.vadSession.inputNames[3]]:s},l=await this.vadSession.run(u);return this.vadStateH=l[this.vadSession.outputNames[1]].data,this.vadStateC=l[this.vadSession.outputNames[2]].data,l[this.vadSession.outputNames[0]].data[0]}extractModelName(t){return(t.split("/").pop()||t).replace(".onnx","").replace(".tflite","").replace(/\\/g,"/")}reset(){this.melBuffer=Array(this.MEL_WINDOW_SIZE).fill(0).map(()=>new Float32Array(this.MEL_BINS).fill(1)),this.rawAudioRemainder=new Float32Array(0),this.melContextBuffer.fill(0),this.vadBuffer=[],this.vadStateH.fill(0),this.vadStateC.fill(0),this.embeddingBuffers=this.noiseSeededEmbeddings.map(t=>new Float32Array(t));for(let t of this.customSessions.keys())this.predictionBuffers.set(t,[])}};var Ft=null;self.onmessage=async e=>{let{type:t,data:r}=e.data;if(t==="init")try{Ft=new Xr(r.options),await Ft.init(),self.postMessage({type:"init-complete"})}catch(i){self.postMessage({type:"error",message:i.message})}else if(t==="predict"){if(!Ft)return;try{let i=await Ft.predict(r.audio);self.postMessage({type:"results",results:i})}catch(i){self.postMessage({type:"error",message:i.message})}}else t==="reset"&&Ft&&Ft.reset()};
/*! Bundled license information:

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.24.1
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
