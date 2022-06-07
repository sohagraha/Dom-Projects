window.onload = () => {
	main();
};

let rgbTxt;
let div = null;

let randColorBtn = document.getElementById("generate-random-color");
let colorDisplay = document.getElementById("color-display");
let inputHex = document.getElementById("input-hex");
let inputRgb = document.getElementById("input-rgb");
let copyToClipboard = document.getElementById("copy-to-clipboard");
let ColorModeCopy = {
	hex: true,
	rgb: false
}
let colorModeHex = document.getElementById("color-mode-hex");
let colorModeRgb = document.getElementById("color-mode-rgb");

let ColorSliderRedLabel = document.getElementById('color-slider-red-label');
let ColorSliderGreenLabel = document.getElementById('color-slider-green-label');
let ColorSliderBlueLabel = document.getElementById('color-slider-blue-label');

let colorSliderRed = document.getElementById("color-slider-red")
let colorSliderGreen = document.getElementById("color-slider-green")
let colorSliderBlue = document.getElementById("color-slider-blue")

const rgbColor = {
	red: 221,
	green: 222,
	blue: 238
}

// Event Listeners 
colorModeHex.addEventListener("click", () => {
	ColorModeCopy.hex = true
	ColorModeCopy.rgb = false
})
colorModeRgb.addEventListener("click", () => {
	ColorModeCopy.hex = false
	ColorModeCopy.rgb = true
})
copyToClipboard.addEventListener("click", () => {
	if (ColorModeCopy.hex) {
		navigator.clipboard.writeText(`#${inputHex.value}`)
		if (div !== null) {
			div.remove();
			div = null;
		}
		if (isValidHex(inputHex.value)) {
			toastMeassage(`#${inputHex.value}`);
		}
	}
	else {
		navigator.clipboard.writeText(`${inputRgb.value}`)
		if (div !== null) {
			div.remove();
			div = null;
		}
		toastMeassage(inputRgb.value);
	}
});

inputHex.addEventListener("keyup", () => {
	if (isValidHex(inputHex.value)) {
		hexToRgb(inputHex.value)
	}
})

colorSliderRed.addEventListener('change', () => {
	rgbColor.red = colorSliderRed.value;
	sliderChange();
})
colorSliderGreen.addEventListener('change', () => {
	rgbColor.green = colorSliderGreen.value;
	sliderChange();
})
colorSliderBlue.addEventListener('change', () => {
	rgbColor.blue = colorSliderBlue.value;
	sliderChange();
})


// all function 
let main = () => {
	inputHex.maxLength = 6;


	randColorBtn.addEventListener('click', () => {
		rgbTxt = generateRGBColor();
		colorDisplay.style.backgroundColor = rgbTxt;
		inputRgb.value = rgbTxt;
	})
}

let generateRGBColor = () => {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	colorSliderRed.value = red;
	colorSliderGreen.value = green;
	colorSliderBlue.value = blue;

	labelUpdate(red, green, blue);


	let redHex = red.toString(16);
	let greenHex = green.toString(16);
	let blueHex = blue.toString(16);

	rgbToHex(redHex, greenHex, blueHex)

	return `rgb(${red}, ${green}, ${blue})`;
}

let hexToRgb = (hexcolor) => {
	let redhtr = parseInt(hexcolor.slice(0, 2), 16);
	let greenhtg = parseInt(hexcolor.slice(2, 4), 16);
	let bluehtb = parseInt(hexcolor.slice(4, 6), 16);

	rgbColor.red = redhtr;
	rgbColor.green = greenhtg;
	rgbColor.blue = bluehtb;

	console.log(rgbColor);


	labelUpdate(redhtr, greenhtg, bluehtb);
	sliderChangeRgb(redhtr, greenhtg, bluehtb);
	sliderValueUpdate(redhtr, greenhtg, bluehtb);

}

let rgbToHex = (red, green, blue) => {
	let rgbToHexTxt = `${red}${green}${blue}`
	inputHex.value = rgbToHexTxt;
}


let toastMeassage = (message) => {
	div = document.createElement('div');
	div.classList.add('toast-message')
	div.classList.add('toast-message-slide-in')
	div.innerText = message;
	div.addEventListener("click", () => {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');
		div.addEventListener('animationend', () => {
			div.remove();
			div = null;
		})
	})

	document.body.appendChild(div);
}

const isValidHex = (color) => {
	if (color.length !== 6) {
		return false;
	}
	return /^[0-9A-Fa-f]{6}/i.test(color);
}

let labelUpdate = (red, green, blue) => {
	ColorSliderRedLabel.innerText = red;
	ColorSliderGreenLabel.innerText = green;
	ColorSliderBlueLabel.innerText = blue;
}

let sliderChangeRgb = (red, green, blue) => {
	inputRgb.value = `rgb(${red}, ${green}, ${blue})`;
	colorDisplay.style.backgroundColor = inputRgb.value;
}
let sliderChangeHex = (red, green, blue) => {
	let redHex = parseInt(red).toString(16);
	let greenHex = parseInt(green).toString(16);
	let blueHex = parseInt(blue).toString(16);

	rgbToHex(redHex, greenHex, blueHex)
}

let sliderChange = () => {
	labelUpdate(rgbColor.red, rgbColor.green, colorSliderBlue.value)
	sliderChangeRgb(rgbColor.red, rgbColor.green, colorSliderBlue.value)
	sliderChangeHex(rgbColor.red, rgbColor.green, colorSliderBlue.value)
}

let sliderValueUpdate = (red, green, blue) => {
	colorSliderRed.value = red;
	colorSliderGreen.value = green;
	colorSliderBlue.value = blue;
}



