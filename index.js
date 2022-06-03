//? test GSAP
// console.log(gsap)

//! calling canvas API object 
const canvas = document.querySelector('canvas')

const scoreEl = document.querySelector('#scoreEl')
const modalEl = document.querySelector('#modalEl')
const modalScoreEl = document.querySelector('#modalScoreEl')
const buttonEl = document.querySelector('#buttonEl')
const startButtonEl = document.querySelector('#startButtonEl')
const startEl = document.querySelector('#startEl')
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

class Enemy {
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
const friction = 0.99
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01

  }
}


//creates an array of each instance of a projectile or enemy
let projectiles = []
let enemies = []
let particles = []
let animationId
let intervalId
let score = 0
let game = {
  active: false
}

function init() {
  //!dynamically calculate what x and y should be based on the width and size of the canvas
  const x = canvas.width / 2
  const y = canvas.height / 2
  player = new Player(x, y, 10, 'white')
  projectiles = []
  enemies = []
  particles = []
  animationId
  score = 0
  scoreEl.innerHTML = 0
  game = {
    active: true
  }
}


const projectile = new Projectile(
  canvas.width / 2,
  canvas.height / 2,
  5,
  'white',
  {
    x: -1,
    y: -1
  })
//! loop through these projectiles array in the animate loop


function spawnEnemies() {
  //!Create instances of enemies, putting them at random places on the canvas and sending them towards the center
  intervalId = setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4
    let x
    let y

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height

    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }

    //hsl first parameter is the color 0-360
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(new Enemy(x, y, radius, color, velocity))
  }, 1000)

}


//!animate function for animate loop, need to check on each loop if an enemy has hit the payer or is on the coordinates of the player
function animate() {
  animationId = requestAnimationFrame(animate)

  //? clearing the entire canvas
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(0,0,0,0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //?drawing player 
  player.draw()

  //!removing particles once they reach alpha value of 0
  for (let particleIdx = particles.length - 1; particleIdx >= 0; particleIdx--) {
    const particle = particles[particleIdx]

    if (particle.alpha <= 0) {
      particles.splice(particleIdx, 1)
    } else {
      particle.update()
    }
  }

  for (let index = projectiles.length - 1; index >= 0; index--) {
    const projectile = projectiles[index]

    projectile.update()
    //* remove projectiles off screen in x axis
    if (projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height) {
      projectiles.splice(index, 1)
    }
  }

  for (let enemyIdx = enemies.length - 1; enemyIdx >= 0; enemyIdx--) {
    const enemy = enemies[enemyIdx]

    enemy.update()
    //* COLLISION ENEMY AND PLAYER
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    //*end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId)
      clearInterval(intervalId)
      audio.death.play()
      game.active = false

      modalScoreEl.innerHTML = score

      modalEl.style.display = 'block'
      gsap.fromTo('#modalEl', { scale: 0.8, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        ease: 'expo'
      })
    }

    //! in this loop test the distance between each projectile DETECT 
    //* COLLISION ENEMY AND PROJECTILE
    for (let projectileIdx = projectiles.length - 1; projectileIdx >= 0; projectileIdx--) {
      const projectile = projectiles[projectileIdx]
      //!hypot distance between two points
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      if (dist - enemy.radius - projectile.radius < 1) {
        //?collision detection
        // console.log("remove from screen")
        //? if collision detected remove the enemy and the projectile from their corresponding arrays
        //!TimeOut is trick to prevent flash from occuring when objects collide

        //*Particle explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, { x: (Math.random() - 0.5) * (Math.random() * 8), y: (Math.random() - 0.5) * (Math.random() * 8) }))
        }
        //* checking if larger than certain radius
        //this is where shrink enemy
        if (enemy.radius - 10 > 5) {
          audio.damage.play()
          score += 100
          scoreEl.innerHTML = score
          gsap.to(enemy, {
            radius: enemy.radius - 10
          })
          projectiles.splice(projectileIdx, 1)

          //remove enemy if they are too small
        } else {
          audio.destroy.play()
          score += 150
          scoreEl.innerHTML = score
          enemies.splice(enemyIdx, 1)
          projectiles.splice(projectileIdx, 1)
        }
      }
      //? really cool uncomment below and comment out the setInterval to see the distance changing for one projectile
      // console.log(dist)
    }
  }
}

function shoot({ x, y }) {
  if (game.active) {
    //! finding angle of right angle formed of where clicked
    const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2)

    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5
    }

    //!whenever we click that is when we generate a new particle and push it to the particles array
    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
    audio.shoot.play()
  }
}

window.addEventListener("click", (event) => {
  if(!audio.background.playing()){
    audio.background.play()
  }
  shoot({ x: event.clientX, y: event.clientY })
})

//!mobile event listener
window.addEventListener('touchstart', (event) => {
  if(!audio.background.playing()){
    audio.background.play()
  }
  const x = event.touches[0].clientX
  const y = event.touches[0].clientY
  shoot({ x, y })
})

//restart game
buttonEl.addEventListener('click', () => {
  audio.select.play()
  init()
  animate()
  spawnEnemies()

  gsap.to('#modalEl', {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: 'expo.in',
    onComplete: () => {
      modalEl.style.display = 'none'
    }
  })
})

//start game
startButtonEl.addEventListener('click', () => {
  audio.select.play()
  init()
  animate()
  spawnEnemies()

  gsap.to('#startEl', {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: 'expo.in',
    onComplete: () => {
      startEl.style.display = 'none'
    }
  })
})

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})
