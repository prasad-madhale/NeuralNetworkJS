
var r,g,b;
var nn;

// represents the color which is selected for the given input r,g,b
var colorChoice = "black";

function setup()
{
  createCanvas(600,600);

  // as we do not need to train the network continously.We use user's input to train
  noLoop();
  nn = new NeuralNetwork(3,3,2,0.01);

  // pre-train the NN with 50000 different colors
  for(let i = 0; i < 50000; i++)
  {
      r = random(255);
      g = random(255);
      b = random(255);
      let targets;

      // always use normalized inputs(b/w 0 and 1) to train the network
      let inputs = [r/255,g/255,b/255];

      // picks the color based on certain conditions like sum of r,g,b
      targets = trainColor(r,b,g);
      nn.train(inputs,targets);
  }

  //generate first randome colored background on loading
  randomColor();
}

function draw()
{
  background(r,b,g);
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  text("Black", 150,150);
  strokeWeight(5);
  line(width/2,0,width/2,height);
  fill(255);
  text("White", 450,150);
  strokeWeight(2);

  // picks the color based on Neural Networks prediction
  colorChoice = colorPicker();

  // when neural network choices black color we draw black ellipse
  // else if neural network picks white color we draw white ellipse
  if(colorChoice == "black")
  {
    fill(0);
    ellipse(150,300,50);
  }
  else {
    fill(255);
    ellipse(450,300,50);
  }
}

// Returns the color which the Neural Network has predicted
function colorPicker()
{
    // normalized inputs
    let inputs = [r / 255,g / 255,b / 255];
    let out = nn.feedforward(inputs);

    if(out[0] > out[1])
      return "black";
    else
      return "white";
}

// triggered when mouse is pressed
function mousePressed()
{
    let targets;
    let inputs = [r / 255,g / 255,b / 255];

    // trains the Neural Network to select the either black or white based on the
    // location where the user clicks for the particular background
    if(mouseX > width/2)
    {
      targets = [0,1];
    }
    else {
      targets = [1,0];
    }

    nn.train(inputs, targets);

    // generates a randome color on each mouseClick
    randomColor();
}

// returns a random color by picking 3 random colors
function randomColor()
{
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

// returns color for training based on some conditions like
// if sum of r,g,b is greater than 382 (because 255*3/2 is approximately 382) then return Black
// else return white
// the colors are returned in the form of an array to give as targets to the
// neural network for training
function trainColor(r,g,b)
{
  if((r + g + b) > 383)
    return [1,0];
  else {
    return [0,1];
  }

}
