import * as tf from '@tensorflow/tfjs';

interface StudentData {
    ComponentID: number;
    ComponentRate: number;
    HPS: number;
    Avg: number;
    RemarksID: number; // 1 = Pass, 0 = Fail
  }

const normalize = (value: number, min: number, max: number): number => {
    return (value - min) / (max - min);
  };
  
  const data: StudentData[] = [
    { ComponentID: 1, ComponentRate: 4, HPS: 3.5, Avg: 90, RemarksID: 1 }, // Pass
    { ComponentID: 1, ComponentRate: 2, HPS: 2.5, Avg: 60, RemarksID: 0 }, // Fail
    { ComponentID: 0, ComponentRate: 3.5, HPS: 4.0, Avg: 85, RemarksID: 1 }, // Pass
    { ComponentID: 0, ComponentRate: 1.5, HPS: 2.0, Avg: 50, RemarksID: 0 }  // Fail
  ];
  
  // Normalize the dataset
  const normalizedData = data.map(item => ({
    ComponentID: normalize(item.ComponentID, 0, 1), 
    ComponentRate: normalize(item.ComponentRate, 1.5, 4), 
    HPS: normalize(item.HPS, 2, 4), 
    Avg: normalize(item.Avg, 50, 90),
    RemarksID: item.RemarksID
  }));
  
// Convert data into TensorFlow.js tensorsconst xs = tf.tensor2d(
    const xs = tf.tensor2d(
        normalizedData.map(d => [d.ComponentID, d.ComponentRate, d.HPS, d.Avg])
    );
    const ys = tf.tensor2d(
        normalizedData.map(d => [d.RemarksID])
    );

export async function trainModel(model: tf.LayersModel) {
  // Train the model
  await model.fit(xs, ys, { epochs: 100 });
}

  
export function predict(model: tf.LayersModel, inputData: number[]): number {
  const inputTensor = tf.tensor2d([inputData]); // Create tensor from input data
  console.log(inputTensor)
  const predictionTensor = model.predict(inputTensor) as tf.Tensor;
  console.log(predictionTensor)
  const predictionArray = predictionTensor.dataSync(); // Extract the prediction value
  console.log(predictionArray)
  const prediction = predictionArray[0]; // Assuming a single prediction value
  console.log(prediction)
  return prediction;
}