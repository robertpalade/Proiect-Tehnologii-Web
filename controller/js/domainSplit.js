function domainSplit(data) {
  var index = 1;
  var domain = Array(8);
  domain[0] = d3.min(data, (d) => d.number_of_cars);
  domain[7] = d3.max(data, (d) => d.number_of_cars);
  var dif =
    d3.max(data, (d) => d.number_of_cars) -
    d3.min(data, (d) => d.number_of_cars);
  var number = d3.min(data, (d) => d.number_of_cars) + Math.round(dif / 7);
  while (index < 7) {
    domain[index] = number;
    index++;
    number = number + Math.round(dif / 7);
  }
  return domain;
}

function customRound(number) {
  var aux = number;
  var counter = 0;
  while (aux != 0) {
    counter++;
    aux = Math.trunc(aux / 10);
  }
  if (counter <= 4 && counter > 1) counter -= 1;
  else if (counter > 4) counter = 3;
  else counter = 1;
  var precision = Math.pow(10, counter);
  var divident = Math.trunc(number / precision);
  var result = (divident + 1) * precision;
  return result;
}

function customMinimize(number) {
  var aux = number;
  var counter = 0;
  while (aux != 0) {
    counter++;
    aux = Math.trunc(aux / 10);
  }
  if (counter > 3) counter = 3;
  else if (counter > 1) counter -= 1;
  else number = 0;
  var precision = Math.pow(10, counter);
  var divident = Math.trunc(number / precision);
  var result = divident * precision;
  return result;
}

console.log(customMinimize(295322));
