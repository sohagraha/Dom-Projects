const converter = {
    area: {
        name: 'Area',
        units: {
            squareKm: 'Square Kilometer',
            squareM: 'Square Meter',
            squareMile: 'Square Mile',
            squareYard: 'Square Yard',
            squareFoot: 'Square Foot',
        },
        variant: {
            'squareKm:squareM': {
                formula: 'multiple the area by 1000000',
                calculation(n) {
                    return n * 1000000
                }
            },
            'squareKm:squareMile': {
                formula: 'divide the area value by 2.59',
                calculation(n) {
                    return n / 2.59;
                }
            },
            'squareKm:squareYard': {
                formula: 'multiple the area by 1196000',
                calculation(n) {
                    return n * 1196000;
                }
            },
            'squareKm:squareFoot': {
                formula: 'multiple the area by 10760000',
                calculation(n) {
                    return n * 10760000;
                }
            },
            'squareM:squareKm': {
                formula: 'divide the area by 1000000',
                calculation(n) {
                    return n / 1000000
                }
            },
            'squareM:squareMile': {
                formula: 'divide the area value by 2.59e+6',
                calculation(n) {
                    return n / new Number('2.59e+6');
                }
            },
            'squareM:squareYard': {
                formula: 'multiply the area by 1.196',
                calculation(n) {
                    return n * 1.196
                }
            },
            'squareM:squareFoot': {
                formula: 'multiply the area by 10.764',
                calculation(n) {
                    return n * 10.764
                }
            },
            'squareMile:squareKm': {
                formula: 'multiply the area by 2.59',
                calculation(n) {
                    return n * 2.59
                }
            },
            'squareMile:squareM': {
                formula: 'multiply the area by 2.59e+6',
                calculation(n) {
                    return n * new Number('2.59e+6')
                }
            },
            'squareMile:squareYard': {
                formula: 'For an approximate result, multiply the area value by 3.098e+6',
                calculation(n) {
                    return n * new Number('3.098e+6');
                }
            },
            'squareMile:squareFoot': {
                formula: 'For an approximate result, multiply the area value by 2.788e+7',
                calculation(n) {
                    return n * new Number('2.788e+7')
                }
            },
            'squareYard:squareKm': {
                formula: 'divide the area value by 1.196e+6',
                calculation(n) {
                    return n / new Number('1.196e+6')
                }
            },
            'squareYard:squareM': {
                formula: 'divide the area value by 1.196',
                calculation(n) {
                    return n / 1.196
                }
            },
            'squareYard:squareMile': {
                formula: 'divide the area value by 3.098e+6',
                calculation(n) {
                    return n / new Number('3.098e+6')
                }
            },
            'squareYard:squareFoot': {
                formula: 'multiply the area by 9',
                calculation(n) {
                    return n * 9
                }
            },
            'squareFoot:squareKm': {
                formula: 'divide the area value by 1.076e+7',
                calculation(n) {
                    return n / new Number('1.076e+7')
                }
            },
            'squareFoot:squareM': {
                formula: 'divide the area by 10.764',
                calculation(n) {
                    return n / 10.764
                }
            },
            'squareFoot:squareMile': {
                formula: 'divide the area value by 2.788e+7',
                calculation(n) {
                    return n / new Number('2.788e+7')
                }
            },
            'squareFoot:squareYard': {
                formula: 'divide the area value by 9',
                calculation(n) {
                    return n / 9
                }
            },

        }
    },
    mass: {
        name: 'Mass',
        units: {
            tonne: 'Tonne',
            kilogram: 'Kilogram',
            gram: 'Gram',
            milligram: 'Milligram',
        }
    }
}


let converterKeys = Object.keys(converter).sort();
let converterLeftKeys = [];
let converterRightKeys = [];

let categorySelect = document.getElementById('category-select');
let leftInput = document.getElementById('left-inp');
let rightInput = document.getElementById('right-inp');
let leftSelect = document.getElementById('left-select');
let rightSelect = document.getElementById('right-select');


let converterName;
let variant;
let variantKey;
let formulaTxt;

let formulaTxtArea = document.getElementById('formula-text')


categorySelect.addEventListener('change', () => {
    leftCategory();
    rightCategory(leftSelect.value);

    formulaCal();
})

leftSelect.addEventListener('change', () => {
    rightCategory(leftSelect.value);

    formulaCal()
})

rightSelect.addEventListener('change', () => {
    formulaCal()
})


window.onload = () => main();

let main = () => {
    leftInput.value = 1;

    // main select category 
    converterKeys.forEach(element => {
        addCategory(categorySelect, { value: element, text: converter[element].name })
    });
    leftCategory();
    rightCategory(leftSelect.value);

    formulaCal()
}

// main category added

let addCategory = (parent, option) => {
    const opt = document.createElement('option')
    opt.setAttribute('value', option.value);
    opt.innerText = option.text;
    parent.appendChild(opt)
}

let removeAllChild = (parent) => {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}


// let category added
let leftCategory = () => {
    converterLeftKeys = (Object.keys(converter[categorySelect.value].units).sort());

    removeAllChild(leftSelect);
    converterLeftKeys.forEach(element => {
        addCategory(leftSelect, { value: element, text: (converter[categorySelect.value].units)[element] })
    });
}

let rightCategory = (element) => {

    let alldata = (Object.keys(converter[categorySelect.value].units).sort());
    let newData = [];
    alldata.forEach((e) => {
        if (element != e) {
            newData.push(e);
        }
    })
    removeAllChild(rightSelect);
    newData.forEach(element => {
        addCategory(rightSelect, { value: element, text: (converter[categorySelect.value].units)[element] })
    });
}

let formulaCal = () => {
    converterName = categorySelect.value
    variant = converter[converterName].variant;
    variantKey = `${leftSelect.value}:${rightSelect.value}`
    formulaTxt = variant[variantKey].formula;
    formulaTxtArea.innerText = formulaTxt;
    rightInput.value = variant[variantKey].calculation(leftInput.value);
}