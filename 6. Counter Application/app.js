

let resetBtn = document.getElementById('reset-btn');
let submitBtn = document.getElementById('submit-btn');
let resultBody = document.getElementById('result-body');
let nameOutput = document.getElementById('name-output');
resultBody.style.display = 'none';
let myName = document.getElementById('my-name');

window.onload = () => main();

let main = () => {

}

submitBtn.addEventListener('click', () => {
    if (myName.value) {
        nameOutput.innerText = myName.value;
        resultBody.style.display = 'block';
        document.getElementById('my-name').value = '';
    }
    else {
        alert('please provide a valid name')
    }
})
resetBtn.addEventListener('click', () => {
    document.getElementById('my-name').value = '';
    resultBody.style.display = 'none';
})
