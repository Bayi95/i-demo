window.onload = function () {
    var main = document.getElementById("main");
    var ourPlane = new myPlane(66, 80, 50, 0, "img/myplane.gif", "img/myplaneBoom.gif");
    ourPlane.createPlane();
    //实例化 myPlane 函数  并执行函数创建  我的飞机
    var maxLeft = main.offsetWidth - ourPlane.sizeX;
    var maxTop = main.offsetHeight - ourPlane.sizeY;
    var mainLeft = main.offsetLeft;
    var mainTop = main.offsetTop;
    var mainHei = main.offsetHeight;
    var mainWid = main.offsetWidth;
    var oLeft, oTop;
   
    //声明变量
    main.onmouseover = function () {
        main.style.cursor = "none";
    }
    main.onmouseout = function () {
        main.style.cursor = "";
    }
    main.onmouseover=function(){
    	main.style.cursor="none";
    }
    main.onmouseout=function(){
    	main.style.cursor="";
    }
    //鼠标声明
    document.onmousemove = function (e) {
        ourPlane.planeNode.style.marginLeft = "";
        var e = e || window.event;
        oLeft = e.clientX - ourPlane.sizeX / 2 - mainLeft;
        oTop = e.clientY - ourPlane.sizeY / 2 - mainTop;
        if (oLeft <= 0) {
            oLeft = 0;
        } else if (oLeft >= maxLeft) {
            oLeft = maxLeft;
        }
        if (oTop <= 0) {
            oTop = 0;
        } else if (oTop >= maxTop) {
            oTop = maxTop;
        }
        ourPlane.planeNode.style.left = oLeft + "px";
        ourPlane.planeNode.style.top = oTop + "px";
    }
    //我的飞机的  移动事件 （位置 鼠标）边界判断
    document.onmousedown = function (e) {
        var e = e || window.event;
        //sizeX,sizeY,x,y,speed,imgSrc
        var newBullet = new Bullet(6, 14, oLeft + ourPlane.sizeX / 2 + 1, oTop - 14, 2, "img/bullet1.png");
        newBullet.createBullet();
        //实例化  子弹函数 创建子弹（起始）
        this.time = setInterval(function () {
            var newBullet = new Bullet(6, 14, oLeft + ourPlane.sizeX / 2 + 1, oTop - 14, 2, "img/bullet1.png");
            newBullet.createBullet();
        }, 200)
        //实例化  子弹函数 创建子弹（开始）
        e.preventDefault();
    }
    //按钮 鼠标点击射出子弹
    document.onmouseup = function () {
        clearInterval(this.time);
    }
//  关闭定时器 不生产子弹
    var sizexArr = [34, 46, 110];
    var sizeyArr = [24, 60, 164];
    var hpArr = [1, 3, 9];
    //敌人飞机大小 血量
    var imgSrcArr = ["img/enemy1_fly_1.png", "img/enemy2_fly_1.png", "img/enemy3_fly_1.png"];
    var boomSrcArr = ["img/smEnemyBoom.gif", "img/mdEnemyBoom.gif", "img/bigEnemyBoom.gif"];
    // 敌人飞机爆炸的图片 和 正常图片
    var time = setInterval(function () {
        for (var i = 0; i < getRan(2, 4); i++) {
            //sizeX,sizeY,x,y,hp,imgSrc,boomSrc,speed
            var ranNum = getRan(1, 13);
            //随机数  用来 产生不同飞机概率
            var sizeX, sizeY, x, y, hp, imgSrc, boomSrc, speed;
            if (ranNum == 13) {
            	//大飞机产生
                sizeX = sizexArr[2];
                sizeY = sizeyArr[2];
//				大小是第三个 的
                x = getRan(0, mainWid - sizeX);
                y = -sizeY;
//              位置的随机
                hp = hpArr[2];
                imgSrc = imgSrcArr[2];
                boomSrc = boomSrcArr[2];
                speed = getRan(1, 2);
//              外形 的 图片 爆炸的图片
            } else if (ranNum >= 9 && ranNum <= 12) {
                sizeX = sizexArr[1];
                sizeY = sizeyArr[1];
                x = getRan(0, mainWid - sizeX);
                y = -sizeY;
                hp = hpArr[1];
                imgSrc = imgSrcArr[1];
                boomSrc = boomSrcArr[1];
                speed = getRan(2, 3);
//              这是中等大小的飞机
            } else {
                sizeX = sizexArr[0];
                sizeY = sizeyArr[0];
                x = getRan(0, mainWid - sizeX);
                y = -sizeY;
                hp = hpArr[0];
                imgSrc = imgSrcArr[0];
                boomSrc = boomSrcArr[0];
                speed = getRan(3, 5);
//              小的飞机产生
            }
            var newEnemy = new enemy(sizeX, sizeY, x, y, hp, imgSrc, boomSrc, speed, mainHei);
            newEnemy.createEnemy();
            //传入参数 实例化  敌人飞机产生
        }
    }, 1000);
}

function getRan(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//-----------------------------------------------------------------------
function myPlane(sizeX, sizeY, x, y, imgSrc, boomSrc) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.boomSrc = boomSrc;
}
myPlane.prototype.createPlane = function () {
    this.planeNode = document.createElement("img");
    this.planeNode.src = this.imgSrc;
    this.planeNode.id = "myPlane";
    this.planeNode.style.position = "absolute";
    this.planeNode.style.left = this.x + "%";
    this.planeNode.style.bottom = this.y;
    this.planeNode.style.marginLeft = -this.sizeX / 2 + "px";
    main.appendChild(this.planeNode);
    this.planeNode.planeLife=true;
}
//产生我的飞机的函数 构造函数--》在上方实例化
//----------------------------------------------------------------------------
function Bullet(sizeX, sizeY, x, y, speed, imgSrc) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.imgSrc = imgSrc;
}
Bullet.prototype.createBullet = function () {
    this.bulletNode = document.createElement("img");
    this.bulletNode.className = "bullet";
    this.bulletNode.src = this.imgSrc;
    this.bulletNode.style.position = "absolute";
    this.bulletNode.style.left = this.x - this.sizeX / 2 + "px";
    this.bulletNode.style.top = this.y + "px";
    main.appendChild(this.bulletNode);
    this.bulletMove();
}
Bullet.prototype.bulletMove = function () {
    var that = this;
    this.bulletNode.time = setInterval(function () {
        that.y -= that.speed;
        that.bulletNode.style.top = that.y + "px";
        if (that.y <= (-that.sizeY)) {
            clearInterval(that.bulletNode.time);
            main.removeChild(that.bulletNode);
        }
    }, 5)
}
//产生 我的子弹 的函数  构造函数--》在上方实例化
//--------------------------------------------------------------------------
//下方是敌机产生函数 及碰撞判断  的  比较难
function enemy(sizeX, sizeY, x, y, hp, imgSrc, boomSrc, speed, mainHei) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.imgSrc = imgSrc;
    this.boomSrc = boomSrc;
    this.speed = speed;
    this.mainHei = mainHei;
    this.life=true;
}
enemy.prototype.createEnemy = function () {
    this.enemyNode = document.createElement("img");
    this.enemyNode.src = this.imgSrc;
    this.enemyNode.style.position = "absolute";
    this.enemyNode.style.left = this.x + "px";
    this.enemyNode.style.top = this.y + "px";
    main.appendChild(this.enemyNode);
    this.enemyMove();
}
enemy.prototype.enemyMove = function () {
    var that = this;
    this.enemyNode.time = setInterval(function () {
        that.y += that.speed;
        that.enemyNode.style.top = that.y + "px";
        if (that.y >= (that.mainHei + that.sizeY)) {
            clearInterval(that.enemyNode.time);
            main.removeChild(that.enemyNode);
        }
        //		敌机和子弹碰撞
        var bullets = document.getElementsByClassName("bullet");
        for (var i = 0; i < bullets.length; i++) {
            var bltLeft = bullets[i].offsetLeft;
            var bltTop = bullets[i].offsetTop;
            var minLeft = that.x - 6;
            var maxLeft = that.x + that.sizeX;
            var minTop = that.y;
            var maxTop = that.y + that.sizeY;
            if (bltLeft >= minLeft && bltLeft <= maxLeft && bltTop >= minTop && bltTop <= maxTop) {
                clearInterval(bullets[i].time);
                main.removeChild(bullets[i]);
                that.hp--;
            }
            if (that.hp <= 0&&that.life==true) {
                clearInterval(that.enemyNode.time);
                that.enemyNode.src = that.boomSrc;
                setTimeout(function () {
                    main.removeChild(that.enemyNode);
                }, 500);
                that.life=false;
            }
        }
        //		敌机和本方飞机碰撞
        var myPlane = document.getElementById("myPlane");
        var planeLeft = myPlane.offsetLeft;
        var planeTop = myPlane.offsetTop;
        if (planeLeft >= that.x - 66 && planeLeft <= that.x + that.sizeX && planeTop <= that.y + that.sizeY && planeTop >= that.y - that.sizeY&&myPlane.planeLife==true) {
            myPlane.src = "img/myplaneBoom.gif";  
            setTimeout(function () {
                alert("游戏结束");
                window.location.reload();
            }, 900);
            myPlane.planeLife=false;//这个条件判断  上方alert（"游戏结束"）给它延迟让  boom.gif 动画运动 更流畅 但他的获取 有点难  嗯 将它作为一个属性添加在  myPlane的 构造函数中 这样它就跟随在飞机身上了 用myPlane.planeLife呈现
        }//它的判断 也很巧妙
    }, 40);
}