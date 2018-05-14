// Using p5.js

function Perceptrons()
{
  this.weights = randomWeights();
  //document.write(this.weights);

  this.guess = function(inputs)
  {
    var sum = 0;
    for(var j = 0;j<this.weights.length;j++)
    {
      sum += this.weights[j] * inputs[j];
    }

    var out = sign(sum);
    return out;
  }


  // Activation function
  function sign(number)
  {
    if(number >= 0)
      return 1;
    else {
      return -1;
    }
  }


}

function randomWeights()
{
  var weights = new Array(2);
  // Assigning random weights
  for(var i=0;i<weights.length;i++)
  {
    // returns number between -1 and 1 (inclusive)
    weights[i] = Math.round((Math.random() * (1-(-1))) - 1);
  }

  return weights;
}

function Point()
{
  this.x = Math.floor(Math.random() * width);
  this.y = Math.floor(Math.random() * height);
  this.label = function()
  {
    if(this.x > this.y)
      return 1;
    else
      return -1;
  }

  this.show = function()
  {
    if(this.label() == 1)
      fill(0,255,0);
    else {
      fill(255,0,0);
    }
    ellipse(this.x,this.y,10,10);
  }
}

var points = new Array(100);

// Main
function setup(){
  createCanvas(600,600);
  var p1 = new Perceptrons();

  for(var i = 0;i<points.length;i++)
  {
    points[i] = new Point();
  }
  // document.write(Math.floor(Math.random() * width));
  // document.write("<br/>");
  // document.write(Math.floor(Math.random() * height));
}

function draw()
{
  background(135,206,250);

  // dividing line
  line(0,0,width,height);
  for(var x = 0;x < points.length;x++)
  {
    points[x].show();
  }
}
