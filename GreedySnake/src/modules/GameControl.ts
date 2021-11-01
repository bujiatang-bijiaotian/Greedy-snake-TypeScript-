import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";
// 游戏控制器,控制其他所有类
class GameControl {
  // 定义三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 创建一个属性，来存储🐍的移动方向（也就是按键的方向）
  direction: string = '';

  // 创建一个属性，用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 游戏的初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    // 调用run方法
    this.run();
  }
  //  ArrowUp
  // ArrowDown
  //  ArrowLeft
  //  ArrowRight
  //创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(event.key);
    // 检查用户是否按了正确的按键
    // if(event.key)
    // 修改direction属性
    this.direction = event.key;

  }

  // 创建一个控制🐍移动的方法
  run() {
    // 获取🐍现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    //根据按键方向来修改X和Y值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    // 检查🐍是否吃到了食物
    this.checkEat(X,Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e:any) {
      // 出现异常，游戏结束
      alert(e.message+"GAME OVER");
      // alert("🐍撞墙了，GAME OVER")
      this.isLive = false;
    }



    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    
  }

  // 定义一个方法，用来检查🐍是否吃到了食物
  checkEat(X:number, Y:number){
    if(X === this.food.X && Y === this.food.Y) {
      // console.log("吃到食物了");
      // 食物位置改变
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 🐍增加一截
      this.snake.addBody();
    }
  }
}

export default GameControl