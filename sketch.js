let blocks = []
let block_width = 50
let block_height_min = 50
let block_height_max = 300
let current_index
let timer
let mode
let slider
let n

function setup() {
	createCanvas(1000, 400)

	n = 10

	current_index = 0

	for (let i = 0; i < n; i++) {
		let h = random(block_height_min, block_height_max)
		let block = new Sprite(block_width/2 + i*block_width, block_height_max - h/2, block_width, h, 'kinematic')
		block.color = 'gray'
		blocks.push(block)
	}

	mode = 'mark'
	timer = millis()

	slider = createSlider(200, 1000, 1000, 100)
}

function draw() {
	clear()

	if (millis() - timer > slider.value()) {
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
	blocks[current_index].move(block_width, 'right', 3)
	blocks[current_index+1].move(block_width, 'left', 3)

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