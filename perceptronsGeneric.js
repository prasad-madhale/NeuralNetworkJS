// Simple Perceptrons Using p5.js

const LEARNING_RATE = 0.01; // keeping it low for interesting and long lasting visualization
const NUMBER_OF_WEIGHTS = 3; // x,y and bias
var NUMBER_OF_POINTS = 500; // number of points to train

function Perceptrons()
{
  this.weights = randomWeights();

  this.guess = function(inputs)
  {
    var sum = 0;
    for(var j = 0;j<this.weights.length;j++)
    {
      sum += this.weights[j] * inputs[j];
    }

    var out = activation(sum);
    return out;
  }


  // Activation function
  function activation(number)
  {
    if(number >= 0)
      return 1;
    else {
      return -1;
    }
  }

  // trains a point
  this.train = function(inputs,target)
  {
    var guess = this.guess(inputs);
    var error = target - guess;

    // adjusting weights
    for(var p=0;p<this.weights.length;p++)
    {
      this.weights[p] += error * inputs[p] * LEARNING_RATE;
    }
  }


  this.guessY = function(x)
  {
    var w0 = this.weights[0];
    var w1 = this.weights[1];
    var w2 = this.weights[2];

    return -(w2/w1) - ((w0/w1) * x);
  }
}

// initialize with random weights
function randomWeights()
{
  var weights = new Array(NUMBER_OF_WEIGHTS);
  // Assigning random weights
  for(var i=0;i<weights.length;i++)
  {
    // returns integers between -1 and 1 (inclusive)
    weights[i] = Math.round((Math.random() * (1-(-1))) - 1);
  }

  return weights;
}

// subjects for training
function Point()
{
  this.x = (Math.random() * (1-(-1))) - 1;
  this.y = (Math.random() * (1-(-1))) - 1;
  this.bias = 1; // bias
  this.label = function()
  {
    var lineY = lineEqn(this.x);
    if(this.y > lineY)
      return 1;
    else
      return -1;
  }


  this.pixelX = function()
  {
    return map(this.x,-1,1,0,width);
  }

  this.pixelY = function()
  {
    return map(this.y,-1,1,height,0);
  }

  // display the points
  this.show = function()
  {
    if(this.label() == 1)
      fill(255);
    else {
      fill(0);
    }

    var px = this.pixelX();
    var py = this.pixelY();
    ellipse(px,py,10,10);
  }
}

// had to make this because JS doesn't support constructor overloading
function Point2(x,y)
{
  this.x = x;
  this.y = y;
  this.bias = 1;

  this.pixelX = function()
  {
    return map(this.x,-1,1,0,width);
  }

  this.pixelY = function()
  {
    return map(this.y,-1,1,height,0);
  }
}

// represents generic line equation
//  y = mx + c
function lineEqn(x)
{
  return 2 * x - 0.1;
}

var points = new Array(NUMBER_OF_POINTS);
var perceptronBrain;

function setup(){
  createCanvas(600,600);
  background(135,206,250);

  perceptronBrain = new Perceptrons();

  // create points
  for(var i = 0;i<points.length;i++)
  {
    points[i] = new Point();
  }
}

var trainIndex = 0;

function draw()
{
  // dividing line
  var p1 = new Point2(-1,lineEqn(-1));
  var p2 = new Point2(1,lineEqn(1));

  line(p1.pixelX(),p1.pixelY(),p2.pixelX(),p2.pixelY());

  // // line representing what the algo has learned so far
  // var p3 = new Point2(-1,perceptronBrain.guessY(-1));
  // var p4 = new Point2(1,perceptronBrain.guessY(1));
  //
  // line(p3.pixelX(),p3.pixelY(),p4.pixelX(),p4.pixelY());

  // draws the original points
  drawPoints(points);

  drawTrainedPoints(points);

  // Trains one point at a time
  trainPointByPoint(points,trainIndex);

  trainIndex++;

  // Once it has trained all the points we start again
  if(trainIndex == points.length)
  { trainIndex = 0;
  }
}

function drawPoints(points)
{
  for(var x = 0;x < points.length;x++)
  {
    points[x].show();
  }
}

function drawTrainedPoints(points)
{


  for(var k = 0;k < points.length;k++)
  {
    var currentPoint = points[k];
    var inputs = [currentPoint.x,currentPoint.y,currentPoint.bias];
    var target = currentPoint.label();

    var guess = perceptronBrain.guess(inputs);
    if(guess == target)
    {
      fill(0,255,0);
    }
    else {
      fill(255,0,0);
    }
    noStroke();
    ellipse(currentPoint.pixelX(),currentPoint.pixelY(),5,5);
  }
}


function trainPointByPoint(points,trainIndex)
{
  var trainPoint = points[trainIndex];
  var inputs = [trainPoint.x,trainPoint.y,trainPoint.bias];
  var target = trainPoint.label();
  perceptronBrain.train(inputs,target);
}


// train points using MousePress (extra)
// function mousePressed()
// {
//   for(var k = 0;k < points.length;k++)
//   {
//     var currentPoint = points[k];
//     var inputs = [currentPoint.x,currentPoint.y,currentPoint.z];
//     var target = currentPoint.label();
//     perceptronBrain.train(inputs, target);
//   }
// }
