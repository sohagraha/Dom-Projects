let count = 0;
let incValue = document.getElementById('inc-value');
let decValue = document.getElementById('dec-value');
let incBtn = document.getElementById('inc-btn');
let decBtn = document.getElementById('dec-btn');

let counterTxt = document.getElementById('counterTxt');


window.onload = () => main();

let main = () => {

}

incValue.addEventListener('keyup', () => {
    if (incValue.value > 100) {
        incValue.value = 100;
    }
    if (incValue.value < 0) {
        incValue.value = 0;
    }
})
decValue.addEventListener('keyup', () => {
    if (decValue.value > 100) {
        decValue.value = 100;
    }
    if (decValue.value < 0) {
        decValue.value = 0;
    }
})

incBtn.addEventListener('click', () => {
    count = parseInt(count) + parseInt(incValue.value);
    if (count < 10) {
        count = `0${count}`;
    }
    counterTxt.innerText = count;
})
decBtn.addEventListener('click', () => {
    count = parseInt(count) - parseInt(decValue.value);
    if (count < 0) {
        count = 0;
    }
    if (count < 10) {
        count = `0${count}`;
    }
    counterTxt.innerText = count;
})


let test = () => {
    let arr = ['start', 1, 2, 3, null, false, "3rd", null, 4, 5, '', 'text', 6, 7];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') {
            count++;
            for (let j = i; j < arr.length - 1; j++) {
                arr[j] = arr[j + 1];
            }
            i--;
        }
    }
    arr.length -= count;
    console.log(arr)
}
test();
