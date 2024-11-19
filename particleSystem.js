// @size is a object including particle's Size => size = {x: value, y: value};
// @spawnSpeed minimum value must bigger then 20 millisecond. Because 20 ms is the main thread's frame speed right now.


const particles = [];


function CreateParticle(x, y, size, count, lifeTime, color, canvas){

  for (let index = 0; index < count; index++) {
    const newParticle = new particleCore(x, y, size, color, canvas, lifeTime);
    newParticle.speed.x = Math.random() < .5 ? -1 : 1;
    newParticle.speed.y = Math.random() < .5 ? -1 : 1;
    particles.push(newParticle);
  }
}
//rendering particles;
function renderParticles(){
  setInterval(()=>{
    particles.forEach((item) =>{
      if(item === null | undefined) return;
      item.update();
    });
  }, 20);
}

function particleCore(x, y, size, color, canvas, lifeTime){
  this.position = new Vector2(x, y);
  this.velocity2D = {x: 0, y: 0};
  this.speed = {x: 0, y: 0};
  this.size = size;
  this.ctx = canvas.getContext('2d');

  this.outOfCanvas = () =>{
    if (this.position.x + this.width >= canvas.width || this.position.x <= 0 || this.position.y <= 0 || this.position.y + this.height >= canvas.height ) {
      console.log("It is out side of the canvas");
      return true;
    }
    return false;
  }

  this.start = ()=>{
    setTimeout(()=>{
      this.kill();
    }, lifeTime)
    this.render();
  }

  this.update = ()=>{
    particles.forEach(particle => {
      if (particle.outOfCanvas()) {
        RemoveArrayElement(particles, particle);
      }
    });
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.render();
  }

  this.end = ()=>{
    this.render();
  }
  this.kill = ()=>{
    this.clear();
  }
  this.clear = ()=>{
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  this.render = () =>{
    ctx.fillStyle = color;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}