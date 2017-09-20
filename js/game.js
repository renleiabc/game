/**
 * Created by renleilei on 17-9-15.
 */
var game = {
    //开始初始化对象，予加载资源，并显示开始的画面
    init:function () {
        //隐藏所有的游戏图层，显示开始画面
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //获取游戏画布及其绘图环境的引用
        game.canvas = $("#gamecanvas")[0];
        game.context = game.canvas.getContext('2d');
    }
}
//wolaole大赛大第三
function daad() {
    
}
/*使用load()事件安全的调用game.init()方法*/
$(window).load(function () {
    game.init();
})
