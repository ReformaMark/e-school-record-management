import * as tf from "@tensorflow/tfjs";

export const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [4], units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 4, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" })); // Sigmoid for binary classification

  model.compile({
    optimizer: tf.train.adam(),
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
};
