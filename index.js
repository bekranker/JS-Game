const renderElements = [];
const bullets = [];
const enemies = [];
const speedMultipiler = 5;
let player;


const gameArea = {
  canvas: document.createElement('canvas'),
  start: function (){
    this.canvas.width = 500;
    this.canvas.height = 800;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    document.body.childNodes[0].className = 'canvas-2';
    this.interval = setInterval(update, 20);
    spawnEnemy();
  },
  clear: function(){this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);},
  stop: ()=>{clearInterval(this.interval)},
}

//all object must take this
function component(x, y, width, height, color, isTrigger){
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.width = width;
  this.height = height;
  this.color = color;
  this.clear = ()=>{
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
  this.update = () =>{
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = () =>{
    if (!this.collide()) {
      this.x += this.speedX * speedMultipiler;
      this.y += this.speedY * speedMultipiler;
    }
    
  }
  // just game area collide checking in it.
  this.collide = ()=>{
    if(isTrigger) return false;
    if (this.x + this.speedX <= 0 || 
        this.y + this.speedY <= 0  ||
        this.x + this.width + this.speedX >= gameArea.canvas.width || this.y + this.height + this.speedY >= gameArea.canvas.height
    ) {
      return true
    }
    return false;
  }
  //colliding with gived object return Boolean
  this.collideOther = (otherObject)=>{
    if (this.x + this.width + this.speedX >= otherObject.x + otherObject.speedX &&
        this.x + this.speedX <= otherObject.x + otherObject.width + otherObject.speedX &&
        this.y + this.height + this.speedY >= otherObject.y + otherObject.speedY &&
        this.y + this.speedY <= otherObject.y + otherObject.height + otherObject.speedY
    ) {
      return true;
    }
  }
}

function StartGame(){
  gameArea.start();
  player = new component(gameArea.canvas.width / 2, 700, 50, 50, 'red');
  renderElements.push(player);
}
function spawnEnemy(){
  setInterval(()=>{
    let enemy = new component(RandomNumber(20, gameArea.canvas.width - 20), 20, 20, 20, 'green', true);
    enemy.speedY = .5;
    renderElements.push(enemy);
    enemies.push(enemy);
  }, 2000);
}
function spawnBullet (){
  let bullet = new component(player.x + (player.width / 2), player.y, 10, 10, 'yellow', true);
  bullet.speedY = -4;
  bullets.push(bullet);
  renderElements.push(bullet);
}

//moving
window.addEventListener('keydown', (e)=>{
  switch (e.key) {
    case 'a':
      player.speedX = -1;
      break;
    case 'd':
      player.speedX = 1;
      break;
    default:
      break;
  }
})
//shooting
window.addEventListener('click', ()=>{
  spawnBullet();
})

//Updating all renderElements
function update(){
  gameArea.clear();
  renderElements.map((item)=>{{
    item.newPos();
    item.update();
  }});
  enemies.forEach((enemy)=>{
    bullets.forEach((bullet) =>{
      if (enemy.collideOther(bullet)) {
        CreateParticle(bullet.x, bullet.y, {x: 5, y: 5}, 20, 1, 'white', gameArea.canvas, 20);
        RemoveArrayElement(renderElements, enemy);
        RemoveArrayElement(renderElements, bullet);
        RemoveArrayElement(enemies, enemy);
        RemoveArrayElement(bullets, bullet);
      }
    });
  });
}

