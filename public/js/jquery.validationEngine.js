/**
 * @package Site Template
 * @subpackage Increase HTML
 * @since Increase 1.0
 */

/*
 * Inline Form Validation Engine 2.2.4, jQuery plugin
 *
 * Copyright(c) 2010, Cedric Dugas
 * http://www.position-absolute.com
 *
 * 2.0 Rewrite by Olivier Refalo
 * http://www.crionics.com
 *
 * Form validation engine allowing custom regex rules to be added.
 * Licensed under the MIT License
 */


(function(a){var b={init:function(c){var d=this;if(!d.data("jqv")||d.data("jqv")==null){b._saveOptions(d,c);a(".formError").live("click",function(){a(this).fadeOut(150,function(){a(this).remove()})})}return this},attach:function(c){var d=this;var e;if(c)e=b._saveOptions(d,c);else e=d.data("jqv");var f=d.find("[data-validation-engine*=validate]")?"data-validation-engine":"class";if(!e.binded){if(e.bindMethod=="bind"){d.find("[class*=validate]").not("[type=checkbox]").not("[type=radio]").not(".datepicker").bind(e.validationEventTrigger,b._onFieldEvent);d.find("[class*=validate][type=checkbox],[class*=validate][type=radio]").bind("click",b._onFieldEvent);d.find("[class*=validate][class*=datepicker]").bind(e.validationEventTrigger,{delay:300},b._onFieldEvent);d.bind("submit",b._onSubmitEvent)}else if(e.bindMethod=="live"){d.find("[class*=validate]").not("[type=checkbox]").not(".datepicker").live(e.validationEventTrigger,b._onFieldEvent);d.find("[class*=validate][type=checkbox]").live("click",b._onFieldEvent);d.find("[class*=validate][class*=datepicker]").live(e.validationEventTrigger,{delay:300},b._onFieldEvent);d.live("submit",b._onSubmitEvent)}e.binded=true;if(e.autoPositionUpdate){a(window).bind("resize",{noAnimation:true,formElem:d},b.updatePromptsPosition)}}return this},detach:function(){var c=this;var d=c.data("jqv");if(d.binded){c.find("[class*=validate]").not("[type=checkbox]").unbind(d.validationEventTrigger,b._onFieldEvent);c.find("[class*=validate][type=checkbox],[class*=validate][type=radio]").unbind("click",b._onFieldEvent);c.unbind("submit",b.onAjaxFormComplete);c.find("[class*=validate]").not("[type=checkbox]").die(d.validationEventTrigger,b._onFieldEvent);c.find("[class*=validate][type=checkbox]").die("click",b._onFieldEvent);c.die("submit",b.onAjaxFormComplete);c.removeData("jqv");if(d.autoPositionUpdate){a(window).unbind("resize",b.updatePromptsPosition)}}return this},validate:function(){return b._validateFields(this)},validateField:function(c){var d=a(this).data("jqv");var e=b._validateField(a(c),d);if(d.onSuccess&&d.InvalidFields.length==0)d.onSuccess();else if(d.onFailure&&d.InvalidFields.length>0)d.onFailure();return e},validateform:function(){return b._onSubmitEvent.call(this)},updatePromptsPosition:function(c){if(c&&this==window)var d=c.data.formElem,e=c.data.noAnimation;else var d=a(this.closest("form"));var f=d.data("jqv");d.find("[class*=validate]").not(":hidden").not(":disabled").each(function(){var c=a(this);var d=b._getPrompt(c);var g=a(d).find(".formErrorContent").html();if(d)b._updatePrompt(c,a(d),g,undefined,false,f,e)});return this},showPrompt:function(a,c,d,e){var f=this.closest("form");var g=f.data("jqv");if(!g)g=b._saveOptions(this,g);if(d)g.promptPosition=d;g.showArrow=e==true;b._showPrompt(this,a,c,false,g);return this},hidePrompt:function(){var c="."+b._getClassName(a(this).attr("id"))+"formError";a(c).fadeTo("fast",.3,function(){a(this).remove()});return this},hide:function(){var b;if(a(this).is("form")){b="parentForm"+a(this).attr("id")}else{b=a(this).attr("id")+"formError"}a("."+b).fadeTo("fast",.3,function(){a(this).remove()});return this},hideAll:function(){a(".formError").fadeTo("fast",.3,function(){a(this).remove()});return this},_onFieldEvent:function(c){var d=a(this);var e=d.closest("form");var f=e.data("jqv");window.setTimeout(function(){b._validateField(d,f);if(f.InvalidFields.length==0&&f.onSuccess){f.onSuccess()}else if(f.InvalidFields.length>0&&f.onFailure){f.onFailure()}},c.data?c.data.delay:0)},_onSubmitEvent:function(){var c=a(this);var d=c.data("jqv");var e=b._validateFields(c,true);if(e&&d.ajaxFormValidation){b._validateFormWithAjax(c,d);return false}if(d.onValidationComplete){d.onValidationComplete(c,e);return false}return e},_checkAjaxStatus:function(b){var c=true;a.each(b.ajaxValidCache,function(a,b){if(!b){c=false;return false}});return c},_validateFields:function(c,d){var e=c.data("jqv");var f=false;c.trigger("jqv.form.validating");var g=null;c.find("[class*=validate]").not(":hidden").not(":disabled").each(function(){var c=a(this);f|=b._validateField(c,e,d);if(f&&g==null)g=c});c.trigger("jqv.form.result",[f]);if(f){if(e.scroll){var h=g.offset().top;var i=g.offset().left;var j=e.promptPosition;if(typeof j=="string"){if(j.indexOf(":")!=-1){j=j.substring(0,j.indexOf(":"))}}if(j!="bottomRight"&&j!="bottomLeft"){var k=b._getPrompt(g);h=k.offset().top}if(checker.os.ipad||checker.os.ipod||checker.os.iphone){if(e.focusFirstField)g.focus()}else{a("html:not(:animated),body:not(:animated)").animate({scrollTop:h,scrollLeft:i},1100,function(){if(e.focusFirstField)g.focus()})}if(e.isOverflown){var l=a(e.overflownDIV);var m=l.scrollTop();var n=-parseInt(l.offset().top);h+=m+n-5;var o=a(e.overflownDIV+":not(:animated)");o.animate({scrollTop:h},1100)}}else if(e.focusFirstField)g.focus();return false}return true},_validateFormWithAjax:function(c,d){var e=c.serialize();var f=d.ajaxFormValidationURL?d.ajaxFormValidationURL:c.attr("action");a.ajax({type:"GET",url:f,cache:false,dataType:"json",data:e,form:c,methods:b,options:d,beforeSend:function(){return d.onBeforeAjaxFormValidation(c,d)},error:function(a,c){b._ajaxError(a,c)},success:function(e){if(e!==true){var f=false;for(var g=0;g<e.length;g++){var h=e[g];var i=h[0];var j=a(a("#"+i)[0]);if(j.length==1){var k=h[2];if(h[1]==true){if(k==""||!k){b._closePrompt(j)}else{if(d.allrules[k]){var l=d.allrules[k].alertTextOk;if(l)k=l}b._showPrompt(j,k,"pass",false,d,true)}}else{f|=true;if(d.allrules[k]){var l=d.allrules[k].alertText;if(l)k=l}b._showPrompt(j,k,"",false,d,true)}}}d.onAjaxFormComplete(!f,c,e,d)}else d.onAjaxFormComplete(true,c,"",d)}})},_validateField:function(c,d,e){if(!c.attr("id"))a.error("jQueryValidate: an ID attribute is required for this field: "+c.attr("name")+" class:"+c.attr("class"));var f=c.attr("class");var g=/validate\[(.*)\]/.exec(f);if(!g)return false;var h=g[1];var i=h.split(/\[|,|\]/);var j=false;var k=c.attr("name");var l="";var m=false;d.isError=false;d.showArrow=true;var n=a(c.closest("form"));for(var o=0;o<i.length;o++){i[o]=i[o].replace(" ","");var p=undefined;switch(i[o]){case"required":m=true;p=b._required(c,i,o,d);break;case"custom":p=b._customRegex(c,i,o,d);break;case"groupRequired":var q="[class*="+i[o+1]+"]";var r=n.find(q).eq(0);if(r[0]!=c[0]){b._validateField(r,d,e);d.showArrow=true;continue}p=b._groupRequired(c,i,o,d);if(p)m=true;d.showArrow=false;break;case"ajax":if(!e){b._ajax(c,i,o,d);j=true}break;case"minSize":p=b._minSize(c,i,o,d);break;case"maxSize":p=b._maxSize(c,i,o,d);break;case"min":p=b._min(c,i,o,d);break;case"max":p=b._max(c,i,o,d);break;case"past":p=b._past(c,i,o,d);break;case"future":p=b._future(c,i,o,d);break;case"dateRange":var q="[class*="+i[o+1]+"]";var r=n.find(q).eq(0);var s=n.find(q).eq(1);if(r[0].value||s[0].value){p=b._dateRange(r,s,i,o,d)}if(p)m=true;d.showArrow=false;break;case"dateTimeRange":var q="[class*="+i[o+1]+"]";var r=n.find(q).eq(0);var s=n.find(q).eq(1);if(r[0].value||s[0].value){p=b._dateTimeRange(r,s,i,o,d)}if(p)m=true;d.showArrow=false;break;case"maxCheckbox":p=b._maxCheckbox(n,c,i,o,d);c=a(n.find("input[name='"+k+"']"));break;case"minCheckbox":p=b._minCheckbox(n,c,i,o,d);c=a(n.find("input[name='"+k+"']"));break;case"equals":p=b._equals(c,i,o,d);break;case"funcCall":p=b._funcCall(c,i,o,d);break;default:}if(p!==undefined){l+=p+"<br/>";d.isError=true}}if(!m&&c.val()=="")d.isError=false;var t=c.prop("type");if((t=="radio"||t=="checkbox")&&n.find("input[name='"+k+"']").size()>1){c=a(n.find("input[name='"+k+"'][type!=hidden]:first"));d.showArrow=false}if(t=="text"&&n.find("input[name='"+k+"']").size()>1){c=a(n.find("input[name='"+k+"'][type!=hidden]:first"));d.showArrow=false}if(d.isError){b._showPrompt(c,l,"",false,d)}else{if(!j)b._closePrompt(c)}if(!j){c.trigger("jqv.field.result",[c,d.isError,l])}var u=a.inArray(c[0],d.InvalidFields);if(u==-1){if(d.isError)d.InvalidFields.push(c[0])}else if(!d.isError){d.InvalidFields.splice(u,1)}return d.isError},_required:function(a,b,c,d){switch(a.prop("type")){case"text":case"password":case"textarea":case"file":default:if(!a.val())return d.allrules[b[c]].alertText;break;case"radio":case"checkbox":var e=a.closest("form");var f=a.attr("name");if(e.find("input[name='"+f+"']:checked").size()==0){if(e.find("input[name='"+f+"']").size()==1)return d.allrules[b[c]].alertTextCheckboxe;else return d.allrules[b[c]].alertTextCheckboxMultiple}break;case"select-one":if(!a.val())return d.allrules[b[c]].alertText;break;case"select-multiple":if(!a.find("option:selected").val())return d.allrules[b[c]].alertText;break}},_groupRequired:function(c,d,e,f){var g="[class*="+d[e+1]+"]";var h=false;c.closest("form").find(g).each(function(){if(!b._required(a(this),d,e,f)){h=true;return false}});if(!h)return f.allrules[d[e]].alertText},_customRegex:function(a,b,c,d){var e=b[c+1];var f=d.allrules[e];if(!f){alert("jqv:custom rule not found "+e);return}var g=f.regex;if(!g){alert("jqv:custom regex not found "+e);return}var h=new RegExp(g);if(!h.test(a.val()))return d.allrules[e].alertText},_funcCall:function(a,b,c,d){var e=b[c+1];var f=window[e];if(typeof f=="function")return f(a,b,c,d)},_equals:function(b,c,d,e){var f=c[d+1];if(b.val()!=a("#"+f).val())return e.allrules.equals.alertText},_maxSize:function(a,b,c,d){var e=b[c+1];var f=a.val().length;if(f>e){var g=d.allrules.maxSize;return g.alertText+e+g.alertText2}},_minSize:function(a,b,c,d){var e=b[c+1];var f=a.val().length;if(f<e){var g=d.allrules.minSize;return g.alertText+e+g.alertText2}},_min:function(a,b,c,d){var e=parseFloat(b[c+1]);var f=parseFloat(a.val());if(f<e){var g=d.allrules.min;if(g.alertText2)return g.alertText+e+g.alertText2;return g.alertText+e}},_max:function(a,b,c,d){var e=parseFloat(b[c+1]);var f=parseFloat(a.val());if(f>e){var g=d.allrules.max;if(g.alertText2)return g.alertText+e+g.alertText2;return g.alertText+e}},_past:function(a,c,d,e){var f=c[d+1];var g=f.toLowerCase()=="now"?new Date:b._parseDate(f);var h=b._parseDate(a.val());if(h<g){var i=e.allrules.past;if(i.alertText2)return i.alertText+b._dateToString(g)+i.alertText2;return i.alertText+b._dateToString(g)}},_future:function(a,c,d,e){var f=c[d+1];var g=f.toLowerCase()=="now"?new Date:b._parseDate(f);var h=b._parseDate(a.val());if(h>g){var i=e.allrules.future;if(i.alertText2)return i.alertText+b._dateToString(g)+i.alertText2;return i.alertText+b._dateToString(g)}},_isDate:function(a){var b=new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);if(b.test(a)){return true}return false},_isDateTime:function(a){var b=new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);if(b.test(a)){return true}return false},_dateCompare:function(a,b){return new Date(a.toString())<new Date(b.toString())},_dateRange:function(a,c,d,e,f){if(!a[0].value&&c[0].value||a[0].value&&!c[0].value){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}if(!b._isDate(a[0].value)||!b._isDate(c[0].value)){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}if(!b._dateCompare(a[0].value,c[0].value)){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}},_dateTimeRange:function(a,c,d,e,f){if(!a[0].value&&c[0].value||a[0].value&&!c[0].value){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}if(!b._isDateTime(a[0].value)||!b._isDateTime(c[0].value)){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}if(!b._dateCompare(a[0].value,c[0].value)){return f.allrules[d[e]].alertText+f.allrules[d[e]].alertText2}},_maxCheckbox:function(a,b,c,d,e){var f=c[d+1];var g=b.attr("name");var h=a.find("input[name='"+g+"']:checked").size();if(h>f){e.showArrow=false;if(e.allrules.maxCheckbox.alertText2)return e.allrules.maxCheckbox.alertText+" "+f+" "+e.allrules.maxCheckbox.alertText2;return e.allrules.maxCheckbox.alertText}},_minCheckbox:function(a,b,c,d,e){var f=c[d+1];var g=b.attr("name");var h=a.find("input[name='"+g+"']:checked").size();if(h<f){e.showArrow=false;return e.allrules.minCheckbox.alertText+" "+f+" "+e.allrules.minCheckbox.alertText2}},_ajax:function(c,d,e,f){var g=d[e+1];var h=f.allrules[g];var i=h.extraData;var j=h.extraDataDynamic;if(!i)i="";if(j){var k=[];var l=String(j).split(",");for(var e=0;e<l.length;e++){var m=l[e];if(a(m).length){var n=c.closest("form").find(m).val();var o=m.replace("#","")+"="+escape(n);k.push(o)}}j=k.join("&")}else{j=""}if(!f.isError){a.ajax({type:"GET",url:h.url,cache:false,dataType:"json",data:"fieldId="+c.attr("id")+"&fieldValue="+c.val()+"&extraData="+i+"&"+j,field:c,rule:h,methods:b,options:f,beforeSend:function(){var a=h.alertTextLoad;if(a)b._showPrompt(c,a,"load",true,f)},error:function(a,c){b._ajaxError(a,c)},success:function(c){var d=c[0];var e=a(a("#"+d)[0]);if(e.length==1){var g=c[1];var i=c[2];if(!g){f.ajaxValidCache[d]=false;f.isError=true;if(i){if(f.allrules[i]){var j=f.allrules[i].alertText;if(j)i=j}}else i=h.alertText;b._showPrompt(e,i,"",true,f)}else{if(f.ajaxValidCache[d]!==undefined)f.ajaxValidCache[d]=true;if(i){if(f.allrules[i]){var j=f.allrules[i].alertTextOk;if(j)i=j}}else i=h.alertTextOk;if(i)b._showPrompt(e,i,"pass",true,f);else b._closePrompt(e)}}e.trigger("jqv.field.result",[e,!f.isError,i])}})}},_ajaxError:function(a,b){if(a.status==0&&b==null)alert("The page is not served from a server! ajax call failed");else if(typeof console!="undefined")console.log("Ajax error: "+a.status+" "+b)},_dateToString:function(a){return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()},_parseDate:function(a){var b=a.split("-");if(b==a)b=a.split("/");return new Date(b[0],b[1]-1,b[2])},_showPrompt:function(a,c,d,e,f,g){var h=b._getPrompt(a);if(g)h=false;if(h)b._updatePrompt(a,h,c,d,e,f);else b._buildPrompt(a,c,d,e,f)},_buildPrompt:function(c,d,e,f,g){var h=a("<div>");h.addClass(b._getClassName(c.attr("id"))+"formError");if(c.is(":input"))h.addClass("parentForm"+b._getClassName(c.parents("form").attr("id")));h.addClass("formError");switch(e){case"pass":h.addClass("greenPopup");break;case"load":h.addClass("blackPopup");break;default:g.InvalidCount++}if(f)h.addClass("ajaxed");var i=a("<div>").addClass("formErrorContent").html(d).appendTo(h);if(g.showArrow){var j=a("<div>").addClass("formErrorArrow");var k=c.data("promptPosition")||g.promptPosition;if(typeof k=="string"){if(k.indexOf(":")!=-1){k=k.substring(0,k.indexOf(":"))}}switch(k){case"bottomLeft":case"bottomRight":h.find(".formErrorContent").before(j);j.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');break;case"topLeft":case"topRight":j.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');h.append(j);break}}if(g.isOverflown)c.before(h);else a("body").append(h);var l=b._calculatePosition(c,h,g);h.css({top:l.callerTopPosition,left:l.callerleftPosition,marginTop:l.marginTopSize,opacity:0}).data("callerField",c);return h.animate({opacity:.87})},_updatePrompt:function(a,c,d,e,f,g,h){if(c){if(typeof e!=="undefined"){if(e=="pass")c.addClass("greenPopup");else c.removeClass("greenPopup");if(e=="load")c.addClass("blackPopup");else c.removeClass("blackPopup")}if(f)c.addClass("ajaxed");else c.removeClass("ajaxed");c.find(".formErrorContent").html(d);var i=b._calculatePosition(a,c,g);css={top:i.callerTopPosition,left:i.callerleftPosition,marginTop:i.marginTopSize};if(h)c.css(css);else c.animate(css)}},_closePrompt:function(a){var c=b._getPrompt(a);if(c)c.fadeTo("fast",0,function(){c.remove()})},closePrompt:function(a){return b._closePrompt(a)},_getPrompt:function(c){var d=b._getClassName(c.attr("id"))+"formError";var e=a("."+b._escapeExpression(d))[0];if(e)return a(e)},_escapeExpression:function(a){return a.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g,"\\$1")},_calculatePosition:function(a,b,c){var d,e,f;var g=a.width();var h=b.height();var i=c.isOverflown;if(i){d=e=0;f=-h}else{var j=a.offset();d=j.top;e=j.left;f=0}var k=a.data("promptPosition")||c.promptPosition;var l="";var m="";var n=0;var o=0;if(typeof k=="string"){if(k.indexOf(":")!=-1){l=k.substring(k.indexOf(":")+1);k=k.substring(0,k.indexOf(":"));if(l.indexOf(",")!=-1){m=l.substring(l.indexOf(",")+1);l=l.substring(0,l.indexOf(","));o=parseInt(m);if(isNaN(o)){o=0}}n=parseInt(l);if(isNaN(l)){l=0}}}switch(k){default:case"topRight":if(i)e+=g-30;else{e+=g-30;d+=-h-2}break;case"topLeft":d+=-h-10;break;case"centerRight":e+=g+13;break;case"bottomLeft":d=d+a.height()+15;break;case"bottomRight":e+=g-30;d+=a.height()+5}e+=n;d+=o;return{callerTopPosition:d+"px",callerleftPosition:e+"px",marginTopSize:f+"px"}},_saveOptions:function(b,c){if(a.validationEngineLanguage)var d=a.validationEngineLanguage.allRules;else a.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");a.validationEngine.defaults.allrules=d;var e=a.extend({},a.validationEngine.defaults,c);b.data("jqv",e);return e},_getClassName:function(a){if(a){return a.replace(":","_").replace(".","_")}}};a.fn.validationEngine=function(c){var d=a(this);if(!d[0])return false;if(typeof c=="string"&&c.charAt(0)!="_"&&b[c]){if(c!="showPrompt"&&c!="hidePrompt"&&c!="hide"&&c!="hideAll")b.init.apply(d);return b[c].apply(d,Array.prototype.slice.call(arguments,1))}else if(typeof c=="object"||!c){b.init.apply(d,arguments);return b.attach.apply(d)}else{a.error("Method "+c+" does not exist in jQuery.validationEngine")}};a.validationEngine={defaults:{validationEventTrigger:"blur",scroll:true,focusFirstField:true,promptPosition:"topRight",bindMethod:"bind",inlineAjax:false,ajaxFormValidation:false,ajaxFormValidationURL:false,onAjaxFormComplete:a.noop,onBeforeAjaxFormValidation:a.noop,onValidationComplete:false,isOverflown:false,overflownDIV:"",binded:false,showArrow:true,isError:false,ajaxValidCache:{},autoPositionUpdate:false,InvalidFields:[],onSuccess:false,onFailure:false}}})(jQuery);

