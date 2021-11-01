class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 🐍的身体（包括🐍头）
  bodies: HTMLCollection;

  // 获取🐍的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置🐍头坐标
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    // X的合法范围 0-290
    if (value < 0 || value > 290) {
      throw new Error('🐍撞墙了')
    }

    // 修改X时，是在修改水平座标，🐍在左右移动，🐍向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    // Y的合法范围 0-290
    if (value < 0 || value > 290) {
      throw new Error('🐍撞墙了')
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 🐍增加身体的方法
  addBody() {
    // 向element中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 🐍身体移动的方法
  moveBody() {
    // 将后边身体作为前边身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检查蛇头是否撞到了身体
  checkHeadBody(){
    for (let i = 1; i < this.bodies.length; i++) {
      if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop){
        // 🐍头撞到了身体
        throw new Error('撞到自己了！')
      }
    }
  }
}

export default Snake;