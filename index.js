
//! calling canvas API object 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


class Player {
  //! constructor is called each time you instantiate a new version or instance of the player class
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

//!dynamically calculate what x and y should be based on the width and size of the canvas
const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 30, 'blue')


const projectile = new Projectile(
  canvas.width / 2,
  canvas.height / 2,
  5,
  'red',
  {
    x: -1,
    y: -1
  })
//! loop through these projectiles array in the animate loop
const projectiles = []

function animate() {
  requestAnimationFrame(animate)

  //? clearing the entire canvas
  ctx.clearRect(0,0,canvas.width,canvas.height)
  //?drawing player 
  player.draw()

  projectiles.forEach(projectile => {
    projectile.update()
  })
}

window.addEventListener("click", (event) => {
  //! finding angle of right angle formed of where clicked
  const angle = Math.atan2(event.clientY-canvas.height/2,event.clientX - canvas.width/2)

  const velocity={
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  console.log(angle)
  //!whenever we click that is when we generate a new particle and push it to the particles array
  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity))

})

animate()