let balloons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // 淺藍色背景
  background(190, 230, 245);

  // 更新並顯示所有氣球
  for (let i = balloons.length - 1; i >= 0; i--) {
    balloons[i].update();
    balloons[i].display();

    // 氣球跑到螢幕頂端後移除
    if (balloons[i].y < -100) {
      balloons.splice(i, 1);
    }
  }
}

// 點擊畫面
function mousePressed() {

  // 先檢查有沒有點到氣球
  for (let i = balloons.length - 1; i >= 0; i--) {

    if (balloons[i].isClicked(mouseX, mouseY)) {
      balloons[i].pop();
      balloons.splice(i, 1);
      return;
    }
  }

  // 如果沒有點到氣球，就產生新的氣球
  balloons.push(new Balloon(mouseX, mouseY));
}


// 視窗大小改變時重新調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// ======================
// 氣球類別
// ======================

class Balloon {

  constructor(x, y) {

    this.x = x;
    this.y = y;

    // 氣球大小
    this.size = random(45, 70);

    // 上升速度
    this.speed = random(0.8, 1.8);

    // 左右飄動
    this.angle = random(TWO_PI);
    this.swingSpeed = random(0.01, 0.03);

    // 隨機顏色
    this.color = color(
      random(150, 255),
      random(100, 220),
      random(150, 255)
    );

    // 爆破狀態
    this.isPopped = false;
  }


  // 氣球移動
  update() {

    // 向上
    this.y -= this.speed;

    // 左右輕微飄動
    this.angle += this.swingSpeed;
    this.x += sin(this.angle) * 0.5;
  }


  // 畫出氣球
  display() {

    push();

    // 氣球本體
    noStroke();
    fill(this.color);

    ellipse(
      this.x,
      this.y,
      this.size,
      this.size * 1.2
    );

    // 氣球上的亮光
    fill(255, 255, 255, 120);

    ellipse(
      this.x - this.size * 0.18,
      this.y - this.size * 0.25,
      this.size * 0.18,
      this.size * 0.28
    );

    // 氣球底部的小結
    fill(this.color);

    triangle(
      this.x - 5,
      this.y + this.size * 0.55,
      this.x + 5,
      this.y + this.size * 0.55,
      this.x,
      this.y + this.size * 0.7
    );

    // 氣球線
    stroke(100, 120, 130, 150);
    strokeWeight(1);

    line(
      this.x,
      this.y + this.size * 0.65,
      this.x,
      this.y + this.size * 2
    );

    pop();
  }


  // 判斷有沒有點到氣球
  isClicked(mx, my) {

    let distance = dist(
      mx,
      my,
      this.x,
      this.y
    );

    return distance < this.size * 0.65;
  }


  // 氣球爆掉
  pop() {

    // 這裡目前直接消失
    // 後面可以再加入爆破動畫
    this.isPopped = true;
  }
}