
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
    ctx.fill()
  }
}

const player = new Player(100,100, 30, 'blue')
player.draw()