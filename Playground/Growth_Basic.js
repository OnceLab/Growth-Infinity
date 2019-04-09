// jshint esversion: 6

class RanLife {
    constructor(base_angle,speed = 1,stroke = 80, ...options) {
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


        this.branch_angle_base = int(random(0, 2)) ? 60 : -60;
        this.branch_angle_step = int(random(0, 2)) ? 60 : -60;

        this.stroke_color = (0,0,stroke);



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
                this.branch_angle_step = int(random(0, 2)) ? 60 : -60;
                //console.log(this.branch_angle_base);
            }
        }


    }

    update() {
        stroke(this.stroke_color);
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
    createCanvas(800, 800);
    background(50);
    smooth();
    //blendMode(ADD);

    angleMode(DEGREES);


    simple = new RanLife();

    let n = 6;
    for (let i = 0; i < n; i++ ) {
        complex.push(new RanLife(0 + 120 * i,1,255));
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