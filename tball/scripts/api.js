var d = document;        
var w = window;     
var dc = document.cookie;      
var loc = location.href; 
var nObj = d.getElementById;
var cTN = d.createTextNode;
var cE = d.createElement;
var agt = navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);
var navSections = new Array("document", "info");

function randomArray(a) {
  return a[Math.floor(Math.random()*a.length)];
}

function writeAttr(i,sT,sA,nT,nA,nAv){
 if((agt.indexOf("msie")!=-1) && (agt.indexOf("win")!=-1) && (nA == "class")) nA = "className"
 var sObj = d.getElementById(i); 
 var tag = sObj.getElementsByTagName(sT);
 var space, date, wrap, marker = '';
 if(d.createElement){ for(x=0;x<tag.length;x++){ 
   value = d.createTextNode(tag[x].getAttribute(sA));
   spacer = d.createTextNode(" ");
   wrap = d.createElement(nT); wrap.setAttribute(nA,nAv);
   wrap.appendChild(spacer); wrap.appendChild(value); tag[x].appendChild(wrap);
 }}
} 

function fixedFix(){ //corrects Mozilla's fixed menu overlap
  var aName = d.anchors;
  for(x = 0; x < aName.length; x++) if(aName[x].text.length < 1) d.write('<style>A[name="'+aName[x].name+'"] \{ position: relative; top: -70px; \}<\/style>')
}  

/*Open Windows*/    
function openWin(dest,winName,theDetails) {	
  newWin = w.open(dest, winName,theDetails);	
}


  function offSite(v) {	
  cookie = getCookie("offSite")
	location.href = v;
  /*whichClick(ev)
  if(cookie == "no") location.href = v;
  else offsite = w.open(v,"offsite","menubar,toolbar,location,status,personalbar,scrollbars,resizable");*/
}
  
  
  function whichClick(ev){
	var rightclick; var middleclick
	if (!ev) var ev = window.event;
	if (ev.which){
     rightclick = (ev.which == 3);
     middleclick = (ev.which == 2);
  }   
	else if (ev.button){
    rightclick = (e.button == 2);
    middleclick = (e.button == 4);
  }  
	if(rightclick || middleclick) return true
}

/*Cookies*/
function getCookie(name){  
  var the_cookie = name + "="; 
  if (d.cookie.length > 0) {        
    begin = d.cookie.indexOf(the_cookie);  
    if (begin != -1) {       
      begin += the_cookie.length;
      end = d.cookie.indexOf(";", begin);
        if (end == -1) end = d.cookie.length;
      return unescape(d.cookie.substring(begin, end));
    } 
  } return null;
}

function setCookie(name, value){
  var time = new Date();
  time.setTime(time.getTime() + (1000*60*60*24*365));//expires in a year
  d.cookie = name + "=" + escape(value) + "; path=/; expires=" + time.toGMTString();
}

function deleteCookie(name) {
  if(getCookie(name)) d.cookie = name + "=" + "; path=/; expires=Mon, 01 Jan 01 01:01:01 GMT";
}	

/*Get-Set Styles*/
function setStyle(i, p, v) {
  var sObj = d.getElementById(i);
  sObj.style[p] = v;
}

function getStyle(i, p) {
 var sObj = d.getElementById(i);
 var sheets = d.styleSheets;
 if(p == 'n'){ p = 'none'; }
 else if(p == 'b'){ p = 'block'; }

 var s = eval("sObj.style." + p);
 if((s != "") && (s != null)) { return s; }

 if(sObj.currentStyle) {
  var s = eval("sObj.currentStyle." + p);
  if((s != "") && (s != null)) { return s; }
 } 

 if(sheets.length > 0) {
  for(var x = 0; x < sheets.length; x++){
   var rules = sheets[x].cssRules;
   if(rules.length > 0) {
    for(var y = 0; y < rules.length; y++) {
     var z = rules[y].style;
     if(((z[p] != "") && (z[p] != null)) && (rules[y].selectorText == "#" + i)) { return z[p]; }
    }
   }
  }  
 } return null;
}


/*Hide-Show functions*/
function hideShowToggle(i,v) {
  var sObj = d.getElementById(i).style; 
  if(sObj.display == "none") sObj.display = v;  
  else if(sObj.display == v) sObj.display = "none";
}

function hideShowEl(i,v) {
  var sObj = d.getElementById(i).style; 
  if(v == "n") sObj.display = "none";
  else if(v == "b") sObj.display = "block";
  else if(v == "i") sObj.display = "inline";
  else if(v == "") hideShowToggle(i,"block")
}

function hideShowImg(i,v,imgN,imgB){
  var sObj = d.getElementById(i).style.display; 
  var img = i + "Img";
  if(sObj == "none") d.images(img).src = imgB; 
  else if(sObj == "block") d.images(img).src = imgN; 
  hideShowEl(i,v);
}

function hideShowList(i,v){
  if(v == "") {
    var sObj = d.getElementById(i); 
    if(sObj.style.display == "none") v = "b";  
    else if(sObj.style.display == "block") v = "n";
  }  
  for(x = 0; x < navSections.length; x++){ hideShowEl(navSections[x],"n"); }
  hideShowEl(i,v)
  if(agt.indexOf("mac") == -1) drawIcon("navSections")
}

/*Left Nav*/
function drawIcon(a){
 if((cTN) && (agt.indexOf("mac") == -1)) {
  var menu = d.getElementById(a);
  var icons = menu.getElementsByTagName("span")
  var icon, blurb, section = ""
  for(x = 0; x < icons.length; x++){
    var hObj = d.getElementById(navSections[x])
  	var iObj = icons[x];
  	var lObj = icons[x].parentNode;
    var section = " what's in \"" + lObj.childNodes[1].nodeValue + "\"";
    if(hObj.style.display == "block"){ icon = "\-"; blurb = "Click to hide" + section; }
    else{ icon = "\+"; blurb = "Click to show" + section;}
  	var tObj = d.createTextNode(icon);
    if(!iObj.hasChildNodes()) iObj.appendChild(tObj)
    else iObj.replaceChild(tObj,iObj.childNodes[0])
    lObj.setAttribute("href","javascript:hideShowList(\"" + navSections[x] + "\",\"\");")
    //lObj.setAttribute("href","javascript:hideShowList(\"" + navSections[x] + "\",\"\");adjustFixMenu()")
    lObj.title = blurb
    hideShowEl(icons[x].id,"i")
  }

  }
}

/*Page sizing*/
function expandMsg(){
  expand = d.createElement("DIV")
  expand.id = "expandMe"
  expand.style.display = "none"
  expand.appendChild(d.createTextNode("Widen your browser for extra content"))
  d.getElementById("top").appendChild(expand)
}

function pageWidth(){
  //if(agt.indexOf("gecko")!=-1) fontScale();
  if(agt.indexOf("opera")<0){
    pageSizer();
    if(d.getElementById("navigation") && d.defaultView) adjustFixMenu();
  }
}

function pageSizer(){
  if(cE){ 
  if(d.body.clientWidth) { 
    (d.body.clientWidth>600) ? hideShowEl("expandMe","n") : hideShowEl("expandMe","b")
  }
  else if(w.innerWidth) {
    (w.innerWidth<570) ? hideShowEl("expandMe","b") : hideShowEl("expandMe","n")
  } }
}

function adjustFixMenu(){
  nav = d.getElementById("navigation");
  navH = parseInt(d.defaultView.getComputedStyle(nav,"").getPropertyValue("height"))+95;
  if(navH>w.innerHeight) { 
    nav.style.position = "relative";
  }  else {  nav.style.position = "fixed";  }
}

/*Font size*/
  
function fontScale(){
  if(d.body.clientWidth) w = d.body.clientWidth;
  else if(w.innerWidth) w = w.innerWidth-15;
  v = Math.round(w/55)
  if(v<12) v=12
  if(v>16) v=16
  fontSize("content",v)
}

function fontSize(i,v) {
  var sObj = d.getElementById(i).style;
  sObj.fontSize = v+"px";
  sObj.lineHeight = Math.round(v*1.37)+"px";
}

/*Links*/ 
function whatTemplate(tmp){
  var links = d.getElementsByTagName('A');
  for(x = 0; x < links.length; x++){
    var the_link = escape(links[x])
    if(checkLink(the_link)) links[x].setAttribute('href',unescape(the_link) + '?' + tmp)
  }
}

function checkLink(the_link){
  if((the_link.indexOf('%3Fnone') == -1) && 
    (the_link.indexOf('%23') == -1) && 
    (the_link.indexOf('mailto%3A') == -1) && 
    (the_link.indexOf('javascript%3A') == -1) && 
    (the_link.indexOf('glossary/defn') == -1) && 
    (the_link.indexOf('tips/defn') == -1) && 
    (the_link.indexOf('http%3A\/\/www.saila') != -1))
  { return true } else { return false }
}

/*Email*/
function checkAt(email) {
  if (email.indexOf('@') == -1 || email.indexOf('.') < 3 || email.length < 5) { alert('Check the email address.'); return false; }
  else return true;
}
 
function emailMe(sbj){
  //var user = "craig";
  //var domain = "saila.com";
  //var mailto = "mailto:" + user + "@" + domain;
  //if(sbj.length > 0) mailto = mailto + "?subject=" + sbj;
  //location.href = mailto;
} 

/*Print*/
function printMsg(){
  //if(agt.indexOf("mac") != -1)alert("To print this page press Command-P.") 
  //else alert("To print this page press Control-P.")
}

/* abbr in IE: http://www.sovavsiti.cz/css/abbr.html */
function styleAbbr() {
  var oldBodyText, newBodyText, reg
  oldBodyText = document.body.innerHTML;
  reg = /<ABBR([^>]*)>([^<]*)<\/ABBR>/g;
  newBodyText = oldBodyText.replace(reg, '<abbr $1><span class=\"info\" $1>$2</span></abbr>');
  document.body.innerHTML = newBodyText;
}