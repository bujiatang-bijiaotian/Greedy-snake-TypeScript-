// 定义食物类
class Food {
  // 定义一个属性来表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
  }

  // 定义一个获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    //生成一个随机的位置
    // 食物位置 0-290
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + 'px';
    this.element.style.left = left + 'px';
  }
}

export default Food;