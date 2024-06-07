/* 
    Author: MLC Bloeiman <@strawmelonjuice, mar@strawmelonjuice.com> 
    Date: <date>
    
    <Subject>

*/
const pageTitle = (() =>
{
    const element = document.createElement("p");
    element.innerHTML = "&ensp;&mdash;&ensp;Mar&#39;s&nbsp;site";
    return ((document.querySelector("title").innerText).replace(element.innerText, ""));


})();
document.querySelector("header h1").innerText = pageTitle;
const menuItems = [
    { title: "Home", link: "/" },
    { title: "About me", link: "/pages/aboutme.html" },
];

const menu = document.getElementById("menu-items");

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
    const menuItem = document.createElement("li");
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
