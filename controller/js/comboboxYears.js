function build_years_combo(county) {
    let data = [
        {
            id:1,
            year:2015
        },
        {
            id:2,
            year:2016
        },
        {
            id:3,
            year:2017
        },
        {
            id:4,
            year:2018
        },
        {
            id:5,
            year:2019
        }
    ]
      combobox_nat(data);
}
  
    function combobox_nat(data) {
      const selectYearButton = document.getElementById(
        "selectYearButton"
      );
      while (selectYearButton.firstChild) {
        selectYearButton.removeChild(selectYearButton.firstChild);
    }
      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.text = data[i].year;
        option.value = data[i].year;
        selectYearButton.add(option);
      }
    }