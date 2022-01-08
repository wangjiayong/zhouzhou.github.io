(function (fb) {
    //构造小鸟函数
    function Bird(ctx, birdimg) {
        this.ctx = ctx
        this.birdImg = birdimg
        this.index = 0
        this.birdWidth = birdimg.width / 3
        this.birdHeight = birdimg.height
        this.x = 100
        this.y = 100
        /*监听小鸟自由落体的变量*/
        this.v0 = 0
        this.startTime = Date.now()
        this.a = 0.0005
        /*监听小鸟选旋转的变量*/
        this.maxSpeed = 0.5
        this.maxAngle = Math.PI / 4
        this.init()//在小鸟实例化的时候就给画布添加上点击事件
    }

    Bird.prototype.draw = function () {
        var currentTime = Date.now()
        var deltaTime = currentTime - this.startTime
        this.startTime = currentTime
        var s = this.v0 * deltaTime + this.a * deltaTime * deltaTime / 2
        this.y += s
        var angle = this.v0 / this.maxSpeed * this.maxAngle
        if (angle > this.maxAngle) {
            angle = this.maxAngle
        }
        this.v0 += this.a * deltaTime
        this.ctx.save()
        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(angle)
        this.ctx.drawImage(
            this.birdImg,//图片对象
            this.index * this.birdWidth,
            0,//容器中的坐标
            this.birdWidth,
            this.birdHeight,//截取图片宽高
            -this.birdWidth / 2,
            -this.birdHeight / 2,//容器在canvas中的坐标
            this.birdWidth,
            this.birdHeight//容器的大小
        )
        this.ctx.restore()
        //让小鸟飞
        this.index++
        if (this.index > 2) {
            this.index = 0
        }
    }
    Bird.prototype.init=function(){
        var that=this
        this.ctx.canvas.onclick=function(){
            that.v0=-0.3
        }
    }
    fb.Bird = Bird
})(FB)