(()=>{var e={};e.id=83,e.ids=[83],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25525:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>c,routeModule:()=>f,tree:()=>u}),n(60645),n(28841),n(96560);var r=n(23191),i=n(88716),o=n(37922),a=n.n(o),l=n(95231),s={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(s[e]=()=>l[e]);n.d(t,s);let u=["",{children:["articles",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,60645)),"/Users/adrianstefan/tabledadrian/app/articles/[slug]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,28841)),"/Users/adrianstefan/tabledadrian/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(n.bind(n,96560)),"/Users/adrianstefan/tabledadrian/app/not-found.tsx"]}],c=["/Users/adrianstefan/tabledadrian/app/articles/[slug]/page.tsx"],d="/articles/[slug]/page",p={require:n,loadChunk:()=>Promise.resolve()},f=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/articles/[slug]/page",pathname:"/articles/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},99571:(e,t,n)=>{Promise.resolve().then(n.bind(n,20513))},20513:(e,t,n)=>{"use strict";n.d(t,{ArticleDetail:()=>nH});var r={};n.r(r),n.d(r,{boolean:()=>w,booleanish:()=>S,commaOrSpaceSeparated:()=>P,commaSeparated:()=>T,number:()=>E,overloadedBoolean:()=>A,spaceSeparated:()=>C});var i={};n.r(i),n.d(i,{attentionMarkers:()=>tM,contentInitial:()=>tT,disable:()=>tN,document:()=>tC,flow:()=>tD,flowInitial:()=>tP,insideSpan:()=>tL,string:()=>tI,text:()=>tq});var o=n(10326),a=n(17577),l=n(30058),s=n(48998),u=n(79635),c=n(46226);let d=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,p=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,f={};function h(e,t){return((t||f).jsx?p:d).test(e)}let m=/[ \t\n\f\r]/g;function g(e){return""===e.replace(m,"")}class y{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}}function b(e,t){let n={},r={};for(let t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new y(n,r,t)}function v(e){return e.toLowerCase()}y.prototype.normal={},y.prototype.property={},y.prototype.space=void 0;class x{constructor(e,t){this.attribute=t,this.property=e}}x.prototype.attribute="",x.prototype.booleanish=!1,x.prototype.boolean=!1,x.prototype.commaOrSpaceSeparated=!1,x.prototype.commaSeparated=!1,x.prototype.defined=!1,x.prototype.mustUseProperty=!1,x.prototype.number=!1,x.prototype.overloadedBoolean=!1,x.prototype.property="",x.prototype.spaceSeparated=!1,x.prototype.space=void 0;let k=0,w=D(),S=D(),A=D(),E=D(),C=D(),T=D(),P=D();function D(){return 2**++k}let I=Object.keys(r);class q extends x{constructor(e,t,n,i){let o=-1;if(super(e,t),function(e,t,n){n&&(e[t]=n)}(this,"space",i),"number"==typeof n)for(;++o<I.length;){let e=I[o];(function(e,t,n){n&&(e[t]=n)})(this,I[o],(n&r[e])===r[e])}}}function L(e){let t={},n={};for(let[r,i]of Object.entries(e.properties)){let o=new q(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),t[r]=o,n[v(r)]=r,n[v(o.attribute)]=r}return new y(t,n,e.space)}q.prototype.defined=!0;let M=L({properties:{ariaActiveDescendant:null,ariaAtomic:S,ariaAutoComplete:null,ariaBusy:S,ariaChecked:S,ariaColCount:E,ariaColIndex:E,ariaColSpan:E,ariaControls:C,ariaCurrent:null,ariaDescribedBy:C,ariaDetails:null,ariaDisabled:S,ariaDropEffect:C,ariaErrorMessage:null,ariaExpanded:S,ariaFlowTo:C,ariaGrabbed:S,ariaHasPopup:null,ariaHidden:S,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:C,ariaLevel:E,ariaLive:null,ariaModal:S,ariaMultiLine:S,ariaMultiSelectable:S,ariaOrientation:null,ariaOwns:C,ariaPlaceholder:null,ariaPosInSet:E,ariaPressed:S,ariaReadOnly:S,ariaRelevant:null,ariaRequired:S,ariaRoleDescription:C,ariaRowCount:E,ariaRowIndex:E,ariaRowSpan:E,ariaSelected:S,ariaSetSize:E,ariaSort:null,ariaValueMax:E,ariaValueMin:E,ariaValueNow:E,ariaValueText:null,role:null},transform:(e,t)=>"role"===t?t:"aria-"+t.slice(4).toLowerCase()});function N(e,t){return t in e?e[t]:t}function R(e,t){return N(e,t.toLowerCase())}let O=L({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:T,acceptCharset:C,accessKey:C,action:null,allow:null,allowFullScreen:w,allowPaymentRequest:w,allowUserMedia:w,alt:null,as:null,async:w,autoCapitalize:null,autoComplete:C,autoFocus:w,autoPlay:w,blocking:C,capture:null,charSet:null,checked:w,cite:null,className:C,cols:E,colSpan:null,content:null,contentEditable:S,controls:w,controlsList:C,coords:E|T,crossOrigin:null,data:null,dateTime:null,decoding:null,default:w,defer:w,dir:null,dirName:null,disabled:w,download:A,draggable:S,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:w,formTarget:null,headers:C,height:E,hidden:A,high:E,href:null,hrefLang:null,htmlFor:C,httpEquiv:C,id:null,imageSizes:null,imageSrcSet:null,inert:w,inputMode:null,integrity:null,is:null,isMap:w,itemId:null,itemProp:C,itemRef:C,itemScope:w,itemType:C,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:w,low:E,manifest:null,max:null,maxLength:E,media:null,method:null,min:null,minLength:E,multiple:w,muted:w,name:null,nonce:null,noModule:w,noValidate:w,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:w,optimum:E,pattern:null,ping:C,placeholder:null,playsInline:w,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:w,referrerPolicy:null,rel:C,required:w,reversed:w,rows:E,rowSpan:E,sandbox:C,scope:null,scoped:w,seamless:w,selected:w,shadowRootClonable:w,shadowRootDelegatesFocus:w,shadowRootMode:null,shape:null,size:E,sizes:null,slot:null,span:E,spellCheck:S,src:null,srcDoc:null,srcLang:null,srcSet:null,start:E,step:null,style:null,tabIndex:E,target:null,title:null,translate:null,type:null,typeMustMatch:w,useMap:null,value:S,width:E,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:C,axis:null,background:null,bgColor:null,border:E,borderColor:null,bottomMargin:E,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:w,declare:w,event:null,face:null,frame:null,frameBorder:null,hSpace:E,leftMargin:E,link:null,longDesc:null,lowSrc:null,marginHeight:E,marginWidth:E,noResize:w,noHref:w,noShade:w,noWrap:w,object:null,profile:null,prompt:null,rev:null,rightMargin:E,rules:null,scheme:null,scrolling:S,standby:null,summary:null,text:null,topMargin:E,valueType:null,version:null,vAlign:null,vLink:null,vSpace:E,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:w,disableRemotePlayback:w,prefix:null,property:null,results:E,security:null,unselectable:null},space:"html",transform:R}),F=L({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:P,accentHeight:E,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:E,amplitude:E,arabicForm:null,ascent:E,attributeName:null,attributeType:null,azimuth:E,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:E,by:null,calcMode:null,capHeight:E,className:C,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:E,diffuseConstant:E,direction:null,display:null,dur:null,divisor:E,dominantBaseline:null,download:w,dx:null,dy:null,edgeMode:null,editable:null,elevation:E,enableBackground:null,end:null,event:null,exponent:E,externalResourcesRequired:null,fill:null,fillOpacity:E,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:T,g2:T,glyphName:T,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:E,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:E,horizOriginX:E,horizOriginY:E,id:null,ideographic:E,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:E,k:E,k1:E,k2:E,k3:E,k4:E,kernelMatrix:P,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:E,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:E,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:E,overlineThickness:E,paintOrder:null,panose1:null,path:null,pathLength:E,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:C,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:E,pointsAtY:E,pointsAtZ:E,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:P,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:P,rev:P,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:P,requiredFeatures:P,requiredFonts:P,requiredFormats:P,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:E,specularExponent:E,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:E,strikethroughThickness:E,string:null,stroke:null,strokeDashArray:P,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:E,strokeOpacity:E,strokeWidth:null,style:null,surfaceScale:E,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:P,tabIndex:E,tableValues:null,target:null,targetX:E,targetY:E,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:P,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:E,underlineThickness:E,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:E,values:null,vAlphabetic:E,vMathematical:E,vectorEffect:null,vHanging:E,vIdeographic:E,version:null,vertAdvY:E,vertOriginX:E,vertOriginY:E,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:E,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:N}),B=L({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform:(e,t)=>"xlink:"+t.slice(5).toLowerCase()}),z=L({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:R}),j=L({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform:(e,t)=>"xml:"+t.slice(3).toLowerCase()}),H=b([M,O,B,z,j],"html"),_=b([M,F,B,z,j],"svg"),U=/[A-Z]/g,V=/-[a-z]/g,G=/^data[-\w.:]+$/i;function W(e){return"-"+e.toLowerCase()}function K(e){return e.charAt(1).toUpperCase()}let Y={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"};var Q=n(27855);let Z=X("end"),J=X("start");function X(e){return function(t){let n=t&&t.position&&t.position[e]||{};if("number"==typeof n.line&&n.line>0&&"number"==typeof n.column&&n.column>0)return{line:n.line,column:n.column,offset:"number"==typeof n.offset&&n.offset>-1?n.offset:void 0}}}function $(e){return e&&"object"==typeof e?"position"in e||"type"in e?et(e.position):"start"in e||"end"in e?et(e):"line"in e||"column"in e?ee(e):"":""}function ee(e){return en(e&&e.line)+":"+en(e&&e.column)}function et(e){return ee(e&&e.start)+"-"+ee(e&&e.end)}function en(e){return e&&"number"==typeof e?e:1}class er extends Error{constructor(e,t,n){super(),"string"==typeof t&&(n=t,t=void 0);let r="",i={},o=!1;if(t&&(i="line"in t&&"column"in t?{place:t}:"start"in t&&"end"in t?{place:t}:"type"in t?{ancestors:[t],place:t.position}:{...t}),"string"==typeof e?r=e:!i.cause&&e&&(o=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&"string"==typeof n){let e=n.indexOf(":");-1===e?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors&&i.ancestors){let e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}let a=i.place&&"start"in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=r,this.line=a?a.line:void 0,this.name=$(i.place)||"1:1",this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=o&&i.cause&&"string"==typeof i.cause.stack?i.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}er.prototype.file="",er.prototype.name="",er.prototype.reason="",er.prototype.message="",er.prototype.stack="",er.prototype.column=void 0,er.prototype.line=void 0,er.prototype.ancestors=void 0,er.prototype.cause=void 0,er.prototype.fatal=void 0,er.prototype.place=void 0,er.prototype.ruleId=void 0,er.prototype.source=void 0;let ei={}.hasOwnProperty,eo=new Map,ea=/[A-Z]/g,el=new Set(["table","tbody","thead","tfoot","tr"]),es=new Set(["td","th"]),eu="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function ec(e,t,n){return"element"===t.type?function(e,t,n){let r=e.schema,i=r;"svg"===t.tagName.toLowerCase()&&"html"===r.space&&(i=_,e.schema=i),e.ancestors.push(t);let o=eh(e,t.tagName,!1),a=function(e,t){let n,r;let i={};for(r in t.properties)if("children"!==r&&ei.call(t.properties,r)){let o=function(e,t,n){let r=function(e,t){let n=v(t),r=t,i=x;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&"data"===n.slice(0,4)&&G.test(t)){if("-"===t.charAt(4)){let e=t.slice(5).replace(V,K);r="data"+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!V.test(e)){let n=e.replace(U,W);"-"!==n.charAt(0)&&(n="-"+n),t="data"+n}}i=q}return new i(r,t)}(e.schema,t);if(!(null==n||"number"==typeof n&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?function(e,t){let n={};return(""===e[e.length-1]?[...e,""]:e).join((n.padRight?" ":"")+","+(!1===n.padLeft?"":" ")).trim()}(n):n.join(" ").trim()),"style"===r.property){let t="object"==typeof n?n:function(e,t){try{return Q(t,{reactCompat:!0})}catch(n){if(e.ignoreInvalidStyle)return{};let t=new er("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw t.file=e.filePath||void 0,t.url=eu+"#cannot-parse-style-attribute",t}}(e,String(n));return"css"===e.stylePropertyNameCase&&(t=function(e){let t;let n={};for(t in e)ei.call(e,t)&&(n[function(e){let t=e.replace(ea,eg);return"ms-"===t.slice(0,3)&&(t="-"+t),t}(t)]=e[t]);return n}(t)),["style",t]}return["react"===e.elementAttributeNameCase&&r.space?Y[r.property]||r.property:r.attribute,n]}}(e,r,t.properties[r]);if(o){let[r,a]=o;e.tableCellAlignToStyle&&"align"===r&&"string"==typeof a&&es.has(t.tagName)?n=a:i[r]=a}}return n&&((i.style||(i.style={}))["css"===e.stylePropertyNameCase?"text-align":"textAlign"]=n),i}(e,t),l=ef(e,t);return el.has(t.tagName)&&(l=l.filter(function(e){return"string"!=typeof e||!("object"==typeof e?"text"===e.type&&g(e.value):g(e))})),ed(e,a,o,t),ep(a,l),e.ancestors.pop(),e.schema=r,e.create(t,o,a,n)}(e,t,n):"mdxFlowExpression"===t.type||"mdxTextExpression"===t.type?function(e,t){if(t.data&&t.data.estree&&e.evaluater){let n=t.data.estree.body[0];return n.type,e.evaluater.evaluateExpression(n.expression)}em(e,t.position)}(e,t):"mdxJsxFlowElement"===t.type||"mdxJsxTextElement"===t.type?function(e,t,n){let r=e.schema,i=r;"svg"===t.name&&"html"===r.space&&(i=_,e.schema=i),e.ancestors.push(t);let o=null===t.name?e.Fragment:eh(e,t.name,!0),a=function(e,t){let n={};for(let r of t.attributes)if("mdxJsxExpressionAttribute"===r.type){if(r.data&&r.data.estree&&e.evaluater){let t=r.data.estree.body[0];t.type;let i=t.expression;i.type;let o=i.properties[0];o.type,Object.assign(n,e.evaluater.evaluateExpression(o.argument))}else em(e,t.position)}else{let i;let o=r.name;if(r.value&&"object"==typeof r.value){if(r.value.data&&r.value.data.estree&&e.evaluater){let t=r.value.data.estree.body[0];t.type,i=e.evaluater.evaluateExpression(t.expression)}else em(e,t.position)}else i=null===r.value||r.value;n[o]=i}return n}(e,t),l=ef(e,t);return ed(e,a,o,t),ep(a,l),e.ancestors.pop(),e.schema=r,e.create(t,o,a,n)}(e,t,n):"mdxjsEsm"===t.type?function(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);em(e,t.position)}(e,t):"root"===t.type?function(e,t,n){let r={};return ep(r,ef(e,t)),e.create(t,e.Fragment,r,n)}(e,t,n):"text"===t.type?t.value:void 0}function ed(e,t,n,r){"string"!=typeof n&&n!==e.Fragment&&e.passNode&&(t.node=r)}function ep(e,t){if(t.length>0){let n=t.length>1?t:t[0];n&&(e.children=n)}}function ef(e,t){let n=[],r=-1,i=e.passKeys?new Map:eo;for(;++r<t.children.length;){let o;let a=t.children[r];if(e.passKeys){let e="element"===a.type?a.tagName:"mdxJsxFlowElement"===a.type||"mdxJsxTextElement"===a.type?a.name:void 0;if(e){let t=i.get(e)||0;o=e+"-"+t,i.set(e,t+1)}}let l=ec(e,a,o);void 0!==l&&n.push(l)}return n}function eh(e,t,n){let r;if(n){if(t.includes(".")){let e;let n=t.split("."),i=-1;for(;++i<n.length;){let t=h(n[i])?{type:"Identifier",name:n[i]}:{type:"Literal",value:n[i]};e=e?{type:"MemberExpression",object:e,property:t,computed:!!(i&&"Literal"===t.type),optional:!1}:t}r=e}else r=h(t)&&!/^[a-z]/.test(t)?{type:"Identifier",name:t}:{type:"Literal",value:t}}else r={type:"Literal",value:t};if("Literal"===r.type){let t=r.value;return ei.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);em(e)}function em(e,t){let n=new er("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=e.filePath||void 0,n.url=eu+"#cannot-handle-mdx-estrees-without-createevaluater",n}function eg(e){return"-"+e.toLowerCase()}let ey={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},eb={};function ev(e,t,n){if(e&&"object"==typeof e){if("value"in e)return"html"!==e.type||n?e.value:"";if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return ex(e.children,t,n)}return Array.isArray(e)?ex(e,t,n):""}function ex(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=ev(e[i],t,n);return r.join("")}function ek(e,t,n,r){let i;let o=e.length,a=0;if(t=t<0?-t>o?0:o+t:t>o?o:t,n=n>0?n:0,r.length<1e4)(i=Array.from(r)).unshift(t,n),e.splice(...i);else for(n&&e.splice(t,n);a<r.length;)(i=r.slice(a,a+1e4)).unshift(t,0),e.splice(...i),a+=1e4,t+=1e4}function ew(e,t){return e.length>0?(ek(e,e.length,0,t),e):t}class eS{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){let n=null==t?Number.POSITIVE_INFINITY:t;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){this.setCursor(Math.trunc(e));let r=this.right.splice(this.right.length-(t||0),Number.POSITIVE_INFINITY);return n&&eA(this.left,n),r.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),eA(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),eA(this.right,e.reverse())}setCursor(e){if(e!==this.left.length&&(!(e>this.left.length)||0!==this.right.length)&&(!(e<0)||0!==this.left.length)){if(e<this.left.length){let t=this.left.splice(e,Number.POSITIVE_INFINITY);eA(this.right,t.reverse())}else{let t=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);eA(this.left,t.reverse())}}}}function eA(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function eE(e){let t,n,r,i,o,a,l;let s={},u=-1,c=new eS(e);for(;++u<c.length;){for(;(u in s);)u=s[u];if(t=c.get(u),u&&"chunkFlow"===t[1].type&&"listItemPrefix"===c.get(u-1)[1].type&&((r=0)<(a=t[1]._tokenizer.events).length&&"lineEndingBlank"===a[r][1].type&&(r+=2),r<a.length&&"content"===a[r][1].type))for(;++r<a.length&&"content"!==a[r][1].type;)"chunkText"===a[r][1].type&&(a[r][1]._isInFirstContentOfListItem=!0,r++);if("enter"===t[0])t[1].contentType&&(Object.assign(s,function(e,t){let n,r;let i=e.get(t)[1],o=e.get(t)[2],a=t-1,l=[],s=i._tokenizer;!s&&(s=o.parser[i.contentType](i.start),i._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));let u=s.events,c=[],d={},p=-1,f=i,h=0,m=0,g=[0];for(;f;){for(;e.get(++a)[1]!==f;);l.push(a),!f._tokenizer&&(n=o.sliceStream(f),f.next||n.push(null),r&&s.defineSkip(f.start),f._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(n),f._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),r=f,f=f.next}for(f=i;++p<u.length;)"exit"===u[p][0]&&"enter"===u[p-1][0]&&u[p][1].type===u[p-1][1].type&&u[p][1].start.line!==u[p][1].end.line&&(m=p+1,g.push(m),f._tokenizer=void 0,f.previous=void 0,f=f.next);for(s.events=[],f?(f._tokenizer=void 0,f.previous=void 0):g.pop(),p=g.length;p--;){let t=u.slice(g[p],g[p+1]),n=l.pop();c.push([n,n+t.length-1]),e.splice(n,2,t)}for(c.reverse(),p=-1;++p<c.length;)d[h+c[p][0]]=h+c[p][1],h+=c[p][1]-c[p][0]-1;return d}(c,u)),u=s[u],l=!0);else if(t[1]._container){for(r=u,n=void 0;r--;)if("lineEnding"===(i=c.get(r))[1].type||"lineEndingBlank"===i[1].type)"enter"===i[0]&&(n&&(c.get(n)[1].type="lineEndingBlank"),i[1].type="lineEnding",n=r);else if("linePrefix"===i[1].type||"listItemIndent"===i[1].type);else break;n&&(t[1].end={...c.get(n)[1].start},(o=c.slice(n,u)).unshift(t),c.splice(n,u-n+1,o))}}return ek(e,0,Number.POSITIVE_INFINITY,c.slice(0)),!l}let eC={}.hasOwnProperty,eT=ez(/[A-Za-z]/),eP=ez(/[\dA-Za-z]/),eD=ez(/[#-'*+\--9=?A-Z^-~]/);function eI(e){return null!==e&&(e<32||127===e)}let eq=ez(/\d/),eL=ez(/[\dA-Fa-f]/),eM=ez(/[!-/:-@[-`{-~]/);function eN(e){return null!==e&&e<-2}function eR(e){return null!==e&&(e<0||32===e)}function eO(e){return -2===e||-1===e||32===e}let eF=ez(/\p{P}|\p{S}/u),eB=ez(/\s/);function ez(e){return function(t){return null!==t&&t>-1&&e.test(String.fromCharCode(t))}}function ej(e,t,n,r){let i=r?r-1:Number.POSITIVE_INFINITY,o=0;return function(r){return eO(r)?(e.enter(n),function r(a){return eO(a)&&o++<i?(e.consume(a),r):(e.exit(n),t(a))}(r)):t(r)}}let eH={tokenize:function(e){let t;let n=e.attempt(this.parser.constructs.contentInitial,function(t){if(null===t){e.consume(t);return}return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),ej(e,n,"linePrefix")},function(n){return e.enter("paragraph"),function n(r){let i=e.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=i),t=i,function t(r){if(null===r){e.exit("chunkText"),e.exit("paragraph"),e.consume(r);return}return eN(r)?(e.consume(r),e.exit("chunkText"),n):(e.consume(r),t)}(r)}(n)});return n}},e_={tokenize:function(e){let t,n,r;let i=this,o=[],a=0;return l;function l(t){if(a<o.length){let n=o[a];return i.containerState=n[1],e.attempt(n[0].continuation,s,u)(t)}return u(t)}function s(e){if(a++,i.containerState._closeFlow){let n;i.containerState._closeFlow=void 0,t&&y();let r=i.events.length,o=r;for(;o--;)if("exit"===i.events[o][0]&&"chunkFlow"===i.events[o][1].type){n=i.events[o][1].end;break}g(a);let l=r;for(;l<i.events.length;)i.events[l][1].end={...n},l++;return ek(i.events,o+1,0,i.events.slice(r)),i.events.length=l,u(e)}return l(e)}function u(n){if(a===o.length){if(!t)return p(n);if(t.currentConstruct&&t.currentConstruct.concrete)return h(n);i.interrupt=!!(t.currentConstruct&&!t._gfmTableDynamicInterruptHack)}return i.containerState={},e.check(eU,c,d)(n)}function c(e){return t&&y(),g(a),p(e)}function d(e){return i.parser.lazy[i.now().line]=a!==o.length,r=i.now().offset,h(e)}function p(t){return i.containerState={},e.attempt(eU,f,h)(t)}function f(e){return a++,o.push([i.currentConstruct,i.containerState]),p(e)}function h(r){if(null===r){t&&y(),g(0),e.consume(r);return}return t=t||i.parser.flow(i.now()),e.enter("chunkFlow",{_tokenizer:t,contentType:"flow",previous:n}),function t(n){if(null===n){m(e.exit("chunkFlow"),!0),g(0),e.consume(n);return}return eN(n)?(e.consume(n),m(e.exit("chunkFlow")),a=0,i.interrupt=void 0,l):(e.consume(n),t)}(r)}function m(e,o){let l=i.sliceStream(e);if(o&&l.push(null),e.previous=n,n&&(n.next=e),n=e,t.defineSkip(e.start),t.write(l),i.parser.lazy[e.start.line]){let e,n,o=t.events.length;for(;o--;)if(t.events[o][1].start.offset<r&&(!t.events[o][1].end||t.events[o][1].end.offset>r))return;let l=i.events.length,s=l;for(;s--;)if("exit"===i.events[s][0]&&"chunkFlow"===i.events[s][1].type){if(e){n=i.events[s][1].end;break}e=!0}for(g(a),o=l;o<i.events.length;)i.events[o][1].end={...n},o++;ek(i.events,s+1,0,i.events.slice(l)),i.events.length=o}}function g(t){let n=o.length;for(;n-- >t;){let t=o[n];i.containerState=t[1],t[0].exit.call(i,e)}o.length=t}function y(){t.write([null]),n=void 0,t=void 0,i.containerState._closeFlow=void 0}}},eU={tokenize:function(e,t,n){return ej(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}},eV={partial:!0,tokenize:function(e,t,n){return function(t){return eO(t)?ej(e,r,"linePrefix")(t):r(t)};function r(e){return null===e||eN(e)?t(e):n(e)}}},eG={resolve:function(e){return eE(e),e},tokenize:function(e,t){let n;return function(t){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),r(t)};function r(t){return null===t?i(t):eN(t)?e.check(eW,o,i)(t):(e.consume(t),r)}function i(n){return e.exit("chunkContent"),e.exit("content"),t(n)}function o(t){return e.consume(t),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,r}}},eW={partial:!0,tokenize:function(e,t,n){let r=this;return function(t){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),ej(e,i,"linePrefix")};function i(i){if(null===i||eN(i))return n(i);let o=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&o&&"linePrefix"===o[1].type&&o[2].sliceSerialize(o[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}},eK={tokenize:function(e){let t=this,n=e.attempt(eV,function(r){if(null===r){e.consume(r);return}return e.enter("lineEndingBlank"),e.consume(r),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n},e.attempt(this.parser.constructs.flowInitial,r,ej(e,e.attempt(this.parser.constructs.flow,r,e.attempt(eG,r)),"linePrefix")));return n;function r(r){if(null===r){e.consume(r);return}return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),t.currentConstruct=void 0,n}}},eY={resolveAll:eX()},eQ=eJ("string"),eZ=eJ("text");function eJ(e){return{resolveAll:eX("text"===e?e$:void 0),tokenize:function(t){let n=this,r=this.parser.constructs[e],i=t.attempt(r,o,a);return o;function o(e){return s(e)?i(e):a(e)}function a(e){if(null===e){t.consume(e);return}return t.enter("data"),t.consume(e),l}function l(e){return s(e)?(t.exit("data"),i(e)):(t.consume(e),l)}function s(e){if(null===e)return!0;let t=r[e],i=-1;if(t)for(;++i<t.length;){let e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}}function eX(e){return function(t,n){let r,i=-1;for(;++i<=t.length;)void 0===r?t[i]&&"data"===t[i][1].type&&(r=i,i++):t[i]&&"data"===t[i][1].type||(i!==r+2&&(t[r][1].end=t[i-1][1].end,t.splice(r+2,i-r-2),i=r+2),r=void 0);return e?e(t,n):t}}function e$(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||"lineEnding"===e[n][1].type)&&"data"===e[n-1][1].type){let r;let i=e[n-1][1],o=t.sliceStream(i),a=o.length,l=-1,s=0;for(;a--;){let e=o[a];if("string"==typeof e){for(l=e.length;32===e.charCodeAt(l-1);)s++,l--;if(l)break;l=-1}else if(-2===e)r=!0,s++;else if(-1===e);else{a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(s=0),s){let o={type:n===e.length||r||s<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:a?l:i.start._bufferIndex+l,_index:i.start._index+a,line:i.end.line,column:i.end.column-s,offset:i.end.offset-s},end:{...i.end}};i.end={...o.start},i.start.offset===i.end.offset?Object.assign(i,o):(e.splice(n,0,["enter",o,t],["exit",o,t]),n+=2)}n++}return e}let e1={name:"thematicBreak",tokenize:function(e,t,n){let r,i=0;return function(o){return e.enter("thematicBreak"),r=o,function o(a){return a===r?(e.enter("thematicBreakSequence"),function t(n){return n===r?(e.consume(n),i++,t):(e.exit("thematicBreakSequence"),eO(n)?ej(e,o,"whitespace")(n):o(n))}(a)):i>=3&&(null===a||eN(a))?(e.exit("thematicBreak"),t(a)):n(a)}(o)}}},e0={continuation:{tokenize:function(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(eV,function(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,ej(e,t,"listItemIndent",r.containerState.size+1)(n)},function(n){return r.containerState.furtherBlankLines||!eO(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,i(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(e3,t,i)(n))});function i(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,ej(e,e.attempt(e0,t,n),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i)}}},exit:function(e){e.exit(this.containerState.type)},name:"list",tokenize:function(e,t,n){let r=this,i=r.events[r.events.length-1],o=i&&"linePrefix"===i[1].type?i[2].sliceSerialize(i[1],!0).length:0,a=0;return function(t){let i=r.containerState.type||(42===t||43===t||45===t?"listUnordered":"listOrdered");if("listUnordered"===i?!r.containerState.marker||t===r.containerState.marker:eq(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),"listUnordered"===i)return e.enter("listItemPrefix"),42===t||45===t?e.check(e1,n,l)(t):l(t);if(!r.interrupt||49===t)return e.enter("listItemPrefix"),e.enter("listItemValue"),function t(i){return eq(i)&&++a<10?(e.consume(i),t):(!r.interrupt||a<2)&&(r.containerState.marker?i===r.containerState.marker:41===i||46===i)?(e.exit("listItemValue"),l(i)):n(i)}(t)}return n(t)};function l(t){return e.enter("listItemMarker"),e.consume(t),e.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||t,e.check(eV,r.interrupt?n:s,e.attempt(e2,c,u))}function s(e){return r.containerState.initialBlankLine=!0,o++,c(e)}function u(t){return eO(t)?(e.enter("listItemPrefixWhitespace"),e.consume(t),e.exit("listItemPrefixWhitespace"),c):n(t)}function c(n){return r.containerState.size=o+r.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(n)}}},e2={partial:!0,tokenize:function(e,t,n){let r=this;return ej(e,function(e){let i=r.events[r.events.length-1];return!eO(e)&&i&&"listItemPrefixWhitespace"===i[1].type?t(e):n(e)},"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5)}},e3={partial:!0,tokenize:function(e,t,n){let r=this;return ej(e,function(e){let i=r.events[r.events.length-1];return i&&"listItemIndent"===i[1].type&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)},"listItemIndent",r.containerState.size+1)}},e4={continuation:{tokenize:function(e,t,n){let r=this;return function(t){return eO(t)?ej(e,i,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):i(t)};function i(r){return e.attempt(e4,t,n)(r)}}},exit:function(e){e.exit("blockQuote")},name:"blockQuote",tokenize:function(e,t,n){let r=this;return function(t){if(62===t){let n=r.containerState;return n.open||(e.enter("blockQuote",{_container:!0}),n.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(t),e.exit("blockQuoteMarker"),i}return n(t)};function i(n){return eO(n)?(e.enter("blockQuotePrefixWhitespace"),e.consume(n),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(n))}}};function e5(e,t,n,r,i,o,a,l,s){let u=s||Number.POSITIVE_INFINITY,c=0;return function(t){return 60===t?(e.enter(r),e.enter(i),e.enter(o),e.consume(t),e.exit(o),d):null===t||32===t||41===t||eI(t)?n(t):(e.enter(r),e.enter(a),e.enter(l),e.enter("chunkString",{contentType:"string"}),h(t))};function d(n){return 62===n?(e.enter(o),e.consume(n),e.exit(o),e.exit(i),e.exit(r),t):(e.enter(l),e.enter("chunkString",{contentType:"string"}),p(n))}function p(t){return 62===t?(e.exit("chunkString"),e.exit(l),d(t)):null===t||60===t||eN(t)?n(t):(e.consume(t),92===t?f:p)}function f(t){return 60===t||62===t||92===t?(e.consume(t),p):p(t)}function h(i){return!c&&(null===i||41===i||eR(i))?(e.exit("chunkString"),e.exit(l),e.exit(a),e.exit(r),t(i)):c<u&&40===i?(e.consume(i),c++,h):41===i?(e.consume(i),c--,h):null===i||32===i||40===i||eI(i)?n(i):(e.consume(i),92===i?m:h)}function m(t){return 40===t||41===t||92===t?(e.consume(t),h):h(t)}}function e6(e,t,n,r,i,o){let a;let l=this,s=0;return function(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(o),u};function u(d){return s>999||null===d||91===d||93===d&&!a||94===d&&!s&&"_hiddenFootnoteSupport"in l.parser.constructs?n(d):93===d?(e.exit(o),e.enter(i),e.consume(d),e.exit(i),e.exit(r),t):eN(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),u):(e.enter("chunkString",{contentType:"string"}),c(d))}function c(t){return null===t||91===t||93===t||eN(t)||s++>999?(e.exit("chunkString"),u(t)):(e.consume(t),a||(a=!eO(t)),92===t?d:c)}function d(t){return 91===t||92===t||93===t?(e.consume(t),s++,c):c(t)}}function e9(e,t,n,r,i,o){let a;return function(t){return 34===t||39===t||40===t?(e.enter(r),e.enter(i),e.consume(t),e.exit(i),a=40===t?41:t,l):n(t)};function l(n){return n===a?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(o),s(n))}function s(t){return t===a?(e.exit(o),l(a)):null===t?n(t):eN(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),ej(e,s,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),u(t))}function u(t){return t===a||null===t||eN(t)?(e.exit("chunkString"),s(t)):(e.consume(t),92===t?c:u)}function c(t){return t===a||92===t?(e.consume(t),u):u(t)}}function e8(e,t){let n;return function r(i){return eN(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),n=!0,r):eO(i)?ej(e,r,n?"linePrefix":"lineSuffix")(i):t(i)}}function e7(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}let te={partial:!0,tokenize:function(e,t,n){return function(t){return eR(t)?e8(e,r)(t):n(t)};function r(t){return e9(e,i,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(t)}function i(t){return eO(t)?ej(e,o,"whitespace")(t):o(t)}function o(e){return null===e||eN(e)?t(e):n(e)}}},tt={name:"codeIndented",tokenize:function(e,t,n){let r=this;return function(t){return e.enter("codeIndented"),ej(e,i,"linePrefix",5)(t)};function i(t){let i=r.events[r.events.length-1];return i&&"linePrefix"===i[1].type&&i[2].sliceSerialize(i[1],!0).length>=4?function t(n){return null===n?o(n):eN(n)?e.attempt(tn,t,o)(n):(e.enter("codeFlowValue"),function n(r){return null===r||eN(r)?(e.exit("codeFlowValue"),t(r)):(e.consume(r),n)}(n))}(t):n(t)}function o(n){return e.exit("codeIndented"),t(n)}}},tn={partial:!0,tokenize:function(e,t,n){let r=this;return i;function i(t){return r.parser.lazy[r.now().line]?n(t):eN(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i):ej(e,o,"linePrefix",5)(t)}function o(e){let o=r.events[r.events.length-1];return o&&"linePrefix"===o[1].type&&o[2].sliceSerialize(o[1],!0).length>=4?t(e):eN(e)?i(e):n(e)}}},tr={name:"setextUnderline",resolveTo:function(e,t){let n,r,i,o=e.length;for(;o--;)if("enter"===e[o][0]){if("content"===e[o][1].type){n=o;break}"paragraph"===e[o][1].type&&(r=o)}else"content"===e[o][1].type&&e.splice(o,1),i||"definition"!==e[o][1].type||(i=o);let a={type:"setextHeading",start:{...e[n][1].start},end:{...e[e.length-1][1].end}};return e[r][1].type="setextHeadingText",i?(e.splice(r,0,["enter",a,t]),e.splice(i+1,0,["exit",e[n][1],t]),e[n][1].end={...e[i][1].end}):e[n][1]=a,e.push(["exit",a,t]),e},tokenize:function(e,t,n){let r;let i=this;return function(t){let a,l=i.events.length;for(;l--;)if("lineEnding"!==i.events[l][1].type&&"linePrefix"!==i.events[l][1].type&&"content"!==i.events[l][1].type){a="paragraph"===i.events[l][1].type;break}return!i.parser.lazy[i.now().line]&&(i.interrupt||a)?(e.enter("setextHeadingLine"),r=t,e.enter("setextHeadingLineSequence"),function t(n){return n===r?(e.consume(n),t):(e.exit("setextHeadingLineSequence"),eO(n)?ej(e,o,"lineSuffix")(n):o(n))}(t)):n(t)};function o(r){return null===r||eN(r)?(e.exit("setextHeadingLine"),t(r)):n(r)}}},ti=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],to=["pre","script","style","textarea"],ta={partial:!0,tokenize:function(e,t,n){return function(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(eV,t,n)}}},tl={partial:!0,tokenize:function(e,t,n){let r=this;return function(t){return eN(t)?(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i):n(t)};function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}},ts={partial:!0,tokenize:function(e,t,n){let r=this;return function(t){return null===t?n(t):(e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),i)};function i(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}},tu={concrete:!0,name:"codeFenced",tokenize:function(e,t,n){let r;let i=this,o={partial:!0,tokenize:function(e,t,n){let o=0;return function(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),a};function a(t){return e.enter("codeFencedFence"),eO(t)?ej(e,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):s(t)}function s(t){return t===r?(e.enter("codeFencedFenceSequence"),function t(i){return i===r?(o++,e.consume(i),t):o>=l?(e.exit("codeFencedFenceSequence"),eO(i)?ej(e,u,"whitespace")(i):u(i)):n(i)}(t)):n(t)}function u(r){return null===r||eN(r)?(e.exit("codeFencedFence"),t(r)):n(r)}}},a=0,l=0;return function(t){return function(t){let o=i.events[i.events.length-1];return a=o&&"linePrefix"===o[1].type?o[2].sliceSerialize(o[1],!0).length:0,r=t,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),function t(i){return i===r?(l++,e.consume(i),t):l<3?n(i):(e.exit("codeFencedFenceSequence"),eO(i)?ej(e,s,"whitespace")(i):s(i))}(t)}(t)};function s(o){return null===o||eN(o)?(e.exit("codeFencedFence"),i.interrupt?t(o):e.check(ts,c,h)(o)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),function t(i){return null===i||eN(i)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),s(i)):eO(i)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),ej(e,u,"whitespace")(i)):96===i&&i===r?n(i):(e.consume(i),t)}(o))}function u(t){return null===t||eN(t)?s(t):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),function t(i){return null===i||eN(i)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),s(i)):96===i&&i===r?n(i):(e.consume(i),t)}(t))}function c(t){return e.attempt(o,h,d)(t)}function d(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),p}function p(t){return a>0&&eO(t)?ej(e,f,"linePrefix",a+1)(t):f(t)}function f(t){return null===t||eN(t)?e.check(ts,c,h)(t):(e.enter("codeFlowValue"),function t(n){return null===n||eN(n)?(e.exit("codeFlowValue"),f(n)):(e.consume(n),t)}(t))}function h(n){return e.exit("codeFenced"),t(n)}}},tc={AElig:"\xc6",AMP:"&",Aacute:"\xc1",Abreve:"Ă",Acirc:"\xc2",Acy:"А",Afr:"\uD835\uDD04",Agrave:"\xc0",Alpha:"Α",Amacr:"Ā",And:"⩓",Aogon:"Ą",Aopf:"\uD835\uDD38",ApplyFunction:"⁡",Aring:"\xc5",Ascr:"\uD835\uDC9C",Assign:"≔",Atilde:"\xc3",Auml:"\xc4",Backslash:"∖",Barv:"⫧",Barwed:"⌆",Bcy:"Б",Because:"∵",Bernoullis:"ℬ",Beta:"Β",Bfr:"\uD835\uDD05",Bopf:"\uD835\uDD39",Breve:"˘",Bscr:"ℬ",Bumpeq:"≎",CHcy:"Ч",COPY:"\xa9",Cacute:"Ć",Cap:"⋒",CapitalDifferentialD:"ⅅ",Cayleys:"ℭ",Ccaron:"Č",Ccedil:"\xc7",Ccirc:"Ĉ",Cconint:"∰",Cdot:"Ċ",Cedilla:"\xb8",CenterDot:"\xb7",Cfr:"ℭ",Chi:"Χ",CircleDot:"⊙",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",Colon:"∷",Colone:"⩴",Congruent:"≡",Conint:"∯",ContourIntegral:"∮",Copf:"ℂ",Coproduct:"∐",CounterClockwiseContourIntegral:"∳",Cross:"⨯",Cscr:"\uD835\uDC9E",Cup:"⋓",CupCap:"≍",DD:"ⅅ",DDotrahd:"⤑",DJcy:"Ђ",DScy:"Ѕ",DZcy:"Џ",Dagger:"‡",Darr:"↡",Dashv:"⫤",Dcaron:"Ď",Dcy:"Д",Del:"∇",Delta:"Δ",Dfr:"\uD835\uDD07",DiacriticalAcute:"\xb4",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",Diamond:"⋄",DifferentialD:"ⅆ",Dopf:"\uD835\uDD3B",Dot:"\xa8",DotDot:"⃜",DotEqual:"≐",DoubleContourIntegral:"∯",DoubleDot:"\xa8",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",Downarrow:"⇓",Dscr:"\uD835\uDC9F",Dstrok:"Đ",ENG:"Ŋ",ETH:"\xd0",Eacute:"\xc9",Ecaron:"Ě",Ecirc:"\xca",Ecy:"Э",Edot:"Ė",Efr:"\uD835\uDD08",Egrave:"\xc8",Element:"∈",Emacr:"Ē",EmptySmallSquare:"◻",EmptyVerySmallSquare:"▫",Eogon:"Ę",Eopf:"\uD835\uDD3C",Epsilon:"Ε",Equal:"⩵",EqualTilde:"≂",Equilibrium:"⇌",Escr:"ℰ",Esim:"⩳",Eta:"Η",Euml:"\xcb",Exists:"∃",ExponentialE:"ⅇ",Fcy:"Ф",Ffr:"\uD835\uDD09",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",Fopf:"\uD835\uDD3D",ForAll:"∀",Fouriertrf:"ℱ",Fscr:"ℱ",GJcy:"Ѓ",GT:">",Gamma:"Γ",Gammad:"Ϝ",Gbreve:"Ğ",Gcedil:"Ģ",Gcirc:"Ĝ",Gcy:"Г",Gdot:"Ġ",Gfr:"\uD835\uDD0A",Gg:"⋙",Gopf:"\uD835\uDD3E",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"\uD835\uDCA2",Gt:"≫",HARDcy:"Ъ",Hacek:"ˇ",Hat:"^",Hcirc:"Ĥ",Hfr:"ℌ",HilbertSpace:"ℋ",Hopf:"ℍ",HorizontalLine:"─",Hscr:"ℋ",Hstrok:"Ħ",HumpDownHump:"≎",HumpEqual:"≏",IEcy:"Е",IJlig:"Ĳ",IOcy:"Ё",Iacute:"\xcd",Icirc:"\xce",Icy:"И",Idot:"İ",Ifr:"ℑ",Igrave:"\xcc",Im:"ℑ",Imacr:"Ī",ImaginaryI:"ⅈ",Implies:"⇒",Int:"∬",Integral:"∫",Intersection:"⋂",InvisibleComma:"⁣",InvisibleTimes:"⁢",Iogon:"Į",Iopf:"\uD835\uDD40",Iota:"Ι",Iscr:"ℐ",Itilde:"Ĩ",Iukcy:"І",Iuml:"\xcf",Jcirc:"Ĵ",Jcy:"Й",Jfr:"\uD835\uDD0D",Jopf:"\uD835\uDD41",Jscr:"\uD835\uDCA5",Jsercy:"Ј",Jukcy:"Є",KHcy:"Х",KJcy:"Ќ",Kappa:"Κ",Kcedil:"Ķ",Kcy:"К",Kfr:"\uD835\uDD0E",Kopf:"\uD835\uDD42",Kscr:"\uD835\uDCA6",LJcy:"Љ",LT:"<",Lacute:"Ĺ",Lambda:"Λ",Lang:"⟪",Laplacetrf:"ℒ",Larr:"↞",Lcaron:"Ľ",Lcedil:"Ļ",Lcy:"Л",LeftAngleBracket:"⟨",LeftArrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",LeftRightArrow:"↔",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",Leftarrow:"⇐",Leftrightarrow:"⇔",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",LessLess:"⪡",LessSlantEqual:"⩽",LessTilde:"≲",Lfr:"\uD835\uDD0F",Ll:"⋘",Lleftarrow:"⇚",Lmidot:"Ŀ",LongLeftArrow:"⟵",LongLeftRightArrow:"⟷",LongRightArrow:"⟶",Longleftarrow:"⟸",Longleftrightarrow:"⟺",Longrightarrow:"⟹",Lopf:"\uD835\uDD43",LowerLeftArrow:"↙",LowerRightArrow:"↘",Lscr:"ℒ",Lsh:"↰",Lstrok:"Ł",Lt:"≪",Map:"⤅",Mcy:"М",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"\uD835\uDD10",MinusPlus:"∓",Mopf:"\uD835\uDD44",Mscr:"ℳ",Mu:"Μ",NJcy:"Њ",Nacute:"Ń",Ncaron:"Ň",Ncedil:"Ņ",Ncy:"Н",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:"\n",Nfr:"\uD835\uDD11",NoBreak:"⁠",NonBreakingSpace:"\xa0",Nopf:"ℕ",Not:"⫬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",Nscr:"\uD835\uDCA9",Ntilde:"\xd1",Nu:"Ν",OElig:"Œ",Oacute:"\xd3",Ocirc:"\xd4",Ocy:"О",Odblac:"Ő",Ofr:"\uD835\uDD12",Ograve:"\xd2",Omacr:"Ō",Omega:"Ω",Omicron:"Ο",Oopf:"\uD835\uDD46",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",Or:"⩔",Oscr:"\uD835\uDCAA",Oslash:"\xd8",Otilde:"\xd5",Otimes:"⨷",Ouml:"\xd6",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",PartialD:"∂",Pcy:"П",Pfr:"\uD835\uDD13",Phi:"Φ",Pi:"Π",PlusMinus:"\xb1",Poincareplane:"ℌ",Popf:"ℙ",Pr:"⪻",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",Prime:"″",Product:"∏",Proportion:"∷",Proportional:"∝",Pscr:"\uD835\uDCAB",Psi:"Ψ",QUOT:'"',Qfr:"\uD835\uDD14",Qopf:"ℚ",Qscr:"\uD835\uDCAC",RBarr:"⤐",REG:"\xae",Racute:"Ŕ",Rang:"⟫",Rarr:"↠",Rarrtl:"⤖",Rcaron:"Ř",Rcedil:"Ŗ",Rcy:"Р",Re:"ℜ",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",Rfr:"ℜ",Rho:"Ρ",RightAngleBracket:"⟩",RightArrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",Rightarrow:"⇒",Ropf:"ℝ",RoundImplies:"⥰",Rrightarrow:"⇛",Rscr:"ℛ",Rsh:"↱",RuleDelayed:"⧴",SHCHcy:"Щ",SHcy:"Ш",SOFTcy:"Ь",Sacute:"Ś",Sc:"⪼",Scaron:"Š",Scedil:"Ş",Scirc:"Ŝ",Scy:"С",Sfr:"\uD835\uDD16",ShortDownArrow:"↓",ShortLeftArrow:"←",ShortRightArrow:"→",ShortUpArrow:"↑",Sigma:"Σ",SmallCircle:"∘",Sopf:"\uD835\uDD4A",Sqrt:"√",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",Sscr:"\uD835\uDCAE",Star:"⋆",Sub:"⋐",Subset:"⋐",SubsetEqual:"⊆",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",SuchThat:"∋",Sum:"∑",Sup:"⋑",Superset:"⊃",SupersetEqual:"⊇",Supset:"⋑",THORN:"\xde",TRADE:"™",TSHcy:"Ћ",TScy:"Ц",Tab:"	",Tau:"Τ",Tcaron:"Ť",Tcedil:"Ţ",Tcy:"Т",Tfr:"\uD835\uDD17",Therefore:"∴",Theta:"Θ",ThickSpace:"  ",ThinSpace:" ",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",Topf:"\uD835\uDD4B",TripleDot:"⃛",Tscr:"\uD835\uDCAF",Tstrok:"Ŧ",Uacute:"\xda",Uarr:"↟",Uarrocir:"⥉",Ubrcy:"Ў",Ubreve:"Ŭ",Ucirc:"\xdb",Ucy:"У",Udblac:"Ű",Ufr:"\uD835\uDD18",Ugrave:"\xd9",Umacr:"Ū",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",Uopf:"\uD835\uDD4C",UpArrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",UpEquilibrium:"⥮",UpTee:"⊥",UpTeeArrow:"↥",Uparrow:"⇑",Updownarrow:"⇕",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",Upsilon:"Υ",Uring:"Ů",Uscr:"\uD835\uDCB0",Utilde:"Ũ",Uuml:"\xdc",VDash:"⊫",Vbar:"⫫",Vcy:"В",Vdash:"⊩",Vdashl:"⫦",Vee:"⋁",Verbar:"‖",Vert:"‖",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"\uD835\uDD19",Vopf:"\uD835\uDD4D",Vscr:"\uD835\uDCB1",Vvdash:"⊪",Wcirc:"Ŵ",Wedge:"⋀",Wfr:"\uD835\uDD1A",Wopf:"\uD835\uDD4E",Wscr:"\uD835\uDCB2",Xfr:"\uD835\uDD1B",Xi:"Ξ",Xopf:"\uD835\uDD4F",Xscr:"\uD835\uDCB3",YAcy:"Я",YIcy:"Ї",YUcy:"Ю",Yacute:"\xdd",Ycirc:"Ŷ",Ycy:"Ы",Yfr:"\uD835\uDD1C",Yopf:"\uD835\uDD50",Yscr:"\uD835\uDCB4",Yuml:"Ÿ",ZHcy:"Ж",Zacute:"Ź",Zcaron:"Ž",Zcy:"З",Zdot:"Ż",ZeroWidthSpace:"​",Zeta:"Ζ",Zfr:"ℨ",Zopf:"ℤ",Zscr:"\uD835\uDCB5",aacute:"\xe1",abreve:"ă",ac:"∾",acE:"∾̳",acd:"∿",acirc:"\xe2",acute:"\xb4",acy:"а",aelig:"\xe6",af:"⁡",afr:"\uD835\uDD1E",agrave:"\xe0",alefsym:"ℵ",aleph:"ℵ",alpha:"α",amacr:"ā",amalg:"⨿",amp:"&",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"\xc5",angzarr:"⍼",aogon:"ą",aopf:"\uD835\uDD52",ap:"≈",apE:"⩰",apacir:"⩯",ape:"≊",apid:"≋",apos:"'",approx:"≈",approxeq:"≊",aring:"\xe5",ascr:"\uD835\uDCB6",ast:"*",asymp:"≈",asympeq:"≍",atilde:"\xe3",auml:"\xe4",awconint:"∳",awint:"⨑",bNot:"⫭",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",barvee:"⊽",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",bcy:"б",bdquo:"„",becaus:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",beta:"β",beth:"ℶ",between:"≬",bfr:"\uD835\uDD1F",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bnot:"⌐",bopf:"\uD835\uDD53",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxDL:"╗",boxDR:"╔",boxDl:"╖",boxDr:"╓",boxH:"═",boxHD:"╦",boxHU:"╩",boxHd:"╤",boxHu:"╧",boxUL:"╝",boxUR:"╚",boxUl:"╜",boxUr:"╙",boxV:"║",boxVH:"╬",boxVL:"╣",boxVR:"╠",boxVh:"╫",boxVl:"╢",boxVr:"╟",boxbox:"⧉",boxdL:"╕",boxdR:"╒",boxdl:"┐",boxdr:"┌",boxh:"─",boxhD:"╥",boxhU:"╨",boxhd:"┬",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxuL:"╛",boxuR:"╘",boxul:"┘",boxur:"└",boxv:"│",boxvH:"╪",boxvL:"╡",boxvR:"╞",boxvh:"┼",boxvl:"┤",boxvr:"├",bprime:"‵",breve:"˘",brvbar:"\xa6",bscr:"\uD835\uDCB7",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",bumpeq:"≏",cacute:"ć",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",caps:"∩︀",caret:"⁁",caron:"ˇ",ccaps:"⩍",ccaron:"č",ccedil:"\xe7",ccirc:"ĉ",ccups:"⩌",ccupssm:"⩐",cdot:"ċ",cedil:"\xb8",cemptyv:"⦲",cent:"\xa2",centerdot:"\xb7",cfr:"\uD835\uDD20",chcy:"ч",check:"✓",checkmark:"✓",chi:"χ",cir:"○",cirE:"⧃",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledR:"\xae",circledS:"Ⓢ",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",clubs:"♣",clubsuit:"♣",colon:":",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",conint:"∮",copf:"\uD835\uDD54",coprod:"∐",copy:"\xa9",copysr:"℗",crarr:"↵",cross:"✗",cscr:"\uD835\uDCB8",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",cup:"∪",cupbrcap:"⩈",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"\xa4",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",dArr:"⇓",dHar:"⥥",dagger:"†",daleth:"ℸ",darr:"↓",dash:"‐",dashv:"⊣",dbkarow:"⤏",dblac:"˝",dcaron:"ď",dcy:"д",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",ddotseq:"⩷",deg:"\xb0",delta:"δ",demptyv:"⦱",dfisht:"⥿",dfr:"\uD835\uDD21",dharl:"⇃",dharr:"⇂",diam:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"\xa8",digamma:"ϝ",disin:"⋲",div:"\xf7",divide:"\xf7",divideontimes:"⋇",divonx:"⋇",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",dopf:"\uD835\uDD55",dot:"˙",doteq:"≐",doteqdot:"≑",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",downarrow:"↓",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",dscr:"\uD835\uDCB9",dscy:"ѕ",dsol:"⧶",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",dzcy:"џ",dzigrarr:"⟿",eDDot:"⩷",eDot:"≑",eacute:"\xe9",easter:"⩮",ecaron:"ě",ecir:"≖",ecirc:"\xea",ecolon:"≕",ecy:"э",edot:"ė",ee:"ⅇ",efDot:"≒",efr:"\uD835\uDD22",eg:"⪚",egrave:"\xe8",egs:"⪖",egsdot:"⪘",el:"⪙",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",emacr:"ē",empty:"∅",emptyset:"∅",emptyv:"∅",emsp13:" ",emsp14:" ",emsp:" ",eng:"ŋ",ensp:" ",eogon:"ę",eopf:"\uD835\uDD56",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",equals:"=",equest:"≟",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erDot:"≓",erarr:"⥱",escr:"ℯ",esdot:"≐",esim:"≂",eta:"η",eth:"\xf0",euml:"\xeb",euro:"€",excl:"!",exist:"∃",expectation:"ℰ",exponentiale:"ⅇ",fallingdotseq:"≒",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",ffr:"\uD835\uDD23",filig:"ﬁ",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",fopf:"\uD835\uDD57",forall:"∀",fork:"⋔",forkv:"⫙",fpartint:"⨍",frac12:"\xbd",frac13:"⅓",frac14:"\xbc",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"\xbe",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",fscr:"\uD835\uDCBB",gE:"≧",gEl:"⪌",gacute:"ǵ",gamma:"γ",gammad:"ϝ",gap:"⪆",gbreve:"ğ",gcirc:"ĝ",gcy:"г",gdot:"ġ",ge:"≥",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",gfr:"\uD835\uDD24",gg:"≫",ggg:"⋙",gimel:"ℷ",gjcy:"ѓ",gl:"≷",glE:"⪒",gla:"⪥",glj:"⪤",gnE:"≩",gnap:"⪊",gnapprox:"⪊",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",gopf:"\uD835\uDD58",grave:"`",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",hArr:"⇔",hairsp:" ",half:"\xbd",hamilt:"ℋ",hardcy:"ъ",harr:"↔",harrcir:"⥈",harrw:"↭",hbar:"ℏ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",hfr:"\uD835\uDD25",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",hopf:"\uD835\uDD59",horbar:"―",hscr:"\uD835\uDCBD",hslash:"ℏ",hstrok:"ħ",hybull:"⁃",hyphen:"‐",iacute:"\xed",ic:"⁣",icirc:"\xee",icy:"и",iecy:"е",iexcl:"\xa1",iff:"⇔",ifr:"\uD835\uDD26",igrave:"\xec",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",ijlig:"ĳ",imacr:"ī",image:"ℑ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",int:"∫",intcal:"⊺",integers:"ℤ",intercal:"⊺",intlarhk:"⨗",intprod:"⨼",iocy:"ё",iogon:"į",iopf:"\uD835\uDD5A",iota:"ι",iprod:"⨼",iquest:"\xbf",iscr:"\uD835\uDCBE",isin:"∈",isinE:"⋹",isindot:"⋵",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",itilde:"ĩ",iukcy:"і",iuml:"\xef",jcirc:"ĵ",jcy:"й",jfr:"\uD835\uDD27",jmath:"ȷ",jopf:"\uD835\uDD5B",jscr:"\uD835\uDCBF",jsercy:"ј",jukcy:"є",kappa:"κ",kappav:"ϰ",kcedil:"ķ",kcy:"к",kfr:"\uD835\uDD28",kgreen:"ĸ",khcy:"х",kjcy:"ќ",kopf:"\uD835\uDD5C",kscr:"\uD835\uDCC0",lAarr:"⇚",lArr:"⇐",lAtail:"⤛",lBarr:"⤎",lE:"≦",lEg:"⪋",lHar:"⥢",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",lambda:"λ",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",laquo:"\xab",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",latail:"⤙",late:"⪭",lates:"⪭︀",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",lcaron:"ľ",lcedil:"ļ",lceil:"⌈",lcub:"{",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",le:"≤",leftarrow:"←",leftarrowtail:"↢",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",leftthreetimes:"⋋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",lessgtr:"≶",lesssim:"≲",lfisht:"⥼",lfloor:"⌊",lfr:"\uD835\uDD29",lg:"≶",lgE:"⪑",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",ljcy:"љ",ll:"≪",llarr:"⇇",llcorner:"⌞",llhard:"⥫",lltri:"◺",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnE:"≨",lnap:"⪉",lnapprox:"⪉",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",longleftarrow:"⟵",longleftrightarrow:"⟷",longmapsto:"⟼",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",lopf:"\uD835\uDD5D",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",lscr:"\uD835\uDCC1",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",lstrok:"ł",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltrPar:"⦖",ltri:"◃",ltrie:"⊴",ltrif:"◂",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",mDDot:"∺",macr:"\xaf",male:"♂",malt:"✠",maltese:"✠",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",mcy:"м",mdash:"—",measuredangle:"∡",mfr:"\uD835\uDD2A",mho:"℧",micro:"\xb5",mid:"∣",midast:"*",midcir:"⫰",middot:"\xb7",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",mopf:"\uD835\uDD5E",mp:"∓",mscr:"\uD835\uDCC2",mstpos:"∾",mu:"μ",multimap:"⊸",mumap:"⊸",nGg:"⋙̸",nGt:"≫⃒",nGtv:"≫̸",nLeftarrow:"⇍",nLeftrightarrow:"⇎",nLl:"⋘̸",nLt:"≪⃒",nLtv:"≪̸",nRightarrow:"⇏",nVDash:"⊯",nVdash:"⊮",nabla:"∇",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:"\xa0",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",ncaron:"ň",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",ncy:"н",ndash:"–",ne:"≠",neArr:"⇗",nearhk:"⤤",nearr:"↗",nearrow:"↗",nedot:"≐̸",nequiv:"≢",nesear:"⤨",nesim:"≂̸",nexist:"∄",nexists:"∄",nfr:"\uD835\uDD2B",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",ngsim:"≵",ngt:"≯",ngtr:"≯",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",njcy:"њ",nlArr:"⇍",nlE:"≦̸",nlarr:"↚",nldr:"‥",nle:"≰",nleftarrow:"↚",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nlsim:"≴",nlt:"≮",nltri:"⋪",nltrie:"⋬",nmid:"∤",nopf:"\uD835\uDD5F",not:"\xac",notin:"∉",notinE:"⋹̸",notindot:"⋵̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",nscr:"\uD835\uDCC3",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",ntilde:"\xf1",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",nu:"ν",num:"#",numero:"№",numsp:" ",nvDash:"⊭",nvHarr:"⤄",nvap:"≍⃒",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwArr:"⇖",nwarhk:"⤣",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",oS:"Ⓢ",oacute:"\xf3",oast:"⊛",ocir:"⊚",ocirc:"\xf4",ocy:"о",odash:"⊝",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",oelig:"œ",ofcir:"⦿",ofr:"\uD835\uDD2C",ogon:"˛",ograve:"\xf2",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",omacr:"ō",omega:"ω",omicron:"ο",omid:"⦶",ominus:"⊖",oopf:"\uD835\uDD60",opar:"⦷",operp:"⦹",oplus:"⊕",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"\xaa",ordm:"\xba",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oscr:"ℴ",oslash:"\xf8",osol:"⊘",otilde:"\xf5",otimes:"⊗",otimesas:"⨶",ouml:"\xf6",ovbar:"⌽",par:"∥",para:"\xb6",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",pfr:"\uD835\uDD2D",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",plusmn:"\xb1",plussim:"⨦",plustwo:"⨧",pm:"\xb1",pointint:"⨕",popf:"\uD835\uDD61",pound:"\xa3",pr:"≺",prE:"⪳",prap:"⪷",prcue:"≼",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",prime:"′",primes:"ℙ",prnE:"⪵",prnap:"⪹",prnsim:"⋨",prod:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",propto:"∝",prsim:"≾",prurel:"⊰",pscr:"\uD835\uDCC5",psi:"ψ",puncsp:" ",qfr:"\uD835\uDD2E",qint:"⨌",qopf:"\uD835\uDD62",qprime:"⁗",qscr:"\uD835\uDCC6",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",quot:'"',rAarr:"⇛",rArr:"⇒",rAtail:"⤜",rBarr:"⤏",rHar:"⥤",race:"∽̱",racute:"ŕ",radic:"√",raemptyv:"⦳",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"\xbb",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",rarrtl:"↣",rarrw:"↝",ratail:"⤚",ratio:"∶",rationals:"ℚ",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",rcaron:"ř",rcedil:"ŗ",rceil:"⌉",rcub:"}",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",reg:"\xae",rfisht:"⥽",rfloor:"⌋",rfr:"\uD835\uDD2F",rhard:"⇁",rharu:"⇀",rharul:"⥬",rho:"ρ",rhov:"ϱ",rightarrow:"→",rightarrowtail:"↣",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",rightthreetimes:"⋌",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",ropf:"\uD835\uDD63",roplus:"⨮",rotimes:"⨵",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",rsaquo:"›",rscr:"\uD835\uDCC7",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",ruluhar:"⥨",rx:"℞",sacute:"ś",sbquo:"‚",sc:"≻",scE:"⪴",scap:"⪸",scaron:"š",sccue:"≽",sce:"⪰",scedil:"ş",scirc:"ŝ",scnE:"⪶",scnap:"⪺",scnsim:"⋩",scpolint:"⨓",scsim:"≿",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",seArr:"⇘",searhk:"⤥",searr:"↘",searrow:"↘",sect:"\xa7",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",sfr:"\uD835\uDD30",sfrown:"⌢",sharp:"♯",shchcy:"щ",shcy:"ш",shortmid:"∣",shortparallel:"∥",shy:"\xad",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",sopf:"\uD835\uDD64",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",square:"□",squarf:"▪",squf:"▪",srarr:"→",sscr:"\uD835\uDCC8",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"\xaf",sub:"⊂",subE:"⫅",subdot:"⪽",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",sum:"∑",sung:"♪",sup1:"\xb9",sup2:"\xb2",sup3:"\xb3",sup:"⊃",supE:"⫆",supdot:"⪾",supdsub:"⫘",supe:"⊇",supedot:"⫄",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swArr:"⇙",swarhk:"⤦",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"\xdf",target:"⌖",tau:"τ",tbrk:"⎴",tcaron:"ť",tcedil:"ţ",tcy:"т",tdot:"⃛",telrec:"⌕",tfr:"\uD835\uDD31",there4:"∴",therefore:"∴",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",thinsp:" ",thkap:"≈",thksim:"∼",thorn:"\xfe",tilde:"˜",times:"\xd7",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",topf:"\uD835\uDD65",topfork:"⫚",tosa:"⤩",tprime:"‴",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",tscr:"\uD835\uDCC9",tscy:"ц",tshcy:"ћ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",uArr:"⇑",uHar:"⥣",uacute:"\xfa",uarr:"↑",ubrcy:"ў",ubreve:"ŭ",ucirc:"\xfb",ucy:"у",udarr:"⇅",udblac:"ű",udhar:"⥮",ufisht:"⥾",ufr:"\uD835\uDD32",ugrave:"\xf9",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",umacr:"ū",uml:"\xa8",uogon:"ų",uopf:"\uD835\uDD66",uparrow:"↑",updownarrow:"↕",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",upsi:"υ",upsih:"ϒ",upsilon:"υ",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",uring:"ů",urtri:"◹",uscr:"\uD835\uDCCA",utdot:"⋰",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",uuml:"\xfc",uwangle:"⦧",vArr:"⇕",vBar:"⫨",vBarv:"⫩",vDash:"⊨",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",vcy:"в",vdash:"⊢",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",verbar:"|",vert:"|",vfr:"\uD835\uDD33",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",vopf:"\uD835\uDD67",vprop:"∝",vrtri:"⊳",vscr:"\uD835\uDCCB",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",vzigzag:"⦚",wcirc:"ŵ",wedbar:"⩟",wedge:"∧",wedgeq:"≙",weierp:"℘",wfr:"\uD835\uDD34",wopf:"\uD835\uDD68",wp:"℘",wr:"≀",wreath:"≀",wscr:"\uD835\uDCCC",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",xfr:"\uD835\uDD35",xhArr:"⟺",xharr:"⟷",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",xopf:"\uD835\uDD69",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",xscr:"\uD835\uDCCD",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",yacute:"\xfd",yacy:"я",ycirc:"ŷ",ycy:"ы",yen:"\xa5",yfr:"\uD835\uDD36",yicy:"ї",yopf:"\uD835\uDD6A",yscr:"\uD835\uDCCE",yucy:"ю",yuml:"\xff",zacute:"ź",zcaron:"ž",zcy:"з",zdot:"ż",zeetrf:"ℨ",zeta:"ζ",zfr:"\uD835\uDD37",zhcy:"ж",zigrarr:"⇝",zopf:"\uD835\uDD6B",zscr:"\uD835\uDCCF",zwj:"‍",zwnj:"‌"},td={}.hasOwnProperty;function tp(e){return!!td.call(tc,e)&&tc[e]}let tf={name:"characterReference",tokenize:function(e,t,n){let r,i;let o=this,a=0;return function(t){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(t),e.exit("characterReferenceMarker"),l};function l(t){return 35===t?(e.enter("characterReferenceMarkerNumeric"),e.consume(t),e.exit("characterReferenceMarkerNumeric"),s):(e.enter("characterReferenceValue"),r=31,i=eP,u(t))}function s(t){return 88===t||120===t?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(t),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),r=6,i=eL,u):(e.enter("characterReferenceValue"),r=7,i=eq,u(t))}function u(l){if(59===l&&a){let r=e.exit("characterReferenceValue");return i!==eP||tp(o.sliceSerialize(r))?(e.enter("characterReferenceMarker"),e.consume(l),e.exit("characterReferenceMarker"),e.exit("characterReference"),t):n(l)}return i(l)&&a++<r?(e.consume(l),u):n(l)}}},th={name:"characterEscape",tokenize:function(e,t,n){return function(t){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(t),e.exit("escapeMarker"),r};function r(r){return eM(r)?(e.enter("characterEscapeValue"),e.consume(r),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(r)}}},tm={name:"lineEnding",tokenize:function(e,t){return function(n){return e.enter("lineEnding"),e.consume(n),e.exit("lineEnding"),ej(e,t,"linePrefix")}}};function tg(e,t,n){let r=[],i=-1;for(;++i<e.length;){let o=e[i].resolveAll;o&&!r.includes(o)&&(t=o(t,n),r.push(o))}return t}let ty={name:"labelEnd",resolveAll:function(e){let t=-1,n=[];for(;++t<e.length;){let r=e[t][1];if(n.push(e[t]),"labelImage"===r.type||"labelLink"===r.type||"labelEnd"===r.type){let e="labelImage"===r.type?4:2;r.type="data",t+=e}}return e.length!==n.length&&ek(e,0,e.length,n),e},resolveTo:function(e,t){let n,r,i,o,a=e.length,l=0;for(;a--;)if(n=e[a][1],r){if("link"===n.type||"labelLink"===n.type&&n._inactive)break;"enter"===e[a][0]&&"labelLink"===n.type&&(n._inactive=!0)}else if(i){if("enter"===e[a][0]&&("labelImage"===n.type||"labelLink"===n.type)&&!n._balanced&&(r=a,"labelLink"!==n.type)){l=2;break}}else"labelEnd"===n.type&&(i=a);let s={type:"labelLink"===e[r][1].type?"link":"image",start:{...e[r][1].start},end:{...e[e.length-1][1].end}},u={type:"label",start:{...e[r][1].start},end:{...e[i][1].end}},c={type:"labelText",start:{...e[r+l+2][1].end},end:{...e[i-2][1].start}};return o=ew(o=[["enter",s,t],["enter",u,t]],e.slice(r+1,r+l+3)),o=ew(o,[["enter",c,t]]),o=ew(o,tg(t.parser.constructs.insideSpan.null,e.slice(r+l+4,i-3),t)),o=ew(o,[["exit",c,t],e[i-2],e[i-1],["exit",u,t]]),o=ew(o,e.slice(i+1)),o=ew(o,[["exit",s,t]]),ek(e,r,e.length,o),e},tokenize:function(e,t,n){let r,i;let o=this,a=o.events.length;for(;a--;)if(("labelImage"===o.events[a][1].type||"labelLink"===o.events[a][1].type)&&!o.events[a][1]._balanced){r=o.events[a][1];break}return function(t){return r?r._inactive?c(t):(i=o.parser.defined.includes(e7(o.sliceSerialize({start:r.end,end:o.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelEnd"),l):n(t)};function l(t){return 40===t?e.attempt(tb,u,i?u:c)(t):91===t?e.attempt(tv,u,i?s:c)(t):i?u(t):c(t)}function s(t){return e.attempt(tx,u,c)(t)}function u(e){return t(e)}function c(e){return r._balanced=!0,n(e)}}},tb={tokenize:function(e,t,n){return function(t){return e.enter("resource"),e.enter("resourceMarker"),e.consume(t),e.exit("resourceMarker"),r};function r(t){return eR(t)?e8(e,i)(t):i(t)}function i(t){return 41===t?u(t):e5(e,o,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(t)}function o(t){return eR(t)?e8(e,l)(t):u(t)}function a(e){return n(e)}function l(t){return 34===t||39===t||40===t?e9(e,s,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(t):u(t)}function s(t){return eR(t)?e8(e,u)(t):u(t)}function u(r){return 41===r?(e.enter("resourceMarker"),e.consume(r),e.exit("resourceMarker"),e.exit("resource"),t):n(r)}}},tv={tokenize:function(e,t,n){let r=this;return function(t){return e6.call(r,e,i,o,"reference","referenceMarker","referenceString")(t)};function i(e){return r.parser.defined.includes(e7(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}},tx={tokenize:function(e,t,n){return function(t){return e.enter("reference"),e.enter("referenceMarker"),e.consume(t),e.exit("referenceMarker"),r};function r(r){return 93===r?(e.enter("referenceMarker"),e.consume(r),e.exit("referenceMarker"),e.exit("reference"),t):n(r)}}},tk={name:"labelStartImage",resolveAll:ty.resolveAll,tokenize:function(e,t,n){let r=this;return function(t){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(t),e.exit("labelImageMarker"),i};function i(t){return 91===t?(e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelImage"),o):n(t)}function o(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}};function tw(e){return null===e||eR(e)||eB(e)?1:eF(e)?2:void 0}let tS={name:"attention",resolveAll:function(e,t){let n,r,i,o,a,l,s,u,c=-1;for(;++c<e.length;)if("enter"===e[c][0]&&"attentionSequence"===e[c][1].type&&e[c][1]._close){for(n=c;n--;)if("exit"===e[n][0]&&"attentionSequence"===e[n][1].type&&e[n][1]._open&&t.sliceSerialize(e[n][1]).charCodeAt(0)===t.sliceSerialize(e[c][1]).charCodeAt(0)){if((e[n][1]._close||e[c][1]._open)&&(e[c][1].end.offset-e[c][1].start.offset)%3&&!((e[n][1].end.offset-e[n][1].start.offset+e[c][1].end.offset-e[c][1].start.offset)%3))continue;l=e[n][1].end.offset-e[n][1].start.offset>1&&e[c][1].end.offset-e[c][1].start.offset>1?2:1;let d={...e[n][1].end},p={...e[c][1].start};tA(d,-l),tA(p,l),o={type:l>1?"strongSequence":"emphasisSequence",start:d,end:{...e[n][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...e[c][1].start},end:p},i={type:l>1?"strongText":"emphasisText",start:{...e[n][1].end},end:{...e[c][1].start}},r={type:l>1?"strong":"emphasis",start:{...o.start},end:{...a.end}},e[n][1].end={...o.start},e[c][1].start={...a.end},s=[],e[n][1].end.offset-e[n][1].start.offset&&(s=ew(s,[["enter",e[n][1],t],["exit",e[n][1],t]])),s=ew(s,[["enter",r,t],["enter",o,t],["exit",o,t],["enter",i,t]]),s=ew(s,tg(t.parser.constructs.insideSpan.null,e.slice(n+1,c),t)),s=ew(s,[["exit",i,t],["enter",a,t],["exit",a,t],["exit",r,t]]),e[c][1].end.offset-e[c][1].start.offset?(u=2,s=ew(s,[["enter",e[c][1],t],["exit",e[c][1],t]])):u=0,ek(e,n-1,c-n+3,s),c=n+s.length-u-2;break}}for(c=-1;++c<e.length;)"attentionSequence"===e[c][1].type&&(e[c][1].type="data");return e},tokenize:function(e,t){let n;let r=this.parser.constructs.attentionMarkers.null,i=this.previous,o=tw(i);return function(a){return n=a,e.enter("attentionSequence"),function a(l){if(l===n)return e.consume(l),a;let s=e.exit("attentionSequence"),u=tw(l),c=!u||2===u&&o||r.includes(l),d=!o||2===o&&u||r.includes(i);return s._open=!!(42===n?c:c&&(o||!d)),s._close=!!(42===n?d:d&&(u||!c)),t(l)}(a)}}};function tA(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}let tE={name:"labelStartLink",resolveAll:ty.resolveAll,tokenize:function(e,t,n){let r=this;return function(t){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(t),e.exit("labelMarker"),e.exit("labelLink"),i};function i(e){return 94===e&&"_hiddenFootnoteSupport"in r.parser.constructs?n(e):t(e)}}},tC={42:e0,43:e0,45:e0,48:e0,49:e0,50:e0,51:e0,52:e0,53:e0,54:e0,55:e0,56:e0,57:e0,62:e4},tT={91:{name:"definition",tokenize:function(e,t,n){let r;let i=this;return function(t){return e.enter("definition"),e6.call(i,e,o,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(t)};function o(t){return(r=e7(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),58===t)?(e.enter("definitionMarker"),e.consume(t),e.exit("definitionMarker"),a):n(t)}function a(t){return eR(t)?e8(e,l)(t):l(t)}function l(t){return e5(e,s,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(t)}function s(t){return e.attempt(te,u,u)(t)}function u(t){return eO(t)?ej(e,c,"whitespace")(t):c(t)}function c(o){return null===o||eN(o)?(e.exit("definition"),i.parser.defined.push(r),t(o)):n(o)}}}},tP={[-2]:tt,[-1]:tt,32:tt},tD={35:{name:"headingAtx",resolve:function(e,t){let n,r,i=e.length-2,o=3;return"whitespace"===e[3][1].type&&(o+=2),i-2>o&&"whitespace"===e[i][1].type&&(i-=2),"atxHeadingSequence"===e[i][1].type&&(o===i-1||i-4>o&&"whitespace"===e[i-2][1].type)&&(i-=o+1===i?2:4),i>o&&(n={type:"atxHeadingText",start:e[o][1].start,end:e[i][1].end},r={type:"chunkText",start:e[o][1].start,end:e[i][1].end,contentType:"text"},ek(e,o,i-o+1,[["enter",n,t],["enter",r,t],["exit",r,t],["exit",n,t]])),e},tokenize:function(e,t,n){let r=0;return function(i){return e.enter("atxHeading"),e.enter("atxHeadingSequence"),function i(o){return 35===o&&r++<6?(e.consume(o),i):null===o||eR(o)?(e.exit("atxHeadingSequence"),function n(r){return 35===r?(e.enter("atxHeadingSequence"),function t(r){return 35===r?(e.consume(r),t):(e.exit("atxHeadingSequence"),n(r))}(r)):null===r||eN(r)?(e.exit("atxHeading"),t(r)):eO(r)?ej(e,n,"whitespace")(r):(e.enter("atxHeadingText"),function t(r){return null===r||35===r||eR(r)?(e.exit("atxHeadingText"),n(r)):(e.consume(r),t)}(r))}(o)):n(o)}(i)}}},42:e1,45:[tr,e1],60:{concrete:!0,name:"htmlFlow",resolveTo:function(e){let t=e.length;for(;t--&&("enter"!==e[t][0]||"htmlFlow"!==e[t][1].type););return t>1&&"linePrefix"===e[t-2][1].type&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e},tokenize:function(e,t,n){let r,i,o,a,l;let s=this;return function(t){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(t),u};function u(a){return 33===a?(e.consume(a),c):47===a?(e.consume(a),i=!0,f):63===a?(e.consume(a),r=3,s.interrupt?t:L):eT(a)?(e.consume(a),o=String.fromCharCode(a),h):n(a)}function c(i){return 45===i?(e.consume(i),r=2,d):91===i?(e.consume(i),r=5,a=0,p):eT(i)?(e.consume(i),r=4,s.interrupt?t:L):n(i)}function d(r){return 45===r?(e.consume(r),s.interrupt?t:L):n(r)}function p(r){let i="CDATA[";return r===i.charCodeAt(a++)?(e.consume(r),a===i.length)?s.interrupt?t:A:p:n(r)}function f(t){return eT(t)?(e.consume(t),o=String.fromCharCode(t),h):n(t)}function h(a){if(null===a||47===a||62===a||eR(a)){let l=47===a,u=o.toLowerCase();return!l&&!i&&to.includes(u)?(r=1,s.interrupt?t(a):A(a)):ti.includes(o.toLowerCase())?(r=6,l)?(e.consume(a),m):s.interrupt?t(a):A(a):(r=7,s.interrupt&&!s.parser.lazy[s.now().line]?n(a):i?function t(n){return eO(n)?(e.consume(n),t):w(n)}(a):g(a))}return 45===a||eP(a)?(e.consume(a),o+=String.fromCharCode(a),h):n(a)}function m(r){return 62===r?(e.consume(r),s.interrupt?t:A):n(r)}function g(t){return 47===t?(e.consume(t),w):58===t||95===t||eT(t)?(e.consume(t),y):eO(t)?(e.consume(t),g):w(t)}function y(t){return 45===t||46===t||58===t||95===t||eP(t)?(e.consume(t),y):b(t)}function b(t){return 61===t?(e.consume(t),v):eO(t)?(e.consume(t),b):g(t)}function v(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),l=t,x):eO(t)?(e.consume(t),v):function t(n){return null===n||34===n||39===n||47===n||60===n||61===n||62===n||96===n||eR(n)?b(n):(e.consume(n),t)}(t)}function x(t){return t===l?(e.consume(t),l=null,k):null===t||eN(t)?n(t):(e.consume(t),x)}function k(e){return 47===e||62===e||eO(e)?g(e):n(e)}function w(t){return 62===t?(e.consume(t),S):n(t)}function S(t){return null===t||eN(t)?A(t):eO(t)?(e.consume(t),S):n(t)}function A(t){return 45===t&&2===r?(e.consume(t),P):60===t&&1===r?(e.consume(t),D):62===t&&4===r?(e.consume(t),M):63===t&&3===r?(e.consume(t),L):93===t&&5===r?(e.consume(t),q):eN(t)&&(6===r||7===r)?(e.exit("htmlFlowData"),e.check(ta,N,E)(t)):null===t||eN(t)?(e.exit("htmlFlowData"),E(t)):(e.consume(t),A)}function E(t){return e.check(tl,C,N)(t)}function C(t){return e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),T}function T(t){return null===t||eN(t)?E(t):(e.enter("htmlFlowData"),A(t))}function P(t){return 45===t?(e.consume(t),L):A(t)}function D(t){return 47===t?(e.consume(t),o="",I):A(t)}function I(t){if(62===t){let n=o.toLowerCase();return to.includes(n)?(e.consume(t),M):A(t)}return eT(t)&&o.length<8?(e.consume(t),o+=String.fromCharCode(t),I):A(t)}function q(t){return 93===t?(e.consume(t),L):A(t)}function L(t){return 62===t?(e.consume(t),M):45===t&&2===r?(e.consume(t),L):A(t)}function M(t){return null===t||eN(t)?(e.exit("htmlFlowData"),N(t)):(e.consume(t),M)}function N(n){return e.exit("htmlFlow"),t(n)}}},61:tr,95:e1,96:tu,126:tu},tI={38:tf,92:th},tq={[-5]:tm,[-4]:tm,[-3]:tm,33:tk,38:tf,42:tS,60:[{name:"autolink",tokenize:function(e,t,n){let r=0;return function(t){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(t),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),i};function i(t){return eT(t)?(e.consume(t),o):64===t?n(t):l(t)}function o(t){return 43===t||45===t||46===t||eP(t)?(r=1,function t(n){return 58===n?(e.consume(n),r=0,a):(43===n||45===n||46===n||eP(n))&&r++<32?(e.consume(n),t):(r=0,l(n))}(t)):l(t)}function a(r){return 62===r?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(r),e.exit("autolinkMarker"),e.exit("autolink"),t):null===r||32===r||60===r||eI(r)?n(r):(e.consume(r),a)}function l(t){return 64===t?(e.consume(t),s):eD(t)?(e.consume(t),l):n(t)}function s(i){return eP(i)?function i(o){return 46===o?(e.consume(o),r=0,s):62===o?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(o),e.exit("autolinkMarker"),e.exit("autolink"),t):function t(o){if((45===o||eP(o))&&r++<63){let n=45===o?t:i;return e.consume(o),n}return n(o)}(o)}(i):n(i)}}},{name:"htmlText",tokenize:function(e,t,n){let r,i,o;let a=this;return function(t){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(t),l};function l(t){return 33===t?(e.consume(t),s):47===t?(e.consume(t),x):63===t?(e.consume(t),b):eT(t)?(e.consume(t),w):n(t)}function s(t){return 45===t?(e.consume(t),u):91===t?(e.consume(t),i=0,f):eT(t)?(e.consume(t),y):n(t)}function u(t){return 45===t?(e.consume(t),p):n(t)}function c(t){return null===t?n(t):45===t?(e.consume(t),d):eN(t)?(o=c,I(t)):(e.consume(t),c)}function d(t){return 45===t?(e.consume(t),p):c(t)}function p(e){return 62===e?D(e):45===e?d(e):c(e)}function f(t){let r="CDATA[";return t===r.charCodeAt(i++)?(e.consume(t),i===r.length?h:f):n(t)}function h(t){return null===t?n(t):93===t?(e.consume(t),m):eN(t)?(o=h,I(t)):(e.consume(t),h)}function m(t){return 93===t?(e.consume(t),g):h(t)}function g(t){return 62===t?D(t):93===t?(e.consume(t),g):h(t)}function y(t){return null===t||62===t?D(t):eN(t)?(o=y,I(t)):(e.consume(t),y)}function b(t){return null===t?n(t):63===t?(e.consume(t),v):eN(t)?(o=b,I(t)):(e.consume(t),b)}function v(e){return 62===e?D(e):b(e)}function x(t){return eT(t)?(e.consume(t),k):n(t)}function k(t){return 45===t||eP(t)?(e.consume(t),k):function t(n){return eN(n)?(o=t,I(n)):eO(n)?(e.consume(n),t):D(n)}(t)}function w(t){return 45===t||eP(t)?(e.consume(t),w):47===t||62===t||eR(t)?S(t):n(t)}function S(t){return 47===t?(e.consume(t),D):58===t||95===t||eT(t)?(e.consume(t),A):eN(t)?(o=S,I(t)):eO(t)?(e.consume(t),S):D(t)}function A(t){return 45===t||46===t||58===t||95===t||eP(t)?(e.consume(t),A):function t(n){return 61===n?(e.consume(n),E):eN(n)?(o=t,I(n)):eO(n)?(e.consume(n),t):S(n)}(t)}function E(t){return null===t||60===t||61===t||62===t||96===t?n(t):34===t||39===t?(e.consume(t),r=t,C):eN(t)?(o=E,I(t)):eO(t)?(e.consume(t),E):(e.consume(t),T)}function C(t){return t===r?(e.consume(t),r=void 0,P):null===t?n(t):eN(t)?(o=C,I(t)):(e.consume(t),C)}function T(t){return null===t||34===t||39===t||60===t||61===t||96===t?n(t):47===t||62===t||eR(t)?S(t):(e.consume(t),T)}function P(e){return 47===e||62===e||eR(e)?S(e):n(e)}function D(r){return 62===r?(e.consume(r),e.exit("htmlTextData"),e.exit("htmlText"),t):n(r)}function I(t){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(t),e.exit("lineEnding"),q}function q(t){return eO(t)?ej(e,L,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(t):L(t)}function L(t){return e.enter("htmlTextData"),o(t)}}}],91:tE,92:[{name:"hardBreakEscape",tokenize:function(e,t,n){return function(t){return e.enter("hardBreakEscape"),e.consume(t),r};function r(r){return eN(r)?(e.exit("hardBreakEscape"),t(r)):n(r)}}},th],93:ty,95:tS,96:{name:"codeText",previous:function(e){return 96!==e||"characterEscape"===this.events[this.events.length-1][1].type},resolve:function(e){let t,n,r=e.length-4,i=3;if(("lineEnding"===e[3][1].type||"space"===e[i][1].type)&&("lineEnding"===e[r][1].type||"space"===e[r][1].type)){for(t=i;++t<r;)if("codeTextData"===e[t][1].type){e[i][1].type="codeTextPadding",e[r][1].type="codeTextPadding",i+=2,r-=2;break}}for(t=i-1,r++;++t<=r;)void 0===n?t!==r&&"lineEnding"!==e[t][1].type&&(n=t):(t===r||"lineEnding"===e[t][1].type)&&(e[n][1].type="codeTextData",t!==n+2&&(e[n][1].end=e[t-1][1].end,e.splice(n+2,t-n-2),r-=t-n-2,t=n+2),n=void 0);return e},tokenize:function(e,t,n){let r,i,o=0;return function(t){return e.enter("codeText"),e.enter("codeTextSequence"),function t(n){return 96===n?(e.consume(n),o++,t):(e.exit("codeTextSequence"),a(n))}(t)};function a(s){return null===s?n(s):32===s?(e.enter("space"),e.consume(s),e.exit("space"),a):96===s?(i=e.enter("codeTextSequence"),r=0,function n(a){return 96===a?(e.consume(a),r++,n):r===o?(e.exit("codeTextSequence"),e.exit("codeText"),t(a)):(i.type="codeTextData",l(a))}(s)):eN(s)?(e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),a):(e.enter("codeTextData"),l(s))}function l(t){return null===t||32===t||96===t||eN(t)?(e.exit("codeTextData"),a(t)):(e.consume(t),l)}}}},tL={null:[tS,eY]},tM={null:[42,95]},tN={null:[]},tR=/[\0\t\n\r]/g;function tO(e,t){let n=Number.parseInt(e,t);return n<9||11===n||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(65535&n)==65535||(65535&n)==65534||n>1114111?"�":String.fromCodePoint(n)}let tF=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function tB(e,t,n){if(t)return t;if(35===n.charCodeAt(0)){let e=n.charCodeAt(1),t=120===e||88===e;return tO(n.slice(t?2:1),t?16:10)}return tp(n)||e}let tz={}.hasOwnProperty;function tj(e){return{line:e.line,column:e.column,offset:e.offset}}function tH(e,t){if(e)throw Error("Cannot close `"+e.type+"` ("+$({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+$({start:t.start,end:t.end})+") is open");throw Error("Cannot close document, a token (`"+t.type+"`, "+$({start:t.start,end:t.end})+") is still open")}function t_(e){let t=this;t.parser=function(n){var r,o;let a,l,s,u;return"string"!=typeof(r={...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})&&(o=r,r=void 0),(function(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:r(y),autolinkProtocol:u,autolinkEmail:u,atxHeading:r(h),blockQuote:r(function(){return{type:"blockquote",children:[]}}),characterEscape:u,characterReference:u,codeFenced:r(f),codeFencedFenceInfo:i,codeFencedFenceMeta:i,codeIndented:r(f,i),codeText:r(function(){return{type:"inlineCode",value:""}},i),codeTextData:u,data:u,codeFlowValue:u,definition:r(function(){return{type:"definition",identifier:"",label:null,title:null,url:""}}),definitionDestinationString:i,definitionLabelString:i,definitionTitleString:i,emphasis:r(function(){return{type:"emphasis",children:[]}}),hardBreakEscape:r(m),hardBreakTrailing:r(m),htmlFlow:r(g,i),htmlFlowData:u,htmlText:r(g,i),htmlTextData:u,image:r(function(){return{type:"image",title:null,url:"",alt:null}}),label:i,link:r(y),listItem:r(function(e){return{type:"listItem",spread:e._spread,checked:null,children:[]}}),listItemValue:function(e){this.data.expectingFirstListItemValue&&(this.stack[this.stack.length-2].start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0)},listOrdered:r(b,function(){this.data.expectingFirstListItemValue=!0}),listUnordered:r(b),paragraph:r(function(){return{type:"paragraph",children:[]}}),reference:function(){this.data.referenceType="collapsed"},referenceString:i,resourceDestinationString:i,resourceTitleString:i,setextHeading:r(h),strong:r(function(){return{type:"strong",children:[]}}),thematicBreak:r(function(){return{type:"thematicBreak"}})},exit:{atxHeading:a(),atxHeadingSequence:function(e){let t=this.stack[this.stack.length-1];if(!t.depth){let n=this.sliceSerialize(e).length;t.depth=n}},autolink:a(),autolinkEmail:function(e){c.call(this,e),this.stack[this.stack.length-1].url="mailto:"+this.sliceSerialize(e)},autolinkProtocol:function(e){c.call(this,e),this.stack[this.stack.length-1].url=this.sliceSerialize(e)},blockQuote:a(),characterEscapeValue:c,characterReferenceMarkerHexadecimal:p,characterReferenceMarkerNumeric:p,characterReferenceValue:function(e){let t;let n=this.sliceSerialize(e),r=this.data.characterReferenceType;r?(t=tO(n,"characterReferenceMarkerNumeric"===r?10:16),this.data.characterReferenceType=void 0):t=tp(n);let i=this.stack[this.stack.length-1];i.value+=t},characterReference:function(e){this.stack.pop().position.end=tj(e.end)},codeFenced:a(function(){let e=this.resume();this.stack[this.stack.length-1].value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}),codeFencedFence:function(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)},codeFencedFenceInfo:function(){let e=this.resume();this.stack[this.stack.length-1].lang=e},codeFencedFenceMeta:function(){let e=this.resume();this.stack[this.stack.length-1].meta=e},codeFlowValue:c,codeIndented:a(function(){let e=this.resume();this.stack[this.stack.length-1].value=e.replace(/(\r?\n|\r)$/g,"")}),codeText:a(function(){let e=this.resume();this.stack[this.stack.length-1].value=e}),codeTextData:c,data:c,definition:a(),definitionDestinationString:function(){let e=this.resume();this.stack[this.stack.length-1].url=e},definitionLabelString:function(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=e7(this.sliceSerialize(e)).toLowerCase()},definitionTitleString:function(){let e=this.resume();this.stack[this.stack.length-1].title=e},emphasis:a(),hardBreakEscape:a(d),hardBreakTrailing:a(d),htmlFlow:a(function(){let e=this.resume();this.stack[this.stack.length-1].value=e}),htmlFlowData:c,htmlText:a(function(){let e=this.resume();this.stack[this.stack.length-1].value=e}),htmlTextData:c,image:a(function(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}),label:function(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];if(this.data.inReference=!0,"link"===n.type){let t=e.children;n.children=t}else n.alt=t},labelText:function(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=t.replace(tF,tB),n.identifier=e7(t).toLowerCase()},lineEnding:function(e){let n=this.stack[this.stack.length-1];if(this.data.atHardBreak){n.children[n.children.length-1].position.end=tj(e.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(u.call(this,e),c.call(this,e))},link:a(function(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||"shortcut";e.type+="Reference",e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}),listItem:a(),listOrdered:a(),listUnordered:a(),paragraph:a(),referenceString:function(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=e7(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType="full"},resourceDestinationString:function(){let e=this.resume();this.stack[this.stack.length-1].url=e},resourceTitleString:function(){let e=this.resume();this.stack[this.stack.length-1].title=e},resource:function(){this.data.inReference=void 0},setextHeading:a(function(){this.data.setextHeadingSlurpLineEnding=void 0}),setextHeadingLineSequence:function(e){this.stack[this.stack.length-1].depth=61===this.sliceSerialize(e).codePointAt(0)?1:2},setextHeadingText:function(){this.data.setextHeadingSlurpLineEnding=!0},strong:a(),thematicBreak:a()}};(function e(t,n){let r=-1;for(;++r<n.length;){let i=n[r];Array.isArray(i)?e(t,i):function(e,t){let n;for(n in t)if(tz.call(t,n))switch(n){case"canContainEols":{let r=t[n];r&&e[n].push(...r);break}case"transforms":{let r=t[n];r&&e[n].push(...r);break}case"enter":case"exit":{let r=t[n];r&&Object.assign(e[n],r)}}}(t,i)}})(t,(e||{}).mdastExtensions||[]);let n={};return function(e){let r={type:"root",children:[]},a={stack:[r],tokenStack:[],config:t,enter:o,exit:l,buffer:i,resume:s,data:n},u=[],c=-1;for(;++c<e.length;)("listOrdered"===e[c][1].type||"listUnordered"===e[c][1].type)&&("enter"===e[c][0]?u.push(c):c=function(e,t,n){let r,i,o,a,l=t-1,s=-1,u=!1;for(;++l<=n;){let t=e[l];switch(t[1].type){case"listUnordered":case"listOrdered":case"blockQuote":"enter"===t[0]?s++:s--,a=void 0;break;case"lineEndingBlank":"enter"===t[0]&&(!r||a||s||o||(o=l),a=void 0);break;case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:a=void 0}if(!s&&"enter"===t[0]&&"listItemPrefix"===t[1].type||-1===s&&"exit"===t[0]&&("listUnordered"===t[1].type||"listOrdered"===t[1].type)){if(r){let a=l;for(i=void 0;a--;){let t=e[a];if("lineEnding"===t[1].type||"lineEndingBlank"===t[1].type){if("exit"===t[0])continue;i&&(e[i][1].type="lineEndingBlank",u=!0),t[1].type="lineEnding",i=a}else if("linePrefix"===t[1].type||"blockQuotePrefix"===t[1].type||"blockQuotePrefixWhitespace"===t[1].type||"blockQuoteMarker"===t[1].type||"listItemIndent"===t[1].type);else break}o&&(!i||o<i)&&(r._spread=!0),r.end=Object.assign({},i?e[i][1].start:t[1].end),e.splice(i||l,0,["exit",r,t[2]]),l++,n++}if("listItemPrefix"===t[1].type){let i={type:"listItem",_spread:!1,start:Object.assign({},t[1].start),end:void 0};r=i,e.splice(l,0,["enter",i,t[2]]),l++,n++,o=void 0,a=!0}}}return e[t][1]._spread=u,n}(e,u.pop(),c));for(c=-1;++c<e.length;){let n=t[e[c][0]];tz.call(n,e[c][1].type)&&n[e[c][1].type].call(Object.assign({sliceSerialize:e[c][2].sliceSerialize},a),e[c][1])}if(a.tokenStack.length>0){let e=a.tokenStack[a.tokenStack.length-1];(e[1]||tH).call(a,void 0,e[0])}for(r.position={start:tj(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:tj(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},c=-1;++c<t.transforms.length;)r=t.transforms[c](r)||r;return r};function r(e,t){return function(n){o.call(this,e(n),n),t&&t.call(this,n)}}function i(){this.stack.push({type:"fragment",children:[]})}function o(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:tj(t.start),end:void 0}}function a(e){return function(t){e&&e.call(this,t),l.call(this,t)}}function l(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(r)r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||tH).call(this,e,r[0]));else throw Error("Cannot close `"+e.type+"` ("+$({start:e.start,end:e.end})+"): it’s not open");n.position.end=tj(e.end)}function s(){return ev(this.stack.pop(),"boolean"!=typeof eb.includeImageAlt||eb.includeImageAlt,"boolean"!=typeof eb.includeHtml||eb.includeHtml)}function u(e){let t=this.stack[this.stack.length-1].children,n=t[t.length-1];n&&"text"===n.type||((n={type:"text",value:""}).position={start:tj(e.start),end:void 0},t.push(n)),this.stack.push(n)}function c(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=tj(e.end)}function d(){this.data.atHardBreak=!0}function p(e){this.data.characterReferenceType=e.type}function f(){return{type:"code",lang:null,meta:null,value:""}}function h(){return{type:"heading",depth:0,children:[]}}function m(){return{type:"break"}}function g(){return{type:"html",value:""}}function y(){return{type:"link",title:null,url:"",children:[]}}function b(e){return{type:"list",ordered:"listOrdered"===e.type,start:null,spread:e._spread,children:[]}}})(o)(function(e){for(;!eE(e););return e}((function(e){let t={constructs:function(e){let t={},n=-1;for(;++n<e.length;)(function(e,t){let n;for(n in t){let r;let i=(eC.call(e,n)?e[n]:void 0)||(e[n]={}),o=t[n];if(o)for(r in o){eC.call(i,r)||(i[r]=[]);let e=o[r];(function(e,t){let n=-1,r=[];for(;++n<t.length;)("after"===t[n].add?e:r).push(t[n]);ek(e,0,0,r)})(i[r],Array.isArray(e)?e:e?[e]:[])}}})(t,e[n]);return t}([i,...(e||{}).extensions||[]]),content:n(eH),defined:[],document:n(e_),flow:n(eK),lazy:{},string:n(eQ),text:n(eZ)};return t;function n(e){return function(n){return function(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},i={},o=[],a=[],l=[],s={attempt:h(function(e,t){m(e,t.from)}),check:h(f),consume:function(e){eN(e)?(r.line++,r.column=1,r.offset+=-3===e?2:1,g()):-1!==e&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===a[r._index].length&&(r._bufferIndex=-1,r._index++)),u.previous=e},enter:function(e,t){let n=t||{};return n.type=e,n.start=p(),u.events.push(["enter",n,u]),l.push(n),n},exit:function(e){let t=l.pop();return t.end=p(),u.events.push(["exit",t,u]),t},interrupt:h(f,{interrupt:!0})},u={code:null,containerState:{},defineSkip:function(e){i[e.line]=e.column,g()},events:[],now:p,parser:e,previous:null,sliceSerialize:function(e,t){return function(e,t){let n,r=-1,i=[];for(;++r<e.length;){let o;let a=e[r];if("string"==typeof a)o=a;else switch(a){case -5:o="\r";break;case -4:o="\n";break;case -3:o="\r\n";break;case -2:o=t?" ":"	";break;case -1:if(!t&&n)continue;o=" ";break;default:o=String.fromCharCode(a)}n=-2===a,i.push(o)}return i.join("")}(d(e),t)},sliceStream:d,write:function(e){return(a=ew(a,e),function(){let e;for(;r._index<a.length;){let n=a[r._index];if("string"==typeof n)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<n.length;){var t;t=n.charCodeAt(r._bufferIndex),c=c(t)}else c=c(n)}}(),null!==a[a.length-1])?[]:(m(t,0),u.events=tg(o,u.events,u),u.events)}},c=t.tokenize.call(u,s);return t.resolveAll&&o.push(t),u;function d(e){return function(e,t){let n;let r=t.start._index,i=t.start._bufferIndex,o=t.end._index,a=t.end._bufferIndex;if(r===o)n=[e[r].slice(i,a)];else{if(n=e.slice(r,o),i>-1){let e=n[0];"string"==typeof e?n[0]=e.slice(i):n.shift()}a>0&&n.push(e[o].slice(0,a))}return n}(a,e)}function p(){let{_bufferIndex:e,_index:t,line:n,column:i,offset:o}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:o}}function f(e,t){t.restore()}function h(e,t){return function(n,i,o){let a,c,d,f;return Array.isArray(n)?h(n):"tokenize"in n?h([n]):function(e){let t=null!==e&&n[e],r=null!==e&&n.null;return h([...Array.isArray(t)?t:t?[t]:[],...Array.isArray(r)?r:r?[r]:[]])(e)};function h(e){return(a=e,c=0,0===e.length)?o:m(e[c])}function m(e){return function(n){return(f=function(){let e=p(),t=u.previous,n=u.currentConstruct,i=u.events.length,o=Array.from(l);return{from:i,restore:function(){r=e,u.previous=t,u.currentConstruct=n,u.events.length=i,l=o,g()}}}(),d=e,e.partial||(u.currentConstruct=e),e.name&&u.parser.constructs.disable.null.includes(e.name))?b(n):e.tokenize.call(t?Object.assign(Object.create(u),t):u,s,y,b)(n)}}function y(t){return e(d,f),i}function b(e){return(f.restore(),++c<a.length)?m(a[c]):o}}}function m(e,t){e.resolveAll&&!o.includes(e)&&o.push(e),e.resolve&&ek(u.events,t,u.events.length-t,e.resolve(u.events.slice(t),u)),e.resolveTo&&(u.events=e.resolveTo(u.events,u))}function g(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}(t,e,n)}}})(o).document().write((l=1,s="",u=!0,function(e,t,n){let r,i,o,c,d;let p=[];for(e=s+("string"==typeof e?e.toString():new TextDecoder(t||void 0).decode(e)),o=0,s="",u&&(65279===e.charCodeAt(0)&&o++,u=void 0);o<e.length;){if(tR.lastIndex=o,c=(r=tR.exec(e))&&void 0!==r.index?r.index:e.length,d=e.charCodeAt(c),!r){s=e.slice(o);break}if(10===d&&o===c&&a)p.push(-3),a=void 0;else switch(a&&(p.push(-5),a=void 0),o<c&&(p.push(e.slice(o,c)),l+=c-o),d){case 0:p.push(65533),l++;break;case 9:for(i=4*Math.ceil(l/4),p.push(-2);l++<i;)p.push(-1);break;case 10:p.push(-4),l=1;break;default:a=!0,l=1}o=c+1}return n&&(a&&p.push(-5),s&&p.push(s),p.push(null)),p})(n,r,!0))))}}let tU="object"==typeof self?self:globalThis,tV=(e,t)=>{let n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);let[o,a]=t[i];switch(o){case 0:case -1:return n(a,i);case 1:{let e=n([],i);for(let t of a)e.push(r(t));return e}case 2:{let e=n({},i);for(let[t,n]of a)e[r(t)]=r(n);return e}case 3:return n(new Date(a),i);case 4:{let{source:e,flags:t}=a;return n(new RegExp(e,t),i)}case 5:{let e=n(new Map,i);for(let[t,n]of a)e.set(r(t),r(n));return e}case 6:{let e=n(new Set,i);for(let t of a)e.add(r(t));return e}case 7:{let{name:e,message:t}=a;return n(new tU[e](t),i)}case 8:return n(BigInt(a),i);case"BigInt":return n(Object(BigInt(a)),i);case"ArrayBuffer":return n(new Uint8Array(a).buffer,a);case"DataView":{let{buffer:e}=new Uint8Array(a);return n(new DataView(e),a)}}return n(new tU[o](a),i)};return r},tG=e=>tV(new Map,e)(0),{toString:tW}={},{keys:tK}=Object,tY=e=>{let t=typeof e;if("object"!==t||!e)return[0,t];let n=tW.call(e).slice(8,-1);switch(n){case"Array":return[1,""];case"Object":return[2,""];case"Date":return[3,""];case"RegExp":return[4,""];case"Map":return[5,""];case"Set":return[6,""];case"DataView":return[1,n]}return n.includes("Array")?[1,n]:n.includes("Error")?[7,n]:[2,n]},tQ=([e,t])=>0===e&&("function"===t||"symbol"===t),tZ=(e,t,n,r)=>{let i=(e,t)=>{let i=r.push(e)-1;return n.set(t,i),i},o=r=>{if(n.has(r))return n.get(r);let[a,l]=tY(r);switch(a){case 0:{let t=r;switch(l){case"bigint":a=8,t=r.toString();break;case"function":case"symbol":if(e)throw TypeError("unable to serialize "+l);t=null;break;case"undefined":return i([-1],r)}return i([a,t],r)}case 1:{if(l){let e=r;return"DataView"===l?e=new Uint8Array(r.buffer):"ArrayBuffer"===l&&(e=new Uint8Array(r)),i([l,[...e]],r)}let e=[],t=i([a,e],r);for(let t of r)e.push(o(t));return t}case 2:{if(l)switch(l){case"BigInt":return i([l,r.toString()],r);case"Boolean":case"Number":case"String":return i([l,r.valueOf()],r)}if(t&&"toJSON"in r)return o(r.toJSON());let n=[],s=i([a,n],r);for(let t of tK(r))(e||!tQ(tY(r[t])))&&n.push([o(t),o(r[t])]);return s}case 3:return i([a,r.toISOString()],r);case 4:{let{source:e,flags:t}=r;return i([a,{source:e,flags:t}],r)}case 5:{let t=[],n=i([a,t],r);for(let[n,i]of r)(e||!(tQ(tY(n))||tQ(tY(i))))&&t.push([o(n),o(i)]);return n}case 6:{let t=[],n=i([a,t],r);for(let n of r)(e||!tQ(tY(n)))&&t.push(o(n));return n}}let{message:s}=r;return i([a,{name:l,message:s}],r)};return o},tJ=(e,{json:t,lossy:n}={})=>{let r=[];return tZ(!(t||n),!!t,new Map,r)(e),r},tX="function"==typeof structuredClone?(e,t)=>t&&("json"in t||"lossy"in t)?tG(tJ(e,t)):structuredClone(e):(e,t)=>tG(tJ(e,t));function t$(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let o=e.charCodeAt(n),a="";if(37===o&&eP(e.charCodeAt(n+1))&&eP(e.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(a=String.fromCharCode(o));else if(o>55295&&o<57344){let t=e.charCodeAt(n+1);o<56320&&t>56319&&t<57344?(a=String.fromCharCode(o,t),i=1):a="�"}else a=String.fromCharCode(o);a&&(t.push(e.slice(r,n),encodeURIComponent(a)),r=n+i+1,a=""),i&&(n+=i,i=0)}return t.join("")+e.slice(r)}function t1(e,t){let n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function t0(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}let t2=function(e){if(null==e)return t4;if("function"==typeof e)return t3(e);if("object"==typeof e)return Array.isArray(e)?function(e){let t=[],n=-1;for(;++n<e.length;)t[n]=t2(e[n]);return t3(function(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1})}(e):t3(function(t){let n;for(n in e)if(t[n]!==e[n])return!1;return!0});if("string"==typeof e)return t3(function(t){return t&&t.type===e});throw Error("Expected function, string, or object as test")};function t3(e){return function(t,n,r){var i;return!!(null!==(i=t)&&"object"==typeof i&&"type"in i&&e.call(this,t,"number"==typeof n?n:void 0,r||void 0))}}function t4(){return!0}let t5=[];function t6(e,t,n,r){let i,o,a;"function"==typeof t&&"function"!=typeof n?(o=void 0,a=t,i=n):(o=t,a=n,i=r),function(e,t,n,r){let i;"function"==typeof t&&"function"!=typeof n?(r=n,n=t):i=t;let o=t2(i),a=r?-1:1;(function e(i,l,s){let u=i&&"object"==typeof i?i:{};if("string"==typeof u.type){let e="string"==typeof u.tagName?u.tagName:"string"==typeof u.name?u.name:void 0;Object.defineProperty(c,"name",{value:"node (\x1b[33m"+i.type+(e?"<"+e+">":"")+"\x1b[39m)"})}return c;function c(){var u;let c,d,p,f=t5;if((!t||o(i,l,s[s.length-1]||void 0))&&!1===(f=Array.isArray(u=n(i,s))?u:"number"==typeof u?[!0,u]:null==u?t5:[u])[0])return f;if("children"in i&&i.children&&i.children&&"skip"!==f[0])for(d=(r?i.children.length:-1)+a,p=s.concat(i);d>-1&&d<i.children.length;){if(!1===(c=e(i.children[d],d,p)())[0])return c;d="number"==typeof c[1]?c[1]:d+a}return f}})(e,void 0,[])()}(e,o,function(e,t){let n=t[t.length-1],r=n?n.children.indexOf(e):void 0;return a(e,r,n)},i)}function t9(e,t){let n=t.referenceType,r="]";if("collapsed"===n?r+="[]":"full"===n&&(r+="["+(t.label||t.identifier)+"]"),"imageReference"===t.type)return[{type:"text",value:"!["+t.alt+r}];let i=e.all(t),o=i[0];o&&"text"===o.type?o.value="["+o.value:i.unshift({type:"text",value:"["});let a=i[i.length-1];return a&&"text"===a.type?a.value+=r:i.push({type:"text",value:r}),i}function t8(e){let t=e.spread;return null==t?e.children.length>1:t}function t7(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;9===t||32===t;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;9===t||32===t;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):""}let ne={blockquote:function(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)},break:function(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:"\n"}]},code:function(e,t){let n=t.value?t.value+"\n":"",r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=["language-"+i[0]]);let o={type:"element",tagName:"code",properties:r,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o={type:"element",tagName:"pre",properties:{},children:[o=e.applyData(t,o)]},e.patch(t,o),o},delete:function(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},emphasis:function(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},footnoteReference:function(e,t){let n;let r="string"==typeof e.options.clobberPrefix?e.options.clobberPrefix:"user-content-",i=String(t.identifier).toUpperCase(),o=t$(i.toLowerCase()),a=e.footnoteOrder.indexOf(i),l=e.footnoteCounts.get(i);void 0===l?(l=0,e.footnoteOrder.push(i),n=e.footnoteOrder.length):n=a+1,l+=1,e.footnoteCounts.set(i,l);let s={type:"element",tagName:"a",properties:{href:"#"+r+"fn-"+o,id:r+"fnref-"+o+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(n)}]};e.patch(t,s);let u={type:"element",tagName:"sup",properties:{},children:[s]};return e.patch(t,u),e.applyData(t,u)},heading:function(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},html:function(e,t){if(e.options.allowDangerousHtml){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}},imageReference:function(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return t9(e,t);let i={src:t$(r.url||""),alt:t.alt};null!==r.title&&void 0!==r.title&&(i.title=r.title);let o={type:"element",tagName:"img",properties:i,children:[]};return e.patch(t,o),e.applyData(t,o)},image:function(e,t){let n={src:t$(t.url)};null!==t.alt&&void 0!==t.alt&&(n.alt=t.alt),null!==t.title&&void 0!==t.title&&(n.title=t.title);let r={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)},inlineCode:function(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let r={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)},linkReference:function(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return t9(e,t);let i={href:t$(r.url||"")};null!==r.title&&void 0!==r.title&&(i.title=r.title);let o={type:"element",tagName:"a",properties:i,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)},link:function(e,t){let n={href:t$(t.url)};null!==t.title&&void 0!==t.title&&(n.title=t.title);let r={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)},listItem:function(e,t,n){let r=e.all(t),i=n?function(e){let t=!1;if("list"===e.type){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=t8(n[r])}return t}(n):t8(t),o={},a=[];if("boolean"==typeof t.checked){let e;let n=r[0];n&&"element"===n.type&&"p"===n.tagName?e=n:(e={type:"element",tagName:"p",properties:{},children:[]},r.unshift(e)),e.children.length>0&&e.children.unshift({type:"text",value:" "}),e.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let l=-1;for(;++l<r.length;){let e=r[l];(i||0!==l||"element"!==e.type||"p"!==e.tagName)&&a.push({type:"text",value:"\n"}),"element"!==e.type||"p"!==e.tagName||i?a.push(e):a.push(...e.children)}let s=r[r.length-1];s&&(i||"element"!==s.type||"p"!==s.tagName)&&a.push({type:"text",value:"\n"});let u={type:"element",tagName:"li",properties:o,children:a};return e.patch(t,u),e.applyData(t,u)},list:function(e,t){let n={},r=e.all(t),i=-1;for("number"==typeof t.start&&1!==t.start&&(n.start=t.start);++i<r.length;){let e=r[i];if("element"===e.type&&"li"===e.tagName&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)},paragraph:function(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},root:function(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)},strong:function(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},table:function(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let n={type:"element",tagName:"thead",properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){let r={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},o=J(t.children[1]),a=Z(t.children[t.children.length-1]);o&&a&&(r.position={start:o,end:a}),i.push(r)}let o={type:"element",tagName:"table",properties:{},children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)},tableCell:function(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)},tableRow:function(e,t,n){let r=n?n.children:void 0,i=0===(r?r.indexOf(t):1)?"th":"td",o=n&&"table"===n.type?n.align:void 0,a=o?o.length:t.children.length,l=-1,s=[];for(;++l<a;){let n=t.children[l],r={},a=o?o[l]:void 0;a&&(r.align=a);let u={type:"element",tagName:i,properties:r,children:[]};n&&(u.children=e.all(n),e.patch(n,u),u=e.applyData(n,u)),s.push(u)}let u={type:"element",tagName:"tr",properties:{},children:e.wrap(s,!0)};return e.patch(t,u),e.applyData(t,u)},text:function(e,t){let n={type:"text",value:function(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,o=[];for(;r;)o.push(t7(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return o.push(t7(t.slice(i),i>0,!1)),o.join("")}(String(t.value))};return e.patch(t,n),e.applyData(t,n)},thematicBreak:function(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)},toml:nt,yaml:nt,definition:nt,footnoteDefinition:nt};function nt(){}let nn={}.hasOwnProperty,nr={};function ni(e,t){e.position&&(t.position=function(e){let t=J(e),n=Z(e);if(t&&n)return{start:t,end:n}}(e))}function no(e,t){let n=t;if(e&&e.data){let t=e.data.hName,r=e.data.hChildren,i=e.data.hProperties;"string"==typeof t&&("element"===n.type?n.tagName=t:n={type:"element",tagName:t,properties:{},children:"children"in n?n.children:[n]}),"element"===n.type&&i&&Object.assign(n.properties,tX(i)),"children"in n&&n.children&&null!=r&&(n.children=r)}return n}function na(e,t){let n=[],r=-1;for(t&&n.push({type:"text",value:"\n"});++r<e.length;)r&&n.push({type:"text",value:"\n"}),n.push(e[r]);return t&&e.length>0&&n.push({type:"text",value:"\n"}),n}function nl(e){let t=0,n=e.charCodeAt(t);for(;9===n||32===n;)t++,n=e.charCodeAt(t);return e.slice(t)}function ns(e,t){let n=function(e,t){let n=t||nr,r=new Map,i=new Map,o={all:function(e){let t=[];if("children"in e){let n=e.children,r=-1;for(;++r<n.length;){let i=o.one(n[r],e);if(i){if(r&&"break"===n[r-1].type&&(Array.isArray(i)||"text"!==i.type||(i.value=nl(i.value)),!Array.isArray(i)&&"element"===i.type)){let e=i.children[0];e&&"text"===e.type&&(e.value=nl(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t},applyData:no,definitionById:r,footnoteById:i,footnoteCounts:new Map,footnoteOrder:[],handlers:{...ne,...n.handlers},one:function(e,t){let n=e.type,r=o.handlers[n];if(nn.call(o.handlers,n)&&r)return r(o,e,t);if(o.options.passThrough&&o.options.passThrough.includes(n)){if("children"in e){let{children:t,...n}=e,r=tX(n);return r.children=o.all(e),r}return tX(e)}return(o.options.unknownHandler||function(e,t){let n=t.data||{},r="value"in t&&!(nn.call(n,"hProperties")||nn.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)})(o,e,t)},options:n,patch:ni,wrap:na};return t6(e,function(e){if("definition"===e.type||"footnoteDefinition"===e.type){let t="definition"===e.type?r:i,n=String(e.identifier).toUpperCase();t.has(n)||t.set(n,e)}}),o}(e,t),r=n.one(e,void 0),i=function(e){let t="string"==typeof e.options.clobberPrefix?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||t1,r=e.options.footnoteBackLabel||t0,i=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",a=e.options.footnoteLabelProperties||{className:["sr-only"]},l=[],s=-1;for(;++s<e.footnoteOrder.length;){let i=e.footnoteById.get(e.footnoteOrder[s]);if(!i)continue;let o=e.all(i),a=String(i.identifier).toUpperCase(),u=t$(a.toLowerCase()),c=0,d=[],p=e.footnoteCounts.get(a);for(;void 0!==p&&++c<=p;){d.length>0&&d.push({type:"text",value:" "});let e="string"==typeof n?n:n(s,c);"string"==typeof e&&(e={type:"text",value:e}),d.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+u+(c>1?"-"+c:""),dataFootnoteBackref:"",ariaLabel:"string"==typeof r?r:r(s,c),className:["data-footnote-backref"]},children:Array.isArray(e)?e:[e]})}let f=o[o.length-1];if(f&&"element"===f.type&&"p"===f.tagName){let e=f.children[f.children.length-1];e&&"text"===e.type?e.value+=" ":f.children.push({type:"text",value:" "}),f.children.push(...d)}else o.push(...d);let h={type:"element",tagName:"li",properties:{id:t+"fn-"+u},children:e.wrap(o,!0)};e.patch(i,h),l.push(h)}if(0!==l.length)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...tX(a),id:"footnote-label"},children:[{type:"text",value:i}]},{type:"text",value:"\n"},{type:"element",tagName:"ol",properties:{},children:e.wrap(l,!0)},{type:"text",value:"\n"}]}}(n),o=Array.isArray(r)?{type:"root",children:r}:r||{type:"root",children:[]};return i&&o.children.push({type:"text",value:"\n"},i),o}function nu(e,t){return e&&"run"in e?async function(n,r){let i=ns(n,{file:r,...t});await e.run(i,r)}:function(n,r){return ns(n,{file:r,...e||t})}}function nc(e){if(e)throw e}var nd=n(71771);function np(e){if("object"!=typeof e||null===e)return!1;let t=Object.getPrototypeOf(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}let nf=require("node:path"),nh=require("node:process");function nm(e){return!!(null!==e&&"object"==typeof e&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&void 0===e.auth)}let ng=require("node:url"),ny=["history","path","basename","stem","extname","dirname"];class nb{constructor(e){let t,n;t=e?nm(e)?{path:e}:"string"==typeof e||function(e){return!!(e&&"object"==typeof e&&"byteLength"in e&&"byteOffset"in e)}(e)?{value:e}:e:{},this.cwd="cwd"in t?"":nh.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let r=-1;for(;++r<ny.length;){let e=ny[r];e in t&&void 0!==t[e]&&null!==t[e]&&(this[e]="history"===e?[...t[e]]:t[e])}for(n in t)ny.includes(n)||(this[n]=t[n])}get basename(){return"string"==typeof this.path?nf.basename(this.path):void 0}set basename(e){nx(e,"basename"),nv(e,"basename"),this.path=nf.join(this.dirname||"",e)}get dirname(){return"string"==typeof this.path?nf.dirname(this.path):void 0}set dirname(e){nk(this.basename,"dirname"),this.path=nf.join(e||"",this.basename)}get extname(){return"string"==typeof this.path?nf.extname(this.path):void 0}set extname(e){if(nv(e,"extname"),nk(this.dirname,"extname"),e){if(46!==e.codePointAt(0))throw Error("`extname` must start with `.`");if(e.includes(".",1))throw Error("`extname` cannot contain multiple dots")}this.path=nf.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){nm(e)&&(e=(0,ng.fileURLToPath)(e)),nx(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return"string"==typeof this.path?nf.basename(this.path,this.extname):void 0}set stem(e){nx(e,"stem"),nv(e,"stem"),this.path=nf.join(this.dirname||"",e+(this.extname||""))}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){let r=new er(e,t,n);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return void 0===this.value?"":"string"==typeof this.value?this.value:new TextDecoder(e||void 0).decode(this.value)}}function nv(e,t){if(e&&e.includes(nf.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+nf.sep+"`")}function nx(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function nk(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}let nw=function(e){let t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r},nS={}.hasOwnProperty;class nA extends nw{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=function(){let e=[],t={run:function(...t){let n=-1,r=t.pop();if("function"!=typeof r)throw TypeError("Expected function as last argument, not "+r);(function i(o,...a){let l=e[++n],s=-1;if(o){r(o);return}for(;++s<t.length;)(null===a[s]||void 0===a[s])&&(a[s]=t[s]);t=a,l?(function(e,t){let n;return function(...t){let o;let a=e.length>t.length;a&&t.push(r);try{o=e.apply(this,t)}catch(e){if(a&&n)throw e;return r(e)}a||(o&&o.then&&"function"==typeof o.then?o.then(i,r):o instanceof Error?r(o):i(o))};function r(e,...i){n||(n=!0,t(e,...i))}function i(e){r(null,e)}})(l,i)(...a):r(null,...a)})(null,...t)},use:function(n){if("function"!=typeof n)throw TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}};return t}()}copy(){let e=new nA,t=-1;for(;++t<this.attachers.length;){let n=this.attachers[t];e.use(...n)}return e.data(nd(!0,{},this.namespace)),e}data(e,t){return"string"==typeof e?2==arguments.length?(nP("data",this.frozen),this.namespace[e]=t,this):nS.call(this.namespace,e)&&this.namespace[e]||void 0:e?(nP("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;for(;++this.freezeIndex<this.attachers.length;){let[e,...t]=this.attachers[this.freezeIndex];if(!1===t[0])continue;!0===t[0]&&(t[0]=void 0);let n=e.call(this,...t);"function"==typeof n&&this.transformers.use(n)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();let t=nq(e),n=this.parser||this.Parser;return nC("parse",n),n(String(t),t)}process(e,t){let n=this;return this.freeze(),nC("process",this.parser||this.Parser),nT("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){let o=nq(e),a=n.parse(o);function l(e,n){e||!n?i(e):r?r(n):t(void 0,n)}n.run(a,o,function(e,t,r){if(e||!t||!r)return l(e);let i=n.stringify(t,r);"string"==typeof i||i&&"object"==typeof i&&"byteLength"in i&&"byteOffset"in i?r.value=i:r.result=i,l(e,r)})}}processSync(e){let t,n=!1;return this.freeze(),nC("processSync",this.parser||this.Parser),nT("processSync",this.compiler||this.Compiler),this.process(e,function(e,r){n=!0,nc(e),t=r}),nI("processSync","process",n),t}run(e,t,n){nD(e),this.freeze();let r=this.transformers;return n||"function"!=typeof t||(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,o){let a=nq(t);r.run(e,a,function(t,r,a){let l=r||e;t?o(t):i?i(l):n(void 0,l,a)})}}runSync(e,t){let n,r=!1;return this.run(e,t,function(e,t){nc(e),n=t,r=!0}),nI("runSync","run",r),n}stringify(e,t){this.freeze();let n=nq(t),r=this.compiler||this.Compiler;return nT("stringify",r),nD(e),r(e,n)}use(e,...t){let n=this.attachers,r=this.namespace;if(nP("use",this.frozen),null==e);else if("function"==typeof e)a(e,t);else if("object"==typeof e)Array.isArray(e)?o(e):i(e);else throw TypeError("Expected usable value, not `"+e+"`");return this;function i(e){if(!("plugins"in e)&&!("settings"in e))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");o(e.plugins),e.settings&&(r.settings=nd(!0,r.settings,e.settings))}function o(e){let t=-1;if(null==e);else if(Array.isArray(e))for(;++t<e.length;)!function(e){if("function"==typeof e)a(e,[]);else if("object"==typeof e){if(Array.isArray(e)){let[t,...n]=e;a(t,n)}else i(e)}else throw TypeError("Expected usable value, not `"+e+"`")}(e[t]);else throw TypeError("Expected a list of plugins, not `"+e+"`")}function a(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(-1===i)n.push([e,...t]);else if(t.length>0){let[r,...o]=t,a=n[i][1];np(a)&&np(r)&&(r=nd(!0,a,r)),n[i]=[e,r,...o]}}}}let nE=new nA().freeze();function nC(e,t){if("function"!=typeof t)throw TypeError("Cannot `"+e+"` without `parser`")}function nT(e,t){if("function"!=typeof t)throw TypeError("Cannot `"+e+"` without `compiler`")}function nP(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function nD(e){if(!np(e)||"string"!=typeof e.type)throw TypeError("Expected node, got `"+e+"`")}function nI(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function nq(e){return e&&"object"==typeof e&&"message"in e&&"messages"in e?e:new nb(e)}let nL=[],nM={allowDangerousHtml:!0},nN=/^(https?|ircs?|mailto|xmpp)$/i,nR=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function nO(e){let t=function(e){let t=e.rehypePlugins||nL,n=e.remarkPlugins||nL,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...nM}:nM;return nE().use(t_).use(n).use(nu,r).use(t)}(e),n=function(e){let t=e.children||"",n=new nb;return"string"==typeof t&&(n.value=t),n}(e);return function(e,t){let n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,l=t.skipHtml,s=t.unwrapDisallowed,u=t.urlTransform||nF;for(let e of nR)Object.hasOwn(t,e.from)&&(e.from,e.to&&e.to,e.id);return t6(e,function(e,t,i){if("raw"===e.type&&i&&"number"==typeof t)return l?i.children.splice(t,1):i.children[t]={type:"text",value:e.value},t;if("element"===e.type){let t;for(t in ey)if(Object.hasOwn(ey,t)&&Object.hasOwn(e.properties,t)){let n=e.properties[t],r=ey[t];(null===r||r.includes(e.tagName))&&(e.properties[t]=u(String(n||""),t,e))}}if("element"===e.type){let o=n?!n.includes(e.tagName):!!a&&a.includes(e.tagName);if(!o&&r&&"number"==typeof t&&(o=!r(e,t,i)),o&&i&&"number"==typeof t)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}),function(e,t){var n,r,i;let o;if(!t||void 0===t.Fragment)throw TypeError("Expected `Fragment` in options");let a=t.filePath||void 0;if(t.development){if("function"!=typeof t.jsxDEV)throw TypeError("Expected `jsxDEV` in options when `development: true`");n=t.jsxDEV,o=function(e,t,r,i){let o=Array.isArray(r.children),l=J(e);return n(t,r,i,o,{columnNumber:l?l.column-1:void 0,fileName:a,lineNumber:l?l.line:void 0},void 0)}}else{if("function"!=typeof t.jsx)throw TypeError("Expected `jsx` in production options");if("function"!=typeof t.jsxs)throw TypeError("Expected `jsxs` in production options");r=t.jsx,i=t.jsxs,o=function(e,t,n,o){let a=Array.isArray(n.children)?i:r;return o?a(t,n,o):a(t,n)}}let l={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:o,elementAttributeNameCase:t.elementAttributeNameCase||"react",evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:a,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:!1!==t.passKeys,passNode:t.passNode||!1,schema:"svg"===t.space?_:H,stylePropertyNameCase:t.stylePropertyNameCase||"dom",tableCellAlignToStyle:!1!==t.tableCellAlignToStyle},s=ec(l,e,void 0);return s&&"string"!=typeof s?s:l.create(e,l.Fragment,{children:s||void 0},void 0)}(e,{Fragment:o.Fragment,components:i,ignoreInvalidStyle:!0,jsx:o.jsx,jsxs:o.jsxs,passKeys:!0,passNode:!0})}(t.runSync(t.parse(n),n),e)}function nF(e){let t=e.indexOf(":"),n=e.indexOf("?"),r=e.indexOf("#"),i=e.indexOf("/");return -1===t||-1!==i&&t>i||-1!==n&&t>n||-1!==r&&t>r||nN.test(e.slice(0,t))?e:""}var nB=n(63188),nz=n(77863);function nj({progress:e}){return o.jsx("div",{className:"fixed top-0 left-0 right-0 h-1 bg-background-secondary z-50",children:o.jsx(l.E.div,{className:"h-full bg-primary",style:{width:`${e}%`},transition:{duration:.1}})})}function nH({article:e}){let[t,n]=(0,a.useState)(0);return(0,o.jsxs)("div",{className:"min-h-screen pt-24 pb-16 bg-background",children:[o.jsx(nj,{progress:t}),o.jsx("div",{className:"container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl",children:(0,o.jsxs)(l.E.div,{variants:nB.Jm,initial:"hidden",animate:"visible",className:"space-y-8",children:[(0,o.jsxs)(l.E.div,{variants:nB.eu,className:"aspect-video relative rounded-xl overflow-hidden mb-8 shadow-lg",children:[o.jsx(c.default,{src:e.image,alt:e.title,fill:!0,className:"object-cover",sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px",priority:!0}),o.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"})]}),(0,o.jsxs)(l.E.div,{variants:nB.eu,className:"space-y-4",children:[(0,o.jsxs)("div",{className:"flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-foreground-muted",children:[o.jsx("span",{className:"text-primary font-medium",children:e.category}),o.jsx("span",{className:"hidden sm:inline",children:"•"}),o.jsx("span",{children:(0,nz.p6)(e.publishedAt)}),o.jsx("span",{className:"hidden sm:inline",children:"•"}),(0,o.jsxs)("div",{className:"flex items-center space-x-1",children:[o.jsx(s.Z,{size:14}),(0,o.jsxs)("span",{children:[e.readTime," min read"]})]})]}),o.jsx("h1",{className:"text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight",children:e.title})]}),(0,o.jsxs)(l.E.div,{variants:nB.eu,className:"flex items-center space-x-4 pb-8 border-b border-foreground/10",children:[o.jsx("div",{className:"w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",children:o.jsx(u.Z,{size:24,className:"text-primary"})}),(0,o.jsxs)("div",{children:[o.jsx("p",{className:"font-semibold",children:e.author.name}),o.jsx("p",{className:"text-sm text-foreground-muted",children:e.author.bio})]})]}),o.jsx(l.E.div,{variants:nB.eu,className:"flex flex-wrap gap-2",children:e.tags.map(e=>o.jsx("span",{className:"px-3 py-1 bg-foreground/5 text-foreground-muted text-sm rounded-full",children:e},e))}),o.jsx(l.E.article,{variants:nB.eu,className:"prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-foreground/10 prose-h2:pb-3 prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-foreground prose-strong:font-semibold prose-ul:my-4 prose-ul:space-y-2 prose-ol:my-4 prose-ol:space-y-2 prose-li:text-foreground/80 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-foreground/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-hr:border-foreground/10 prose-hr:my-8 ",children:o.jsx(nO,{children:e.content})})]})})]})}},71771:e=>{"use strict";var t=Object.prototype.hasOwnProperty,n=Object.prototype.toString,r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===n.call(e)},a=function(e){if(!e||"[object Object]"!==n.call(e))return!1;var r,i=t.call(e,"constructor"),o=e.constructor&&e.constructor.prototype&&t.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!i&&!o)return!1;for(r in e);return void 0===r||t.call(e,r)},l=function(e,t){r&&"__proto__"===t.name?r(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},s=function(e,n){if("__proto__"===n){if(!t.call(e,n))return;if(i)return i(e,n).value}return e[n]};e.exports=function e(){var t,n,r,i,u,c,d=arguments[0],p=1,f=arguments.length,h=!1;for("boolean"==typeof d&&(h=d,d=arguments[1]||{},p=2),(null==d||"object"!=typeof d&&"function"!=typeof d)&&(d={});p<f;++p)if(t=arguments[p],null!=t)for(n in t)r=s(d,n),d!==(i=s(t,n))&&(h&&i&&(a(i)||(u=o(i)))?(u?(u=!1,c=r&&o(r)?r:[]):c=r&&a(r)?r:{},l(d,{name:n,newValue:e(h,c,i)})):void 0!==i&&l(d,{name:n,newValue:i}));return d}},54201:e=>{"use strict";var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,n=/\n/g,r=/^\s*/,i=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,l=/^[;\s]*/,s=/^\s+|\s+$/g;function u(e){return e?e.replace(s,""):""}e.exports=function(e,s){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];s=s||{};var c=1,d=1;function p(e){var t=e.match(n);t&&(c+=t.length);var r=e.lastIndexOf("\n");d=~r?e.length-r:d+e.length}function f(){var e={line:c,column:d};return function(t){return t.position=new h(e),g(r),t}}function h(e){this.start=e,this.end={line:c,column:d},this.source=s.source}function m(t){var n=Error(s.source+":"+c+":"+d+": "+t);if(n.reason=t,n.filename=s.source,n.line=c,n.column=d,n.source=e,s.silent);else throw n}function g(t){var n=t.exec(e);if(n){var r=n[0];return p(r),e=e.slice(r.length),n}}function y(e){var t;for(e=e||[];t=b();)!1!==t&&e.push(t);return e}function b(){var t=f();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var n=2;""!=e.charAt(n)&&("*"!=e.charAt(n)||"/"!=e.charAt(n+1));)++n;if(n+=2,""===e.charAt(n-1))return m("End of comment missing");var r=e.slice(2,n-2);return d+=2,p(r),e=e.slice(n),d+=2,t({type:"comment",comment:r})}}return h.prototype.content=e,g(r),function(){var e,n=[];for(y(n);e=function(){var e=f(),n=g(i);if(n){if(b(),!g(o))return m("property missing ':'");var r=g(a),s=e({type:"declaration",property:u(n[0].replace(t,"")),value:r?u(r[0].replace(t,"")):""});return g(l),s}}();)!1!==e&&(n.push(e),y(n));return n}()}},48998:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});let r=(0,n(76557).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},79635:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});let r=(0,n(76557).Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},27855:function(e,t,n){"use strict";var r=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(n(56773)),i=n(8787);function o(e,t){var n={};return e&&"string"==typeof e&&(0,r.default)(e,function(e,r){e&&r&&(n[(0,i.camelCase)(e,t)]=r)}),n}o.default=o,e.exports=o},8787:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var n=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,i=/^[^-]+$/,o=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,l=function(e,t){return t.toUpperCase()},s=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var u;return(void 0===t&&(t={}),!(u=e)||i.test(u)||n.test(u))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(a,s):e.replace(o,s)).replace(r,l))}},56773:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let n=null;if(!e||"string"!=typeof e)return n;let r=(0,i.default)(e),o="function"==typeof t;return r.forEach(e=>{if("declaration"!==e.type)return;let{property:r,value:i}=e;o?t(r,i,e):i&&((n=n||{})[r]=i)}),n};let i=r(n(54201))},60645:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s,generateStaticParams:()=>l});var r=n(19510),i=n(58585);let o=[{id:"1",slug:"science-of-longevity",title:"The Science of Longevity: How Food Affects Your Healthspan",excerpt:"Discover the cutting-edge research on how specific nutrients and eating patterns can extend not just lifespan, but healthspan.",content:`
# The Science of Longevity: How Food Affects Your Healthspan

The distinction between lifespan and healthspan is crucial. While medicine has extended how long we live, the quality of those years matters equally. As a chef trained in both culinary arts and nutrition science, I focus on creating meals that optimize healthspan through evidence-based nutrition.

## The Hallmarks of Aging

Modern longevity research has identified nine hallmarks of aging that can be influenced by nutrition:

1. **Genomic Instability** - DNA damage accumulates over time
2. **Telomere Attrition** - Protective caps on chromosomes shorten
3. **Epigenetic Alterations** - Gene expression changes
4. **Loss of Proteostasis** - Protein quality control declines
5. **Mitochondrial Dysfunction** - Cellular energy production falters
6. **Cellular Senescence** - Zombie cells accumulate
7. **Stem Cell Exhaustion** - Regenerative capacity decreases
8. **Altered Intercellular Communication** - Inflammation increases
9. **Deregulated Nutrient Sensing** - Metabolic pathways malfunction

## Nutritional Strategies for Each Hallmark

### Protecting Your DNA

Foods rich in sulforaphane (broccoli sprouts), polyphenols (berries, olive oil), and omega-3 fatty acids help protect DNA from oxidative damage. The Mediterranean diet, which I feature heavily in my cooking, has been shown to reduce DNA damage markers.

### Supporting Mitochondria

Mitochondria are the powerhouses of your cells. Key nutrients include:

- **CoQ10** - Found in organ meats and sardines
- **PQQ** - Present in fermented foods
- **NAD+ precursors** - Supported by niacin-rich foods

### Reducing Inflammation

Chronic low-grade inflammation accelerates aging. Anti-inflammatory foods form the foundation of longevity cuisine:

- Wild-caught fatty fish (salmon, sardines, mackerel)
- Extra virgin olive oil (rich in oleocanthal)
- Turmeric with black pepper
- Dark leafy greens
- Berries and pomegranate

## The Blue Zone Principles

Studying populations with exceptional longevity reveals common dietary patterns:

1. **Plant-Forward** - 95% of food from plants
2. **Beans Daily** - Legumes at every meal
3. **Moderate Protein** - Just enough, not excessive
4. **Wine at 5** - Moderate alcohol with food and friends
5. **Mindful Eating** - Stop at 80% full

## My Approach

Every dish I create considers these longevity principles without sacrificing flavor or experience. Fine dining can and should support your healthspan goals.

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",category:"Longevity Science",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:8,publishedAt:"2024-01-10",tags:["longevity","healthspan","nutrition","anti-aging","blue-zones"]},{id:"2",slug:"intermittent-fasting-guide",title:"Intermittent Fasting: A Chef's Guide to Time-Restricted Eating",excerpt:"How to implement intermittent fasting while maintaining culinary excellence and optimal nutrition.",content:`
# Intermittent Fasting: A Chef's Guide to Time-Restricted Eating

Intermittent fasting has emerged as one of the most powerful tools for longevity and metabolic health. But as a chef, I know that how and what you eat during your eating window matters just as much as when you eat.

## Understanding Fasting Physiology

When you fast, several beneficial processes activate:

### The Autophagy Window (16+ hours)

Autophagy, meaning "self-eating," is your body's cellular cleanup process. During extended fasting:

- Damaged proteins are recycled
- Dysfunctional mitochondria are removed
- Cellular debris is cleared
- New, healthy components are generated

### Metabolic Switching (12-14 hours)

Around 12 hours of fasting, your body begins switching from glucose to fat for fuel:

- Ketone production increases
- Brain-derived neurotrophic factor (BDNF) rises
- Growth hormone increases
- Insulin sensitivity improves

## Optimal Fasting Protocols

### 16:8 Method (Recommended Starting Point)

- **Eating window**: 8 hours (e.g., 10 AM - 6 PM)
- **Fasting window**: 16 hours
- **Benefits**: Sustainable, social-friendly, effective

### 18:6 Method (Intermediate)

- **Eating window**: 6 hours
- **Fasting window**: 18 hours
- **Benefits**: Deeper autophagy, enhanced fat burning

### One Meal a Day (OMAD) (Advanced)

- **Eating window**: 1-2 hours
- **Fasting window**: 22-23 hours
- **Benefits**: Maximum autophagy, simplicity

## Breaking Your Fast: The Chef's Approach

How you break your fast matters tremendously. I recommend:

**First Meal (Break-fast)**
- Start with easily digestible foods
- Include protein for satiety
- Add healthy fats for satisfaction
- Keep glycemic impact moderate

**Ideal Break-Fast Foods:**
- Bone broth (collagen, minerals)
- Eggs with avocado
- Wild salmon with greens
- Fermented vegetables

**Avoid Breaking Fast With:**
- High-sugar foods
- Processed carbohydrates
- Large portions of heavy foods

## Circadian Considerations

Your body's internal clock affects how you process food:

- **Morning**: Highest insulin sensitivity
- **Midday**: Peak metabolic rate
- **Evening**: Reduced digestive capacity

For optimal results, align your eating window with morning and midday hours when possible.

## My Personal Protocol

As a chef, I follow a modified 16:8 approach:

- **Morning**: Black coffee, green tea (fasting-friendly)
- **11 AM**: Break fast with protein-rich meal
- **3 PM**: Main meal with balanced macros
- **6 PM**: Light dinner, fasting begins

This allows me to create and taste dishes while maintaining the benefits of time-restricted eating.

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",category:"Longevity Science",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:7,publishedAt:"2024-01-15",tags:["fasting","autophagy","metabolism","longevity","circadian"]},{id:"3",slug:"anti-inflammatory-cooking",title:"Anti-Inflammatory Cooking: Recipes for Cellular Health",excerpt:"Master the art of creating delicious meals that fight chronic inflammation and support cellular repair.",content:`
# Anti-Inflammatory Cooking: Recipes for Cellular Health

Chronic inflammation is the silent driver behind most age-related diseases. As a private chef specializing in longevity cuisine, I've developed techniques and recipes that transform anti-inflammatory eating from a restriction into a celebration.

## Understanding Inflammation

### Acute vs. Chronic Inflammation

**Acute inflammation** is your body's natural healing response - it's beneficial and temporary.

**Chronic inflammation** is different - it's low-grade, persistent, and damaging. It's linked to:

- Heart disease
- Type 2 diabetes
- Alzheimer's disease
- Cancer
- Accelerated aging

### The Inflammation Score

Every food has an inflammatory or anti-inflammatory effect. I rate foods on a scale from -10 (strongly anti-inflammatory) to +10 (pro-inflammatory).

**Strongly Anti-Inflammatory (-7 to -10):**
- Wild salmon
- Extra virgin olive oil
- Turmeric
- Broccoli sprouts
- Berries

**Neutral (0):**
- Chicken breast
- Rice
- Most vegetables

**Pro-Inflammatory (+5 to +10):**
- Refined sugars
- Processed vegetable oils
- Trans fats
- Processed meats

## Key Anti-Inflammatory Ingredients

### Extra Virgin Olive Oil

The cornerstone of anti-inflammatory cooking. High-quality EVOO contains oleocanthal, which works similarly to ibuprofen. I use it:

- As finishing oil on all dishes
- For low-heat saut\xe9ing
- In dressings and marinades

### Fatty Fish

Wild salmon, sardines, and mackerel provide EPA and DHA omega-3s that directly reduce inflammatory markers. I recommend:

- 3-4 servings per week minimum
- Wild-caught over farmed
- Proper cooking to preserve omega-3s

### Turmeric with Black Pepper

Curcumin in turmeric is powerfully anti-inflammatory, but needs piperine from black pepper for absorption. Always combine them.

### Cruciferous Vegetables

Broccoli, cauliflower, and especially broccoli sprouts contain sulforaphane, which activates your body's own anti-inflammatory pathways.

## Cooking Techniques That Preserve Benefits

### Low-Heat Methods

High heat creates inflammatory compounds. I prefer:

- Steaming
- Poaching
- Sous vide
- Low-temperature roasting

### Proper Oil Selection

- **High heat**: Avocado oil, refined coconut oil
- **Medium heat**: Extra virgin olive oil (contrary to popular belief, it's stable up to 375\xb0F)
- **No heat**: Flaxseed oil, walnut oil

### The Power of Herbs and Spices

Fresh herbs and spices are concentrated anti-inflammatory compounds:

- **Ginger** - Gingerols reduce COX-2
- **Rosemary** - Carnosic acid protects the brain
- **Garlic** - Allicin fights inflammation
- **Cinnamon** - Improves insulin sensitivity

## Sample Anti-Inflammatory Day

**Morning:**
Golden milk with turmeric, ginger, and black pepper

**Lunch:**
Mediterranean salmon bowl with quinoa, olive oil, and vegetables

**Dinner:**
Herb-crusted lamb with roasted cruciferous vegetables

**Snack:**
Dark chocolate (85%+) with walnuts and berries

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",category:"Nutrition & Health",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:6,publishedAt:"2024-01-20",tags:["anti-inflammatory","cooking","health","recipes","nutrition"]},{id:"4",slug:"mediterranean-okinawan-fusion",title:"The Mediterranean-Okinawan Fusion: Best of Both Blue Zones",excerpt:"Combining the wisdom of the two healthiest cuisines on Earth for optimal longevity.",content:`
# The Mediterranean-Okinawan Fusion: Best of Both Blue Zones

Two regions stand out in longevity research: the Mediterranean basin and Okinawa, Japan. Both produce remarkable numbers of centenarians. As a chef fascinated by longevity, I've studied and combined these cuisines to create what I believe is the optimal approach to eating for a long, healthy life.

## The Mediterranean Advantage

### Key Components

**Extra Virgin Olive Oil** - The liquid gold of longevity
- 4+ tablespoons daily in traditional diets
- Rich in oleocanthal and polyphenols
- Reduces all-cause mortality

**Fatty Fish** - Omega-3 powerhouse
- 2-3 servings weekly minimum
- Wild-caught preferred
- Sardines, anchovies, mackerel, salmon

**Legumes** - Plant protein staple
- Daily consumption
- Fiber and resistant starch
- Blood sugar stability

**Wine** - Moderate consumption
- 1-2 glasses with meals
- Red preferred for resveratrol
- Always with food and company

## The Okinawan Secrets

### Key Components

**Sweet Potatoes** - The purple variety
- Primary carbohydrate source
- Extremely low glycemic impact
- Rich in anthocyanins

**Bitter Melon (Goya)** - Blood sugar control
- Unique to Okinawan cuisine
- Powerful metabolic effects
- Acquired taste, worth developing

**Tofu and Fermented Soy** - Quality plant protein
- Not processed soy products
- Traditional preparation methods
- Natto for vitamin K2

**Seaweed** - Marine minerals
- Iodine, selenium, zinc
- Unique polysaccharides
- Anti-cancer properties

### The Hara Hachi Bu Principle

Okinawans practice eating until 80% full. This natural caloric restriction:

- Activates longevity genes
- Reduces oxidative stress
- Maintains healthy weight
- Enhances insulin sensitivity

## My Fusion Approach

### Breakfast: Mediterranean-Okinawan Bowl

- Base: Purple sweet potato
- Protein: Soft-boiled eggs with miso
- Fat: Drizzle of extra virgin olive oil
- Vegetables: Saut\xe9ed greens with garlic

### Lunch: Sea-to-Table Bowl

- Base: Quinoa (Mediterranean) + seaweed (Okinawan)
- Protein: Wild salmon with white miso glaze
- Vegetables: Mediterranean salad with bitter greens
- Fat: Tahini-olive oil dressing

### Dinner: Fusion Fine Dining

- Appetizer: Sardines with white bean hummus
- Main: Miso-glazed black cod with roasted vegetables
- Side: Fermented vegetables (sauerkraut meets kimchi)
- Dessert: Dark chocolate with matcha

## Practical Implementation

### Weekly Meal Structure

**Mediterranean Days (3-4):**
- Fish as main protein
- Olive oil generously used
- Legumes in every meal
- Fresh herbs and tomatoes

**Okinawan Days (3-4):**
- Tofu or tempeh as protein
- Seaweed and mushrooms featured
- Sweet potato as carbohydrate
- Green tea throughout the day

**Fusion Days:**
- Combine best of both
- Creative ingredient swaps
- Honor both traditions

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80",category:"Longevity Science",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:7,publishedAt:"2024-01-25",tags:["blue-zones","mediterranean","okinawa","longevity","fusion"]},{id:"5",slug:"omega-3-masterclass",title:"Omega-3 Masterclass: Sourcing and Preparing Fatty Fish",excerpt:"Everything you need to know about selecting, storing, and cooking omega-3 rich fish for maximum health benefits.",content:`
# Omega-3 Masterclass: Sourcing and Preparing Fatty Fish

Omega-3 fatty acids are among the most important nutrients for longevity. As a chef, I've dedicated years to mastering the selection and preparation of omega-3 rich fish to maximize both flavor and health benefits.

## Understanding Omega-3s

### Types of Omega-3s

**EPA (Eicosapentaenoic Acid)**
- Anti-inflammatory
- Cardiovascular benefits
- Mood regulation

**DHA (Docosahexaenoic Acid)**
- Brain structure (60% of brain fat)
- Eye health
- Cognitive function

**ALA (Alpha-Linolenic Acid)**
- Plant-based (flax, chia, walnuts)
- Converts poorly to EPA/DHA (5-10%)
- Still beneficial for heart health

### The Omega-3 to Omega-6 Ratio

Modern diets are heavily skewed toward omega-6 (from vegetable oils). The ideal ratio is:

- **Optimal**: 1:1 to 1:3
- **Modern Western diet**: 1:15 to 1:20
- **My cuisine targets**: 1:2 to 1:4

## Top Omega-3 Fish Sources

### Tier 1: Highest Omega-3

**Wild Salmon (Sockeye)**
- 2.7g omega-3 per 100g
- Rich in astaxanthin
- Best: Alaskan wild-caught

**Sardines**
- 1.5g omega-3 per 100g
- Low mercury, sustainable
- Bones provide calcium

**Mackerel (Atlantic)**
- 2.7g omega-3 per 100g
- Affordable, flavorful
- Best smoked or grilled

### Tier 2: Excellent Sources

**Anchovies**
- 2.1g omega-3 per 100g
- Intense umami flavor
- Perfect in sauces

**Herring**
- 1.7g omega-3 per 100g
- Often pickled or smoked
- Underutilized gem

**Trout (Rainbow)**
- 1.0g omega-3 per 100g
- Freshwater option
- Mild, approachable flavor

## Sourcing Quality Fish

### Wild vs. Farmed

**Wild-Caught Advantages:**
- Higher omega-3 content
- Better omega-3 to omega-6 ratio
- Natural diet
- Astaxanthin from natural sources

**Sustainable Farming:**
- Some farms are improving
- Look for certifications (ASC, BAP)
- Feed composition matters

### Reading Labels

- "Wild-caught" - Harvested from natural waters
- "Atlantic salmon" - Usually farmed (wild Atlantic is rare)
- "Pacific salmon" - More likely wild
- "Sockeye" or "King" - Premium wild varieties

### Freshness Indicators

- Bright, clear eyes
- Red, moist gills
- Firm flesh that springs back
- Ocean-fresh smell (not fishy)

## Cooking Techniques That Preserve Omega-3s

### Temperature Matters

Omega-3s are delicate and can oxidize with heat. My preferred methods:

**Poaching (Best)**
- Temperature: 160-180\xb0F (70-80\xb0C)
- In olive oil, wine, or broth
- Maximum omega-3 preservation

**Baking (Excellent)**
- Temperature: 300-350\xb0F (150-175\xb0C)
- Cover or en papillote
- Gentle, even cooking

**Pan-Searing (Good)**
- Quick, high heat
- Crispy exterior, rare interior
- Don't overcook!

**Grilling (Acceptable)**
- Creates delicious flavor
- Some omega-3 loss
- Don't char excessively

### Avoid

- Deep frying (oxidizes omega-3s)
- Overcooking (destroys nutrients)
- Reheating multiple times

## My Signature Preparations

### Olive Oil Poached Salmon

The gentlest cooking method preserves nearly all omega-3 content while infusing Mediterranean flavor.

### Miso-Glazed Black Cod

Japanese technique that creates a caramelized exterior while keeping the interior silky.

### Sardine Toast

Simple preparation that lets the quality of the fish shine through.

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=80",category:"Cooking Techniques",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:8,publishedAt:"2024-01-28",tags:["omega-3","fish","cooking","technique","nutrition"]},{id:"6",slug:"sulforaphane-superfood",title:"Sulforaphane: Why Broccoli Sprouts Are a Longevity Superfood",excerpt:"The science behind sulforaphane and how to maximize its benefits through proper preparation.",content:`
# Sulforaphane: Why Broccoli Sprouts Are a Longevity Superfood

If I could recommend just one food for longevity, it would be broccoli sprouts. These tiny powerhouses contain sulforaphane, arguably the most potent natural compound for activating your body's defense systems.

## The Science of Sulforaphane

### What Is Sulforaphane?

Sulforaphane is an isothiocyanate compound that forms when glucoraphanin (found in cruciferous vegetables) meets the enzyme myrosinase. This reaction happens when the plant tissue is damaged - like when you chew or chop it.

### The NRF2 Pathway

Sulforaphane's superpower is activating NRF2, your body's master switch for antioxidant production:

**NRF2 Activation Effects:**
- Produces glutathione (master antioxidant)
- Activates phase 2 detoxification
- Reduces oxidative stress
- Protects DNA
- Supports mitochondrial function

### Research Highlights

Studies show sulforaphane:

- Reduces cancer risk by 40-50%
- Improves autism symptoms
- Protects against heart disease
- Supports brain health
- Enhances detoxification

## Broccoli Sprouts vs. Mature Broccoli

### Concentration Comparison

**Broccoli Sprouts:** 50-100x more sulforaphane
**Mature Broccoli:** Good, but far less concentrated

### Why Such a Difference?

Sprouts contain concentrated glucoraphanin as a defense mechanism during their vulnerable growth phase. As the plant matures, this concentration dilutes.

## How to Maximize Sulforaphane

### The Mustard Seed Trick

When broccoli is cooked, myrosinase is destroyed. Solution:

1. Cook your broccoli
2. Let it cool slightly
3. Sprinkle with mustard seed powder
4. Wait 5 minutes before eating

Mustard seeds provide external myrosinase to create sulforaphane from the cooked glucoraphanin.

### Optimal Raw Preparation

For broccoli sprouts (always eat raw):

1. Chew thoroughly (activates myrosinase)
2. Or chop and wait 40 minutes before eating
3. Add to salads, sandwiches, smoothies

### Growing Your Own

Broccoli sprouts are easy to grow:

**Supplies:**
- Organic broccoli seeds
- Mason jar with mesh lid
- Fresh water

**Process:**
1. Soak seeds overnight
2. Drain and rinse twice daily
3. Harvest in 3-5 days
4. Store in refrigerator

### Storage Tips

- Refrigerate immediately after harvest
- Use within 5-7 days
- Don't wash until ready to use
- Keep in breathable container

## Incorporating Sulforaphane Daily

### My Daily Protocol

**Morning smoothie:** 30g broccoli sprouts blended with berries

**Lunch:** Top salads with fresh sprouts

**Dinner:** Roasted broccoli with mustard seed powder

### Recipe Ideas

**Sulforaphane Smoothie:**
- 30g broccoli sprouts
- 1 cup frozen blueberries
- 1 banana
- Almond milk
- Touch of honey

**Power Salad Topping:**
- Fresh broccoli sprouts
- Shaved raw broccoli
- Pumpkin seeds
- Olive oil dressing

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",category:"Longevity Science",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:6,publishedAt:"2024-02-01",tags:["sulforaphane","broccoli","sprouts","longevity","superfood"]},{id:"7",slug:"gut-brain-connection",title:"Gut-Brain Connection: Fermented Foods for Cognitive Health",excerpt:"How fermented foods support your gut microbiome and enhance brain function through the gut-brain axis.",content:`
# Gut-Brain Connection: Fermented Foods for Cognitive Health

The gut-brain axis is one of the most exciting frontiers in health science. As a chef, I've embraced fermentation not just for its complex flavors, but for its profound impact on cognitive function and mental well-being.

## The Gut-Brain Axis

### Bidirectional Communication

Your gut and brain communicate constantly through:

**The Vagus Nerve** - Direct neural highway
**Neurotransmitters** - 95% of serotonin made in gut
**Immune Signals** - Inflammation affects mood
**Metabolites** - Short-chain fatty acids influence brain

### The Microbiome's Role

Your gut contains trillions of bacteria that:

- Produce neurotransmitters
- Regulate inflammation
- Influence stress response
- Affect memory and learning

## Fermented Foods and Brain Health

### Research Findings

Studies show fermented food consumption correlates with:

- Reduced anxiety and depression
- Better stress resilience
- Improved memory
- Lower neuroinflammation

### Key Mechanisms

**Probiotic Effects:**
- Diverse beneficial bacteria
- Crowd out harmful strains
- Strengthen gut barrier

**Postbiotic Effects:**
- Metabolites from fermentation
- Short-chain fatty acids
- Vitamins (especially K2 and B12)

## Top Fermented Foods for Brain Health

### Kimchi

**Benefits:**
- Diverse probiotic strains
- High in vitamin K2
- Anti-inflammatory compounds
- Supports BDNF production

**How I Use It:**
- Alongside protein at lunch
- In grain bowls
- As a condiment for eggs

### Sauerkraut

**Benefits:**
- Simple, powerful probiotics
- High in vitamin C
- Prebiotic fiber
- Supports mood regulation

**How I Use It:**
- With fatty fish
- In salads
- As a digestive aid with meals

### Kefir

**Benefits:**
- More diverse than yogurt (30+ strains)
- Contains beneficial yeasts
- High in tryptophan
- Supports sleep quality

**How I Use It:**
- Morning smoothie base
- Salad dressings
- Overnight oats

### Miso

**Benefits:**
- Rich in B vitamins
- Contains unique probiotics
- Supports gut-brain signaling
- Traditional longevity food

**How I Use It:**
- Soup base
- Glazes for fish
- Salad dressings
- Marinades

### Natto

**Benefits:**
- Highest vitamin K2 source
- Nattokinase for circulation
- Supports brain blood flow
- Traditional Okinawan staple

**How I Use It:**
- Breakfast over rice
- Acquired taste - start small

## Making Fermentation Accessible

### Easy Homemade Ferments

**Quick Pickled Vegetables:**
Not technically fermented, but a gateway

**Lacto-Fermented Vegetables:**
Salt + vegetables + time = probiotics

**Milk Kefir:**
Just add grains to milk

### Buying Quality Fermented Foods

Look for:
- "Live cultures" on label
- Refrigerated section
- Short ingredient list
- No pasteurization after fermentation

Avoid:
- Shelf-stable "fermented" products
- Added sugars
- Artificial preservatives

## Daily Fermented Food Protocol

**Morning:**
Kefir smoothie or miso soup

**Lunch:**
Fermented vegetable side (2-3 tbsp)

**Dinner:**
Another fermented food serving

**Target:**
3 different fermented foods daily

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=1200&q=80",category:"Nutrition & Health",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:7,publishedAt:"2024-02-05",tags:["gut-health","fermentation","brain","probiotics","microbiome"]},{id:"8",slug:"circadian-nutrition",title:"Circadian Nutrition: When You Eat Matters as Much as What",excerpt:"Optimize your health by aligning your eating patterns with your body's natural rhythms.",content:`
# Circadian Nutrition: When You Eat Matters as Much as What

Your body runs on an internal clock that affects everything from hormone production to digestion. As a chef focused on longevity, I've learned that meal timing can be as important as food choices.

## Understanding Circadian Rhythms

### The Master Clock

Your suprachiasmatic nucleus (SCN) in the brain coordinates all bodily rhythms based on light exposure. But your organs also have their own clocks:

**Liver Clock** - Peaks in afternoon
**Pancreas Clock** - Most insulin-sensitive in morning
**Gut Clock** - Best digestion earlier in day
**Muscle Clock** - Protein synthesis highest in morning

### Metabolic Timing

**Morning (6 AM - 12 PM):**
- Peak insulin sensitivity
- Best carbohydrate tolerance
- Highest metabolic rate
- Optimal for larger meals

**Afternoon (12 PM - 6 PM):**
- Good digestion
- Stable blood sugar
- Moderate metabolism
- Balanced meal timing

**Evening (6 PM - 10 PM):**
- Declining insulin sensitivity
- Reduced digestive capacity
- Lower metabolic rate
- Light meals preferred

**Night (10 PM - 6 AM):**
- Fasting and repair mode
- Growth hormone release
- Cellular cleanup (autophagy)
- No eating ideal

## Practical Circadian Eating

### The Time-Shifted Diet

Most people eat the opposite of what's optimal:

**Typical Pattern:**
- Small or skipped breakfast
- Moderate lunch
- Large dinner late evening

**Optimal Pattern:**
- Substantial breakfast
- Largest meal at lunch
- Light, early dinner

### The 3-3-10 Rule

- **3 meals** in daylight hours
- **3 hours** between last meal and sleep
- **10+ hours** of overnight fasting

### Meal Composition by Time

**Breakfast (7-9 AM):**
- Protein-rich (eggs, fish, Greek yogurt)
- Complex carbs (oats, sweet potato)
- Healthy fats (avocado, olive oil)
- Larger portion acceptable

**Lunch (12-2 PM):**
- Balanced macros
- Largest meal if desired
- Include vegetables
- Good for carbohydrates

**Dinner (5-7 PM):**
- Protein and vegetables focused
- Lower carbohydrate
- Smaller portion
- Easy to digest

## Circadian Disruption Effects

### What Happens When You Eat Late

- **Blood sugar** stays elevated longer
- **Fat storage** increases
- **Sleep quality** decreases
- **Inflammation** rises
- **Weight gain** more likely from same calories

### Research Findings

Studies show that eating the same foods but at different times produces different results:

- Morning eaters lose more weight
- Evening eaters have higher inflammation
- Late meals disrupt sleep hormones
- Shift workers have higher disease risk

## Special Considerations

### Social Dining

As a private chef, I understand dinner is often social:

**Strategies:**
- Make lunch your main meal
- Keep dinner earlier when possible
- Choose lighter options at evening events
- Don't stress occasionally

### Exercise Timing

**Morning exercise:** 
- Fasted or light snack
- Full breakfast after

**Evening exercise:**
- Light meal before
- Protein-focused recovery
- Don't eat too late after

### Shift Work

If you can't follow normal patterns:

- Keep consistent eating times
- Prioritize sleep
- Focus on food quality
- Avoid eating in biological night when possible

## My Approach as a Chef

I structure my days around circadian principles:

**Morning:** Protein-rich breakfast after workout
**Midday:** Main meal during peak metabolism
**Evening:** Light dinner, finished by 7 PM
**Night:** Fasting, allowing repair and recovery

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1200&q=80",category:"Longevity Science",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition and longevity science."},readTime:7,publishedAt:"2024-02-10",tags:["circadian","timing","metabolism","longevity","biohacking"]},{id:"9",slug:"art-of-plating",title:"The Art of Plating: Creating Visual Masterpieces",excerpt:"Discover how professional chefs transform simple ingredients into stunning visual presentations that elevate the dining experience.",content:`
# The Art of Plating: Creating Visual Masterpieces

Plating is more than just arranging food on a plate - it's an art form that engages all the senses. As a private chef, I've learned that presentation can make or break a dining experience.

## The Foundation: Color and Contrast

The first rule of plating is understanding color theory. A well-plated dish should have a harmonious color palette that creates visual interest. Think of your plate as a canvas, and each ingredient as a brushstroke.

### Key Principles:

1. **Odd Numbers**: Grouping elements in odd numbers (3, 5, 7) creates visual balance
2. **Height and Depth**: Build upward, not just flat
3. **Negative Space**: Let the plate breathe - don't overcrowd
4. **Sauce as Art**: Use squeeze bottles and spoons to create elegant sauce designs

## Modern Techniques

Contemporary plating often incorporates:
- **Deconstructed presentations** that tell a story
- **Molecular gastronomy** elements for texture contrast
- **Garden-to-plate** aesthetics with edible flowers and microgreens

Remember, the goal is to create anticipation before the first bite. When guests see a beautifully plated dish, their expectations rise, and the flavors seem to taste even better.

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",category:"Cooking Techniques",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition."},readTime:5,publishedAt:"2024-02-15",tags:["plating","technique","presentation","fine-dining"]},{id:"10",slug:"nutrition-wellness-chef",title:"Nutrition and Wellness: A Chef's Perspective",excerpt:"How fine dining can be both indulgent and nourishing, balancing flavor with health.",content:`
# Nutrition and Wellness: A Chef's Perspective

As a chef trained in both culinary arts and nutrition, I believe that exceptional dining should never compromise on health. Every dish I create considers both flavor and nutritional value.

## The Balance

Fine dining doesn't have to mean heavy, calorie-laden meals. Modern techniques allow us to create dishes that are:
- **Nutrient-dense** without sacrificing taste
- **Lower in processed ingredients** while maintaining complexity
- **Mindful of dietary needs** without compromising the experience

## Key Strategies

1. **Whole Ingredients**: Start with the best quality, unprocessed ingredients
2. **Cooking Methods**: Steaming, roasting, and sous-vide preserve nutrients
3. **Portion Control**: Elegant presentation with appropriate serving sizes
4. **Plant-Forward**: Incorporate more vegetables as the star, not just sides

## The Result

When done right, guests leave feeling satisfied, energized, and nourished - not heavy or sluggish. That's the true mark of exceptional private chef service.

*Chef Adrian*
    `,image:"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80",category:"Nutrition & Health",author:{name:"Chef Adrian",avatar:"/images/chef-avatar.jpg",bio:"15+ years of culinary excellence, EHL Swiss trained, Stanford certified in nutrition."},readTime:4,publishedAt:"2024-02-20",tags:["nutrition","wellness","health","fine-dining"]}],a=(0,n(68570).createProxy)(String.raw`/Users/adrianstefan/tabledadrian/components/articles/ArticleDetail.tsx#ArticleDetail`);async function l(){return o.map(e=>({slug:e.slug}))}function s({params:e}){let t=o.find(t=>t.slug===e.slug);return t||(0,i.notFound)(),r.jsx(a,{article:t})}},58585:(e,t,n)=>{"use strict";var r=n(61085);n.o(r,"notFound")&&n.d(t,{notFound:function(){return r.notFound}})},61085:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{ReadonlyURLSearchParams:function(){return a},RedirectType:function(){return r.RedirectType},notFound:function(){return i.notFound},permanentRedirect:function(){return r.permanentRedirect},redirect:function(){return r.redirect}});let r=n(83953),i=n(16399);class o extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class a extends URLSearchParams{append(){throw new o}delete(){throw new o}set(){throw new o}sort(){throw new o}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},16399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{isNotFoundError:function(){return i},notFound:function(){return r}});let n="NEXT_NOT_FOUND";function r(){let e=Error(n);throw e.digest=n,e}function i(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8586:(e,t)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return n}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(n||(n={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},83953:(e,t,n)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{RedirectType:function(){return r},getRedirectError:function(){return s},getRedirectStatusCodeFromError:function(){return h},getRedirectTypeFromError:function(){return f},getURLFromRedirectError:function(){return p},isRedirectError:function(){return d},permanentRedirect:function(){return c},redirect:function(){return u}});let i=n(54580),o=n(72934),a=n(8586),l="NEXT_REDIRECT";function s(e,t,n){void 0===n&&(n=a.RedirectStatusCode.TemporaryRedirect);let r=Error(l);r.digest=l+";"+t+";"+e+";"+n+";";let o=i.requestAsyncStorage.getStore();return o&&(r.mutableCookies=o.mutableCookies),r}function u(e,t){void 0===t&&(t="replace");let n=o.actionAsyncStorage.getStore();throw s(e,t,(null==n?void 0:n.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let n=o.actionAsyncStorage.getStore();throw s(e,t,(null==n?void 0:n.isAction)?a.RedirectStatusCode.SeeOther:a.RedirectStatusCode.PermanentRedirect)}function d(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,n,r,i]=e.digest.split(";",4),o=Number(i);return t===l&&("replace"===n||"push"===n)&&"string"==typeof r&&!isNaN(o)&&o in a.RedirectStatusCode}function p(e){return d(e)?e.digest.split(";",3)[2]:null}function f(e){if(!d(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function h(e){if(!d(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[236,226,639],()=>n(25525));module.exports=r})();