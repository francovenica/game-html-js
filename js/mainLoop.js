document.addEventListener("keydown", teclaPresionada, false);
document.addEventListener("keyup", teclaNoPresionada, false); 

var canvas = document.getElementById("miCanvas");
var c = canvas.getContext("2d");


var spriteSheet = new Image();
var x = 10; var y = 10;
var sizex = 32 ; var sizey=16; var aux = 1;
spriteSheet.src = "images/1942.png";
spriteSheet.onload = function(){
    obtenerCuadroAnimacion(actualizarJuego);
};

window.obtenerCuadroAnimacion = ( function (){
    return window.requestAnimagionFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element){
                window.setTimeout(actualizarJuego, 1000/60);
    };           
})();

canvas.addEventListener("click",mouseAction,false);
canvas.addEventListener("mousemove", mouseAction, false);

function mouseAction(event){
    objx = event.x;
    objy = event.y;
}

var posiciones = [
    {x:134, y:6, ancho:24, alto:16},
    {x:70, y:6, ancho:24, alto:16},
    {x:38, y:6, ancho:24, alto:16},
    {x:101, y:6, ancho:24, alto:16},
    {x:166, y:6, ancho:24, alto:16}],
    velocidadMov=20,
    objx = 0,
    objy = 0,
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

function desplazarAvion(_x, _y){
    x+=(_x - x) / velocidadMov;
    y+=(_y - y) / velocidadMov;
}



var enemigos = [];

canvas.addEventListener("dblclick",EnemySpawn,false);


function EnemySpawn(event){
    enemigos.push(new crearEnemigo((Math.random()*400)+100, -20));
}


function mostrar(){
    for (var i = 0; arguments.length > i ; i++){
        console.log(arguments[i].name + " = " + arguments[i] + "\n");
    }
    
}

var fps = 0,
        fpsAcum = 0,
        fpsFinal = 0;

 /*for (i = 0; i < 1000 ; i ++)
       enemigos.push(new crearEnemigo((Math.random()*400)+40, 50));*/

function actualizarJuego(){ 
    var esteCuadro = new Date().getTime(),
            delta = (esteCuadro - ultimoCuadro) / 1000;

    ultimoCuadro = esteCuadro;
    tiempoAcumulado += delta;

    fpsAcum += delta;
    fps++;
    if ( fpsAcum >= 1){
        fpsFinal = fps;
        fps = 0;
        fpsAcum = 0;
    }
    
    apretandoTeclas();
    desplazarAvion(objx, objy);
    
    c.fillStyle="white";
    c.fillRect(0,0,640,480);
    c.strokeStyle = "black";
    c.strokeRect ( 0,0,640,480);
    var imagenActual = posiciones[indiceAnimacion];
    c.drawImage(spriteSheet,imagenActual.x,imagenActual.y,25,16,x,y,sizex*2,sizey*2);
   
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText("FPS: " + fpsFinal, 10 , 30);
    
   
    
    for ( var i = 0 ; i < enemigos.length ; i++){
    enemigos[i].actualizar();
    enemigos[i].dibujar(c,spriteSheet);
    }
    //miEnemigo.printe(c);
    obtenerCuadroAnimacion(actualizarJuego);
}



