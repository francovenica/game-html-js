var bala = {
    x: 0,
    y: 0,
    ancho: 17,
    alto:12,
    nombre:"bala",
    visible: false,
    velocidad: 2,
    
    actualizar: function(delta){
        this.y -= this.velocidad;
        if (this.y + this.alto < 0){
            this.visible = false;
        }
        for (var i = 0; i < framework.objetosDeJuego.length ; i++){
            if (framework.objetosDeJuego[i].nombre === "enemigo"){
                if (this.choca(framework.objetosDeJuego[i])){
                    this.visible = false;
                    framework.objetosDeJuego[i].impacto(); //choque bala con enemigo
                    break;
                }
            }
        }
    },
    
    dibujar: function(ctx){
        if (this.visible)
        {
            ctx.drawImage(spriteSheet, 140,82,17,12,this.x,this.y,this.ancho,this.alto);
        }
    },
    
    choca: function (enemigo){
        if (this.x + this.ancho < enemigo.x)
            return false;
        if (this.y + this.alto < enemigo.y)
            return false;
        if (this.x > enemigo.x + enemigo.ancho)
            return false;
        if (this.y > enemigo.y + enemigo.alto)
            return false;
        return true;
    }
};