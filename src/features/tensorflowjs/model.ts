import * as tf from '@tensorflow/tfjs';

// Define the model
export function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, inputShape: [4], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  return model;
}
