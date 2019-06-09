var avion = {
    posiciones: [{x:134, y:6, ancho:24, alto:16},
    {x:70, y:6, ancho:24, alto:16},
    {x:38, y:6, ancho:24, alto:16},
    {x:101, y:6, ancho:24, alto:16},
    {x:166, y:6, ancho:24, alto:16}],
    indiceAnimacion: 0, 
    velocidadMovimiento: 20,
    x:10,
    y:10,
    objetivoX: 0,
    objetivoY: 0,
    tiempoAcumulado: 0,
    tiempoAcumuladoDisparo : 0,
    
    actualizarConTeclas: function(){
        if (teclado.teclasPresionadas["65"]){
        this.x-=3;
            if (this.indiceAnimacion > 0 && this.tiempoAcumulado > 0.5){
            this.tiempoAcumulado = 0;
            this.indiceAnimacion--;
            }
        }
        if (teclado.teclasPresionadas["68"]){
            this.x+=3;
                if (this.indiceAnimacion < 4 && this.tiempoAcumulado > 0.5){
                this.tiempoAcumulado = 0;
                this.indiceAnimacion++;

            }
        }
        if (teclado.teclasPresionadas["83"]){
            this.y+=3;
        }
        if (teclado.teclasPresionadas["87"]){
            this.y-=3;
        }
        if (!teclado.teclasPresionadas["65"] && !teclado.teclasPresionadas["68"]){
            if (this.indiceAnimacion !==2 && this.tiempoAcumulado > 0.25){
                this.tiempoAcumulado = 0;
                this.indiceAnimacion -= this.indiceAnimacion > 2 ? 1: -1;
            }
        }
    },
    
    actualizarConMouse: function(){
        this.x += (mouse.x - this.x) / this.velocidadMovimiento;
        this.y += (mouse.y - this.y) / this.velocidadMovimiento;
    },
    
    actualizar: function(delta){
        this.tiempoAcumulado +=delta;
        this.tiempoAcumuladoDisparo += delta;
        this.actualizarConMouse();
        this.disparar();
        this.imagenActual = this.posiciones[this.indiceAnimacion];
    },
    
    dibujar: function(ctx){
        ctx.drawImage(spriteSheet, this.imagenActual.x, this.imagenActual.y,25,16,this.x, this.y, 25,16);
    },
    
    disparar: function(){
        if (this.tiempoAcumuladoDisparo > 0.5){
            this.tiempoAcumuladoDisparo = 0;
            
            for (var i = 0; i < framework.objetosDeJuego.length; i++ ){
                if (framework.objetosDeJuego[i].nombre === "bala" && !framework.objetosDeJuego[i].visible){
                    framework.objetosDeJuego[i].x = this.x + 3;
                    framework.objetosDeJuego[i].y = this.y - 10;
                    framework.objetosDeJuego[i].visible = true;
                    break;
                }
            }
        }
    }
};