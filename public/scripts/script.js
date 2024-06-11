/* 
    Author: MLC Bloeiman <@strawmelonjuice, mar@strawmelonjuice.com> 
    Date: <date>
    
    <Subject>

*/
var request = new XMLHttpRequest();
// Ophalen van data.json voor de "dynamische variabelen", zo hoef ik niet de hele js te openen als ik een pagina toevoeg.
request.open("GET", "/data.json", true);
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    ((globaleVariabelen) => {
      console.log(request.responseText);
      const pageTitle = (() => {
        console.log(globaleVariabelen);
        const element = document.createElement("p");
        element.innerHTML = "&ensp;&mdash;&ensp;Mar&#39;s&nbsp;site";
        return document
          .querySelector("title")
          .innerText.replace(element.innerText, "");
      })();
      document.querySelector("header h1").innerText = pageTitle;

      const menu = document.getElementById("menu-items");

      document.getElementById("closemenu").addEventListener("click", () => {
        document.getElementById("menu").classList.remove("ready");
        setTimeout(() => {
          document.getElementById("menu").classList.remove("unfolded");
          document.getElementById("menu").classList.add("ready");
        }, 100);
      });

      document
        .querySelector("#menu.ready:not(:hover, .unfolded)")
        .addEventListener("click", () => {
          document.getElementById("menu").classList.add("unfolded");
        });

      for (item of globaleVariabelen.menuItems) {
        const menuItem = document.createElement("li");
        menuItem.innerHTML = `<a href="${item.link}">${item.title}</a>`;
        if (
          (item.title === "Home" &&
            (window.location.pathname === "/" ||
              window.location.pathname === "/index.html")) ||
          window.location.pathname === item.link
        ) {
          menuItem.classList.add("active");
        }
        menu.appendChild(menuItem);
      }

      if (pageTitle === "Results") {
        console.log("This is the results page...");
        const mainElem = document.querySelector("main>div");
        mainElem.innerHTML = "<p>Loading results...</p>";
        mainElem.innerHTML = `
          
<table>
<thead>
    <tr>A</tr>
    <tr>B</tr>
    <tr>C</tr></thead>
  <tbody>
<tr>D</tr>
    <tr>E</tr>
    <tr>F</tr>
  </tbody>
          </table>

          `;
      }
    })(JSON.parse(request.responseText));
  } else {
    window.location.assign("/pages/error.html");
  }
};
request.onerror = function () {};
request.send();
