!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]");b;var r=null;e.addEventListener("click",(function(){e.setAttribute("disabled",!0),r=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),o.removeAttribute("disabled"),e.setAttribute("disabled",!0)}),1e3)})),o.addEventListener("click",(function(){clearInterval(r),e.removeAttribute("disabled"),o.setAttribute("disabled",!0),console.log("Stop")}))}();
//# sourceMappingURL=01-color-switcher.7c768951.js.map
