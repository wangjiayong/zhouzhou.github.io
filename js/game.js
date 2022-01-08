/*游戏组织者game，只要是游戏都用游戏组织者更语义化*/
(function (fb) {
    //构造游戏组织者
    function Game() {
        this.ctx = document.querySelector('canvas').getContext('2d')
        /*通过变量监听游戏规则*/
        this.running=true
    }

    Game.prototype.init = function () {
        this.gameStart()
    }
    Game.prototype.gameStart = function () { //用来实例化所有资源的方法
        var that = this
        var loadSource = new fb.Loadsource()
        loadSource.load(function (imglist) {
            //把加载完成的图片对象拿来传入各个对象绘制到画布上
            /*由于图片绘制到画布上有层级关系，后绘制的覆盖先绘制上去的*/
            var flyObj=[]
            //1所以先实例化天空对象
            var skyimg = imglist.sky
            //var sky1 = new fb.Sky(that.ctx, skyimg, 0 * skyimg.width)
            //var sky2 = new fb.Sky(that.ctx, skyimg, 1 * skyimg.width)

            for(var i=0;i<2;i++){
                flyObj.push(new fb.Sky(that.ctx, skyimg, i * skyimg.width))
            }
            //2实例化管道对象
            var pipebot = imglist.pipe1
            var pipetop = imglist.pipe2
            //var pipe1 = new fb.Pipe(that.ctx, pipebot, pipetop, 0*3*pipebot.width)
            //var pipe2 = new fb.Pipe(that.ctx, pipebot, pipetop, 1*3*pipebot.width)
            //var pipe3 = new fb.Pipe(that.ctx, pipebot, pipetop, 2*3*pipebot.width)
            //var pipe4 = new fb.Pipe(that.ctx, pipebot, pipetop, 3*3*pipebot.width)
            //var pipe5 = new fb.Pipe(that.ctx, pipebot, pipetop, 4*3*pipebot.width)
            //var pipe6 = new fb.Pipe(that.ctx, pipebot, pipetop, 5*3*pipebot.width)

            for(var i=0;i<6;i++){
                flyObj.push(new fb.Pipe(that.ctx, pipebot, pipetop, i*3*pipebot.width))
            }
            // 3实例化陆地对象
            var landimg = imglist.land
            //var land1 = new fb.Land(that.ctx, landimg, 0 * landimg.width)
            //var land2 = new fb.Land(that.ctx, landimg, 1 * landimg.width)
            //var land3 = new fb.Land(that.ctx, landimg, 2 * landimg.width)
            //var land4 = new fb.Land(that.ctx, landimg, 3 * landimg.width)
            for(var i=0;i<4;i++){
                flyObj.push(new fb.Land(that.ctx, landimg, i * landimg.width))
            }
            // 4实例化小鸟对象
            var birdimg = imglist.birds
            var bird = new fb.Bird(that.ctx, birdimg)
            flyObj.push(bird)
            var animate = function () {//由于绘制一次不会运动，进行重复多次的调用绘制产生动画效果
                that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height)//绘制前先清空画布
                that.ctx.beginPath()/*每次调用方法绘制轨迹都开启新路径让每次绘制都只是绘制了当前路径，不开启新路径的话调用了多少次就绘制了多少轨迹*/
                //sky1.draw()
                //sky2.draw()
                //pipe1.draw()
                //pipe2.draw()
                //pipe3.draw()
                //pipe4.draw()
                //pipe5.draw()
                //pipe6.draw()
                //land1.draw()
                //land2.draw()
                //land3.draw()
                //land4.draw()
                //bird.draw()//从天空到小鸟依次渲染
                flyObj.forEach(function(item){
                    item.draw()
                })
                /*是游戏就有规则*/
                //碰撞地面
                if (bird.y>that.ctx.canvas.height-landimg.height-20){
                    that.gameOver()
                }
                //碰撞顶部
                if (bird.y<10){
                    that.gameOver()
                }
                //碰撞管道(沿着管道绘制轨迹通过canvas内置函数来监听是否与轨迹有交点)
                //isPointInPath(bird.x,bird.y)如果bird.x,bird.y这个点是在画布的某个轨迹里面（这里的轨迹包括canvas里面所有的轨迹）那么返回true
                if (that.ctx.isPointInPath(bird.x,bird.y)){
                    that.gameOver()
                }
                if (that.running){
                    requestAnimationFrame(animate)
                }
            }
            animate()
        })

    }
    Game.prototype.gameOver = function () {
        this.running=false
        alert('小蜜蜂你把小鸟玩死了，～～')
        location.reload()
    }
    fb.Game = Game
})(FB)
