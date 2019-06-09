var mouse = {
    x:0,
    y:0,
    
    clickMouse: function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    },
    
    iniciar: function (){
        framework.canvas.addEventListener("click",this.clickMouse,false);
    }
};
