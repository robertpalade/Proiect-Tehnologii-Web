(function () {
  let data =
    [
      {
        name: "Alba",
      },
      {
        name: "Arad",
      },
      {
        name: "Arges"
      },
      {
        name: "Bacau",
      },
      {
        name: "Bihor",
      },
      {
        name: "Bistrita"
      },
      {
        name: "Botosani",
      },
      {
        name: "Brasov",
      },
      {
        name: "Braila",
      },
      {
        name: "Bucuresti",
      },
      {
        name: "Buzau",
      },
      {
        name: "Calarasi",
      },
      {
        name: "Caras-Severin",
      },
      {
        name: "Cluj",
      },
      {
        name: "Constanta",
      },
      {
        name: "Covasna",
      },
      {
        name: "Dambovita",
      },
      {
        name: "Dolj",
      },
      {
        name: "Galati",
      },
      {
        name: "Giurgiu",
      },
      {
        name: "Gorj",
      },
      {
        name: "Hargita",
      },
      {
        name: "Hunedoara",
      },
      {
        name: "Iasi",
      },
      {
        name: "Ialomita",
      },
      {
        name: "Ilfov",
      },
      {
        name: "Maramures",
      },
      {
        name: "Mehedinti",
      },
      {
        name: "Mures",
      },
      {
        name: "Neamt",
      },
      {
        name: "Olt",
      },
      {
        name: "Prahova",
      },
      {
        name: "Salaj",
      },
      {
        name: "Satu-Mare",
      },
      {
        name: "Sibiu",
      },
      {
        name: "Suceava",
      },
      {
        name: "Teleorman",
      },
      {
        name: "Timis",
      },
      {
        name: "Tulcea"
      },
      {
        name: "Valcea",
      },
      {
        name: "Vaslui",
      },
      {
        name: "Vrancea",
      }
    ]


  const selectButton = document.getElementById("selectButton")
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].name;
    option.value = data[i].name;
    selectButton.add(option);
  }
})()

