// Mobile Chec
let isMobile = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);


// Setup
var c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);
var ctx = c.getContext("2d");

var pts = [];
while(pts.length < 254){
    while(pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val);
}
pts.push(pts[0]);

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t * Math.PI))/2;

var noise = x => {
    x = x * 0.01 % 254;
    return lerp(pts[Math.floor(x)],pts[Math.ceil(x)],x - Math.floor(x));
}

// Init
var bgcolor ="#00c8fa";
var forecolor = "#d2e69c"; 
var linecolor = "#8fd9a8";
var linewidth = 5;
var offset = -10;
var yRatio = .3;
var t = 0;
var speed = 0;
var playing = true;
var k = {ArrowUp:0, ArrowLeft:0,ArrowRight:0}

// Player Variables
var player = new function(){
    this.x = c.width / 2;
    this.y = 50;
    this.truck = new Image();
    this.truck.src = "./img/t.png";
    this.rot = 0;
    this.ySpeed = 0;
    this.rSpeed = 0;

    // Interface Variables
    this.startBtn = new Image();
    this.startBtn.src = "./img/basla.png"
    this.leftBtn = new Image();
    this.leftBtn.src = "./img/sol.png"
    this.rightBtn = new Image();
    this.rightBtn.src = "./img/sag.png";
    this.fireBtn = new Image();
    this.fireBtn.src = "./img/gaz.png";

    this.drawInterface = function(){

        if(playing){
        // Interface Drawing
            if(isMobile){
                ctx.drawImage(this.leftBtn,20,c.height - 90,70,70);
                ctx.drawImage(this.rightBtn,110,c.height - 90,70,70);
                ctx.drawImage(this.fireBtn,c.width-90,c.height - 90,70,70);
            }
        }else{
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "3rem Impact";
            ctx.fillStyle = "white";
            ctx.fillText("GAME OVER", c.width / 2, c.height / 3);
            ctx.drawImage(this.startBtn,(c.width / 2) - 25, (c.height / 3) + 50,50,50);
        }
    }


    this.draw = function(){
        var p1 = (c.height * .9) - noise(this.x + t) * yRatio;
        var p2 = (c.height * .9) - noise(this.x + t + 5) * yRatio;  
        // Gnd check
        var gnd = 0;
        var offset = 38;   
        if(p1-offset > this.y){
            this.ySpeed += 0.1;
        }else{
            this.ySpeed -= this.y - (p1 - offset);
            this.y = p1 - offset;
            gnd = 1;
        }
        // Fall Check
        if(!playing || gnd && Math.abs(this.rot) > Math.PI * 0.5){
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 5;
        }
        // Rotation Calculating
        var angle = Math.atan2((p2 - offset) - this.y, (this.x + 5) - this.x);
        if(gnd && playing){
            this.rot -= (this.rot - angle) * 0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }

        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rot -= this.rSpeed * 0.05;


        this.rot -= this.rSpeed * 0.1;
        if(this.rot > Math.PI) this.rot = -Math.PI;
        if(this.rot < -Math.PI) this.rot = Math.PI;

        this.y += this.ySpeed;
        // Drawing
        // Truck Drawing
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.truck,-40,-40,80,80);
        ctx.restore();
    }
}

// Drawing
function draw(){
    speed -= (speed - (k.ArrowUp) ) * 0.01;
    t += 10 * speed;
    // Background
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0,0,c.width,c.height);
    // Player
    player.draw();
    // Ground
    ctx.fillStyle = forecolor;
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = linewidth;
    ctx.beginPath();
    ctx.moveTo(offset,c.height - offset);
    for(let i = offset; i < c.width - offset; ++i){
        ctx.lineTo(i,(c.height * .9) - noise(i + t) * yRatio);
    }
    ctx.lineTo(c.width - offset, c.height - offset);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    player.drawInterface();


    // Animation
    requestAnimationFrame(draw);
}
draw();


// Mobile Controls
if(isMobile){
    c.addEventListener("touchstart", handleStart, false);
    c.addEventListener("touchend",handleEnd,false);

    function handleStart(evt){
        evt.preventDefault();
        var touches = evt.changedTouches;
        for(let i = 0; i < touches.length; i++){
            var touch = touches[i];
            checkBtnPress(touch.pageX,touch.pageY);
        }
    }

    function handleEnd(evt){
        evt.preventDefault();
        var touches = evt.changedTouches;
        for(let i = 0; i < touches.length; i++){
            var touch = touches[i];
            checkBtnRelease(touch.pageX,touch.pageY);
        }
    }    
}else{
    // Desktop Controls

    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;

    c.addEventListener("click",handleClick,false);
    function handleClick(evt){
        checkBtnPress(evt.clientX,evt.clientY);
    }

}

window.onresize = function(){
    window.location.reload();
}


function checkBtnPress(x,y){
    if(!playing && x > ((c.width / 2)-25) && x < ((c.width/2) + 25) && y > ((c.height / 3) + 50) && y < ((c.height / 3) + 100)){
        window.location.reload();
    }
    if(playing && x > 20 && x < 90 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowLeft = 1;
    }
    if(playing && x > 110 && x < 180 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowRight = 1;
    }
    if(playing && x > (c.width - 90) && x < (c.width - 20) && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowUp = 1;
    }
}

function checkBtnRelease(x,y){
    if(!playing && x > ((c.width / 2)-25) && x < ((c.width/2) + 25) && y > ((c.height / 3) + 50) && y < ((c.height / 3) + 100)){
        window.location.reload();
    }
    if(playing && x > 20 && x < 90 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowLeft = 0;
    }
    if(playing && x > 110 && x < 180 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowRight = 0;
    }
    if(playing && x > (c.width - 90) && x < (c.width - 20) && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowUp = 0;
    }
}
