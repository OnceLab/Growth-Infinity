// jshint esversion: 6

class RanLife {
    constructor(base_angle,speed = 1,stroke = 80, weight = 1, step = [60,-60], ...options) {
        this.life = 100;

        this.location = createVector(1 / 2 * width, 1 / 2 * height);

        this.growth = int(random(10));
        this.growth_base = 0;
        this.growth_upper_limit = 50;

        // this.growth_direction = p5.Vector.random2D();
        this.growth_direction = p5.Vector.fromAngle(radians(base_angle), 1);
        console.log(base_angle);
        //console.log(angle_selector);

        this.growth_speed = speed;
        this.line_weight = weight;

        this.step = step;
        this.branch_angle_base = int(random(0, 2)) ? 90 : -90;
        this.branch_angle_step = int(random(0, 2)) ? step[0] : step[1];

        this.stroke_color = (stroke);



    }

    branch() {
        if (this.growth_base >= this.growth_upper_limit) {

            // reset the line starting point
            this.location.x = this.location.x + this.growth_direction.x * this.growth_base;
            this.location.y = this.location.y + this.growth_direction.y * this.growth_base;


            this.growth_base = 0;

            if (true) {
                this.growth_direction = p5.Vector.fromAngle(radians(this.branch_angle_base, 1));

                this.branch_angle_base += this.branch_angle_step;
                this.branch_angle_step = int(random(0, 2)) ? this.step[0] : this.step[1];
                //console.log(this.branch_angle_base);
            }
        }


    }

    update() {
        stroke(this.stroke_color,0,0);
        strokeWeight(this.line_weight)

        line(this.location.x, this.location.y, this.location.x + this.growth_direction.x * this.growth_speed *this.growth_base, this.location.y + this.growth_direction.y * this.growth_speed * this.growth_base);
        
        this.growth_base += 1;

        //console.log(this.growth_base);


    }

    collision() {

    }


}


let simple;

let complex = [];
let angle_selector = [90, 210, 330][Math.floor(Math.random(0, 3))];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(10);
    smooth();
    blendMode(ADD);

    angleMode(DEGREES);


    simple = new RanLife();

    let n = 8;
    for (let i = 0; i < n; i++ ) {
        // As always, this generate a beautiful pattern.
        // Add a `step` parameter to control the line rotation
        // line speed grows with its weight 
        // the base color was kept at 5, really dark, which makes the ADD blendMode works well.
        complex.push(new RanLife(0 + 90 * i,(i+1)*2,5,i*.2,[45,-45]));
    }
}

function draw() {
    //background(220);

    complex.forEach(life => {
        push();
        life.update();
        life.branch();
        pop();
    });

    // push();
    // simple.update();
    // simple.branch();
    // pop();
}