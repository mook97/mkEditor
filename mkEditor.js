/**
* mkEditor - markdown and asciidoc editor
* Copyright(c) 2019, mook97.(MIT Licensed)
* 
* Includes marked - a markdown parser
* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
* https://github.com/markedjs/marked
* 
* Includes ace - Text Editor
* Copyright (c) 2010, Ajax.org B.V.
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Ajax.org B.V. nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* Date: 2019-03-01 
*/

!function(e){"use strict";var k={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:f,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,nptable:f,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:f,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,text:/^[^\n]+/};function a(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||b.defaults,this.rules=k.normal,this.options.pedantic?this.rules=k.pedantic:this.options.gfm&&(this.options.tables?this.rules=k.tables:this.rules=k.gfm)}k._label=/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,k._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,k.def=i(k.def).replace("label",k._label).replace("title",k._title).getRegex(),k.bullet=/(?:[*+-]|\d{1,9}\.)/,k.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,k.item=i(k.item,"gm").replace(/bull/g,k.bullet).getRegex(),k.list=i(k.list).replace(/bull/g,k.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+k.def.source+")").getRegex(),k._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",k._comment=/<!--(?!-?>)[\s\S]*?-->/,k.html=i(k.html,"i").replace("comment",k._comment).replace("tag",k._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),k.paragraph=i(k.paragraph).replace("hr",k.hr).replace("heading",k.heading).replace("lheading",k.lheading).replace("tag",k._tag).getRegex(),k.blockquote=i(k.blockquote).replace("paragraph",k.paragraph).getRegex(),k.normal=d({},k),k.gfm=d({},k.normal,{fences:/^ {0,3}(`{3,}|~{3,})([^`\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),k.gfm.paragraph=i(k.paragraph).replace("(?!","(?!"+k.gfm.fences.source.replace("\\1","\\2")+"|"+k.list.source.replace("\\1","\\3")+"|").getRegex(),k.tables=d({},k.gfm,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),k.pedantic=d({},k.normal,{html:i("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",k._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/}),a.rules=k,a.lex=function(e,t){return new a(t).lex(e)},a.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},a.prototype.token=function(e,t){var n,r,s,i,l,o,a,h,p,u,c,g,f,d,m,b;for(e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),1<s[0].length&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:y(s,"\n")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2]?s[2].trim():s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=x(o.cells[c],o.header.length);this.tokens.push(o)}else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),a={type:"list_start",ordered:d=1<(i=s[2]).length,start:d?+i:"",loose:!1},this.tokens.push(a),n=!(h=[]),f=(s=s[0].match(this.rules.item)).length,c=0;c<f;c++)u=(o=s[c]).length,~(o=o.replace(/^ *([*+-]|\d+\.) */,"")).indexOf("\n ")&&(u-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+u+"}","gm"),"")),c!==f-1&&(l=k.bullet.exec(s[c+1])[0],(1<i.length?1===l.length:1<l.length||this.options.smartLists&&l!==i)&&(e=s.slice(c+1).join("\n")+e,c=f-1)),r=n||/\n\n(?!\s*$)/.test(o),c!==f-1&&(n="\n"===o.charAt(o.length-1),r||(r=n)),r&&(a.loose=!0),b=void 0,(m=/^\[[ xX]\] /.test(o))&&(b=" "!==o[1],o=o.replace(/^\[[ xX]\] +/,"")),p={type:"list_item_start",task:m,checked:b,loose:r},h.push(p),this.tokens.push(p),this.token(o,!1),this.tokens.push({type:"list_item_end"});if(a.loose)for(f=h.length,c=0;c<f;c++)h[c].loose=!0;this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:s[0]});else if(t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),s[3]&&(s[3]=s[3].substring(1,s[3].length-1)),g=s[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[g]||(this.tokens.links[g]={href:s[2],title:s[3]});else if(t&&(s=this.rules.table.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/(?: *\| *)?\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=x(o.cells[c].replace(/^ *\| *| *\| *$/g,""),o.header.length);this.tokens.push(o)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var n={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:f,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:f,text:/^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};function p(e,t){if(this.options=t||b.defaults,this.links=e,this.rules=n.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=n.pedantic:this.options.gfm&&(this.options.breaks?this.rules=n.breaks:this.rules=n.gfm)}function r(e){this.options=e||b.defaults}function s(){}function h(e){this.tokens=[],this.token=null,this.options=e||b.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new t}function t(){this.seen={}}function u(e,t){if(t){if(u.escapeTest.test(e))return e.replace(u.escapeReplace,function(e){return u.replacements[e]})}else if(u.escapeTestNoEncode.test(e))return e.replace(u.escapeReplaceNoEncode,function(e){return u.replacements[e]});return e}function c(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function i(n,e){return n=n.source||n,e=e||"",{replace:function(e,t){return t=(t=t.source||t).replace(/(^|[^\[])\^/g,"$1"),n=n.replace(e,t),this},getRegex:function(){return new RegExp(n,e)}}}function l(e,t,n){if(e){try{var r=decodeURIComponent(c(n)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return null}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return null}t&&!g.test(n)&&(n=function(e,t){o[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?o[" "+e]=e+"/":o[" "+e]=y(e,"/",!0));return e=o[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}n._punctuation="!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~",n.em=i(n.em).replace(/punctuation/g,n._punctuation).getRegex(),n._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,n._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,n._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,n.autolink=i(n.autolink).replace("scheme",n._scheme).replace("email",n._email).getRegex(),n._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,n.tag=i(n.tag).replace("comment",k._comment).replace("attribute",n._attribute).getRegex(),n._label=/(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/,n._href=/\s*(<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*)/,n._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,n.link=i(n.link).replace("label",n._label).replace("href",n._href).replace("title",n._title).getRegex(),n.reflink=i(n.reflink).replace("label",n._label).getRegex(),n.normal=d({},n),n.pedantic=d({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:i(/^!?\[(label)\]\((.*?)\)/).replace("label",n._label).getRegex(),reflink:i(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",n._label).getRegex()}),n.gfm=d({},n.normal,{escape:i(n.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:i(n.text).replace("]|","~]|").replace("|$","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$").getRegex()}),n.gfm.url=i(n.gfm.url,"i").replace("email",n.gfm._extended_email).getRegex(),n.breaks=d({},n.gfm,{br:i(n.br).replace("{2,}","*").getRegex(),text:i(n.gfm.text).replace("{2,}","*").getRegex()}),p.rules=n,p.output=function(e,t,n){return new p(t,n).output(e)},p.prototype.output=function(e){for(var t,n,r,s,i,l,o="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),o+=u(i[1]);else if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(i[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(i[0])&&(this.inRawBlock=!1),e=e.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):u(i[0]):i[0];else if(i=this.rules.link.exec(e)){var a=m(i[2],"()");if(-1<a){var h=i[2].length-a;i[2]=i[2].substring(0,a),i[0]=i[0].substring(0,i[0].length-h)}e=e.substring(i[0].length),this.inLink=!0,r=i[2],s=this.options.pedantic?(t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))?(r=t[1],t[3]):"":i[3]?i[3].slice(1,-1):"",r=r.trim().replace(/^<([\s\S]*)>$/,"$1"),o+=this.outputLink(i,{href:p.escapes(r),title:p.escapes(s)}),this.inLink=!1}else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){o+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),o+=this.renderer.strong(this.output(i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),o+=this.renderer.em(this.output(i[6]||i[5]||i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),o+=this.renderer.codespan(u(i[2].trim(),!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),r="@"===i[2]?"mailto:"+(n=u(this.mangle(i[1]))):n=u(i[1]),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.inRawBlock?o+=this.renderer.text(i[0]):o+=this.renderer.text(u(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else{if("@"===i[2])r="mailto:"+(n=u(i[0]));else{for(;l=i[0],i[0]=this.rules._backpedal.exec(i[0])[0],l!==i[0];);n=u(i[0]),r="www."===i[1]?"http://"+n:n}e=e.substring(i[0].length),o+=this.renderer.link(r,null,n)}return o},p.escapes=function(e){return e?e.replace(p.rules._escapes,"$1"):e},p.prototype.outputLink=function(e,t){var n=t.href,r=t.title?u(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,u(e[1]))},p.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},p.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),.5<Math.random()&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){var r=(t||"").match(/\S*/)[0];if(this.options.highlight){var s=this.options.highlight(e,r);null!=s&&s!==e&&(n=!0,e=s)}return r?'<pre><code class="'+this.options.langPrefix+u(r,!0)+'">'+(n?e:u(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:u(e,!0))+"</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t,n){var r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(null===(e=l(this.options.sanitize,this.options.baseUrl,e)))return n;var r='<a href="'+u(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>"},r.prototype.image=function(e,t,n){if(null===(e=l(this.options.sanitize,this.options.baseUrl,e)))return n;var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},s.prototype.strong=s.prototype.em=s.prototype.codespan=s.prototype.del=s.prototype.text=function(e){return e},s.prototype.link=s.prototype.image=function(e,t,n){return""+n},s.prototype.br=function(){return""},h.parse=function(e,t){return new h(t).parse(e)},h.prototype.parse=function(e){this.inline=new p(e.links,this.options),this.inlineText=new p(e.links,d({},this.options,{renderer:new s})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},h.prototype.next=function(){return this.token=this.tokens.pop()},h.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},h.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},h.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,c(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s="",i="";for(n="",e=0;e<this.token.header.length;e++)n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});i+=this.renderer.tablerow(n)}return this.renderer.table(s,i);case"blockquote_start":for(i="";"blockquote_end"!==this.next().type;)i+=this.tok();return this.renderer.blockquote(i);case"list_start":i="";for(var l=this.token.ordered,o=this.token.start;"list_end"!==this.next().type;)i+=this.tok();return this.renderer.list(i,l,o);case"list_item_start":i="";var a=this.token.loose;for(this.token.task&&(i+=this.renderer.checkbox(this.token.checked));"list_item_end"!==this.next().type;)i+=a||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(i);case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:var h='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(h);console.log(h)}},t.prototype.slug=function(e){var t=e.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t))for(var n=t;this.seen[n]++,t=n+"-"+this.seen[n],this.seen.hasOwnProperty(t););return this.seen[t]=0,t},u.escapeTest=/[&<>"']/,u.escapeReplace=/[&<>"']/g,u.replacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},u.escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,u.escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g;var o={},g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function f(){}function d(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function x(e,t){var n=e.replace(/\|/g,function(e,t,n){for(var r=!1,s=t;0<=--s&&"\\"===n[s];)r=!r;return r?"|":" |"}).split(/ \|/),r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function y(e,t,n){if(0===e.length)return"";for(var r=0;r<e.length;){var s=e.charAt(e.length-r-1);if(s!==t||n){if(s===t||!n)break;r++}else r++}return e.substr(0,e.length-r)}function m(e,t){if(-1===e.indexOf(t[1]))return-1;for(var n=0,r=0;r<e.length;r++)if("\\"===e[r])r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&--n<0)return r;return-1}function b(e,n,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(r||"function"==typeof n){r||(r=n,n=null);var s,i,l=(n=d({},b.defaults,n||{})).highlight,t=0;try{s=a.lex(e,n)}catch(e){return r(e)}i=s.length;var o=function(t){if(t)return n.highlight=l,r(t);var e;try{e=h.parse(s,n)}catch(e){t=e}return n.highlight=l,t?r(t):r(null,e)};if(!l||l.length<3)return o();if(delete n.highlight,!i)return o();for(;t<s.length;t++)!function(n){"code"!==n.type?--i||o():l(n.text,n.lang,function(e,t){return e?o(e):null==t||t===n.text?--i||o():(n.text=t,n.escaped=!0,void(--i||o()))})}(s[t])}else try{return n&&(n=d({},b.defaults,n)),h.parse(a.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(n||b.defaults).silent)return"<p>An error occurred:</p><pre>"+u(e.message+"",!0)+"</pre>";throw e}}f.exec=f,b.options=b.setOptions=function(e){return d(b.defaults,e),b},b.getDefaults=function(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:new r,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tables:!0,xhtml:!1}},b.defaults=b.getDefaults(),b.Parser=h,b.parser=h.parse,b.Renderer=r,b.TextRenderer=s,b.Lexer=a,b.lexer=a.lex,b.InlineLexer=p,b.inlineLexer=p.output,b.Slugger=t,b.parse=b,"undefined"!=typeof module&&"object"==typeof exports?module.exports=b:"function"==typeof define&&define.amd?define(function(){return b}):e.marked=b}(this||("undefined"!=typeof window?window:global));


(function(global) {
  "use strict";
  var mkEditor = function(args){
    // defaultの変数を初期化する
    // default_toolsは配列の順番でそのまま表示されます
    var _this = this;

    _this.addTexts = function(s_text, e_text, col_num, is_start){
      /**
      *   -- args --
      *     s_text: string;
      *     e_text: string;
      *     col_num: int;
      *     is_start: boolean;
      *     
      *   -- 説明 --
      *     カーソル位置にテキスト(`s_text`&`e_text`)を挿入する
      *     カーソルが範囲選択の場合は範囲の文字列を一度切り取りし`s_text`と`e_text`の間に切り取った文字列を挿入する
      *     `col_num`が指定されていた場合は指定文字数分移動する。(デフォルトは`e_text`をの最後の文字から数えて何文字か)
      *     `is_start`が指定されていた場合は`col_nu`の開始位置が`s_text`の初めの文字から数える
      */
      var before_text = _this.editor.getSelectedText();
      var b_cursor_start = _this.editor.getSelectionRange().start;
      _this.editor.onCut();
      _this.editor.session.insert(_this.editor.getCursorPosition(), s_text + before_text + e_text);
      _this.editor.renderer.scrollCursorIntoView()
      var cursor_end = _this.editor.getSelectionRange().end;
      if(is_start == true){_this.editor.gotoLine(b_cursor_start.row+1, b_cursor_start.column + col_num);} 
      else {_this.editor.gotoLine(cursor_end.row+1, cursor_end.column - col_num);}
      _this.editor.focus();
    } 

    _this.addText_beginLine = function(s_text, max, blank_line) {
      /** 
      *  -- args --
      *    s_text: string;
      *    max: int;
      *    blank_line: int;
      *  -- 説明 --
      *    カーソル行またはカーソルの選択範囲(複数行も可)の行頭に文字列を追加する
      *    行頭に`s_text`を挿入し`max`が指定された場合は行頭に`max`分追加したら次を0として再度追加する
      *    blank_line=[0,1,2] 0=なし 1=全体の先頭に空行 2=全体の最後に空行 3=1+2の機能(追加する文字列の前後に改行を入れたい場合に使用する)
      */
      var cursor_start = _this.editor.getSelectionRange().start;
      var cursor_end   = _this.editor.getSelectionRange().end;
      _this.editor.selection.setRange(new ace.Range(cursor_start.row, 0, cursor_end.row, cursor_end.column)); /** 範囲を設定する(各行の行頭から最後までが入るように設定する) */
      var before_text = _this.editor.getSelectedText();
      var before_arr = before_text.split('\n');
      var after_text = '';
      _this.editor.onCut();
      var tmp_colCount = 0;
      for(var i=0;i<before_arr.length;i++){
        if(before_arr[i].search(new RegExp(s_text))==-1){
          after_text += s_text + ' ' + before_arr[i];
          tmp_colCount = s_text.length + 1;
        } else if(before_arr[i].search(new RegExp(s_text))==0 && before_arr[i].search(new RegExp(s_text + ' '))<max-1) {
          after_text += s_text + before_arr[i];
          tmp_colCount = s_text.length;
        } else {
          after_text += before_arr[i].slice(max + s_text.length);
          tmp_colCount -= max * s_text.length;
        }
        if(i != before_arr.length - 1){
          after_text += '\n';
        }
      }
      if(blank_line==1){after_text = '\n' + after_text;cursor_start.row=cursor_start.row+1;cursor_end.row=cursor_end.row+1;}
      if(blank_line==2){after_text = after_text + '\n';cursor_start.row=cursor_start.row+1;cursor_end.row=cursor_end.row+1;}
      if(blank_line==3){after_text = '\n' + after_text + '\n';cursor_start.row=cursor_start.row+1;cursor_end.row=cursor_end.row+1;}
      _this.editor.session.insert(_this.editor.getCursorPosition(), after_text);
      _this.editor.renderer.scrollCursorIntoView()
      _this.editor.selection.setRange(new ace.Range(cursor_start.row, 0, cursor_end.row, cursor_end.column + tmp_colCount)); /**範囲を設定する(各行の行頭から最後までが入るように設定する) */
      _this.editor.focus();
    }

    _this.modal_show = function(html, className){
      var modal = _this.element.querySelector('.mk-editor-ele .mk-modal');
      var overlay = _this.element.querySelector('.mk-editor-ele .overlay');
      if(modal != undefined && overlay != undefined){
        modal.style.display = 'block';
        overlay.style.display = 'block';
        if(html != undefined && typeof(html) == 'string'){
          _this.element.querySelector('.mk-editor-ele .mk-modal > .mk-modal-content').insertAdjacentHTML('beforeend', html);
        }
        if(className != undefined && typeof(className) == 'string'){
          _this.element.querySelector('.mk-editor-ele .mk-modal > .mk-modal-content').classList.add(className);
        }
      }
    }
    _this.modal_close = function(){
      var close = _this.element.querySelector('.mk-modal-close')
      var modal = _this.element.querySelector('.mk-editor-ele .mk-modal');
      var modal_content = _this.element.querySelector('.mk-editor-ele .mk-modal .mk-modal-content');
      var overlay = _this.element.querySelector('.mk-editor-ele .overlay');
      var closed = function(){
        modal.style.display = 'none';
        overlay.style.display = 'none';
        _this.classReset(modal_content, 'mk-modal-content')
        modal_content.innerHTML = '';
      }
      if(close != undefined && modal != undefined && overlay != undefined && modal_content != undefined){
        close.addEventListener('click', function(e){
          e.stopPropagation();
          closed();
        }, false)
        overlay.addEventListener('click', function(e){
          e.stopPropagation();
          closed();
        }, false)
      }
    }

    _this.classAllRemove = function(ele){
      /**すべてのクラスを削除する */
      if(ele != undefined && typeof(ele) == 'object' && ele.nodeType == 1){
        var classList = ele.classList.value.split(' ');
        for(var i=0;i<classList.length;i++){
          ele.classList.remove(classList[i]);
        }
      }
    }
    _this.classReset = function(ele, cls){
      /**一部のクラスのみ再度設定して他は削除する */
      /**args: cls:設定するクラスを半角スペースで設定する */
      if(ele != undefined && typeof(ele) == 'object' && ele.nodeType == 1 && (typeof(cls)==undefined || typeof(cls)=='string')){
        var classList = ele.classList.value.split(' ');
        var class_arr = typeof(cls)=='string' ? cls.split(' ') : [];
        for(var i=0;i<classList.length;i++){
          if(class_arr.indexOf(classList[i])==-1){
            ele.classList.remove(classList[i]);
          }
        }
      }
    }

    _this.sleep = function(wait, callback){
      var sleeping = 0;
      var timer = setInterval(function(){
        sleeping ++;
        if(sleeping >= wait){
            clearInterval(timer);
            if(callback != undefined && typeof(callback)) callback();
        }
      }, 1000);
    }

    _this.toolActionNotfound = function() {alert('action not found(mkEditor)');};
    _this.toggleBold =           function() {_this.addTexts('**', '**', 2);     _this.toggleBold_extended();};
    _this.toggleItalic =         function() {_this.addTexts('*', '*', 1);       _this.toggleItalic_extended();};
    _this.toggleStrikethrough =  function(){_this.addTexts('~~', '~~', 2);      _this.toggleStrikethrough_extended();};
    _this.toggleHeadingSmaller = function(){_this.addText_beginLine('#', 5);    _this.toggleHeadingSmaller_extended();};
    _this.toggleCodeBlock =      function(){_this.addTexts('```\n', '\n```', 3);_this.toggleCodeBlock_extended();};
    _this.toggleBlockquote =     function(){_this.addText_beginLine('>', 10);   _this.toggleBlockquote_extended();};
    _this.toggleUnorderedList =  function(){_this.addText_beginLine('-', 1);    _this.toggleUnorderedList_extended();};
    _this.toggleOrderedList =    function(){_this.addText_beginLine('1.', 1);   _this.toggleOrderedList_extended();};
    _this.drawLink =             function(){_this.addTexts('[', ']()', 3);      _this.drawLink_extended();};
    _this.drawImage =            function(){_this.addTexts('![', ']()', 3);     _this.drawImage_extended();}; /**$('#imageModal').modal(); */
    _this.drawTable =            function(){_this.addTexts('\n|  |  |  |\n|:---:|:---:|:---:|\n| | | |\n| | | |\n', '', 3, true);_this.drawTable_extended();};
    _this.drawHorizontalRule =   function(){_this.addTexts('\n***\n', '', 5);   _this.drawHorizontalRule_extended();};
    _this.undo = function(){_this.editor.undo();_this.undo_extended();};
    _this.redo = function(){_this.editor.redo();_this.redo_extended();};
    _this.togglePreview =        function(){
      if(_this.dispEle.classList.contains('hide') || _this.dispEle.classList.contains('side-by-side')){
        /**プレビューモード開始 */
        _this.editorEle.classList.remove('side-by-side');
        _this.editorEle.classList.add('hide');
        _this.dispEle.classList.remove('side-by-side');
        _this.dispEle.classList.remove('hide');
        _this.toolbarEle.querySelector('div > a.btn.side-by-side').classList.remove('active');
        _this.toolbarEle.querySelector('div > a.btn.preview').classList.add('active');
      } else {
        /**プレビューモード終了 */
        _this.editorEle.classList.remove('side-by-side');
        _this.editorEle.classList.remove('hide');
        _this.dispEle.classList.remove('side-by-side');
        _this.dispEle.classList.add('hide');
        _this.toolbarEle.querySelector('div > a.btn.side-by-side').classList.remove('active');
        _this.toolbarEle.querySelector('div > a.btn.preview').classList.remove('active');
      }
      _this.togglePreview_extended();
    };

    _this.toggleSideBySide =     function(){
      if(_this.dispEle.classList.contains('side-by-side')){
        /**分割モード終了 */
        _this.editorEle.classList.remove('hide');
        _this.dispEle.classList.add('hide');
        _this.editorEle.classList.remove('side-by-side');
        _this.dispEle.classList.remove('side-by-side');
        _this.toolbarEle.querySelector('div > a.btn.preview').classList.remove('active');
        _this.toolbarEle.querySelector('div > a.btn.side-by-side').classList.remove('active');
      } else {
        /**分割モード開始 */
        _this.editorEle.classList.remove('hide');
        _this.dispEle.classList.remove('hide');
        _this.editorEle.classList.add('side-by-side');
        _this.dispEle.classList.add('side-by-side');
        _this.toolbarEle.querySelector('div > a.btn.side-by-side').classList.add('active');
        _this.toolbarEle.querySelector('div > a.btn.preview').classList.remove('active');
      }
      _this.editor.resize(true);
      _this.toggleSideBySide_extended();
    };



    _this.toggleFullScreen =     function(){
      _this.element.classList.add('fullscreen');
      document.querySelector('body').style.overflow = 'hidden';
      _this.toggleFullScreen_extended();
    };
    _this.toggleNormalScreen = function(){
      _this.element.classList.remove('fullscreen');
      document.querySelector('body').style.overflow = 'auto';
      _this.toggleFullScreen_extended();
    }

    _this.settingTheme_main     = function() {
      if(_this.element.querySelector('.mk-editor-ediotr-setTheme') == null) {
        _this.editorEle.classList.add('mk-editor-ediotr-setTheme-hide');
        _this.dispEle.classList.add('mk-editor-ediotr-setTheme-hide');
        _this.toolbarEle.querySelector('div > a.btn.set-theme').classList.add('active');
  
        if(_this.editorEle.classList.contains('toolbar-vertical')){
          var toolbar_direction = 'toolbar-vertical';
        } else {
          var toolbar_direction = 'toolbar-horizontal';
        }
        var html = '<div class="mk-editor-ediotr-setTheme text-dark ' + toolbar_direction + '"><h4>White-Theme</h4>'
        for(var i=0; i<_this.themes.length; i++){
          if(_this.themes[i] == 'ambiance'){
            html += '<hr><h4>Dark-Theme</h4>'
          }
          if(_this.themes[i] == 'cobalt'){
            html += '<hr><h4>Blue-Theme</h4>'
          }
          html += '<div theme="' + _this.themes[i] +'" class="btn m-2 theme-sel-btn Editor-theme-' + _this.themes[i] +'" style="background:#' + 
          _this.themes_bgColor[_this.themes[i]] + ';color:#'
            + _this.themes_fontColor[_this.themes[i]] + ';' + '">' + _this.themes[i] + '</div>';
        }
        _this.element.insertAdjacentHTML('beforeend', 
          html + '<div class="btn theme-sel-btn">aaa</div' + '</div>'
        );

        var theme_eles = _this.element.querySelectorAll('.btn.theme-sel-btn');
        for(var i=0; i<theme_eles.length; i++){
          theme_eles[i].addEventListener('click', function(){
            if(_this.themes.indexOf(this.getAttribute('theme')) != -1){
              _this.settingTheme_clicked(this.getAttribute('theme'));
            }
          }, false);
        }

      } else {
        _this.editorEle.classList.remove('mk-editor-ediotr-setTheme-hide');
        _this.dispEle.classList.remove('mk-editor-ediotr-setTheme-hide');
        _this.toolbarEle.querySelector('div > a.btn.set-theme').classList.remove('active');
        var removeEle = _this.element.querySelector(".mk-editor-ediotr-setTheme");
        removeEle.parentNode.removeChild(removeEle);
      }
      _this.settingTheme_main_extended();
    };


    _this.settingTheme_clicked = function(theme) {
      _this.editor.setTheme('ace/theme/' + theme);
      _this.editorEle.classList.remove('mk-editor-ediotr-setTheme-hide');
      _this.dispEle.classList.remove('mk-editor-ediotr-setTheme-hide');

      if(_this.toolbarEle.querySelector('div > a.btn.set-theme')){
        _this.toolbarEle.querySelector('div > a.btn.set-theme').classList.remove('active');
      }
      var removeEle = document.getElementById("mk-editor-ediotr-setTheme");
      if(removeEle!=undefined){removeEle.parentNode.removeChild(removeEle);}
      _this.element.classList.remove('darkmode');
      _this.element.classList.remove('bluemode');
      _this.element.classList.remove('whitemode');
      _this.element.classList.remove('editor_theme-' + _this.theme); /**themeを削除する */
      _this.theme = theme; // 現在のテーマを設定する
      _this.element.classList.add(_this.themes_mode[theme]);
      _this.element.classList.add('editor_theme-' + theme);
      _this.dispEle.style.backgroundColor = '#' + _this.themes_bgColor[theme]; /**表示エリアのカラー指定 */
      _this.toolbarEle.style.backgroundColor = '#' + _this.themes_bgColor[theme]; /**ツールバーのカラー指定 */
      _this.settingTheme_clicked_extended();
    };

    _this.toolbar_create = function (ele, tools){
      var html = '<div class="tool-items-cls">';
      var base_tag_str_start = '<a class="btn text-center pl-0 pr-0 ';
      var tag_str_end = '"></i></a>';
      for(var i=0; i<_this.toolitems.length; i++){
        if(_this.toolitems[i]['className'] != undefined && _this.toolitems[i]['className'].split(' ').indexOf('no-mobile') != -1){
          var tag_str_start = base_tag_str_start + 'no-mobile ';
        } else {
          var tag_str_start = base_tag_str_start;
        }

        if(_this.toolitems[i]['name'] == 'line'){
          html += _this.toolbar_line;
        } else if(_this.toolitems[i]['name'] == 'guide') {
          html += tag_str_start + _this.toolitems[i]['name'] + '" href="https://simplemde.com/markdown-guide" target="_blank" title="' + this.toolitems[i]['title'] + '"><i class="fa fa-question-circle"></i></a>';
        } else if(_this.tool_listTypeItems.indexOf(_this.toolitems[i]['name']) != -1){
          var list_items = _this.tool_listTypeItems_data[_this.toolitems[i]['name']];
          html += tag_str_start +
          _this.toolitems[i]['name']  + ' list-items-group" title="' + 
          _this.toolitems[i]['title'] + '"><i class="' + 
          _this.toolitems[i]['className'] + '"></i>' + 
          '<div class="tool-list-items" style="display:none;">';
          
          for(var list_item=0; list_item < list_items.length; list_item++){
            if(list_items[list_item]['icon'] != undefined){
              html += '<p class="' + list_items[list_item]['class'] + '" title="' + list_items[list_item]['text'] + '"><i class="' + list_items[list_item]['icon'] + '"></i> ' + list_items[list_item]['text'] + '</p>';
            } else {
              html += '<p class="' + list_items[list_item]['class'] + '" title="' + list_items[list_item]['text'] + '">' + list_items[list_item]['text'] + '</p>';
            }
          }
  
          html += '</div></a>';
        } else {
          html += tag_str_start +
            _this.toolitems[i]['name'] + '" title="' + 
            _this.toolitems[i]['title'] + '"><i class="' + 
            _this.toolitems[i]['className'] + tag_str_end;
        }
      }
      html += '</div>';
      _this.element.querySelector('.toolbar').insertAdjacentHTML('beforeend', html);
      _this.toolbarEle = _this.element.querySelector('div.mk-editor-tools.toolbar');  /**変数化しておく */
  

      for (var i=0;i<_this.toolitems.length;i++){
        /**key Eventを追加する */
        var key = _this.toolitems[i].name;
        var tarEle = _this.toolbarEle.querySelector('div > a.' + key);
        if(tarEle!=undefined){
          tarEle.addEventListener('click', _this.tool_items_func[key], false);
        }
      }


      _this.previewFile = function () {
        var ele     = _this.element.querySelector('.mkEditor_File_Input_DOM');
        var file    = ele.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function() {
          document.querySelector('div.mk-editor-tools.toolbar > div > a.btn.image.list-items-group > div.tool-list-items').insertAdjacentHTML('beforeend', '<p class="mkEditor_File_DATA_Item" file_name="' + file.name + '" value="'+ reader.result+'"><i class="mk-image-trash fas fa-trash-alt"></i> ' + file.name + '</p>')
          var fileDatas = document.querySelectorAll('div.mk-editor-tools.toolbar > div > a.btn.image.list-items-group > div.tool-list-items > p.mkEditor_File_DATA_Item');
          var file_number = fileDatas.length-1;
          var pattern = new RegExp('(!\\['+escapeRegExp(file.name) +'\\]\\('+ file_number +'\\))','g')
          _this.addTexts('!['+file.name, ']('+file_number+')', 0);
          document.querySelector('#mark > div.mk-editor-tools.toolbar.toolbar-horizontal > div > a.btn.text-center.pl-0.pr-0.image.list-items-group > div > p:nth-child('+(fileDatas.length+2)+') > i.mk-image-trash').addEventListener('click', function(e){
            e.stopPropagation();
            var before = _this.editor.getValue(); // bafore data
            var after  = data.replace(pattern, '')  // after data
            var cursor_start = _this.editor.getSelectionRange().start;
            var cursor_end   = _this.editor.getSelectionRange().end;
            _this.editor.setValue(after);
            // mkEditor.editor.gotoLine(cursor_start, cursor_start);
            var tarEle = document.querySelector('#mark > div.mk-editor-tools.toolbar.toolbar-horizontal > div > a.btn.text-center.pl-0.pr-0.image.list-items-group > div > p:nth-child('+(fileDatas.length+2)+')')
            tarEle.style.display = 'none';
          });
        }, false);
        if(file) {reader.readAsDataURL(file);}
        ele.parentNode.removeChild(ele); 
      }
      /**image_link追加_1 */
      var tarEle = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.toggleimagelink')
      if(tarEle){
        tarEle.addEventListener('click', function(e){
          e.stopPropagation();
          _this.modal_show('<h3>Add Image</h3><input class="name" placeholder="image name(alt)" value="" spellcheck="false"/><input class="url" placeholder="image link(url)" value="" spellcheck="false"/><button class="btn cancel">Cancel</button><button class="btn add">Add</button>', 'image-link-add');
          _this.element.querySelector('div.mk-modal > div > button.btn.add').addEventListener('click', function(){
            var name = _this.element.querySelector('div.mk-modal > div > input.name').value;
            var url  = _this.element.querySelector('div.mk-modal > div > input.url').value;
            _this.addTexts('![' + name, ']('+url+')', 2);
            _this.element.querySelector('.mk-editor-ele .overlay').click();
          }, false);
          _this.element.querySelector('div.mk-modal > div > button.btn.cancel').addEventListener('click', function(){
            _this.element.querySelector('.mk-editor-ele .overlay').click();
          }, false);
        });
      }
      /**image_link追加_2 */
      var uploadimage = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.uploadimage')
      if(uploadimage){
        uploadimage.addEventListener('click', function(e){
          e.stopPropagation();
          if(uploadimage.querySelector('.mkEditor_File_Input_DOM') == undefined){
            uploadimage.insertAdjacentHTML('beforeend', '<input class="mkEditor_File_Input_DOM" style="display:none;" type="file"">')
            uploadimage.querySelector('.mkEditor_File_Input_DOM').addEventListener('click', function(){
              _this.previewFile();
            }, false);
            uploadimage.querySelector('.mkEditor_File_Input_DOM').click();
          }
        });
      }

      /**Image追加_3 */
      _this.testss = function(){alert('testsssss')}
      var tarEle = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.pastImage');
      if(tarEle){
        tarEle.addEventListener('click', function(e){
          e.stopPropagation();
          this.setAttribute('contenteditable', 'true');
          this.innerHTML = 'Ctrl + v';
          this.focus();
        });
        tarEle.onblur = function(){
          this.innerHTML = '<i class="fas fa-link"></i> Past Image'
        }
        
        if(_this.browser_name() == 'Chrome') {
          tarEle.addEventListener("paste", function(e){
            if (!e.clipboardData || !e.clipboardData.types || (e.clipboardData.types.length != 1) || (e.clipboardData.types[0] != "Files")) { return true; }
            var imageFile = e.clipboardData.items[0].getAsFile();
            var reader = new FileReader();
            reader.addEventListener('load', function(e){
              var base64 = e.target.result;
              var list_items = document.querySelector('div.mk-editor-tools.toolbar > div > a.btn.image.list-items-group > div.tool-list-items');
              list_items.insertAdjacentHTML('beforeend', '<p class="mkEditor_File_DATA_Item" file_name="" value="'+ base64+'"><i class="mk-image-trash fas fa-trash-alt"></i></p>')
              var fileDatas = list_items.querySelectorAll('p.mkEditor_File_DATA_Item');
              var file_number = fileDatas.length-1;
              _this.addTexts('!['+'-', ']('+file_number+')', 0);
              var fileNum = fileDatas.length+3;
              // 削除用のイベント
              _this.element.querySelector('a.btn.image.list-items-group > div > p:nth-child('+fileNum+') > i.mk-image-trash').addEventListener('click', function(e){
                e.stopPropagation();
                var pattern = new RegExp('(!\\['+escapeRegExp('-') +'\\]\\('+ file_number +'\\))','g')
                var after  = _this.editor.getValue().replace(pattern, '')  // after data
                _this.editor.setValue(after);
                var tarEle = _this.element.querySelector('a.btn.image.list-items-group > div > p:nth-child('+fileNum+')')
                tarEle.style.display = 'none';
              }, false);
            },false);
            reader.readAsDataURL(imageFile);
            this.innerHTML = "paste image here";
          });
        } else {
          tarEle.addEventListener("input", function(e){
            var temp = document.createElement("div");
            temp.innerHTML = this.innerHTML;
            var pastedImage = temp.querySelector("img");
            if (pastedImage) { 
              var base64 = pastedImage.src;
              var list_items = document.querySelector('div.mk-editor-tools.toolbar > div > a.btn.image.list-items-group > div.tool-list-items');
              list_items.insertAdjacentHTML('beforeend', '<p class="mkEditor_File_DATA_Item" file_name="" value="'+ base64+'"><i class="mk-image-trash fas fa-trash-alt"></i></p>')
              var fileDatas = list_items.querySelectorAll('p.mkEditor_File_DATA_Item');
              var file_number = fileDatas.length-1;
              _this.addTexts('!['+'-', ']('+file_number+')', 0);
              var fileNum = fileDatas.length+3;
              // 削除用のイベント
              _this.element.querySelector('a.btn.image.list-items-group > div > p:nth-child('+fileNum+') > i.mk-image-trash').addEventListener('click', function(e){
                e.stopPropagation();
                var pattern = new RegExp('(!\\['+escapeRegExp('-') +'\\]\\('+ file_number +'\\))','g')
                var after  = _this.editor.getValue().replace(pattern, '')  // after data
                _this.editor.setValue(after);
                var tarEle = _this.element.querySelector('a.btn.image.list-items-group > div > p:nth-child('+fileNum+')')
                tarEle.style.display = 'none';
              }, false);
            }
            this.innerHTML = "paste image here";
          })
        }
      }

      /**table追加_2 */
      var tarEle = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.drawtable_x_x');
      if(tarEle){
        tarEle.addEventListener('click', function(e){
          e.stopPropagation();
          var html = '<div class="mk-table-select-tool"><div class="mk-table-cells"><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span><span class="mk-cell"></span></div></div>' 
          var table_tool = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.drawtable_x_x .mk-table-select-tool');
          
          if(table_tool == undefined){
            this.insertAdjacentHTML('beforeend', html);
            var cells = document.querySelectorAll('.mk-table-cells span')
            document.querySelector('.mk-table-cells').addEventListener('mouseleave', function(){
              for(var i=0; i<cells.length;i++){cells[i].classList.remove('mk-state-selected');}
            }, false);
            for(var i=0; i<cells.length;i++){

              cells[i].addEventListener('mouseenter', function(){
                var cells = this.parentNode.querySelectorAll('span.mk-cell')
                var number = Array.prototype.indexOf.call(cells, this)
                var y_range = parseInt(number / 8, 10);
                var x_range = number % 8;
                for(var j=0;j<cells.length;j++){
                  if(parseInt(j / 8, 10) <= y_range && (j % 8) <= x_range){cells[j].classList.add('mk-state-selected');} else {cells[j].classList.remove('mk-state-selected');}
                }
              }, false);
          
              cells[i].addEventListener('click', function(){
                var cells = this.parentNode.querySelectorAll('span.mk-cell')
                var number = Array.prototype.indexOf.call(cells, this)
                var y_range = parseInt(number / 8, 10);
                var x_range = number % 8;
                console.log({'row': y_range+1, 'col': x_range+1});
                var add_text   = '|' + '|'.repeat(x_range+1) + '\n';
                if(y_range+1 > 1){
                  add_text += '|' + ':---:|'.repeat(x_range+1) + '\n';
                  add_text += ('|' + '|'.repeat(x_range+1) + '\n').repeat(y_range);
                }
                _this.addTexts(add_text, '', 3, true);
              }, false);
            }
          } else {
            // 表示中なら消す
            table_tool.parentNode.removeChild(table_tool);
          }
        });
      }

      /**table追加_3 */
      var tarEle = _this.toolbarEle.querySelector('div > a.btn.list-items-group > div.tool-list-items p.drawtable_excel')
      if(tarEle){
        tarEle.addEventListener('click', function(e){
          e.stopPropagation();
          _this.modal_show('<textarea class="excel-data" style="width: 100%;height: 140px;border: solid 1px #939393;"></textarea><button class="btn cancel">Cancel</button><button class="btn add">Add</button>', 'image-link-add');
          _this.element.querySelector('div.mk-modal > div > button.btn.add').addEventListener('click', function(){
            var val = _this.element.querySelector('textarea.excel-data').value;
            var result = '';
            var row = val.split(/\n/g);
            for(var i=0;i<row.length;i++){
              var col = row[i].split(/\t/g);
              if(col.length > 0){
                result += '|';
                for(var j=0;j<col.length;j++){
                  result += col[j] + '|';
                }
                result += '\n';
                if(i==0){
                  result += '|' + ':---:|'.repeat(col.length) + '\n';
                }
              }
            }
            _this.element.querySelector('.mk-editor-ele .overlay').click();
            _this.addTexts(result, '', 0);
          }, false)
          _this.element.querySelector('div.mk-modal > div > button.btn.cancel').addEventListener('click', function(){
            _this.element.querySelector('.mk-editor-ele .overlay').click();
          }, false);
          _this.element.querySelector('textarea.excel-data').addEventListener('keydown', function (e) {
            var elem, end, start, value;
            if (e.keyCode === 9) {
              if (e.preventDefault) {
                e.preventDefault();
              }
              elem = e.target;
              start = elem.selectionStart;
              end = elem.selectionEnd;
              value = elem.value;
              elem.value = "" + (value.substring(0, start)) + "\t" + (value.substring(end));
              elem.selectionStart = elem.selectionEnd = start + 1;
              return false;
            }
          });
        });
      }



      _this.modal_close();
      _this.toolbar_create_end_extend();
    };
  
  
    _this.htmlInitialize = function(){
      _this.element.insertAdjacentHTML('beforeend', '<div class="overlay"></div><div class="mk-modal"><p style="margin:0;width: 100%; text-align: right;"><a class="mk-modal-close" class="btn button-link"><i class="fas fa-times"></i></a></p><div class="mk-modal-content"></div></div>')
      if(_this.toolbar_position=='top' || _this.toolbar_position=='left'){
        _this.element.insertAdjacentHTML('beforeend', '<div class="mk-editor-tools toolbar toolbar-' + _this.toolbar_direction + '"></div><div id="" class="mk-editor-editor-ele toolbar-' + _this.toolbar_direction + '"></div><div id="" class="mk-editor-disp-ele hide toolbar-' + _this.toolbar_direction + '"><div></div></div>');
      } else {
        _this.element.insertAdjacentHTML('beforeend', '<div id="" class="mk-editor-editor-ele toolbar-' + _this.toolbar_direction + '"></div><div id="" class="mk-editor-disp-ele hide toolbar-' + _this.toolbar_direction + '"><div></div></div>' + '<div class="mk-editor-tools toolbar toolbar-' + _this.toolbar_direction + '"></div>');
      }
      _this.editorEle = _this.element.querySelector('div.mk-editor-editor-ele'); /**editorエリア */
      _this.dispEle = _this.element.querySelector('div.mk-editor-disp-ele'); /**dispエリア */
      _this.editor = ace.edit(_this.editorEle); 
      _this.editor.setTheme("ace/theme/" + _this.theme);
      _this.editor.getSession().setMode("ace/mode/markdown");
      _this.editor.setAutoScrollEditorIntoView(true);
      _this.editor.setFontSize(14)
      _this.editor.resize(true);
  
      /**ユーザ定義による変更 */
      _this.toolbar_create();
      _this.settingTheme_clicked(_this.theme)
      if(_this.autoDownloadFontAwesome){_this._require_FontAwesomeDownload();}    /**有効に設定してない場合は自分で設定することになる */
      if(_this.autoDownloadmkEditor_CSS){_this._require_mkEditorCSSDownload(); }  /**有効に設定してない場合は自分で設定することになる */
      if(_this.automkEditorAddCSSText){ _this._require_mkEditorAddCSSText(); }

      /**キー入力と同時に表示エリアに設定を反映する */
      _this.editor.getSession().on("change" , function(e){
        var data = _this.editor.getValue(); // data
        var fileDatas = _this.toolbarEle.querySelectorAll('div > a.btn.image.list-items-group > div.tool-list-items > p.mkEditor_File_DATA_Item');
        for(var i=0;i<fileDatas.length;i++){
          var pattern = new RegExp('(!\\[[^\\]]+\\]\\('+ i +'\\))','g')
          data = data.replace(pattern, '!['+fileDatas[i].getAttribute('file_name')+']('+fileDatas[i].getAttribute('value')+')');
        }
        _this.dispEle.innerHTML = '<div>'+marked(data)+'</div>'; /**getValueはオブジェクトを指定しないとダメ見たい */
        // document.getElementById('editor-value').value = mkEditor.editor.getValue(); /**getValueはオブジェクトを指定しないとダメ見たい */
      });
    };
  
    /**cssタグの挿入系 */
    _this._require_FontAwesomeDownload = function(){ document.querySelector('head').insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">');};
    _this._require_mkEditorCSSDownload  = function(){ document.querySelector('head').insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="' + _this.mkEditor_CSS_Path +'">');};
    _this._require_mkEditorAddCSSText  = function(){ document.querySelector('head').insertAdjacentHTML('beforeend', '<style>' +
        ".mk-editor-ele, .mk-editor-ele *, ::after, ::before{box-sizing: border-box;}.mk-editor-ele{overflow: hidden;position:relative;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;}.mk-editor-ele.fullscreen{height: 100vh!important;width: 100vw!important;position: absolute;top: 0;left: 0;z-index: 100;}.mk-editor-editor-ele.toolbar-vertical, .mk-editor-disp-ele.toolbar-vertical{float: left;height: 100%;width: calc(100% - 41px);}.mk-editor-editor-ele.side-by-side.toolbar-vertical{width: calc(50% - 25px);overflow: hidden;}.mk-editor-disp-ele.side-by-side.toolbar-vertical{width: calc(50% - 26px);overflow: hidden;}.mk-editor-disp-ele.toolbar-vertical div{width: calc(100% + 20px); height: calc(100% + 20px);padding: 5px;padding-right: 9px;overflow: scroll;}.mk-editor-editor-ele.toolbar-horizontal, .mk-editor-disp-ele.toolbar-horizontal{float: left;height: calc(100% - 41px);width: 100%;}.mk-editor-editor-ele.side-by-side.toolbar-horizontal{width: 50%;overflow: hidden;}.mk-editor-disp-ele.side-by-side.toolbar-horizontal{width: 50%;overflow: hidden;}.mk-editor-disp-ele.toolbar-horizontal div{width: calc(100% + 20px); height: calc(100% + 20px);padding: 4px;padding-right: 9px;overflow: scroll;}div > a.btn.list-items-group > div.tool-list-items p.pastImage:focus{background: white;}.ace_content{width: 100%;}.ace_scrollbar.ace_scrollbar-v,.ace_scrollbar.ace_scrollbar-h{display: none;}/* ace-editor--end */div.mk-editor-tools.toolbar .btn i.fa, div.mk-editor-tools.toolbar .btn i.fas{vertical-align: top;}.mk-editor-tools.toolbar.toolbar-vertical{float: left;height: 100%;width: 41px;padding: 5px;padding-right: 0px;overflow-y: hidden;overflow-x: hidden;}.mk-editor-tools.toolbar.toolbar-vertical div.tool-items-cls{padding: 2px 0;height: 100%;overflow-y: scroll;width: calc(100% + 22px);}.mk-editor-tools.toolbar.toolbar-vertical div.tool-items-cls .btn{margin-bottom: 3px;width: 30px;height: 30px;}.toolbar-vertical .toolbar-line{display: block;width: 30px;height: 1px;margin: 3px 0 6px 0;border: 0;}.mk-editor-tools.toolbar.toolbar-horizontal{width: 100%;height: 41px;padding: 3px;overflow-y: hidden;overflow-x: hidden;}.mk-editor-tools.toolbar.toolbar-horizontal div.tool-items-cls{padding: 2px 0;width: 100%;height: calc(100% + 20px);overflow-x: scroll;overflow-y:hidden;white-space:nowrap;}.mk-editor-tools.toolbar.toolbar-horizontal div.tool-items-cls .btn{display: inline-block;vertical-align: top;margin-left: 3px;width: 30px;height: 30px;}.toolbar-horizontal .toolbar-line{display: inline-block;vertical-align: top;height: 30px;width: 2px;margin-left: 3px;border: 0;}.mk-editor-ele.fullscreen div.mk-editor-tools.toolbar .btn.fullscreen,.mk-editor-ele div.mk-editor-tools.toolbar .btn.normalscreen{display: none;}.mk-editor-ele.fullscreen div.mk-editor-tools.toolbar .btn.normalscreen{display: inline-block;}.mk-editor-ediotr-setTheme{float:left;background:white;padding: 5px;overflow-y: scroll;overflow-x: hidden;}.mk-editor-ediotr-setTheme.toolbar-horizontal{height:calc(100% - 51px);width: 100%;}.mk-editor-ediotr-setTheme.toolbar-vertical{height:100%;width: calc(100% - 51px);}.mk-editor-ediotr-setTheme .btn{border: solid 1px #000000;}.hide{display: none;}.action-btn-group{height: 48px;}.mk-editor-ediotr-setTheme-hide{display: none;}div.mk-editor-disp-ele{overflow:scroll;}div.mk-editor-tools.toolbar > div > a.list-items-group.btn.pl-0.pr-0 > div.tool-list-items{display:none;position:absolute; background:white;width: auto;height: auto;overflow: hidden;text-align: left;z-index:10;padding: 0;box-shadow: 0 0px 20px rgba(0,0,0,0.2);top: 35px;-webkit-transition: opacity 0.2s linear 0s;-moz-transition: opacity 0.2s linear 0s;-o-transition: opacity 0.2s linear 0s;transition: opacity 0.2s linear 0s;}div.mk-editor-tools.toolbar > div > a.list-items-group.btn.pl-0.pr-0:hover > div.tool-list-items{display: block!important;opacity: 0.8;}div.mk-editor-tools.toolbar > div > a.list-items-group.btn.pl-0.pr-0 > div.tool-list-items:hover{display: block!important;opacity: 1.0;}div.mk-editor-tools.toolbar div.tool-list-items > p{color: black;margin: 0;height: 30px;font-size: 12px;padding: 8px 10px;}div.mk-editor-tools.toolbar div.tool-list-items > p:hover{background: #cbcbcc;}div.mk-editor-tools.toolbar div.tool-list-items > p > i.fab,div.mk-editor-tools.toolbar div.tool-list-items > p > i.fa,div.mk-editor-tools.toolbar div.tool-list-items > p > i.fas{vertical-align: top;padding-top: 2px;}div.mk-editor-tools.toolbar > div > a.btn.image > div > p.mkEditor_File_DATA_Item > i.mk-image-trash:hover{color:red;}.darkmode .mk-editor-editor-ele, .darkmode .mk-editor-disp-ele{border: solid 1px #9d9d9d;}.darkmode .mk-editor-disp-ele{color: white;}.darkmode .toolbar-horizontal.toolbar-line{border-left: solid #9d9d9d 1px;}.darkmode .toolbar-vertical .toolbar-line{border-top: solid #9d9d9d 1px;}.darkmode div.mk-editor-tools.toolbar > div > .btn{color: #504f4f;}.darkmode div.mk-editor-tools.toolbar:hover > div > .btn{color: #8b8b8b;}.darkmode div.mk-editor-tools.toolbar > div > a.btn:hover{border: solid 1px #777676; background: #000000;color: #ffffff;}.darkmode div.mk-editor-tools.toolbar > div > .btn.active{border: solid 1px #777676; background: #000000;color: #ffffff;}.darkmode .mk-editor-tools.toolbar{border: solid 1px #9d9d9d;}.bluemode .mk-editor-editor-ele, .bluemode .mk-editor-disp-ele{border: solid 1px #9d9d9d;}.bluemode .mk-editor-disp-ele{color: white;}.bluemode .toolbar-horizontal.toolbar-line{border-left: solid #9d9d9d 1px;}.bluemode .toolbar-vertical .toolbar-line{border-top: solid #9d9d9d 1px;}.bluemode div.mk-editor-tools.toolbar > div > .btn{color: #504f4f;}.bluemode div.mk-editor-tools.toolbar:hover > div > .btn{color: #8b8b8b;}.bluemode div.mk-editor-tools.toolbar > div > a.btn:hover{border: solid 1px #777676; background: #070c20;color: #ffffff;}.bluemode div.mk-editor-tools.toolbar > div > .btn.active{border: solid 1px #777676; background: #070c20;color: #ffffff;}.bluemode .mk-editor-tools.toolbar{border: solid 1px #9d9d9d;}.whitemode .mk-editor-editor-ele, .whitemode .mk-editor-disp-ele{border: solid 1px #000000;}.whitemode .mk-editor-disp-ele{color: #000000;}.whitemode .toolbar-horizontal.toolbar-line{border-left: solid #000000 1px;}.whitemode .toolbar-vertical .toolbar-line{border-top: solid #000000 1px;}.whitemode div.mk-editor-tools.toolbar > div > .btn{color: #bebdbd;}.whitemode div.mk-editor-tools.toolbar:hover > div > .btn{color: #8b8b8b;}.whitemode div.mk-editor-tools.toolbar > div > a.btn:hover{border: solid 1px #777676; background: #f8f8f8;color: #000000;}.whitemode div.mk-editor-tools.toolbar > div > .btn.active{border: solid 1px #777676; background: #f8f8f8;color: #000000;}.whitemode .mk-editor-tools.toolbar{border: solid 1px #000000;}.mk-editor-ele .modal-p{	margin-top:1em;}.mk-editor-ele .modal-p:first-child{	margin-top:0;}.mk-editor-ele .button-link{	color:#0f0f0f;text-decoration:underline;} .mk-editor-ele .button-link:hover{	cursor:pointer;color:#f00;}.mk-editor-ele .overlay{display: none;position: absolute;z-index:15;width: 100%;height: 100%;}.mk-editor-ele.whitemode .overlay{background: rgba(0,0,0,.7);}.mk-editor-ele.darkmode .overlay{background: rgba(0,0,0,.7);}.mk-editor-ele.bluemode.overlay{background: rgba(0,0,0,.7);}@media screen and (max-width:480px){.mk-editor-ele .mk-modal{width: 380px;height: 250px;}.no-mobile{display: none!important;}}.mk-editor-ele .mk-modal{display: none;position: absolute;width: 280px;height: 250px;left: 50%;top:50%;transform: translate(-50%, -50%);padding: 10px;z-index: 20;color: white;background: rgb(31, 31, 31);box-shadow: 0px 0px 25px 6px rgb(103, 103, 103);}.mk-editor-ele.bluemode .mk-modal{box-shadow: 0px 0px 25px 6px rgb(17, 103, 103);}.mk-editor-ele.whitemode .mk-modal{color: #242424;	background:#fff;box-shadow: 0 0px 20px rgba(0,0,0,0.2);}.mk-editor-ele .mk-modal .mk-modal-close{/* darkmode & bluemode */cursor: pointer;color: #cfcfcf;}.mk-editor-ele.whitemode .mk-modal .mk-modal-close:hover{/* whitemode */color: #000;}.mk-editor-ele .mk-modal .mk-modal-close:hover{color: #fff;}.mk-editor-ele .mk-modal .mk-modal-content{text-align: center;width: 100%;padding: 5px;padding-top: 10px}.mk-editor-ele .mk-modal .mk-modal-content input{width: 100%;border: none;outline: none;padding: 8px 5px;margin-top: 10px;border: solid 0.8px #5f5f5f;}/* img-add-modal */.mk-editor-ele > div.mk-modal > div.image-link-add{text-align: left;}.mk-editor-ele.whitemode > div.mk-modal > div.image-link-add .btn{color: #1b1b1b;border: solid 1px #8f8f8f;}.mk-editor-ele > div.mk-modal > div.image-link-add .btn{margin: 1.5rem 5%;margin-bottom: 0;color:#fcfcfc;width: 40%;-webkit-transition: all 0.5s linear 0s;-moz-transition: all 0.5s linear 0s;-o-transition: all 0.5s linear 0s;transition: all 0.5s linear 0s;}.mk-editor-ele.whitemode > div.mk-modal > div.image-link-add .btn:hover{border: solid 1px #5f5f5f;background: #c5c5c5;}.mk-editor-ele > div.mk-modal > div.image-link-add .btn:hover{border: solid 1px #cfcfcf;background: #000000;}div.mk-editor-tools.toolbar > div > a.btn.table.list-items-group > div > p.drawtable_x_x{height: auto;overflow: hidden!important;}.mk-table-select-tool{text-align: center;}.mk-table-cells{white-space: normal!important;overflow: hidden!important;width: 192px!important;height: 144px!important;padding: 3px;background: #ffffff;}.mk-table-cells span{display:inline-block;width:20px;height:20px;border:solid 1px #b4b4b4;margin: 1px;vertical-align: top;white-space: normal!important;overflow: hidden!important;}.mk-table-cells span.mk-state-selected{background: #e7e7e7;}a{color: #4183C4; }a.absent{color: #cc0000; }a.anchor{display: block;padding-left: 30px;margin-left: -30px;cursor: pointer;position: absolute;top: 0;left: 0;bottom: 0; }h1, h2, h3, h4, h5, h6{margin: 20px 0 10px;padding: 0;font-weight: bold;-webkit-font-smoothing: antialiased;cursor: text;position: relative; }h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA09pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM2NjlDQjI4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM2NjlDQjM4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzY2OUNCMDg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzY2OUNCMTg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsQhXeAAAABfSURBVHjaYvz//z8DJYCRUgMYQAbAMBQIAvEqkBQWXI6sHqwHiwG70TTBxGaiWwjCTGgOUgJiF1J8wMRAIUA34B4Q76HUBelAfJYSA0CuMIEaRP8wGIkGMA54bgQIMACAmkXJi0hKJQAAAABJRU5ErkJggg==) no-repeat 10px center;text-decoration: none; }h1 tt, h1 code{font-size: inherit; }h2 tt, h2 code{font-size: inherit;}h3 tt, h3 code{font-size: inherit;}h4 tt, h4 code{font-size: inherit;}h5 tt, h5 code{font-size: inherit;}h6 tt, h6 code{font-size: inherit;}h1{font-size: 28px;color: black; }h2{font-size: 24px;border-bottom: 1px solid #cccccc;color: black; }h3{font-size: 18px;}h4{font-size: 16px;}h5{font-size: 14px;}h6{color: #777777; font-size: 14px;}p, blockquote, ul, ol, dl, li, table, pre{margin: 15px 0; }hr{ background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC) repeat-x 0 0;border: 0 none;color: #cccccc;height: 4px;padding: 0; }body > h2:first-child{margin-top: 0; padding-top: 0;}body > h1:first-child{margin-top: 0;padding-top: 0;}body > h1:first-child + h2{margin-top: 0; padding-top: 0;}body > h3:first-child, body > h4:first-child, body > h5:first-child, body > h6:first-child{margin-top: 0; padding-top: 0;}a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6{margin-top: 0; padding-top: 0;}h1 p, h2 p, h3 p, h4 p, h5 p, h6 p{margin-top: 0;}li p.first{display: inline-block;}ul, ol{padding-left: 30px;}ul :first-child, ol :first-child{margin-top: 0;}ul :last-child, ol :last-child{margin-bottom: 0;}dl{padding: 0; }dl dt{font-size: 14px; font-weight: bold; font-style: italic; padding: 0; margin: 15px 0 5px;}dl dt:first-child{padding: 0;}dl dt > :first-child{margin-top: 0; }dl dt > :last-child{margin-bottom: 0;}dl dd{margin: 0 0 15px;padding: 0 15px;}dl dd > :first-child{margin-top: 0;}dl dd > :last-child{margin-bottom: 0; }blockquote{border-left: 4px solid #dddddd;padding: 0 15px;color: #777777; }blockquote > :first-child{margin-top: 0; }blockquote > :last-child{margin-bottom: 0;}table{padding: 0;}table tr{border-top: 1px solid #cccccc;background-color: white;margin: 0;padding: 0;}table tr:nth-child(2n){background-color: #f8f8f8;}table tr th{font-weight: bold;border: 1px solid #cccccc;text-align: left;margin: 0;padding: 6px 13px;}table tr td{border: 1px solid #cccccc;text-align: left;margin: 0;padding: 6px 13px;}table tr th :first-child, table tr td :first-child{margin-top: 0;}table tr th :last-child, table tr td :last-child{margin-bottom: 0;}img{max-width: 100%;}span.frame{display: block; overflow: hidden;}span.frame > span{border: 1px solid #dddddd;display: block;float: left;overflow: hidden;margin: 13px 0 0;padding: 7px;width: auto;}span.frame span img{display: block;float: left;}span.frame span span{clear: both;color: #333333;display: block;padding: 5px 0 0;}span.align-center{display: block; overflow: hidden; clear: both;}span.align-center > span{display: block; overflow: hidden; margin: 13px auto 0; text-align: center;}span.align-center span img{margin: 0 auto; text-align: center;}span.align-right{display: block; overflow: hidden; clear: both;}span.align-right > span{display: block; overflow: hidden; margin: 13px 0 0; text-align: right;}span.align-right span img{margin: 0; text-align: right;}span.float-left{display: block; margin-right: 13px; overflow: hidden; float: left;}span.float-left span{margin: 13px 0 0;}span.float-right{display: block; margin-left: 13px; overflow: hidden; float: right;}span.float-right > span{display: block; overflow: hidden; margin: 13px auto 0; text-align: right;}code, tt{margin: 0 2px;padding: 0 5px;white-space: nowrap;border: 1px solid #eaeaea;background-color: #f8f8f8;border-radius: 3px;}pre code{margin: 0; padding: 0; white-space: pre; border: none; background: transparent;}.highlight pre{background-color: #f8f8f8;border: 1px solid #cccccc;font-size: 13px;line-height: 19px;overflow: auto;padding: 6px 10px;border-radius: 3px;}pre{background-color: #f8f8f8;border: 1px solid #cccccc;font-size: 13px;line-height: 19px;overflow: auto;padding: 6px 10px;border-radius: 3px;}pre code, pre tt{background-color: transparent; border: none;}.p-0{padding: 0 !important;}.p-1{padding: 0.25rem !important;}.p-2{padding: 0.5rem !important;}.p-3{padding: 1rem !important;}.p-4{padding: 1.5rem !important;}.p-5{padding: 3rem !important;}.pl-0{padding-left: 0 !important;}.pl-1{padding-left: 0.25rem !important;}.pl-2{padding-left: 0.5rem !important;}.pl-3{padding-left: 1rem !important;}.pl-4{padding-left: 1.5rem !important;}.pl-5{padding-left: 3rem !important;}.pr-0{padding-right: 0 !important;}.pr-1{padding-right: 0.25rem !important;}.pr-2{padding-right: 0.5rem !important;}.pr-3{padding-right: 1rem !important;}.pr-4{padding-right: 1.5rem !important;}.pr-5{padding-right: 3rem !important;}.pt-0{padding-top: 0 !important;}.pt-1{padding-top: 0.25rem !important;}.pt-2{padding-top: 0.5rem !important;}.pt-3{padding-top: 1rem !important;}.pt-4{padding-top: 1.5rem !important;}.pt-5{padding-top: 3rem !important;}.pb-0{padding-bottom: 0 !important;}.pb-1{padding-bottom: 0.25rem !important;}.pb-2{padding-bottom: 0.5rem !important;}.pb-3{padding-bottom: 1rem !important;}.pb-4{padding-bottom: 1.5rem !important;}.pb-5{padding-bottom: 3rem !important;}.m-0{margin: 0 !important;}.m-1{margin: 0.25rem !important;}.m-2{margin: 0.5rem !important;}.m-3{margin: 1rem !important;}.m-4{margin: 1.5rem !important;}.m-5{margin: 3rem !important;}.ml-0{margin-left: 0 !important;}.ml-1{margin-left: 0.25rem !important;}.ml-2{margin-left: 0.5rem !important;}.ml-3{margin-left: 1rem !important;}.ml-4{margin-left: 1.5rem !important;}.ml-5{margin-left: 3rem !important;}.mr-0{margin-right: 0 !important;}.mr-1{margin-right: 0.25rem !important;}.mr-2{margin-right: 0.5rem !important;}.mr-3{margin-right: 1rem !important;}.mr-4{margin-right: 1.5rem !important;}.mr-5{margin-right: 3rem !important;}.mt-0{margin-top: 0 !important;}.mt-1{margin-top: 0.25rem !important;}.mt-2{margin-top: 0.5rem !important;}.mt-3{margin-top: 1rem !important;}.mt-4{margin-top: 1.5rem !important;}.mt-5{margin-top: 3rem !important;}.mb-0{margin-bottom: 0 !important;}.mb-1{margin-bottom: 0.25rem !important;}.mb-2{margin-bottom: 0.5rem !important;}.mb-3{margin-bottom: 1rem !important;}.mb-4{margin-bottom: 1.5rem !important;}.mb-5{margin-bottom: 3rem !important;}.btn:not(:disabled):not(.disabled){cursor: pointer;}.btn{display: inline-block;font-weight: 400;color: #212529;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;}.text-center{text-align: center!important;}" +
      '</style>'
    );};
  

    _this.browser_name = function(){
      var result = '不明';
      var agent = window.navigator.userAgent.toLowerCase();
      var version = window.navigator.appVersion.toLowerCase();
    
      if(agent.indexOf("msie") > -1){
        if (version.indexOf("msie 6.") > -1){
          result = 'IE6';
        }else if (version.indexOf("msie 7.") > -1){
          result = 'IE7';
        }else if (version.indexOf("msie 8.") > -1){
          result = 'IE8';
        }else if (version.indexOf("msie 9.") > -1){
          result = 'IE9';
        }else if (version.indexOf("msie 10.") > -1){
          result = 'IE10';
        }else{
          result = 'IE(バージョン不明)';
        }
      }else if(agent.indexOf("trident/7") > -1){
        result = 'IE11';
      }else if(agent.indexOf("edge") > -1){
        result = 'Edge';
      }else if (agent.indexOf("chrome") > -1){
        result = 'Chrome';
      }else if (agent.indexOf("safari") > -1){
        result = 'Safari';
      }else if (agent.indexOf("opera") > -1){
        result = 'Opera';
      }else if (agent.indexOf("firefox") > -1){
        result = 'Firefox';
      }
      return result;
    }

    _this.default_tools =   [
      'bold', 'italic', 'strikethrough', 'header', 'line',
      'code', 'quote', 'list-ul', 'list-ol', 'line',
      'link', 'image', 'table', 'horizontal-rule', 'line',
      'preview', 'side-by-side', 'fullscreen', 'normalscreen', 'set-theme', 'line',
      'undo', 'redo', 'line',
      'guide'
    ]
    _this.tool_items_class = {
      'bold'           : 'fa fa-bold', 
      'italic'         : 'fa fa-italic',
      'strikethrough'  : 'fa fa-strikethrough',
      'header'         : 'fa fa-heading',
      'code'           : 'fa fa-code',
      'quote'          : 'fa fa-quote-left',
      'list-ul'        : 'fa fa-list-ul',
      'list-ol'        : 'fa fa-list-ol',
      'link'           : 'fa fa-link',
      'image'          : 'fa fa-image',
      'table'          : 'fa fa-table',
      'horizontal-rule': 'fa fa-minus',
      'preview'        : 'fa fa-eye no-disable',
      'side-by-side'   : 'fa fa-columns no-disable no-mobile',
      'fullscreen'     : 'fas fa-expand-arrows-alt no-disable no-mobile',
      'normalscreen'   : 'fas fa-compress-arrows-alt no-disable no-mobile',
      'guide'          : 'fa fa-question-circle',
      'set-theme'      : 'fa fa-sun',
      'undo'           : 'fa fa-undo',
      'redo'           : 'fa fa-redo'
    }
    _this.tool_items_title = {
      'bold'           : 'Bold', 
      'italic'         : 'Italic',
      'strikethrough'  : 'Strikethrough',
      'header'         : 'Heading',
      'code'           : 'Code',
      'quote'          : 'Quote',
      'list-ul'        : 'Generic List',
      'list-ol'        : 'Numbered List',
      'link'           : 'Create Link',
      'image'          : 'Insert Image',
      'table'          : 'Insert Table',
      'horizontal-rule': 'Insert Horizontal Line',
      'preview'        : 'Toggle Preview',
      'side-by-side'   : 'Toggle Side by Side',
      'fullscreen'     : 'Toggle Fullscreen',
      'normalscreen'     : 'Toggle Normalscreen',
      'guide'          : 'Markdown Guide',
      'set-theme'      : 'Theme',
      'undo'           : 'Undo',
      'redo'           : 'Redo',
    }
    _this.themes = [
      'chrome',   'clouds',   'crimson_editor',   'dawn',  'dreamweaver',  'katzenmilch',  'eclipse',  'github',  'iplastic',  'kuroir',  'sqlserver',  'textmate',  'tomorrow',  'xcode',
      'ambiance',  'chaos',  'clouds_midnight',  'dracula',  'gruvbox',  'idle_fingers',  'kr_theme',  'merbivore',  'merbivore_soft',  'mono_industrial',  'monokai',  'pastel_on_dark',  'terminal',  'tomorrow_night',  'tomorrow_night_eighties',  'twilight',  'vibrant_ink',  'gob',
      'cobalt',  'solarized_dark',  'tomorrow_night_blue'
    ]
    _this.themes_bgColor = {
      'chrome' : 'FFFFFF',   'clouds' : 'FFFFFF',   'crimson_editor' : 'FFFFFF',   'dawn' : 'F9F9F9',  'dreamweaver' : 'FFFFFF',  'katzenmilch' : 'F3F2F3',  'eclipse' : 'FFFFFF',  'github' : 'FFFFFF',  'iplastic' : 'EEEEEE',  'kuroir' : 'E8E9E8',  'sqlserver' : 'FFFFFF',  'textmate' : 'FFFFFF',  'tomorrow' : 'FFFFFF',  'xcode' : 'FFFFFF',
      'ambiance' : '202020',  'chaos' : '161616',  'clouds_midnight' : '191919',  'dracula' : '282A36',  'gruvbox' : '1D2021',  'idle_fingers' : '323232',  'kr_theme' : '0B0A09',  'merbivore' : '161616',  'merbivore_soft' : '1C1C1C',  'mono_industrial' : '222C28',  'monokai' : '272822',  'pastel_on_dark' : '2C2828',  'terminal' : '000000',  'tomorrow_night' : '1D1F21',  'tomorrow_night_eighties' : '2D2D2D',  'twilight' : '141414',  'vibrant_ink' : '0F0F0F',  'gob' : '0B0B0B',  
      'cobalt' : '002240', 'solarized_dark' : '002B36', 'tomorrow_night_blue' : '002451'
    }
    _this.themes_fontColor = {
      'chrome' : '0f0f0f',   'clouds' : '0f0f0f',   'crimson_editor' : '0f0f0f',   'dawn' : '0f0f0f',  'dreamweaver' : '0f0f0f',  'katzenmilch' : '0f0f0f',  'eclipse' : '0f0f0f',  'github' : '0f0f0f',  'iplastic' : '0f0f0f',  'kuroir' : '0f0f0f',  'sqlserver' : '0f0f0f',  'textmate' : '0f0f0f',  'tomorrow' : '0f0f0f',  'xcode' : '0f0f0f',
      'ambiance' : 'FFFFFF',  'chaos' : 'FFFFFF',  'clouds_midnight' : 'FFFFFF',  'dracula' : 'FFFFFF',  'gruvbox' : 'FFFFFF',  'idle_fingers' : 'FFFFFF',  'kr_theme' : 'FFFFFF',  'merbivore' : 'FFFFFF',  'merbivore_soft' : 'FFFFFF',  'mono_industrial' : 'FFFFFF',  'monokai' : 'FFFFFF',  'pastel_on_dark' : 'FFFFFF',  'terminal' : 'FFFFFF',  'tomorrow_night' : 'FFFFFF',  'tomorrow_night_eighties' : 'FFFFFF',  'twilight' : 'FFFFFF',  'vibrant_ink' : 'FFFFFF',  'gob' : 'FFFFFF',  
      'cobalt' : 'FFFFFF', 'solarized_dark' : 'FFFFFF', 'tomorrow_night_blue' : 'FFFFFF'
    };
    _this.themes_mode = {
      'chrome' : 'whitemode',   'clouds' : 'whitemode',   'crimson_editor' : 'whitemode',   'dawn' : 'whitemode',  'dreamweaver' : 'whitemode',  'katzenmilch' : 'whitemode',  'eclipse' : 'whitemode',  'github' : 'whitemode',  'iplastic' : 'whitemode',  'kuroir' : 'whitemode',  'sqlserver' : 'whitemode',  'textmate' : 'whitemode',  'tomorrow' : 'whitemode',  'xcode' : 'whitemode',
      'ambiance' : 'darkmode',  'chaos' : 'darkmode',  'clouds_midnight' : 'darkmode',  'dracula' : 'darkmode',  'gruvbox' : 'darkmode',  'idle_fingers' : 'darkmode',  'kr_theme' : 'darkmode',  'merbivore' : 'darkmode',  'merbivore_soft' : 'darkmode',  'mono_industrial' : 'darkmode',  'monokai' : 'darkmode',  'pastel_on_dark' : 'darkmode',  'terminal' : 'darkmode',  'tomorrow_night' : 'darkmode',  'tomorrow_night_eighties' : 'darkmode',  'twilight' : 'darkmode',  'vibrant_ink' : 'darkmode',  'gob' : 'darkmode',  
      'cobalt' : 'bluemode', 'solarized_dark' : 'bluemode', 'tomorrow_night_blue' : 'bluemode'
    };
    // hover時にボタンの下にリストを表示する
    _this.tool_listTypeItems = [
      'image', 'table'
    ];
    // tool_listTypeItemsのタグに追加するテキスト
    _this.tool_listTypeItems_data = {
      'image': [
        {text:'Image Link', class: 'toggleimagelink', icon: 'fas fa-link'}, 
        // {text: 'Upload Image', class: 'uploadimage', icon: 'fas fa-file-upload'},
        // {text: 'Past Image', class: 'pastImage', icon: 'fas fa-link'}
      ],
      'table': [
        {text:'Table Add', class: 'drawtable_3_3', icon: 'fas fa-th'}, 
        {text: 'Select a matrix and add a table', class: 'drawtable_x_x', icon: 'fas fa-th-large'},
        {text: 'Table Add from Excel', class: 'drawtable_excel', icon: 'fas fa-file-excel'}
      ],
    }

    /** tool-item用関数一覧 */
    _this.tool_items_func = {
      'bold'           : _this.toggleBold, 
      'italic'         : _this.toggleItalic,
      'strikethrough'  : _this.toggleStrikethrough,
      'header'         : _this.toggleHeadingSmaller,
      'code'           : _this.toggleCodeBlock,
      'quote'          : _this.toggleBlockquote,
      'list-ul'        : _this.toggleUnorderedList,
      'list-ol'        : _this.toggleOrderedList,
      'link'           : _this.drawLink,
      'image'          : _this.drawImage,
      'table'          : _this.drawTable,
      'horizontal-rule': _this.drawHorizontalRule,
      'preview'        : _this.togglePreview,
      'side-by-side'   : _this.toggleSideBySide,
      'fullscreen'     : _this.toggleFullScreen,
      'normalscreen'   : _this.toggleNormalScreen,
      // 'guide'          : _this.toggleFullScreen,
      'set-theme'      : _this.settingTheme_main,
      'undo'           : _this.undo,
      'redo'           : _this.redo,
    };
    _this.toggleBold_extended = function(){};
    _this.toggleItalic_extended = function(){};
    _this.toggleStrikethrough_extended = function(){};
    _this.toggleHeadingSmaller_extended = function(){};
    _this.toggleCodeBlock_extended = function(){};
    _this.toggleBlockquote_extended = function(){};
    _this.toggleUnorderedList_extended = function(){};
    _this.toggleOrderedList_extended = function(){};
    _this.drawLink_extended = function(){};
    _this.drawImage_extended = function(){};
    _this.drawTable_extended = function(){};
    _this.drawHorizontalRule_extended = function(){};
    _this.togglePreview_extended = function(){};
    _this.toggleSideBySide_extended = function(){};
    _this.toggleFullScreen_extended = function(){};
    _this.toggleFullScreen_extended = function(){};
    _this.settingTheme_main_extended = function(){};
    _this.settingTheme_clicked_extended = function(){};
    _this.undo_extended = function(){};
    _this.redo_extended = function(){};
    _this.toolbar_create_end_extend = function(){}; /* toolbar生成後に使用する関数の拡張 */
    _this.toolitems = [];
    _this.theme = 'xcode';
    _this.toolbar_line = '<span class="toolbar-line"></span>';
    _this.autoDownloadFontAwesome = true;           /** FontAwesomeをダウンロードするか？ */
    _this.autoDownloadmkEditor_CSS = false;         /** CSSファイルの読み込みを場所を指定する */
    _this.mkEditor_CSS_Path = 'css/mkEditor.css';   /** mkEditor CSS FILE PATH */
    _this.automkEditorAddCSSText=true               /** CSSをスタイルタグで追加するか？ */ 

    if(args.element!=undefined){_this.element = document.getElementById(args.element);} // 対象のエレメント

    if(args.toolbar_position=='top' || args.toolbar_position=='bottom'){
      _this.toolbar_position=args.toolbar_position;_this.toolbar_direction='horizontal';
    } else if(args.toolbar_position=='left' || args.toolbar_position=='right') {
      _this.toolbar_position=args.toolbar_position;_this.toolbar_direction='vertical';
    } else{
      _this.toolbar_position='top';_this.toolbar_direction='horizontal';
    } // ツールバーの位置を設定する

    if(_this.themes.indexOf(args.theme) != -1){
      _this.theme = args.theme;
    } // エディタのテーマを設定する 
    if(args.autoDownloadFontAwesome==true){
      _this.autoDownloadFontAwesome = true
    } // Fontawesomeのダウンロード
    if(args.autoDownloadmkEditor_CSS==true){
      _this.autoDownloadmkEditor_CSS=true
    } // mkEditorのCSSを読み込む
    if(args.mkEditor_CSS_Path != undefined && args.mkEditor_CSS_Path != ''){
      _this.mkEditor_CSS_Path = args.mkEditor_CSS_Path
    } // mkEditorのCSSの場所
    if(args.automkEditorAddCSSText==false){
      _this.automkEditorAddCSSText=false
    } // mkEditorのCSSをスタイルタグで追加する
  
    /**デフォルトのツールアイテムの場合 */
    for(var i=0;i<_this.default_tools.length;i++){
      _this.toolitems[i] = {
        'name': _this.default_tools[i], 
        'className':_this.tool_items_class[_this.default_tools[i]], 
        'title': _this.tool_items_title[_this.default_tools[i]]
      };
    }
  
    /**toolを追加する */
    if(args.toolbar!=undefined &&  Array.isArray(args.toolbar) && args.toolbar.length > 0){
      /**  
      *  取り敢えず配列であることと0より多いことを確認して処理へ進む
      *  配列の中で許可されるデータは`_this.default_tools`ないにある文字列と同一か
      *  または`name`と`action`と`className`と`title`を指定した連想配列です。
      *  連想配列の中で指定するが強制となるのは`name`と`action`です。
      *  `name`は要素の名前ですが特にユーザ側が意識することはないです。
      *  `action`は呼び出す関数を文字列名で指定してください。文字列名で指定する理由はonclickイベントで呼び出すようにするためです。
      *  またonclickイベント呼び出すためglobalで関数宣言をしていないと関数が見つからずエラーとなります。
      *  `class`を指定しなかった場合はデフォルト値:`fas fa-cat`が指定されます。
      *  `title`を指定しなかった場合はnameをタイトルとして使用します。
      */
      var tmp_toolitems = []; // 一時変数を作成して完成後にオブジェクト変数に格納する
      for(var i=0; i<args.toolbar.length; i++){
        tool = args.toolbar[i];
        if(typeof(tool) == 'string' || _this.default_tools.indexOf(tool) != -1){
          tmp_toolitems.push({
            'name'     : tool, 
            'className': _this.tool_items_class[tool], 
            'title'    : _this.tool_items_title[tool]
          });
        } else if(typeof(tool.name) == 'string' && tool.name != '' && typeof(tool.action) == 'function' && tool.action != '') {
          var tmp_toolClass = 'fas fa-cat' // classのデフォルト値 
          var tmp_toolTitle = tool.name // actionのデフォルト値
          if(typeof(tool.class)=='string' && tool.class != ''){tmp_toolClass = tool.class} // btnのクラス指定
          if(typeof(tool.title)=='title' && tool.title != ''){tmp_toolTitle = tool.title}  // btnのタイトルプロパティを設定
          if(typeof(tool.is_activate)=='boolean' && tool.is_activate){_this.tool_items_clicked_active.push(tool.name)} // activeクラスを追加するアイテム
          _this.tool_items_func[tool.name] = tool.action; // 関数を登録する
          tmp_toolitems.push({
            'name'     : tool.name, 
            'className': tmp_toolClass, 
            'title'    : tmp_toolTitle
          });
        }
      }
      _this.toolitems = tmp_toolitems;
    }
  
    /**無効にするアイテムについての設定 */
    if(args.deactivate_item!=undefined &&  Array.isArray(args.deactivate_item) && args.deactivate_item.length > 0){
      for(var i=0;i<args.deactivate_item.length;i++){
        for(var j=0;j<_this.toolitems.length;j++){
          var deactivate_item = args.deactivate_item[i]; // 無効化するアイテム
          if(typeof(_this.toolitems[j].name) == 'string' && _this.toolitems[j].name == deactivate_item){_this.toolitems.splice(j, 1);}
        }
      }
    }
  
    /**独自のアイテムを追加する(基本的toolbarの設定と同じ) */
    if(args.addToolbar_item!=undefined &&  Array.isArray(args.addToolbar_item) && args.addToolbar_item.length > 0){
      for(var i=0; i<args.addToolbar_item.length; i++){
        var tool = args.addToolbar_item[i];
        if(typeof(tool.name) == 'string' && tool.name != '' && typeof(tool.action) == 'function' && tool.action != '') {
          var tmp_toolClass = 'fas fa-cat' /**classのデフォルト値  */
          var tmp_toolTitle = tool.name /**actionのデフォルト値 */
          if(typeof(tool.class)=='string' && tool.class != ''){tmp_toolClass = tool.class} /**btnのクラス指定 */
          if(typeof(tool.title)=='title' && tool.title != ''){tmp_toolTitle = tool.title}  /**btnのタイトルプロパティを設定 */
          if(typeof(tool.is_activate)=='boolean' && tool.is_activate){_this.tool_items_clicked_active.push(tool.name)} /**activeクラスを追加するアイテム */
          _this.tool_items_func[tool.name] = tool.action; /**関数を登録する */
          _this.toolitems.push({
            'name'     : tool.name, 
            'className': tmp_toolClass, 
            'title'    : tmp_toolTitle
          });
        }
      }
    }
  
    if(_this.element!=undefined){
      _this.element.classList.add('mk-editor-ele') /**展開する要素にクラスを追加する */
      _this.htmlInitialize(); /**唯一指定が強制なのは要素を展開するElementのIDのみ{'element': 'target'} */
    } 
  };

  /**Exports */
  if ("process" in global) {
      module["exports"] = mkEditor;
  }
  global["mkEditor"] = mkEditor;
})((this || 0).self || global);

// hljs.initHighlightingOnLoad();
window.addEventListener('DOMContentLoaded', function() {
  var myMark = new mkEditor({
    element : 'mark',
    toolbar_position: 'top',
  });
});



/**escape関数 */
(function (w) {
  var reRegExp = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExp = new RegExp(reRegExp.source);

  function escapeRegExp(string) {
      return (string && reHasRegExp.test(string))
          ? string.replace(reRegExp, '\\$&')
          : string;
  }

  w.escapeRegExp = escapeRegExp;
})(window);
