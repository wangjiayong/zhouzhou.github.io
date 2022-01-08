/*这是暴露给全局的变量*/
(function (window) {
    window.FB = {}//只允许暴露一个变量给全局
//游戏的开始需要加载资源（图片），首先构造一个加载资源的函数并且只是负责加载资源
    function Loadsource() {
        //把图片信息放入对象中
        this.paths = ['birds', 'land', 'pipe1', 'pipe2', 'sky']
        this.pic = 'images/'
        this.fix = '.png'
    }

    Loadsource.prototype.load = function (callback) {
        var that = this
        var num = 0
        var times = this.paths.length
        var imglist = {}
        this.paths.forEach(function (item, i) {
            var image = new Image()//创建图片标签
            image.onload = function () {
                num++
                imglist[item] = image//把当前的图片dom对象添加到新的对象中
                if (num == times) {
                    //此时imglist里面保存的是加载完成的5个图片dom对象
                    callback && callback(imglist)//通过回调函数在game里来操作每一个图片对象
                }
            }
            image.src = that.pic + item + that.fix//执行这句代码就会触发加载事件
        })
    }
    FB.Loadsource = Loadsource//把所有的对象挂载到FB上面
})(window)