let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gui = new dat.GUI()
let c = canvas.getContext('2d')

// const colors = ['hsl(219, 66%, 53%)', 'hsl(110, 100%, 34%)', 'hsl(56, 89%, 55%)', 'hsl(37, 89%, 55%)', 'hsl(356, 88%, 58%)']
const wave = {
  y: canvas.height/2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

const backgroundColor = {
  r: 0,
  b: 0,
  g: 0,
  a: 0.01
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
waveFolder.open()

const strokeFolder = gui.addFolder('stroke')
strokeFolder.add(strokeColor, 'h', 0, 255)
strokeFolder.add(strokeColor, 's', 0, 100)
strokeFolder.add(strokeColor, 'l', 0, 100)
strokeFolder.open()

const backgroundFolder = gui.addFolder('background')
backgroundFolder.add(backgroundColor, 'r', 0, 255)
backgroundFolder.add(backgroundColor, 'g', 0, 255)
backgroundFolder.add(backgroundColor, 'b', 0, 255)
backgroundFolder.add(backgroundColor, 'a', 0, 1)
backgroundFolder.open()


let increment = wave.frequency
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`
  // c.fillStyle = `rgba(200, 0, 0, 0.01)`
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.beginPath()
  c.moveTo(0,canvas.height/2)
  for (let i = 0 ; i < canvas.width; i++) {
      c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
  }
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke()
  increment += wave.frequency
}

animate()