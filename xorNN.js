
let trainingData =
[
  {
    input: [0,0],
    answer: [0]
  },
  {
    input: [1,0],
    answer: [1]
  },
  {
    input: [0,1],
    answer: [1]
  },
  {
    input: [1,1],
    answer: [0]
  },
]

var nn;
var learningRateSlider;

function setup()
{
  createCanvas(600,600);
  nn = new NeuralNetwork(2,4,1,0.1);

  learningRateSlider = createSlider(0.01,0.5,0.1,0.01);
  learningRateSlider.style('width', '600px');
}


function draw()
{
  background(0);

  // training
  for(var i=0;i<1000;i++)
  {
    let data = random(trainingData);
    nn.train(data.input,data.answer);
  }

  nn.setLearningRate(learningRateSlider.value());

  // visualization
  let res = 5;
  let cols = (width-50) / res;
  let rows = (height-50) / res;

  for(let i=0;i<cols;i++)
  {
    for(let j=0;j<rows;j++)
    {
      let x = i / cols;
      let y = j / rows;
      let inputs = [x,y];

      let prediction = nn.feedforward(inputs);
      fill(prediction * 255);
      noStroke();
      rect(i * res,j * res, res, res);
    }
  }

  fill(255,0,0);
  textSize(20);
  text("Learning Rate: "+learningRateSlider.value(),0,575);
  text("0,0",0,15);
  text("0,1",0,540);
  text("1,1",520,540);
  text("1,0",520,15);
  text("Learning Rate Slider (min-0.01 , max-0.5)",0,595);
}
