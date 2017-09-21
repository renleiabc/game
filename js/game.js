/**
 * Created by renleilei on 17-9-15.
 */
var game = {
    //开始初始化对象，予加载资源，并显示开始的画面
    init: function () {
        //初始化对象
        levels.init();
        loader.init();
        //隐藏所有的游戏图层，显示开始画面
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //获取游戏画布及其绘图环境的引用
        game.canvas = $("#gamecanvas")[0];
        game.context = game.canvas.getContext('2d');
    },
    //在game对象中创建简单的game.showLevelScreen()
    // 方法用来隐藏主菜单，显示关卡界面
    showLevelScreen: function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    }
}
/*简单的关卡对象，包含关卡数据与函数*/
var levels = {
    //关卡数据
    data: [
        {//第一关
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {//第二关
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
    ],
    //初始化关卡选择画面
    init: function () {
        var html = "";
        for (var i = 0; i < levels.data.length; i++) {
            var level = levels.data[i];
            html += '<input type="button" value = "' + (i + 1) + '">';

        }
        $('#levelselectscreen').html(html);
        //单击按钮时加载关卡
        $("#levelselectscreen input").click(function () {
            console.log(this.value - 1);
            levels.load(this.value - 1);
            $('#levelselectscreen').hide();
        });
    },
    //为某一关加载所有的数据和图像
    load: function (number) {
        //声明一个新的当前关卡对象
        game.currentLevel = {number:number,hero:[]};
        game.score = 0;
        $('#score').html('Score:'+game.score);
        var level = levels.data[number];
        //加载背景、前景和弹弓图像
        game.currentLevel.backgroundImage =
            loader.loadImage('../images/backgrounds/'+level.background+'.png');
        game.currentLevel.foregroundImage =
            loader.loadImage('../images/backgrounds/'+level.foreground+'.png');
        game.slingshotImage = loader.loadImage('../images/slingshot.png');
        game.slingshotFrontImage = loader.loadImage("../images/slingshot-front.png");
        //一旦所有的图像加载完成，就调用game.strart()函数
        if(loader.loaded){
            game.start();
        }else{
            loader.onload = game.start;
        }

    }
}
/*图像/声音资源加载器loader*/
var loader = {
    loaded: true,
    loadedCount: 0,//已加载的资源数
    totalCound: 0,//需要被加载的资源总数
    init: function () {
        //检查浏览器支持的声音格式
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if (audio.canPlayType) {
            //当前canPlayType()方法返回""、"maybe"或"probably"
            mp3Support = "" != audio.canPlayType('audio/mpeg');
            oggSupport = "" != audio.canPlayType('audio/ogg;');
        } else {
            //audio标签不被支持
            mp3Support = false;
            oggSupport = false;
        }
        //检查ogg、mp3，如果都不支持，就将soudFileExtn这值为undefine;
        loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },
    loadImage: function (url) {
        this.totalCound++;
        this.loaded = false;
        $("#loadingscreen").show();
        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },
    soundFileExtn: '.ogg',
    loadSound: function (url) {
        this.totalCound++;
        this.loaded = false;
        $("#loadingscreen").show();
        var audio = new Audio();
        audio.src = url + loader.soundFileExtn;
        audio.addEventListener('canplaythrough', loader.itemLoaded, false);
        return audio;
    },
    itemLoaded: function () {
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded' + loader.loadedCount + 'of' + loader.totalCound);
        if (loader.loadedCount === loader.totalCound) {
            //loader完成了资源加载
            //Hide the loading screen
            $("#loadingscreen").hide();
            //如果loader.onload事件有响应函数，调用之
            if (loader.onload) {
                loader.onload();
                loader.onload = undefined;
            }
        }
    }
}
/*使用load()事件安全的调用game.init()方法*/
$(window).load(function () {
    game.init();
})
