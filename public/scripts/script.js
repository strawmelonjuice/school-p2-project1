/* 
    Author: MLC Bloeiman <@strawmelonjuice, mar@strawmelonjuice.com> 
    Date: <date>
    
    <Subject>

*/
var menuItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Over mij",
    link: "/pages/aboutme.html",
  },
  {
    title: "Cijfers",
    link: "/pages/aboutme/results.html",
  },
  {
    title: "Projecten",
    link: "/pages/aboutme/projects.html",
  },
];
// Dit zijn schoolresultaten van het bord. Ik was te lui om de actuale cijfers te pakken. Zal ik later wel aanpassen.
var schoolResultaten = {
  REA: [8.0, 1.0, 6.7],
  PNO: [9.6, 1.1, 2.8],
  TNV: [8.9, 8.9, 8.9],
  COV: [3.0, 1.0, 2.7],
};

var pageTitle = (() =>
{
  var element = document.createElement("p");
  element.innerHTML = "&ensp;&mdash;&ensp;Mar&#39;s&nbsp;site";
  return document
    .querySelector("title")
    .innerText.replace(element.innerText, "");
})();
document.querySelector("header h1").innerText = pageTitle;

var menu = document.getElementById("menu-items");

document.getElementById("closemenu").addEventListener("click", () =>
{
  document.getElementById("menu").classList.remove("ready");
  setTimeout(() =>
  {
    document.getElementById("menu").classList.remove("unfolded");
    document.getElementById("menu").classList.add("ready");
  }, 100);
});

document
  .querySelector("#menu.ready:not(:hover, .unfolded)")
  .addEventListener("click", () =>
  {
    document.getElementById("menu").classList.add("unfolded");
  });

for (item of menuItems)
{
  var menuItem = document.createElement("li");
  menuItem.innerHTML = `<a href="${item.link}">${item.title}</a>`;
  if (
    (item.title === "Home" &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/index.html")) ||
    window.location.pathname === item.link
  )
  {
    menuItem.classList.add("active");
  }
  menu.appendChild(menuItem);
}

if (pageTitle === "Cijfers")
{
  console.log("This is the results page...");
  var mainElem = document.querySelector("main>div");
  function LaadDeTabel()
  {
    mainElem.innerHTML =
      '<table><thead><tr><td></td><td>Huiswerk</td><td>Praktijk</td><td>Project</td><td ><button onclick="berekenGemiddeld()">Gemiddeld</button></td></tr></thead><tbody id="workingResult"></tbody></table>';
    // Omdat ik alle uitleg zag werken met een Array in deze vorm, wat niet per se super handig is als je met data werkt... Heb ik het ook gedaan.
    // Hier worden de cijfers dus in een array in een array gestopt.
    // // Realiseren
    var cijfersInTabelVormigeArray = [
      [
        "Realiseren",
        schoolResultaten["REA"][0],
        schoolResultaten["REA"][1],
        schoolResultaten["REA"][2],
        '<span id="realiserenGemiddeldeSpan"></span>',
      ],
      // // Plannen en ontwerpen
      [
        "P&O",
        schoolResultaten["PNO"][0],
        schoolResultaten["PNO"][1],
        schoolResultaten["PNO"][2],
        '<span id="poGemiddeldeSpan"></span>',
      ],
      // // Testen en Verbeteren
      [
        "T&V",
        schoolResultaten["TNV"][0],
        schoolResultaten["TNV"][1],
        schoolResultaten["TNV"][2],
        '<span id="tvGemiddeldeSpan"></span>',
      ],
      // // Computervaardigheden
      [
        "Computervaardigheden",
        schoolResultaten["COV"][0],
        schoolResultaten["COV"][1],
        schoolResultaten["COV"][2],
        '<span id="computervaardighedenGemiddeldeSpan"></span>',
      ],
    ];
    // Maar ik gebruik toch liever een 'for ...of'-loop.
    for (var i = 0; i <= cijfersInTabelVormigeArray.length; i++)
    {
      var ditVak = cijfersInTabelVormigeArray[i];
      // We maken hier een variabele. Browsers als Firefox evalueren en corrigeren geinjecteerde HTML, wat betekend dat als we dit direct invoegen, de <tr> al gesloten is voor haar inhoud.
      var inTePlakken = "<tr>";
      // Hier laten we de while loop eens zien
      // biome-ignore lint/style/noVar: <explanation>
      var j = 0;
      while (j < ditVak.length)
      {
        inTePlakken += "<td>" + ditVak[j] + "</td>";
        j++;
      }
      inTePlakken += "</tr>";

      document.getElementById("workingResult").innerHTML += inTePlakken;
    }
  }
  LaadDeTabel(1);
}
function berekenGemiddeld()
{
  console.log("Bereken gemiddeldes...");
  var gemiddeldeRealiseren =
    // Cijfer oefeningen.
    (schoolResultaten["REA"][0] +
      // Cijfer praktijk.
      schoolResultaten["REA"][1] +
      // Het project, laatste cijfer in de array, tekt 50% van het eindcijfer.
      schoolResultaten["REA"][2] +
      schoolResultaten["REA"][2]) /
    4;
  document.getElementById("realiserenGemiddeldeSpan").innerText =
    gemiddeldeRealiseren.toFixed(1);

  var gemiddeldePO =
    // Cijfer oefeningen.
    (schoolResultaten["PNO"][0] +
      // Cijfer praktijk.
      schoolResultaten["PNO"][1] +
      // Het project, laatste cijfer in de array, tekt 50% van het eindcijfer.
      schoolResultaten["PNO"][2] +
      schoolResultaten["PNO"][2]) /
    4;
  document.getElementById("poGemiddeldeSpan").innerText =
    gemiddeldePO.toFixed(1);

  var gemiddeldeTV =
    // Cijfer oefeningen.
    (schoolResultaten["TNV"][0] +
      // Cijfer praktijk.
      schoolResultaten["TNV"][1] +
      // Het project, laatste cijfer in de array, tekt 50% van het eindcijfer.
      schoolResultaten["TNV"][2] +
      schoolResultaten["TNV"][2]) /
    4;
  document.getElementById("tvGemiddeldeSpan").innerText =
    gemiddeldeRealiseren.toFixed(1);

  var gemiddeldeRealiseren =
    // Cijfer oefeningen.
    (schoolResultaten["COV"][0] +
      // Cijfer praktijk.
      schoolResultaten["COV"][1] +
      // Het project, laatste cijfer in de array, tekt 50% van het eindcijfer.
      schoolResultaten["COV"][2] +
      schoolResultaten["COV"][2]) /
    4;
  document.getElementById("computervaardighedenGemiddeldeSpan").innerText =
    gemiddeldeRealiseren.toFixed(1);
}
