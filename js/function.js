//图像加载器
var imageLoader = {
    loaded: true,
    loadedImages: 0,
    totalImages: 0,
    load: function(url) {
        this.totalImages++;
        this.loaded = false;
        var image = new Image();
        image.src = url;
        image.onload = function() {
            imageLoader.loadedImages++;
            if (imageLoader.loadedImages === imageLoader.totalImages) {
                imageLoader.loaded = true;
            }
        }
        return image;
    }
}

/* 这个图片加载器可用来加载大量的图片（如在一个循环中）。imageLoader.loaded属性表示是否所有的图片都被加载了，计算
loadedImages/totalImages的值，可以绘制一个百分比条或者进度条。 */