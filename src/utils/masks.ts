export const maskNumberToPhone = (number: string) => {

  switch (number.length) {
    case 1: 
     if (number.match(/\d/)) return `(${number}`;
     return '';
    case 2: return `(${number})`;
    case 3: 
    case 4: 
    case 5: 
    case 6: 
    case 7: return `(${number.substr(0,2)}) ${number.substr(2)}`;
    case 8: 
    case 9:
    case 10 :
    case 11: return `(${number.substr(0,2)}) ${number.substr(2, 5)}-${number.substr(7)}`;
    default: return number;
  };
}

export const unmaskPhoneToNumber = (phone: string) => phone.replaceAll(/\D/g,'');