
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var x2 = canvas.width/2;
var y2 = canvas.height-30;
var dx = 6;
var dy = -6;
var dx2 = 7.5;
var dy2 = -7.5;
var dx3 = 7.9;
var dy3 = -7.9;
var ballRadius2 = 10;
var ballRadius3 = 13;
var x2 = canvas.width/2;
var y2 = canvas.height-30;
var x3 = canvas.width/2;
var y3 = canvas.height-30; 
var paddleHeight = 30;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickColumnCount = 7;
var brickRowCount = 5;
var brickWidth = 48;
var brickHeight = 30;
var brickPadding = 20;
var brickOffsetTop = 80;
var brickOffsetLeft = 90;
var brickHit = 0;
var score = 0;
var lives = 3;
const impacto = document.querySelector('#hit');
const danger = document.querySelector('#danger');
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
}

function keyUpHandler(e) {
        if(e.keyCode == 39) {
           rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
}

function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
}
    
function collisionDetection() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                   if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                       dy = -dy;
                       b.status = 0;
                       score++;
                       brickHit++;
                        if(b.status == 0){
                           var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                           var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                           b.x= brickX;
                           b.y = brickY;
                           ctx.beginPath();
                           ctx.rect(brickX,brickY, brickWidth, brickHeight);
                           ctx.fillStyle = "red";
                           ctx.fill();
                           ctx.closePath();
                           impacto.innerHTML="HiT!";
                           impacto.innerHTML;
                           setTimeout( () => {
                             impacto.innerHTML="";
                             impacto.innerHTML;
                            },1100);

                        }   
                        if(brickHit == brickRowCount*brickColumnCount) {
                           alert("YOU WIN, eres lo maximo! SCORE: "+(brickHit*3000));
                            document.location.reload();
                        }
                    }
                }
            }
        }
}    

function drawBall(){
        ctx.beginPath();
        ctx.arc(x,y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.closePath();
}

function drawBallX(){
        ctx.beginPath();
        ctx.arc(x2,y2, ballRadius2, 0, Math.PI*2);
        ctx.fillStyle = "hsla(200,50%,70%,.222)";
        ctx.fill();
        ctx.closePath();
   
        ctx.beginPath();
        ctx.arc(x3,y3, ballRadius3, 0, Math.PI*2);
        ctx.fillStyle = "hsla(250,70%,30%,.622)";
        ctx.fill();
        ctx.closePath();          
                
}

function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth,paddleHeight); 
        ctx.fillStyle = "rgb(10, 158, 35)";
        ctx.fill();
        ctx.closePath();
}

function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {

                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY, brickWidth, brickHeight);
                ctx.fillStyle = "rgb(40, 20, 90)";
                ctx.fill();
                ctx.closePath();
                
            }
        }
}
    
function drawText() {
    ctx.font = "28px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntos: "+(score*135), 8, 27);
        
    ctx.font ="28px Arial";
    ctx.fillStyle ="#0095DD";
    ctx.fillText("Hit: "+ brickHit, 8,53);
   
    ctx.font = "28px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: "+lives, canvas.width-115, 27);
}

function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawBricks();
        drawBall();
        drawBallX();
        drawPaddle();
        drawText();
        collisionDetection(); 

        if(x2 + dx2 > canvas.width-ballRadius2 || x2 + dx2 < ballRadius2) {
            dx2 = -dx2;
            
        }

        if(y2 + dy2 < ballRadius2){
            dy2 = -dy2;
        }

        else if(y2 +  dy2 > canvas.height-ballRadius2){
                if(x2 > paddleX && x2 < paddleX + paddleWidth){
                   dy2 = -dy2;
                  
                 
                }else{
                  
                      ballRadius2 = 15;
                      x2= canvas.width/2;
                      y2= canvas.height -50;
                      dx2= 7.3;
                      dy2= -7.3;
                     
                }
            
        }

        if(x3 + dx3 > canvas.width-ballRadius3 || x3 + dx3 < ballRadius3) {
            dx3 = -dx3;
             
        }
        if(y3 + dy3 < ballRadius3){
            dy3 = -dy3;
        }
        else if(y3 +  dy3 > canvas.height-ballRadius3){
                if(x3 > paddleX && x3 < paddleX + paddleWidth){
                  dy3 = -dy3;
                 
                }else{
                    
                   ballRadius3 = 18;
                   x3= canvas.width/2;
                   y3= canvas.height -50;
                   dx3= 7.5;
                   dy3= -7.5;
                  
                   
                }
            
        }    
        if(brickHit>=4){
            ballRadius =15;
            ballRadius2 = 18;
            ballRadius3= 20;
            brickOffsetTop = 155;
            brickOffsetLeft = 60;

        }
        if(brickHit>=7){
            ballRadius = 8;
            ballRadius2 = 15;
            brickOffsetTop = 169;
            brickOffsetLeft = 70;
        }
        if(brickHit>=10){
            ballRadius= 10;
            ballRadius2= 14;
            ballRadius3= 10;   
            brickOffsetTop= 170;
            brickOffsetLeft= 60;    
        }
        if(brickHit>=15){
            ballRadius= 20;
            ballRadius2= 20;
            ballRadius3= 20;     
            brickOffsetTop= 165;
            brickOffsetLeft= 70;    
        }
        if(brickHit>=19){
            ballRadius= 8;
            ballRadius2= 14;
            ballRadius3= 10;   
            brickOffsetTop= 180;
            brickOffsetLeft= 60;
            
        }
        if(brickHit>=23){
            ballRadius= 10;
            ballRadius2= 24;
            ballRadius3= 15;
            brickOffsetTop= 70;
        }
        if(brickHit>=25){
            ballRadius= 10;
            ballRadius2= 14;
            ballRadius3= 20;      
            brickOffsetTop= 80;
            brickPadding=20;
        }    
        if(brickHit>=26){
            ballRadius=8;
            ballRadius2= 8;
            ballRadius3= 10; 
            brickOffsetTop= 80;
            brickOffsetLeft= 90;
            brickPadding= 5;
            paddleWidth = 120;
        }
        if(brickHit>=28){
            
            ballRadius2= 14;  
            brickOffsetTop= 180; 
            brickOffsetLeft=20;
            brickPadding= 5;    
        }
        if(brickHit>=29){
           
            ballRadius2= 10;
            brickOffsetTop= 80;
            brickOffsetLeft=150;
            brickPadding= 30;  
        }
        if(brickHit>=30){
           
            ballRadius2= 8;
            brickOffsetTop= 120;
            brickOffsetLeft=50;
            brickPadding= 10;  
        }
        if(brickHit>=31){
           
            ballRadius2= 10;
            brickOffsetTop= 180;
            brickOffsetLeft=70;
            brickPadding= 5; 
        }
        if(brickHit>=34){
           
            ballRadius2= 10;
            brickOffsetTop= 150;
            brickOffsetLeft=110;
            brickPadding= 15; 
        }
       
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                dx = -dx;
                
        }
    
        if(y + dy < ballRadius){
                dy = -dy;
        }
        else if(y +  dy > canvas.height-ballRadius){
                if(x > paddleX && x < paddleX + paddleWidth){
                       dy= -dy;
                        
                }else{
                        lives--;
                        danger.innerHTML="D a n g e r";
                        danger.innerHTML;
                        setTimeout( () => {
                        danger.innerHTML="";
                        danger.innerHTML;
                        },1000);      
                }
                if(!lives){
                   alert("Game Over! TotalHit: "+score);
                    document.location.reload();
                } else {   
                    dx = 7;
                    dy = -7;          
                }          
                         
        } 
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 9.5;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 9.5;
        }
        x3 += dx3;
        y3 += dy3;
        x2 += dx2;
        y2 += dy2;
        x += dx;
        y += dy;   
        requestAnimationFrame(draw);
}
function newGame(){
    draw();
}


