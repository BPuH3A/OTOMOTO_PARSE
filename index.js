const input = document.getElementById("input");
const btn = document.getElementById("btn");
const clear = document.getElementById("clear");
const asideUA = document.getElementById("ua");
const asideEU = document.getElementById("eu");
const parser = new DOMParser();

btn.addEventListener("click", parseFunction);
clear.addEventListener("click", function () {
  input.value = "";
});

async function parseFunction() {
  let url = input.value;
  asideEU.innerText = "";
  asideUA.innerText = "";

  let fullName, year, probieg, volume, palivo, korobka, neped, rozhod;

  try {
    const response = await fetch(
      "https://api.allorigins.win/get?url=" + encodeURIComponent(url)
    );
    const data = await response.json();
    const doc = parser.parseFromString(data.contents, "text/html");
    let pCollection = doc.querySelectorAll("p");
    //
    fullName = doc
      .getElementsByClassName("e1aecrfb1")[0]
      .getElementsByClassName("offer-title")[0].innerHTML;
    console.log(fullName);
    asideEU.innerText = `"${fullName}"`;
    asideUA.innerText = `"${fullName}"`;
    //
    for (element in pCollection) {
      if (pCollection[element].innerHTML === "Rok produkcji") {
        year = pCollection[element].nextElementSibling.innerHTML;
        console.log(year);
        asideEU.innerText += `
        Rok produkcji: ${year}`;
        asideUA.innerText += `
        Рік: ${year}`;
      }
      if (pCollection[element].innerHTML === "Przebieg") {
        probieg = pCollection[element].nextElementSibling.innerHTML;
        console.log(probieg);
        asideEU.innerText += `
        Przebieg: ${probieg}`;
        asideUA.innerText += `
        Пробіг: ${probieg}`;
      }
      if (pCollection[element].innerHTML === "Pojemność skokowa") {
        volume = pCollection[element].nextElementSibling.innerHTML;
        console.log(volume);
      }
      if (pCollection[element].innerHTML === "Rodzaj paliwa") {
        palivo = pCollection[element].nextElementSibling.innerHTML;
        console.log(palivo);
        let palivoUA;
        if (palivo === "Benzyna") {
          palivoUA = "Бензин";
        } else if (palivo === "Diesel") {
          palivoUA = "Дизель";
        } else {
          palivoUA = palivo;
        }
        asideEU.innerText += `
        Rodzaj paliwa: ${palivo}`;
        asideUA.innerText += `
        Двигун: ${volume}(${palivoUA})`;
      }
      if (pCollection[element].innerHTML === "Skrzynia biegów") {
        korobka = pCollection[element].nextElementSibling.innerHTML;
        let korobkaUA;
        console.log(korobka);
        asideEU.innerText += `
        Skrzynia biegów: ${korobka}`;
        if (korobka === "Automatyczna") {
          korobkaUA = "Автоматична";
        }
        if (korobka === "Manualna") {
          korobkaUA = "Механічна";
        }
        asideUA.innerText += `
        Коробка передач: ${korobkaUA}`;
      }
      if (pCollection[element].innerHTML === "Napęd") {
        neped = pCollection[element].nextElementSibling.innerHTML;
        console.log(neped);
        let nepedUa;
        asideEU.innerText += `
        Napęd: ${neped}`;
        if (neped.includes("4x4")) {
          nepedUa = "повний";
        }
        if (neped.includes("przednie")) {
          nepedUa = "передній";
        }
        if (neped.includes("tylne")) {
          nepedUa = "задній";
        }
        asideUA.innerText += `
        Привід: ${nepedUa}`;
      }
      if (pCollection[element].innerHTML === "Spalanie W Mieście") {
        rozhod = pCollection[element].nextElementSibling.innerHTML;
        console.log(rozhod);
        if (rozhod !== undefined) {
          asideEU.innerText += `
          Spalanie W Mieście: ${rozhod}`;
        }
      }
    }
    //
    let price = doc.getElementsByClassName("offer-price__number")[0].innerHTML;
    console.log(price);
    asideEU.innerText += `
    Cena: ${price} zl
    Krai: Polska
    Numer telefonu:`;
    asideUA.innerText += `
    Ціна: ${price} zl
    Країна: Польща
    Номер телефону:`;
  } catch (error) {
    console.log("Помилка при парсингу сайту: " + error.message);
  }
}
