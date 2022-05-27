
//! calling canvas API object 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
console.log(canvas)

class Player {
  //! constructor is called each time you instantiate a new version or instance of the player class
  constructor(x,y,radius,color){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2,false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Projectile{
  constructor(x,y, radius,color,velocity){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2,false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

//!dynamically calculate what x and y should be based on the width and size of the canvas
const x = canvas.width/2
const y = canvas.height/2

const player = new Player(x,y, 30, 'blue')
player.draw()

window.addEventListener("click",(event)=>{
  const projectile = new Projectile(event.clientX,event.clientY,5,'red',null)
  projectile.draw()
})