function domainSplit(data){
    
    var index = 1;
    var domain = Array(8);
    domain[0] = d3.min(data, d => d.number_of_cars);
    domain[7] = d3.max(data, d => d.number_of_cars); 
    var dif = d3.max(data, d => d.number_of_cars) - d3.min(data, d => d.number_of_cars);
    var number = d3.min(data, d => d.number_of_cars) + Math.round(dif/7);
    while(index < 7){
        domain[index] = number;
        index++;
        number = number + Math.round(dif/7);
    }
    return domain;
}