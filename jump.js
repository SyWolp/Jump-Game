let jump = document.querySelector("#jump");
let Jctx = jump.getContext('2d');
let timer = 0;
let abcS = [];
let skills = [];
let smallS = false;
let skill = 3;
let jumpTimer = 0;
let scoreTimer = 0;
let score = 0;
let animation;
let arr = [];
let arr2 = [];
let con = 0.1;
let move = 10;

let img1 = new Image();
let img2 = new Image();
let img3 = new Image();
img1.src = './0.png';
img2.src = './2.png';
img3.src = './3.png';
let a = jump.width = window.innerWidth - 100;

jump.width = window.innerWidth - 100;
jump.height = window.innerHeight - 100;

let go = {
  x : jump.width / 2,
  y : jump.height,
  width : 300,
  height : 150,
  draw(){
    Jctx.fillStyle = "black";
    Jctx.font = "30px arial";
    Jctx.fillText('시작', 900, 450);
    Jctx.fillText( '아무곳이나 클릭', 820, 500);
  }
}

let start = {
  x : 10,
  y : 350,
  width : 100,
  height : 100,
  draw(){
    Jctx.fillStyle = "green";
    // Jctx.fillRect(this.x, this.y, this.width, this.height);
    Jctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

 class boom {
   constructor() {
    this.width = 10;
   }
  draw(x,y){
    Jctx.fillStyle = "rgba(255,0,0,0.5)";
    Jctx.strokeStyle = "rgba(255,0,0,0.5)";
    Jctx.beginPath();
    Jctx.arc(x, y, this.width, 0, 2 * Math.PI);
    Jctx.fill();
    Jctx.stroke();
  }
}

let skillCo = {
  draw(){
    Jctx.fillStyle = "black";
    Jctx.font = "30px arial";
    Jctx.fillText(`남은 스킬 ${skill}`, 900, 50);
  }
}

let scoreCo = {
  draw(){
    Jctx.fillStyle = "black";
    Jctx.font = "30px arial";
    Jctx.fillText(`점수 ${score}`, 600, 50);
  }
}

let reStart = {
  re() {
  Jctx.font = "30px arial";
  Jctx.fillStyle = "black";
  Jctx.fillText("다시하기(Spacebar)",900,400);
  Jctx.fillText(`최종스코어 ${score+1}`,500,400);
  }
}

class abc {
  constructor(){
    this.x = 2000;
    this.y = (Math.random() * ( 830 - 1 ) ) + 1;
    this.width = 100;
    this.height = 100;
  }

    draw() {
      Jctx.fillStyle = "red";
      Jctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

    draw2() {
      Jctx.fillStyle = "red";
      Jctx.drawImage(img3, this.x, this.y, this.width, this.height);
    }
  }

  let goSw = false;
let frame = () => {
  animation = requestAnimationFrame(frame);
  document.addEventListener('click',()=>{
    goSw = true;
  })
  if(goSw == true){
  timer++;
  Jctx.clearRect(0, 0, jump.width, jump.height);
  if(score > 3000){
  if (timer % 20 === 0) {
  let kk = new abc();
  abcS.push(kk);
  }
}else if( score > 2000) {
  if (timer % 20 === 0) {
    let kk = new abc();
    abcS.push(kk);
  }
}else if( score > 1000) {
  if (timer % 40 === 0) {
    let kk = new abc();
    abcS.push(kk);
  }
}else if( score > 0) {
  if (timer % 60 === 0) {
    let kk = new abc();
    abcS.push(kk);
  }
}

if( timer % 1500 == 0){
  let eatSkill = new abc();
  skills.push(eatSkill);
}

  skills.forEach((v,i,a)=>{
    if(v.x < 0) {
      a.splice(i, 1);
    }

    // skillUp(start, v);
    
    let xC = v.x - (start.x + start.width);
    let xCu = (v.x + v.width) - start.x;
    let yC = start.y - (v.y + v.height)
    let yCu = (start.y + start.height) - (v.y);
  
    if( xC < -50 && xCu > 50 && yC < -30 && yCu > 30) {
      skill += 1;
      a.splice(i , 1);
    }
  
    v.x = v.x - 5;
    v.draw2();

  })

  abcS.forEach((v, i, a)=>{
    if(v.x < 0) {
      a.splice(i, 1);
    }
    
    crash(start, v);
    v.x = v.x - 5;
    if( timer > 150 + con) {
      v.x = v.x - con;
      con += 0.0001;
    }

    v.draw();
  
  })


  if(start.width == 0) {
    let a = new boom();
    for(let i = 0; i < 5; i++) {
      arr.push(start.x+50);
      arr2.push(start.y+50);
    }
    a.draw(arr[0]--,1+arr2[0]--);
    a.draw(arr[1]--,1+arr2[1]++);
    a.draw(arr[2]++,1+arr2[2]--);
    a.draw(arr[3]++,1+arr2[3]++);
  }


  if(scoreTimer % 1000 == 0) {
    score++;
  }

  if( smallS != false ) {
    abcS = [];
    jumpTimer++;
  } 

  if( jumpTimer > 100) {
    smallS = false;
    jumpTimer = 0;
  }

  start.draw();
  skillCo.draw();
  scoreCo.draw();
  }else{
    go.draw();
  }
}

frame();



let crash = (nemo, cactus) => {
  let xC = cactus.x - (nemo.x + nemo.width);
  let xCu = (cactus.x + cactus.width) - nemo.x;
  let yC = nemo.y - (cactus.y + cactus.height)
  let yCu = (nemo.y + nemo.height) - (cactus.y);
  if( xC < -50 && xCu > 50 && yC < -30 && yCu > 30) {
    start.width = 0;
    start.height = 0;
    setTimeout(() => {
      cancelAnimationFrame(animation);
      arr = [];
      reStart.re();
      document.addEventListener("keydown", (e)=>{
        if(e.code == 'Space') {
          location.reload();
        }
      })
    }, 500);
  }
}

document.addEventListener("keydown", (e)=>{
  if(e.key == "ArrowUp") {
    move += 0.5;
    start.y -= move;
    if(start.y < -10) {
      start.y += move;
    }
    document.addEventListener("keyup", (e)=>{
    move = 10;
    })
  }
  else if(e.key == "ArrowDown") {
    move += 0.5;
    start.y += move;
    if(start.y > 765) {
      start.y -= move;
    }
    document.addEventListener("keyup", (e)=>{
      move = 10;
      })
  }
  if(e.key == "ArrowLeft") {
    move += 0.5;
    start.x -= move;
    if(start.x < -10) {
      start.x += move;
    }
    document.addEventListener("keyup", (e)=>{
      move = 10;
      })
  }
  else if(e.key == "ArrowRight") {
    move += 0.5;
    start.x += move;
    if(start.x > a) {
      start.x -= move;
    }
    document.addEventListener("keyup", (e)=>{
      move = 10;
      })
  }
})

document.addEventListener("keydown", (e)=>{
  if(e.code == 'Space' && skill > 0) {
    smallS = true;
    skill = skill - 1;
  }
})

