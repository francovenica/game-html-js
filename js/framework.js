var framework = {
    ultimoCuadro: 0,
    tiempoAcumulado: 0,
    ctx: null,
    canvas : null,
    objetosDeJuego: [],
    
    iniciar: function (){
      var self = this;  
      
      this.canvas = document.getElementById("miCanvas");
      this.ctx = this.canvas.getContext("2d");
      window.obtenerCuadroAnimacion = (function () {
        return window.requestAnimagionFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element){
                    window.setTimeout(self.buclePrincipal, 1000/60);
        };
      })();
      obtenerCuadroAnimacion(self.buclePrincipal());
    },
    
    buclePrincipal: function() {
        
        var esteCuadro = new Date().getTime(),
                delta = (esteCuadro - framework.ultimoCuadro) / 1000;
        framework.ultimoCuadro = esteCuadro;
        framework.tiempoAcumulado += delta;
        framework.ctx.fillStyle = "white";
        framework.ctx.fillRect(0,0,640,480);
        
        for ( var i = 0; i < framework.objetosDeJuego.length ; i++){
            framework.objetosDeJuego[i].actualizar(delta);
            framework.objetosDeJuego[i].dibujar(framework.ctx);
        }
        obtenerCuadroAnimacion(framework.buclePrincipal);
    }
};
