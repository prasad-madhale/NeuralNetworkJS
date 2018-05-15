// Simple Perceptrons Using p5.js

const LEARNING_RATE = 0.1; // keeping it low for interesting and long lasting visualization
const NUMBER_OF_WEIGHTS = 3; // x,y and bias
const NUMBER_OF_POINTS = 1000; // number of points to train

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
  this.x = Math.floor(Math.random() * width);
  this.y = Math.floor(Math.random() * height);
  this.z = 1; // bias
  this.label = function()
  {
    if(this.x > this.y)
      return 1;
    else
      return -1;
  }

  // display the points
  this.show = function()
  {
    if(this.label() == 1)
      fill(255);
    else {
      fill(0);
    }
    ellipse(this.x,this.y,10,10);
  }
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
  line(0,0,width,height);

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
    var inputs = [currentPoint.x,currentPoint.y,currentPoint.z];
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
    ellipse(currentPoint.x,currentPoint.y,5,5);
  }
}


function trainPointByPoint(points,trainIndex)
{
  var trainPoint = points[trainIndex];
  var inputs = [trainPoint.x,trainPoint.y,trainPoint.z];
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
