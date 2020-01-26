onresize = pageWidth;
onload = function firstLoad() {
  if((agt.indexOf("msie")!=-1) && (agt.indexOf("opera")<1) && (agt.indexOf("win")!=-1)) styleAbbr()
  if(d.getElementById){ 
    if(d.createTextNode){ expandMsg(); pageWidth(); drawIcon("navSections"); }
    //if((agt.indexOf("msie 5")==-1) && (agt.indexOf("win")!=-1)) createMenus(); /* written in template for IE5 */
    //if(location.search == "?noads") hideShowEl("promo","n");
  }  
}