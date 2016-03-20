
var addresses = require('./addresses'),
    result = [],
    street=/\s*(ул|пр-т|пл|пер)*\.*\s*([а-яА-ЯёЁa-zA-Z0-9-\s]+),*\s*(дом\s*)*([а-яА-ЯёЁa-zA-Z0-9-]*)(\/*(\w*))*(,\sкв\.\s(\w+))*\s*/i;

addresses.forEach(function(item, index, arr){
    var test=street.exec(item);
    result[index]={
        "street":test[2],
        "house":test[4],
        "flat":test[8]||test[6]
    }
    return result;



});

console.log(result);

module.exports = result;








