(function(fb){
    //构造陆地函数
    function Land(ctx,landimg,x){
        this.ctx=ctx
        this.landImg=landimg
        this.landWidth=landimg.width
        this.landHeight=landimg.height
        this.x=x
        this.speed=3
    }
    Land.prototype.draw=function(){
        this.ctx.drawImage(this.landImg,this.x,this.ctx.canvas.height-this.landHeight)
        this.x-=this.speed
        if (this.x<-this.landWidth){
            this.x+=4*this.landWidth
        }
    }
    fb.Land=Land
})(FB)