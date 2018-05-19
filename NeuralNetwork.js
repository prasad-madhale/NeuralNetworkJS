const LEARNING_RATE = 0.1;

class NeuralNetwork
{
  constructor(input_neurons,hidden_neurons,output_neurons)
  {
    this.input_neurons = input_neurons;
    this.hidden_neurons = hidden_neurons;
    this.output_neurons = output_neurons;

    this.weightsInputHidden = new Matrix(this.hidden_neurons,this.input_neurons);
    this.weightsHiddenOutput = new Matrix(this.output_neurons,this.hidden_neurons);

    // assigns random weights between -1 and 1
    this.weightsInputHidden.randomize();
    this.weightsHiddenOutput.randomize();

    // bias (different for both layers)
    this.biasHidden = new Matrix(this.hidden_neurons,1);
    this.biasOutput = new Matrix(this.output_neurons,1);
  }

  feedforward(input_array)
  {
    // as input comes in the form of an array we need to convert it to a matrix
    var inputs = Matrix.fromArray(input_array);

    // Get output of Hidden Layer
    var hidden = Matrix.multiply(this.weightsInputHidden,inputs);
    hidden.add(this.biasHidden);
    hidden.map(sigmoid);

    // Get output of the Output neuron
    var output = Matrix.multiply(this.weightsHiddenOutput,hidden);
    output.add(this.biasOutput);
    output.map(sigmoid);

    return output.toArray();
  }

  // uses backpropagation
  train(input_array,answer)
  {
    // // returns an array
    // var output = this.feedforward(inputs);


    // as input comes in the form of an array we need to convert it to a matrix
    var inputs = Matrix.fromArray(input_array);

    // Get output of Hidden Layer
    var hidden = Matrix.multiply(this.weightsInputHidden,inputs);
    hidden.add(this.biasHidden);
    hidden.map(sigmoid);

    // Get output of the Output neuron
    var outputs = Matrix.multiply(this.weightsHiddenOutput,hidden);
    outputs.add(this.biasOutput);
    outputs.map(sigmoid);

    // feed forward required for it's intermediate values






    // convert arrays to matrices
    answer = Matrix.fromArray(answer);

    // error calculated by simple actual answer - observed answer
    var outputError = Matrix.subtract(answer,outputs);

    // calculates the error for hidden layer
    var weightsHOTranspose = Matrix.transpose(this.weightsHiddenOutput);
    var hiddenError = Matrix.multiply(weightsHOTranspose,outputError);

    // // debugging
    // outputs.print();
    // answer.print();
    // outputError.print();
    // hiddenError.print();

    // adjusting parameters (actual backpropagation)
    // for formulas refer notes attached to the repo

    // adjusting for the Output layer
    var gradientOutputs = Matrix.map(outputs,gradientDerivative);
    gradientOutputs.multiply(outputError);
    gradientOutputs.multiply(LEARNING_RATE);

    var hiddenTranspose = Matrix.transpose(hidden);
    var deltaWeightsHO = Matrix.multiply(gradientOutputs,hiddenTranspose);

    // calculated deltas and now add it to the actual weights
    this.weightsHiddenOutput.add(deltaWeightsHO);

    // calculating deltas for the bias for Output layer
    this.biasOutput.add(gradientOutputs);



    //adjusting for the Hidden layer
    var gradientHidden = Matrix.map(hidden,gradientDerivative);
    gradientHidden.multiply(hiddenError);
    gradientHidden.multiply(LEARNING_RATE);

    var inputTranspose = Matrix.transpose(inputs);
    var deltaWeightsIH = Matrix.multiply(gradientHidden,inputTranspose);

    // calculated deltas and now add it to the actual weights
    this.weightsInputHidden.add(deltaWeightsIH);

    // calculating deltas for the bias for Hidden layer
    this.biasHidden.add(gradientHidden);

  }
}

// Simplest activation function
function sigmoid(input)
{
  return 1/(1 + Math.exp(-input));
}

// because derivative of sigmoid
// s'(x) = s(x) * (1 - s(x))
// Pre-condition: x has already being mapped with sigmoid function
function gradientDerivative(x)
{
  return x * (1-x);
}
