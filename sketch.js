let blocks = []
let block_width
let block_height_min = 50
let block_height_max = 400
let current_index
let timer
let mode
let sliderSpeed
let sliderAmount
let n

function setup() {
	createCanvas(1000, 400)


	sliderSpeed = createSlider(200, 1000, 1000, 100)
	createSpan('Pause zwischen den Schritten')
	createElement('br')
	sliderAmount = createSlider(10, 100, 10, 1)
	createSpan('Anzahl')

	createElement('br')

	let button = createButton('restart')
	button.mousePressed(() => {
		setupArray()
	})

	setupArray()

}

function setupArray() {
	for (let i = blocks.length - 1; i >= 0; i--) {
		blocks[i].remove()
	}

	n = sliderAmount.value()

	block_width = width/n

	current_index = 0

	let sizes = []
	for (let i = 0; i < n; i++) {
		let size = map(i, 0, n-1, block_height_min, block_height_max)
		sizes.push(size)
	}
	sizes = sizes.sort(() => Math.random() - 0.5)
	sizes = sizes.sort(() => Math.random() - 0.5)
	sizes = sizes.sort(() => Math.random() - 0.5)

	blocks = []
	for (let i = 0; i < n; i++) {
		let h = sizes[i]
		let block = new Sprite(block_width/2 + i*block_width, block_height_max - h/2, block_width, h, 'kinematic')
		block.color = 'gray'
		blocks.push(block)
	}

	mode = 'mark'
	timer = millis()
}

function draw() {
	clear()

	if (millis() - timer > sliderSpeed.value()) {
		timer = millis()
		if (mode == 'mark') {
			markCurrent()
			mode = 'swap'
		} else if (mode == 'swap') {
			if (blocks[current_index].h > blocks[current_index+1].h) {
				swap()
			}
			mode = 'mark'
			current_index++

			if (current_index == blocks.length-1) {
				current_index = 0
			}
		}
	}
}

function swap() {
	// move
	let speed = 0.07 * block_width
	blocks[current_index].move(block_width, 'right', speed)
	blocks[current_index+1].move(block_width, 'left', speed)

	// edit array
	let temp = blocks[current_index]
	blocks[current_index] = blocks[current_index+1]
	blocks[current_index+1] = temp
}

function markCurrent() {
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i]
		block.color = 'gray'
	}
	blocks[current_index].color = 'red'
	blocks[current_index+1].color = 'red'
}