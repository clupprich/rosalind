_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[10],{TjHt:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/portal",function(){return t("Z2/2")}])},"Z2/2":function(e,n,t){"use strict";t.r(n);var r=t("nKUr"),i=t("Ff2n"),c=t("o0o1"),s=t.n(c),a=t("HaE+"),l=t("rePB"),o=t("q1tI"),d=t("KYPV"),b=t("EbeW"),u=t("leFc");function j(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?j(Object(t),!0).forEach((function(n){Object(l.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var h=function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"requestSameAssignee",children:Object(r.jsx)("span",{children:"Wer soll Sie behandeln?"})}),Object(r.jsx)(b.e,{name:"requestSameAssignee",value:"dontcare",label:"Egal, die Person mit dem n\xe4chsten freien Termin",required:!0}),Object(r.jsx)(b.e,{name:"requestSameAssignee",value:"true",label:"Die selbe Person wie letztes Mal",required:!0}),Object(r.jsx)(b.e,{name:"requestSameAssignee",value:"false",label:"Eine andere Person als letztes Mal",required:!0})]})},p={width:34,height:31,fontSize:"12pt",padding:"4px 0px 0px 0px"},O=function(e){var n=e.children,t=e.style,c=void 0===t?{}:t,s=Object(i.a)(e,["children","style"]);return Object(r.jsx)("button",m(m({className:"button ".concat(s.disabled&&"disabled"),style:m(m({},p),c)},s),{},{children:n}))},g={display:"flex"},f={display:"flex",flexDirection:"column",marginLeft:15,marginRight:15},x={padding:10,borderRadius:4,marginBottom:4,cursor:"pointer",background:"rgba(128,128,128,0.05)",borderBottom:"2px solid rgba(128,128,128,0.1)"},v=m(m({},x),{},{background:"rgba(128,128,128,0.1)",borderBottom:"2px solid rgba(128,128,128,0.4)"}),w=m(m({},x),{},{color:"white",background:"rgba(29, 97, 167, 1)",borderBottom:"2px solid rgba(29, 70, 135, 1)"}),S={paddingLeft:4,paddingRight:10},k=function(e){var n=e._id,t=e.day,i=e.time,c=e.isReserve,s=Object(o.useState)(!1),a=s[0],l=s[1],d=c?i+" \u26a0\ufe0f":i,u=c?[t,i].join(" um ")+" Uhr - Reservetermin mit langen Wartezeiten":[t,i].join(" um ")+" Uhr";return Object(r.jsx)("div",{onMouseEnter:function(){return l(!0)},onMouseLeave:function(){return l(!1)},title:u,children:Object(r.jsx)(b.e,{name:"bookableId",value:n,label:d,required:!0,labelStyle:a?v:x,checkedLabelStyle:w,labelInnerStyle:S})})},y={textAlign:"center",fontWeight:"bold",cursor:"pointer",userSelect:"none",marginBottom:8},E=function(e){var n=e.day,t=e.times,i=e.onClick;return Object(r.jsxs)("div",{style:f,children:[Object(r.jsx)("div",{style:y,onClick:i,children:n}),t.map((function(e){return Object(r.jsx)(k,m(m({},e),{},{day:n}),e._id)}))]})},T={width:33},D=function(e){var n=Object(d.e)(),t=n.setFieldValue,i=n.values,c=Object(o.useState)(null),l=c[0],j=c[1],h=Object(o.useState)(0),p=h[0],f=h[1],x=Object(o.useState)(!1),v=x[0],w=x[1],S=Object(o.useState)(!0),k=(S[0],S[1]),y=function(){var e=Object(a.a)(s.a.mark((function e(){var n,t,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!1),k(!0),e.next=4,fetch((u.a||"")+"/portal/appointments");case 4:return n=e.sent,e.next=7,n.json();case 7:return t=e.sent,j(t),r=setTimeout((function(){return w(!0)}),3e3),k(!1),e.abrupt("return",(function(){return clearTimeout(r)}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=i.bookableId&&l&&function(){for(var e=0;e<l.length;e++){var n=l[e];if(n)for(var t=0;t<n.times.length;t++){var r=n.times[t];if(r&&r._id===i.bookableId)return m(m({},r),{},{day:n.day})}}}();Object(o.useEffect)(y,[p]);var I="undefined"!==typeof document&&document.body.clientWidth<500?1:3,N=l&&p<Math.floor(l.length/I)-1&&function(){return f(p+1)},P=l&&p>0&&function(){return f(p-1)};if(!l)return Object(r.jsx)("b",{children:"Einen Moment bitte, verf\xfcgbare Termine werden gesucht..."});var A=l.slice(p*I,p*I+I);return A&&0!==A.length?Object(r.jsxs)(b.g,{children:[Object(r.jsxs)("p",{children:["W\xe4hlen Sie Ihren Wunschtermin \u2003",v&&Object(r.jsx)("a",{href:"#",style:{opacity:.8,display:"inline-block",paddingLeft:20},onClick:function(e){e.preventDefault(),y()},children:"Neu laden"})]}),Object(r.jsxs)("div",{style:g,children:[Object(r.jsx)(O,{title:P?"Fr\xfchere Termine":"Keine fr\xfcheren Termine verf\xfcgbar",disabled:!P,style:T,onClick:function(e){e.preventDefault(),P()},children:"<"}),A.map((function(e){return Object(r.jsx)(E,m(m({},e),{},{onClick:function(){t("bookableId",e.times[0]._id)}}),e.day)})),Object(r.jsx)(O,{title:N?"Sp\xe4tere Termine":"Keine sp\xe4teren Termine verf\xfcgbar",disabled:!N,style:T,onClick:function(e){e.preventDefault(),N()},children:">"})]}),Object(r.jsx)(b.g,{children:D&&Object(r.jsxs)("span",{children:[Object(r.jsxs)("b",{children:["Ihr Termin: \xa0",D.day," um ",D.time," Uhr"]}),D.isReserve&&Object(r.jsx)("p",{children:Object(r.jsx)("b",{children:"\u26a0\ufe0f \u2003 Reservetermin bzw. Einschub: Bei diesem Termin kann es zu sehr langen Wartezeiten kommen."})})]})})]}):Object(r.jsx)("b",{children:"Entschuldigung, momentan sind leider keine Termine online verf\xfcgbar. Bitte kontaktieren Sie uns telefonisch."})},I=function(e){var n=e.show,t=e.tags,i=void 0===t?[]:t,c=e.requestAssignee,s=void 0===c?null:c;e.apiBaseUrl;return n&&Object(r.jsxs)("div",{children:[i.length>1&&Object(r.jsx)(b.g,{children:Object(r.jsxs)(b.h,{label:"Was ben\xf6tigen Sie?",name:"tag",children:[Object(r.jsx)("option",{disabled:!0,value:"",children:"-"}),Object(r.jsx)("option",{value:"tag1",children:"Erstordination (Kasse)"}),Object(r.jsx)("option",{value:"tag1",children:"Muttermalkontrolle (Kasse)"}),Object(r.jsx)("option",{value:"tag2",children:"\xc4sthetik (Privat)"})]})}),s&&Object(r.jsx)(b.g,{children:Object(r.jsx)(h,{})}),Object(r.jsx)(b.g,{children:Object(r.jsx)(b.c,{children:Object(r.jsx)(D,{})})})]})};function N(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function P(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?N(Object(t),!0).forEach((function(n){Object(l.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):N(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var A=function(e){var n=Object(o.useState)(null),t=n[0],i=n[1],c=Object(o.useState)(null),l=c[0],j=c[1];return l?Object(r.jsx)(R,P(P({},e),{},{success:l})):Object(r.jsx)(d.c,{initialValues:{gender:"",titlePrepend:"",firstName:"",lastName:"",birthday:"",insuranceId:"",telephone:"",email:"",existingPatient:!1,referral:!1,prescription:!1,appointment:!0,privacy:!1,requestSameAssignee:"dontcare",slot:"",tag:""},onSubmit:function(){var e=Object(a.a)(s.a.mark((function e(n,t){var r,c,a,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.setSubmitting,console.log(n),j(null),i(null),e.prev=4,c=JSON.stringify(n),e.next=8,fetch((u.a||"")+"/portal/appointments",{method:"POST",headers:{"content-type":"application/json","content-length":c.length},body:c});case 8:return a=e.sent,e.next=11,a.json();case 11:l=e.sent,console.log(l),l.ok?j(l):i(l),r(!1),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(4),r(!1),i(e.t0);case 21:case"end":return e.stop()}}),e,null,[[4,17]])})));return function(n,t){return e.apply(this,arguments)}}(),children:function(n){var i=n.values,c=n.isSubmitting;n.handleChange;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:e.welcome||"Sehr geehrte Patientin, sehr geehrter Patient!"}),Object(r.jsx)("p",{children:e.instructions||"Wir bitten Sie um Vervollst\xe4ndigung des Kontaktformulars. Nach Erhalt werden wir uns schnellstm\xf6glich mit Ihnen in Verbindung setzen, um Ihr Anliegen zu besprechen bzw. einen Termin zu vereinbaren."}),Object(r.jsx)("p",{children:Object(r.jsx)("b",{children:e.instructionsDisclaimer})}),Object(r.jsxs)(d.b,{method:"POST",children:[Object(r.jsxs)(b.h,{label:"Anrede",name:"gender",children:[Object(r.jsx)("option",{disabled:!0,value:"",children:"-"}),Object(r.jsx)("option",{value:"Female",children:"Frau"}),Object(r.jsx)("option",{value:"Male",children:"Herr"}),Object(r.jsx)("option",{value:"other",children:"Divers"})]}),Object(r.jsx)(b.d,{name:"titlePrepend",label:"Titel"}),Object(r.jsx)(b.d,{name:"firstName",label:"Vorname",required:!0}),Object(r.jsx)(b.d,{name:"lastName",label:"Nachname",required:!0}),Object(r.jsx)(b.b,{name:"birthday",label:"Geburtstag",required:!0,placeholder:"tt.mm.jjjj",options:{delimiter:".",blocks:[2,2,4],numericOnly:!0}}),Object(r.jsx)(b.b,{name:"insuranceId",label:"Sozialversicherungsnummer (10 Stellen)",required:!0,pattern:"[0-9\\s]+",placeholder:"0000 000000",options:{numericOnly:!0,blocks:[4,6],delimiter:" "}}),Object(r.jsx)(b.d,{name:"telephone",label:"Telefonnummer",required:!0,placeholder:"+43 660 0000000"}),Object(r.jsx)(I,{show:!0===i.appointment||"true"===i.appointment}),Object(r.jsxs)(b.g,{children:[Object(r.jsx)(b.a,{name:"privacy",required:!0,label:"* Ich stimme zu, dass meine ausgef\xfcllten pers\xf6nlichen Daten: Anrede, Titel, Vorname, Nachname, Geburtsdatum, Telefonnummer und E-Mail-Adresse von ".concat(e.customerName,", sowie deren Datenverarbeitern (Fixpoint Systems GmbH, Hetzner Online GmbH) zum Zwecke der Beantwortung des ausgef\xfcllten Kontaktformulars verarbeitet werden. Diese Zustimmung kann jederzeit ohne Angabe von Gr\xfcnden per Mail an ").concat(e.customerEmail," widerrufen werden.")}),Object(r.jsx)("p",{children:e.disclaimer})]}),Object(r.jsxs)(b.g,{children:[Object(r.jsx)("p",{children:e.regards}),Object(r.jsx)("p",{children:Object(r.jsx)("i",{children:e.greeting})}),t&&Object(r.jsx)("p",{children:Object(r.jsx)("b",{children:b.i})}),Object(r.jsx)("input",{disabled:c,className:"button",type:"submit",value:"Senden"}),Object(r.jsxs)("p",{children:[Object(r.jsx)(b.f,{})," Pflichtfelder"]})]})]})]})}})},z=function(e){var n=e.appointment,t=e.name,r=e.description,i=e.url,c=e.location,s=function(e){return e.replace(/-/g,"").replace(/:/g,"").replace(/\.\d\d\dZ$/,"Z")},a=s((new Date).toISOString()),l=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Fixpoint Systems GmbH//Portal//DE","METHOD:PUBLISH","BEGIN:VEVENT","UID:b"+(n.bookableId||n._id)+"@fxp.at","DTSTAMP:"+a,"LAST-MODIFIED:"+a,"DTSTART:"+s(n.isoStart),"DTEND:"+s(n.isoEnd),"DESCRIPTION:"+r.replace(/,/g,"\\,"),"SUMMARY:"+t.replace(/,/g,"\\,"),"LOCATION:"+c.replace(/,/g,"\\,"),"URL:"+i,"STATUS:CONFIRMED","SEQUENCE:0","END:VEVENT","END:VCALENDAR"];!function(e,n){try{if(window.ActiveXObject){if(window.ActiveXObject&&document.execCommand){var t=window.open(e,"_blank");t.document.close(),t.document.execCommand("SaveAs",!0,n),t.close()}}else{var r=document.createElement("a");r.href=e,r.target="_blank",r.download=n;var i=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1});r.dispatchEvent(i)(window.URL||window.webkitURL).revokeObjectURL(r.href)}}catch(c){console.error("Failed to download file"),console.error(c)}}("data:text/calendar;base64,"+window.btoa(unescape(encodeURIComponent(l.join("\r\n")))),"Termin.ics")},_=function(e){var n=e.appointment,t=e.confirmationInfo,i=e.ical;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:["Wir best\xe4tigen Ihren Termin am ",Object(r.jsx)("b",{children:n.date})," um ",Object(r.jsxs)("b",{children:[n.time," Uhr"]}),"."]}),n.isReserve&&Object(r.jsx)("p",{children:"\u26a0\ufe0f \u2003 Reservetermin bzw. Einschub: Bei diesem Termin kann es zu sehr langen Wartezeiten kommen."}),t,Object(r.jsx)("button",{onClick:function(e){return window.print(),!1},className:"button secondary",children:"Terminbest\xe4tigung drucken"}),i&&Object(r.jsx)("button",{onClick:function(e){return z(P({appointment:n},i)),!1},className:"button secondary",children:"Im Kalender speichern"})]})},R=function(e){var n=e.greeting,t=void 0===n?"":n,c=e.contactInfo,s=e.success,a=Object(i.a)(e,["greeting","contactInfo","success"]);return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Vielen Dank!"}),s&&s.appointment?Object(r.jsx)(_,P({appointment:s.appointment},a)):Object(r.jsx)("p",{children:"Wir haben Ihre Anfrage erhalten und werden Sie so rasch wie m\xf6glich kontaktieren."}),Object(r.jsxs)(b.g,{children:[Object(r.jsx)("p",{children:Object(r.jsx)("i",{children:t})}),Object(r.jsx)("p",{className:"print-only",children:c})]})]})};n.default=function(e){e.children;return Object(r.jsx)(A,{customerName:"Dr. Nike Morakis, Fach\xe4rztin f\xfcr Urologie und Andrologie",customerEmail:"praxis@urologie11.at",instructions:"Um Ihren Termin zu vereinbaren, f\xfcllen Sie bitte das nachstehende Formular aus.",instructionsDisclaimer:"Wenn Sie ein akutes Problem haben, ihr Wunschtermin nicht online verf\xfcgbar sein sollte, oder Sie einen Privattermin (z.B. Vasektomiegespr\xe4ch) ben\xf6tigen, bitten wir Sie um telefonische Kontaktaufnahme.",disclaimer:"Wir bitten Sie ho\u0308flichst, im Falle einer Verhinderung Ihren Termin rechtzeitig (mind. 24 Stunden vorher) abzusagen oder zu verschieben. Wir bitten um Ihr Versta\u0308ndnis, dass nicht rechtzeitig abgesagte Termine in Rechnung gestellt werden ko\u0308nnen.",greeting:"Dr. Nike Morakis & Team",confirmationInfo:function(){var e="https://www.urologie11.at/wp-content/uploads/2021/08/Anmeldeformular_Uro11_16Aug_final.pdf";return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{children:Object(r.jsxs)("b",{children:["Bitte bringen Sie zu dem Termin wenn m\xf6glich das ",Object(r.jsx)("a",{href:e,target:"_blank",children:"ausgef\xfcllte Anmeldeformular"})," mit."]})}),Object(r.jsx)("a",{className:"button",href:e,target:"_blank",children:"Anmeldeformular herunterladen"}),Object(r.jsx)("br",{}),Object(r.jsxs)("p",{children:[Object(r.jsx)("b",{children:"Kommen Sie das erste Mal in unsere Ordination oder waren Sie schon l\xe4nger nicht bei uns?"}),Object(r.jsx)("br",{}),"Erscheinen Sie bitte mit gef\xfcllter Blase und nehmen Sie relevante Befunde und eine aktuelle Medikamentenliste mit."]})]})}(),contactInfo:Object(r.jsxs)(r.Fragment,{children:["+43 1 877 32 79",Object(r.jsx)("br",{}),"Simmeringer Hauptstra\xdfe 40",Object(r.jsx)("br",{}),"Stiege 4, 1. Stock",Object(r.jsx)("br",{}),"A-1110 Wien",Object(r.jsx)("br",{}),Object(r.jsx)("br",{})]}),ical:{url:"https://urologie11.at",location:"Simmeringer Hauptstra\xdfe 40, Stiege 4 - 1. Stock, 1110 Wien",name:"Urologie11 - Dr. Nike Morakis",description:"Urologie11 +43 1 877 32 79"}})}}},[["TjHt",0,2,1,3]]]);