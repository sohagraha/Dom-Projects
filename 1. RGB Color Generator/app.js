window.onload = () => {
	main();
};


function main() {
	const root = document.getElementById('root');

	const btn = document.getElementById('change-btn');
	const autobtn = document.getElementById('change-btn-auto');
	const autobtnstop = document.getElementById('change-btn-auto-stop');

	let txtcolor = document.getElementById('text-color');
	let copyBtn = document.getElementById('copy_hex');

	autobtnstop.style.display = "none";

	btn.addEventListener('click', function () {
		const bgColor = generateRGBColor();
		root.style.backgroundColor = bgColor;
		txtcolor.innerText = bgColor;
	});

	autobtn.addEventListener('click', function () {

		autobtn.style.display = "none";
		autobtnstop.style.display = "block";

		var intervalId = window.setInterval(function () {
			const bgColor = generateRGBColor();
			root.style.backgroundColor = bgColor;
			txtcolor.innerText = bgColor;
		}, 5000);

		autobtnstop.addEventListener('click', function () {

			autobtn.style.display = "block";
			autobtnstop.style.display = "none";

			clearInterval(intervalId);
		})
	})

	copyBtn.addEventListener('click', () => {
		const value = document.getElementById("output").value;
		navigator.clipboard.writeText(`${value}`)
	});

}

function generateRGBColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	// decimal to hex 
	let redhex = red.toString(16);
	let greenhex = green.toString(16);
	let bluehex = blue.toString(16);

	let inputArea = document.getElementById("output");
	inputArea.value = `#${redhex}${greenhex}${bluehex}`;

	return `rgb(${red}, ${green}, ${blue})`;
}


