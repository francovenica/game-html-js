var enemigo = {
    x: (Math.random() *400) + 40,
    y: 1,
    ancho : 14,
    alto : 15,
    nombre: "enemigo",
    
    actualizar: function(){
        this.y++;
        
        if(this.y > 480){
            this.y = -20;
            this.x = (Math.random() *400) + 40;
        }
    },
    
    dibujar: function (ctx){
        ctx.drawImage(spriteSheet, 5,200,14,15,this.x,this.y,14,15);
    },
    
    impacto: function(){
        this.y = -20;
        this.x = (Math.random() *400) + 40;
    }
};
