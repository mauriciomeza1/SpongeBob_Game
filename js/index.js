const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
let frames = 0
const imageEnemies = ["assets/images/enemies/jelly.gif"]
const enemies = []
let requestId = undefined


class Background{
    constructor() {
        //Propiedades
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "assets/images/background5.png"
    }

    //Métodos
    draw() {
        this.x --;
        if(this.x <-canvas.width) {
            this.x = 0; //si ya te saliste del canvas, regresa a 0
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        //colocamos una segunda imagen
        ctx.drawImage(
            this.image,
            this.x + this.width, //con esto imagen se colocara una despues de la otra
            this.y,
            this.width,
            this.height
        )
    }

    gameOver() {
        ctx.font="80px Arial";
        ctx.fillText("GAME OVER", 150, 150)
    }
}


class Character{
    constructor(x,y,w,h,img){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = img;
    }
    //metodos
    draw() {
        if(frames % 10 === 0){
            this.x -=5;
        }
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(item) {
        return (
            this.x < item.x + item.width &&
            this.x + this.width  > item.x &&        
            this.y < item.y + item.height &&        
            this.y + this.height > item.y           
        )
    }
}


class Bob extends Character{     
    constructor(x,y,w,h){
        super(x,y,w,h)
        this.bobWalk1 = new Image()
        this.bobWalk1.src = "assets/images/bob/bobWalk/bobWalk1.png"
        this.bobWalk2 = new Image()
        this.bobWalk2.src = "assets/images/bob/bobWalk/bobWalk2.png"
        this.bobWalk3 = new Image()
        this.bobWalk3.src = "assets/images/bob/bobWalk/bobWalk3.png"
        this.bobWalk4 = new Image()
        this.bobWalk4.src = "assets/images/bob/bobWalk/bobWalk4.png"
        this.bobWalk5 = new Image()
        this.bobWalk5.src = "assets/images/bob/bobWalk/bobWalk5.png"
        this.bobWalk6 = new Image()
        this.bobWalk6.src = "assets/images/bob/bobWalk/bobWalk6.png"

        this.image = this.bobWalk1 
        this.jump = false
    }

    draw() {
        if (frames % 10 === 0){
            if (this.image === this.bobWalk1) {
                this.image = this.bobWalk2
            }else if (this.image === this.bobWalk2) {
                this.image = this.bobWalk3
            }else if (this.image === this.bobWalk3) {
                this.image = this.bobWalk4
            }else if (this.image === this.bobWalk4) {
                this.image = this.bobWalk5
            }else if (this.image === this.bobWalk5) {
                this.image = this.bobWalk6
            }else if (this.image === this.bobWalk6) {
                this.image = this.bobWalk1
            }
        }  
        if (this.jump){
            this.y+=5;
            if(this.y >= 470) {
                this.y = 470
                this.jump = 470
            }
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

class Enemy extends Character{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img)
    }
}

class Enemy2 extends Character{
    constructor(x,y,w,h,img){
        super(x,y,w,h,img)
        this.plankton1 = new Image()
        this.plankton1.src = "assets/images/enemies/plankton/Plank1.png"
        this.plankton2 = new Image()
        this.plankton2.src = "assets/images/enemies/plankton/Plank2.png"
        this.plankton3 = new Image()
        this.plankton3.src = "assets/images/enemies/plankton/Plank3.png"
        this.plankton4 = new Image()
        this.plankton4.src = "assets/images/enemies/plankton/Plank4.png"
        this.plankton5 = new Image()
        this.plankton5.src = "assets/images/enemies/plankton/Plank5.png"
        this.plankton6 = new Image()
        this.plankton6.src = "assets/images/enemies/plankton/Plank6.png"

        this.image2 = this.plankton1
    }

    draw() {
        if (frames % 10 === 0){
            if (this.image2 === this.plankton1) {
                this.image2 = this.plankton2
            }else if (this.image2 === this.plankton2) {
                this.image2 = this.plankton3
            }else if (this.image2 === this.plankton3) {
                this.image2 = this.plankton4
            }else if (this.image2 === this.plankton4) {
                this.image2 = this.plankton5
            }else if (this.image2 === this.plankton5) {
                this.image2 = this.plankton6
            }else if (this.image2 === this.plankton6) {
                this.image2 = this.plankton1
            }
        }
        ctx.drawImage(this.image2, this.x, this.y, this.width, this.height)
    }
}     



const fondo = new Background()
const bob = new Bob(100, 470,150,150)
const plank = new Enemy2()



//functions
function updateCanvas() {
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height) 
    fondo.draw()
    bob.draw()
    
    generareEnemies()
    drawEnemies()

    if(requestId){
        requestId = requestAnimationFrame(updateCanvas)
    }
}

function generareEnemies(){
    //En qué intervalo de tiempo quiero que se genere un enemigo
    if(frames % 231 === 120){
        let y = Math.floor(Math.random() * (288 - 10) + 10);
        const enemy = new Enemy(canvas.width, y, 50, 50, imageEnemies)
        enemies.push(enemy)
    }
}

function drawEnemies(){
    //Iteramos en el arreglo enemies para poder utilizar el .draw de cada enemigo
    enemies.forEach((enemy, index_enemy) => {
        enemy.draw()

        //Hacer collision
        if(bob.collision(enemy)){
            requestId = undefined
            fondo.gameOver()
        }
        //Eliminar al enemigo si se sale del canvas y evitar crash
        if (enemy.x + enemy.width <= 0){
            enemies.splice(index_enemy,1)
        }
    })       
}



function startGame(){
    requestId = requestAnimationFrame(updateCanvas)
}

startGame()

//Mover Bob
addEventListener("keydown",(event)=>{
    //izq
    if(event.keyCode === 37) {
        bob.x-= 20
    }
    //derecha
    if(event.keyCode === 39) {
        bob.x+= 20
    }
    //salto
    if(event.keyCode === 38) {
        bob.y -=60
        bob.jump = true
    }
})

