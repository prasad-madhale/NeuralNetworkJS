
var trainingXORData = [
  {
    inputs: [0,1],
    targets: [1]
  },
  {
    inputs: [1,0],
    targets: [1]
  },
  {
    inputs: [0,0],
    targets: [0]
  },
  {
    inputs: [1,1],
    targets: [0]
  }
]


function setup()
{
  var nn = new NeuralNetwork(2,2,1);

  // stochastic gradient descent
  // repeat for every entry in the data picked randomly
  for(var i=0;i<50000;i++)
  {
    // randomize the data
    let data = random(trainingXORData);
    nn.train(data.inputs,data.targets);
  }
  document.getElementById('a1').innerHTML = nn.feedforward([0,0]);
  document.getElementById('a2').innerHTML = nn.feedforward([0,1]);
  document.getElementById('a3').innerHTML = nn.feedforward([1,0]);
  document.getElementById('a4').innerHTML = nn.feedforward([1,1]);
}
