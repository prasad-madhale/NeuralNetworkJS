# NeuralNetworkJS
Neural Networks in Javascript using p5.js

### Perceptrons Outline:
1. Provide the Perceptrons inputs for which the answer is known
2. Ask Perceptrons to guess the answer
3. Calculate the error
4. Adjust the weights according to the error so as to steer the guessed answer towards the actual answer
5. Go to Step 1 and repeat

**Equations**
<br/><br/>
<a href="https://www.codecogs.com/eqnedit.php?latex=\Delta&space;Weight&space;=&space;Error&space;*&space;Input" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Delta&space;Weight&space;=&space;Error&space;*&space;Input" title="\Delta Weight = Error * Input" /></a>
<br/>
<a href="https://www.codecogs.com/eqnedit.php?latex=New&space;Weight&space;=&space;Weight&space;&plus;&space;\Delta&space;Weight" target="_blank"><img src="https://latex.codecogs.com/gif.latex?New&space;Weight&space;=&space;Weight&space;&plus;&space;\Delta&space;Weight" title="New Weight = Weight + \Delta Weight" /></a>

### Generic Perceptrons:
Visualizes 500 points and uses the perceptrons to guess correctly if the point lies above or below the dividing line. The dividing line is represented by equation y = mx + c. So, this code works for any generic line provided by this equation.

### Multilayer Perceptrons:
We try to solve the XOR problem which cannot be solved by a linear seperator like a Simple Perceptron implemented earlier. A Multilayer Perceptron is implemented using a feedforward Neural Network. This feedforward NN uses backpropagation for adjusting its weights and bias. The process of backpropagation basically is adjusting the values of weights and bias so as to obtain the desired outputs.
The Neural Network has 2 layers: a hidden layer and an output layer. It also exercises a bias for each of the layer to obtain proper output. Refer the notes in order to gain insights into the structure of the Neural Network.

#### Notes:
_Neural Network Structure and Outline_

![Neural Network Structure](https://github.com/prasadchelsea33/NeuralNetworkJS/blob/master/notes/neural%20networks%201_1.jpg)

_Backpropagation for adjusting weights and bias_

![Backpropagation for adjusting weights and bias](https://github.com/prasadchelsea33/NeuralNetworkJS/blob/master/notes/neural%20networks%201_2.jpg)

_Mapping backpropagation algorithm to higher dimensions_

![Mapping backpropagation algorithm to higher dimensions](https://github.com/prasadchelsea33/NeuralNetworkJS/blob/master/notes/neural%20networks%201_3.jpg)

#### References:
1. The Coding Train website: http://thecodingtrain.com/
2. 3Blue1Brown Neural Network playlist: https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi
3. Make Your Own Neural Network by Tariq Rashid 
