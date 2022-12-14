window.addEventListener('DOMContentLoaded',function() {
    const coefficient = 2480/3508;
    let regions = {
        'Ленинградская область': {
                sizes: {
                    'top' : 150,
                    'left' : 480,
                    'radius' : 15
                },
                data : {
                     'Classical music' : 10,
                     'Alternative music' : 14,
                     'Pop' : 2,
                }
        },
        'Мурманская область': {
                sizes: {
                    'top' : 300,
                    'left' : 333,
                    'radius' : 30
                },
                data : {
                     'Classical music' : 10,
                     'Alternative music' : 14,
                     'Pop' : 2,
                }
        },
        'Карелия': {
                sizes: {
                    'top' : 480,
                    'left' : 650,
                    'radius' : 53
                },
                data : {
                     'Classical music' : 18,
                     'Alternative music' : 144,
                     'Pop' : 8,
                }
        }
    };

    let myCanvas = document.getElementById('myCanvas');

    debugger;
    myCanvas.width = document.documentElement.clientWidth;
    myCanvas.height = myCanvas.width * coefficient;

    let ctx = myCanvas.getContext('2d');

    if( regions ) {
        for(let region in regions) {
            let myPiechart = new PieChart({
                canvas: myCanvas,
                sizes: regions[region].sizes,
                data: regions[region].data,
                colors:['#4CD19C','#D94139','#F5B452']
            });
            myPiechart.draw();
        }
    }
});








// класс рисовальщик
class Drawer {
    // рисует линию
    static drawLine( ctx, startX, startY, endX, endY ) {
        ctx.beginPath();
        ctx.move( startX, startY );
        ctx.line( endX, endY );
        ctx.stroke();
    }

    // рисует дугу
    static drawArc( ctx, centerX, centerY, radius, startAngle, endAngle ) {
        ctx.beginPath();
        ctx.arc( centerX, centerY, radius, startAngle, startAngle );
        ctx.stroke();
    }

    // рисует кусок диаграммы
    static drawPieslice( ctx, centerX, centerY, radius, startAngle, endAngle, color ) {
         ctx.fillStyle = color;
         ctx.beginPath();
         ctx.moveTo( centerX, centerY );
         ctx.arc( centerX, centerY, radius, startAngle, endAngle );
         ctx.closePath();
         ctx.fill();
    }
}

// Класс отображает диаграмму
let PieChart = function( options ) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;

    this.draw = function() {
        let total_value = 0;
        let color_index = 0;

        for( let category in this.options.data ) {
            let val = this.options.data[category];
            total_value += val;
        }

        let startAngle = 0;
        let nextAngle = 0;
        let sliceAngle = 0;
        for( let category in this.options.data ) {
            let val = this.options.data[category];
            sliceAngle = 2 * Math.PI * val / total_value;
            if( nextAngle > 0 ) {
                startAngle = nextAngle;
            }
            nextAngle = startAngle + sliceAngle;

            Drawer.drawPieslice (
                this.ctx,
                this.options.sizes.left,
                this.options.sizes.top,
                this.options.sizes.radius,
                startAngle,
                nextAngle,
                this.colors[color_index]
            );
            color_index++;
        }
    }
}

// Класс отображает окружность
let Cycle = function( options ) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.colors = options.colors;

    this.drawCycle = function() {
        this.ctx.beginPath();
        this.ctx.arc( this.options.sizes.left,this.options.sizes.top,this.options.sizes.radius,0,2 * Math.PI,false );
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'green';
        this.ctx.stroke();
    }
}



