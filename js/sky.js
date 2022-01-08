(function(fb){
    //构造天空函数
    function Sky(ctx,skyimg,x){
        this.ctx=ctx
        this.x=x||0
        this.skyimg=skyimg
        this.speed=3
    }
    Sky.prototype.draw=function(){
        this.ctx.drawImage(this.skyimg,this.x,0)
        this.x-=this.speed
        if (this.x<-this.skyimg.width){
            this.x+=2*this.skyimg.width
        }
    }
    fb.Sky=Sky
})(FB)