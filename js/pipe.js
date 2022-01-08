(function (fb) {
    //构造管道函数
    function Pipe(ctx, pipebot, pipetop, x) {
        this.ctx = ctx
        this.pipebot = pipebot
        this.pipetop = pipetop
        this.pipeWidth = pipetop.width
        this.pipeHeight = pipetop.height
        this.x = x+1400//给小鸟留出距离
        this.space=200
        this.speed=3
        this.initY()//管道实例化的时候调用一次给对象里保存一个随机坐标
    }

    Pipe.prototype.draw = function () {
      this.ctx.drawImage(this.pipetop,this.x,this.topy)
      this.ctx.drawImage(this.pipebot,this.x,this.boty)
        //沿着管道绘制轨迹
      this.ctx.rect(this.x,this.topy,this.pipeWidth,this.pipeHeight)
      this.ctx.rect(this.x,this.boty,this.pipeWidth,this.pipeHeight)

        this.x-=this.speed
        if(this.x<-this.pipeWidth){
            this.x+=6*3*this.pipeWidth
        }
    }

    Pipe.prototype.initY = function () {
        var randomH=80*Math.random()
        var minH=140
        var topH=randomH+minH
        this.topy=-this.pipeHeight+topH
        this.boty=this.space+topH
    }
    fb.Pipe=Pipe
})(FB)