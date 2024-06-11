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
        function LaadDeTabel(periode) {
          var cijfersVanPeriode = globaleVariabelen.schoolResults[periode];
          mainElem.innerHTML =
            '<table><thead><tr><td></td><td>Huiswerk</td><td>Praktijk</td><td>Project</td></tr></thead><tbody id="workingResult"></tbody></table>';
          // Omdat ik alle uitleg zag werken met een Array in deze vorm, wat niet per se super handig is als je met data werkt... Heb ik het ook gedaan.
          // Hier worden de cijfers dus in een array in een array gestopt.
          // // Realiseren
          var cijfersInTabelVormigeArray = [
            [
              "Realiseren",
              cijfersVanPeriode["REA"][0],
              cijfersVanPeriode["REA"][1],
              cijfersVanPeriode["REA"][2],
            ],
            // // Plannen en ontwerpen
            [
              "P&O",
              cijfersVanPeriode["PNO"][0],
              cijfersVanPeriode["PNO"][1],
              cijfersVanPeriode["PNO"][2],
            ],
            // // Testen en Verbeteren
            [
              "T&V",
              cijfersVanPeriode["TNV"][0],
              cijfersVanPeriode["TNV"][1],
              cijfersVanPeriode["TNV"][2],
            ],
            // // Computervaardigheden
            [
              "Computervaardigheden",
              cijfersVanPeriode["COV"][0],
              cijfersVanPeriode["COV"][1],
              cijfersVanPeriode["COV"][2],
            ],
          ];
          // Maar ik gebruik toch liever een 'for ...of'-loop.
          for (var i = 0; i <= cijfersInTabelVormigeArray.length; i++) {
            var ditVak = cijfersInTabelVormigeArray[i];
            var vaknaam = ditVak[0];
            var cijferHuiswerk = ditVak[1];
            var cijferPraktijk = ditVak[2];
            var cijferProject = ditVak[3];
            // We maken hier een variabele. Browsers als Firefox evalueren en corrigeren geinjecteerde HTML, wat betekend dat als we dit direct invoegen, de <tr> al gesloten is voor haar inhoud.
            var inTePlakken = "<tr>";
            // Hier laten we de while loop eens zien
            var j = 0;
            while (j < ditVak.length) {
              inTePlakken += "<td>" + ditVak[j] + "</td>";
              j++;
            }
            inTePlakken += "</tr>";

            document.getElementById("workingResult").innerHTML += inTePlakken;
          }
        }
        LaadDeTabel(1);
      }
      // Voor debugging, plaats de globaleVariabelen in window.
      window.globaleVariabelen = globaleVariabelen;
    })(JSON.parse(request.responseText));
  } else {
    window.location.assign("/pages/error.html");
  }
};
request.onerror = function () {};
request.send();
