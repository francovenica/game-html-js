document.addEventListener("keydown", teclaPresionada, false);
document.addEventListener("keyup", teclaNoPresionada, false); 

var canvas = document.getElementById("miCanvas");
var c = canvas.getContext("2d");


var spriteSheet = new Image();
var x = 10; var y = 10;
var sizex = 32 ; var sizey=16; var aux = 1;
spriteSheet.src = "images/1942.png";
spriteSheet.onload = function(){
    setInterval(actualizarJuego, 1000/33);
};

//Mouse position debugger
//report the mouse position on click
/*
canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    console.log(mousePos.x + ',' + mousePos.y);
}, false);

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}*/
//mouse position debugger

canvas.addEventListener("click",clickMouse,false);

function clickMouse(event){
    x = event.x - sizex;
    y = event.y - sizey;
}

var posiciones = [
    {x:134, y:6, ancho:24, alto:16},
    {x:70, y:6, ancho:24, alto:16},
    {x:38, y:6, ancho:24, alto:16},
    {x:101, y:6, ancho:24, alto:16},
    {x:166, y:6, ancho:24, alto:16}],
    estaMoviendo = false,
    indiceAnimacion = 0,
    ultimoCuadro = new Date().getTime(),
    tiempoAcumulado = 0;

//movemos al personaje

var teclasPresionadas = {
    "65":false,
    "83":false,
    "68":false,
    "87":false
};

function teclaNoPresionada(event){
    var tecla = event.keyCode;
    teclasPresionadas[tecla] = false;
}

function teclaPresionada (event){
    var tecla = event.keyCode;
    teclasPresionadas[tecla]=true;
};

function apretandoTeclas(){
    if (teclasPresionadas["65"] && x > 0 ){
        x-=3;
            if (indiceAnimacion > 0 && tiempoAcumulado > 0.5){
            tiempoAcumulado = 0;
            indiceAnimacion--;
        }
    }
    if (teclasPresionadas["68"] && x < 570){
        x+=3;
            if (indiceAnimacion < 4 && tiempoAcumulado > 0.5){
            tiempoAcumulado = 0;
                indiceAnimacion++;
            
        }
    }
    if (teclasPresionadas["83"] && y < 410){
        y+=3;
    }
    if (teclasPresionadas["87"] && y > 0){
        y-=3;
    }
    if (!teclasPresionadas["65"] && !teclasPresionadas["68"]){
        if (indiceAnimacion !==2 && tiempoAcumulado > 0.25){
            tiempoAcumulado = 0;
            indiceAnimacion -= indiceAnimacion > 2 ? 1: -1;
        }
    }
}


//javascript enemigo
var enemigo = function(){
  var x = (Math.random()*400) + 40, y = -20;
  var size = 2;

  this.actualizar = function(){
      y+=3;
      if ( y > 480){
          y = 1;
          x = Math.floor(Math.random()*500);
      }
  };
  
  this.dibujar = function(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(x,y-3,15*size,16*size);
    ctx.drawImage(spriteSheet,5,200,16,15,x,y,14*size,15*size);
    
  };
  
  this.printe = function(){
      console.log("x = " + x + " y = " + y);
  };
};

//JSON enemigo
function crearEnemigo(){
      return{
          x : (Math.random()*400) + 40,
          y : 1,
          size: 2,
          actualizar: function(){
              this.y+=1;
              if ( this.y > 480){
             this.y = 1;
             this.x = (Math.random()*400) + 40;
            }
          },
          dibujar:function(ctx){
            ctx.fillStyle = "white";
            ctx.fillRect(this.x,this.y-3,15*2,16*2);
            ctx.drawImage(spriteSheet,5,200,16,15,this.x,this.y,14*2,15*2);
          }
      };
  }

var enemigos = [];

for ( var i = 0; i < 10 ; i++){
    enemigos.push(new crearEnemigo());
}

function actualizarJuego(){ 
    var esteCuadro = new Date().getTime(),
            delta = (esteCuadro - ultimoCuadro) / 1000;
    ultimoCuadro = esteCuadro;
    tiempoAcumulado += delta;
    
    apretandoTeclas();
    
    c.fillStyle="white";
    c.fillRect(x-4,y-3,sizex*2+6,sizey*2+6);
    var imagenActual = posiciones[indiceAnimacion];
    c.drawImage(spriteSheet,imagenActual.x,imagenActual.y,25,16,x,y,sizex*2,sizey*2);
    
    for ( var i = 0 ; i < enemigos.length ; i++){
    enemigos[i].actualizar();
    enemigos[i].dibujar(c);
    }
    console.log ("x = " + x + " Indice = " + indiceAnimacion);
    //miEnemigo.printe(c);
}

var test = function (){
    console.log("this function is just to test Git in netbeans");
};
// editing this stash