var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
var ground;
var slider;
 
 
function setup() {
    createCanvas(400,400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    slider = createSlider(0,100,50);
    slider.position(180,365);
    slider.input = map(engine.world.gravity,slider.min,slider.max,0,1);
 
    var options = {
        isStatic: true
    }

    ground = Bodies.rectangle(200,height-50,width,10,options);
    World.add(world,ground);
}
  
function draw() {
    background("black");
    var val = slider.value();
 
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }

    noStroke();
    fill("green");
    strokeWeight(4);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 10);
    fill("yellow");
    textSize(15);
    text("Gravity " + val, 60, 380);
}
 
function Box(x, y, width, height, options) {
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x,y,width,height,options);
    this.width = width;
    this.height = height;
    World.add(world, this.body);
 
    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill("blue");
        rect(0, 0, this.width, this.height);
        pop();
    }
}

function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX,mouseY,random(10,40),random(10,40)));
    }
}