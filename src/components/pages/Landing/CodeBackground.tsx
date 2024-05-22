import { mix } from "@/utilities/colors";
import { Box, SxProps, alpha } from "@mui/material";
import { useLandingColor } from ".";
import { useColorMode } from "@/store/appearanceSlice";

export default function CodeBackground({
    sx,
    gradientOrientation = "toBottom",
}: {
    sx?: SxProps;
    gradientOrientation?: "toBottom" | "toTop";
}) {
    const isDarkMode = useColorMode().dark;
    const color = useLandingColor("contrast");
    let color1 = alpha(mix(color, useLandingColor("accentA"), 0.7), isDarkMode ? 0.08 : 0.24);
    const color2 = gradientOrientation == "toBottom" ? "transparent" : color1;
    color1 = gradientOrientation == "toTop" ? "transparent" : color1;
    return (
        <Box
            sx={{
                color,
                position: "absolute",
                width: "100%",
                overflow: "hidden",
                top: 0,
                left: 0,
                whiteSpace: "pre",
                fontSize: "22px",
                userSelect: "none",
                background: `linear-gradient(180deg, ${color1}, ${color2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                ...sx,
            }}
        >
            {`{case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zp=null;function Fh(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&
(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var qp=null,ps=null,hs=null;function Og(e){if(e=_l(e)){if(typeof qp!="function")throw Error(X(280));var t=e.stateNode;t&&(t=Ju(t),qp(e.stateNode,e.type,t))}}function g5(e){ps?hs?hs.push(e):hs=[e]:ps=e}function v5(){if(ps){var
e=ps,t=hs;if(hs=ps=null,Og(e),t)for(e=0;e<t.length;e++)Og(t[e])}}function y5(e,t){return e(t)}function x5(){}var Lf=!1;function b5(e,t,n){if(Lf)return e(t,n);Lf=!0;try{return y5(e,t,n)}finally{Lf=!1,(ps!==null||hs!==null)&&(x5(),v5())}}function Xa(e,t){var n=e.stateNode;if(n===null)re
urn null;var r=Ju(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEn
er":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(X(231,t,typeof n));return n}var Xp=!1;if(Wr)try{var na={};Object.defineProperty(na,"passive",{get:function(){X
=!0}}),window.addEventListener("test",na,na),window.removeEventListener("test",na,na)}catch{Xp=!1}function xS(e,t,n,r,o,i,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(u){this.onError(u)}}var $a=!1,Zc=null,qc=!1,Yp=null,bS={onError:function(e){$a=!0,Zc=e}
;function SS(e,t,n,r,o,i,s,a,l){$a=!1,Zc=null,xS.apply(bS,arguments)}function wS(e,t,n,r,o,i,s,a,l){if(SS.apply(this,arguments),$a){if($a){var c=Zc;$a=!1,Zc=null}else throw Error(X(198));qc||(qc=!0,Yp=c)}}function Mi(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do 
=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function S5(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jg(e){if(Mi(e)!==e)throw Error(X(188))}function CS
e){var t=e.alternate;if(!t){if(t=Mi(e),t===null)throw Error(X(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return jg(o),e;if(i===
return jg(o),t;i=i.sibling}throw Error(X(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s){for(a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s)thro 
Error(X(189))}}if(n.alternate!==r)throw Error(X(190))}if(n.tag!==3)throw Error(X(188));return n.stateNode.current===n?e:t}function w5(e){return e=CS(e),e!==null?C5(e):null}function C5(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=C5(e);if(t!==null)return t;e=e.sib
ng}return null}var E5=kn.unstable_scheduleCallback,Ag=kn.unstable_cancelCallback,ES=kn.unstable_shouldYield,TS=kn.unstable_requestPaint,Tt=kn.unstable_now,PS=kn.unstable_getCurrentPriorityLevel,Bh=kn.unstable_ImmediatePriority,T5=kn.unstable_UserBlockingPriority,Xc=kn.unstable_NormalP
ority,kS=kn.unstable_LowPriority,P5=kn.unstable_IdlePriority,qu=null,Pr=null;function RS(e){if(Pr&&typeof Pr.onCommitFiberRoot=="function")try{Pr.onCommitFiberRoot(qu,e,void 0,(e.current.flags&128)===128)}catch{}}var dr=Math.clz32?Math.clz32:_S,MS=Math.log,$S=Math.LN2;function _S(e){r
urn e>>>=0,e===0?32:31-(MS(e)/$S|0)|0}var Ql=64,Jl=4194304;function wa(e){switch(e&-e){default:return e}}function Yc(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~o;a!==0?r=wa(a):(i&=s,i!==0&&(r=wa(i)))}else s=n
o,s!==0?r=wa(s):i!==0&&(r=wa(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-dr(t),o=1<<n,r|=e[n],t&=~o;return r}function IS(e,t){switch(e){function NS
t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-dr(i),a=1<<s,l=o[s];l===-1?(!(a&n)||a&r)&&(o[s]=IS(a,t)):l<=t&&(e.expiredLanes|=a),i&=~a}}function Qp(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function k5(
var e=Ql;return Ql<<=1,!(Ql&4194240)&&(Ql=64),e}function Of(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ml(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-dr(t),e[t]=n}function LS(e,t){var n=e.pendingLanes&~t;e.pendingLanes
e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-dr(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function Vh(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){va
=31-dr(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Ze=0;function R5(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var M5,Uh,$5,_5,I5,Jp=!1,ec=[],xo=null,bo=null,So=null,Ya=new Map,Qa=new Map,ho=[],OS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercan
pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Dg(e,t){switch(e){case"focusin":case"focusout":xo=null;break;case"dragenter":case"dragleave":bo
ll;break;case"mouseover":case"mouseout":So=null;break;case"pointerover":case"pointerout":Ya.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qa.delete(t.pointerId)}}function ra(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eve
stemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=_l(t),t!==null&&Uh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function jS(e,t,n,r,o){switch(t){case"focusin":return xo=ra(xo,e,t,n,r,o),!0;case"dragenter":return bo=ra(bo,e,t
,o),!0;case"mouseover":return So=ra(So,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Ya.set(i,ra(Ya.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Qa.set(i,ra(Qa.get(i)||null,e,t,n,r,o)),!0}return!1}function N5(e){var t=oi(e.target);if(t!==null){va
Mi(t);if(n!==null){if(t=n.tag,t===13){if(t=S5(n),t!==null){e.blockedOn=t,I5(e.priority,function(){$5(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function kc(e){if(e.blockedOn
ll)return!1;for(var t=e.targetContainers;0<t.length;){var n=e1(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Zp=r,n.target.dispatchEvent(r),Zp=null}else return t=_l(n),t!==null&&Uh(t),e.blockedOn=n,!1;t.shift()}ret
0}function zg(e,t,n){kc(e)&&n.delete(t)}function AS(){Jp=!1,xo!==null&&kc(xo)&&(xo=null),bo!==null&&kc(bo)&&(bo=null),So!==null&&kc(So)&&(So=null),Ya.forEach(zg),Qa.forEach(zg)}function oa(e,t){e.blockedOn===t&&(e.blockedOn=null,Jp||(Jp=!0,kn.unstable_scheduleCallback(kn.unstable_Norm
alPriority,AS)))}function Ja(e){function t(o){return oa(o,e)}if(0<ec.length){oa(ec[0],e);for(var n=1;n<ec.length;n++){var r=ec[n];r.blockedOn===e&&(r.blockedOn=null)}}for(xo!==null&&oa(xo,e),bo!==null&&oa(bo,e),So!==null&&oa(So,e),Ya.forEach(t),Qa.forEach(t),n=0;n<ho.length;n++)r=ho[n
],r.blockedOn===e&&(r.blockedOn=null);for(;0<ho.length&&(n=ho[0],n.blockedOn===null);)N5(n),n.blockedOn===null&&ho.shift()}var ms=eo.ReactCurrentBatchConfig,Qc=!0;function DS(e,t,n,r){var o=Ze,i=ms.transition;ms.transition=null;try{Ze=1,Hh(e,t,n,r)}finally{Ze=o,ms.transition=i}}functi
on zS(e,t,n,r){var o=Ze,i=ms.transition;ms.transition=null;try{Ze=4,Hh(e,t,n,r)}finally{Ze=o,ms.transition=i}}function Hh(e,t,n,r){if(Qc){var o=e1(e,t,n,r);if(o===null)Wf(e,t,r,Jc,n),Dg(e,r);else if(jS(o,e,t,n,r))r.stopPropagation();else if(Dg(e,r),t&4&&-1<OS.indexOf(e)){for(;o!==null
;){var i=_l(o);if(i!==null&&M5(i),i=e1(e,t,n,r),i===null&&Wf(e,t,r,Jc,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Wf(e,t,r,null,n)}}var Jc=null;function e1(e,t,n,r){if(Jc=null,e=Fh(r),e=oi(e),e!==null)if(t=Mi(e),t===null)e=null;else if(n=t.tag,n===13){if(e=S5(t),e!==null)ret
urn e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Jc=e,null}function L5(e){switch(e){default:return 16}}var go=null,Wh=null,Rc=null;function O5(){if(Rc)return Rc;var e,t=Wh,n
=t.length,r,o="value"in go?go.value:go.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===o[i-r];r++);return Rc=o.slice(e,1<r?1-r:void 0)}function Mc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=
e||e===13?e:0}function tc(){return!0}function Fg(){return!1}function In(e){function t(n,r,o,i,s){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDef
aultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?tc:Fg,this.isPropagationStopped=Fg,this}return pt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknow
n"&&(n.returnValue=!1),this.isDefaultPrevented=tc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=tc)},persist:function(){},isPersistent:tc}),t}var Zs={eventPh
ase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kh=In(Zs),$l=pt({},Zs,{view:0,detail:0}),FS=In($l),jf,Af,ia,Xu=pt({},$l,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,g
etModifierState:Gh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ia&&(ia&&e.type==="mousemove"?(jf=e.screenX-ia.screenX,A
f=e.screenY-ia.screenY):Af=jf=0,ia=e),jf)},movementY:function(e){return"movementY"in e?e.movementY:Af}}),Bg=In(Xu),BS=pt({},Xu,{dataTransfer:0}),VS=In(BS),US=pt({},$l,{relatedTarget:0}),Df=In(US),HS=pt({},Zs,{animationName:0,elapsedTime:0,pseudoElement:0}),WS=In(HS),KS=pt({},Zs,{clipb
oardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),GS=In(KS),ZS=pt({},Zs,{data:0}),Vg=In(ZS),qS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",
Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},function QS(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=YS[e])?!!t[e]:!1}function Gh(){return QS}var JS=pt({},$l,{key:function(e){if(e.key){var t=qS[e.key]||e.key;if(t!=="Unidentified")return t}return
 e.type==="keypress"?(e=Mc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?XS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gh,charCode:function(e){return e.type==="keypress"?M`}{" "}
        </Box>
    );
}
