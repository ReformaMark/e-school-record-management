'use client'
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const useModel = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const newModel = tf.sequential();
      newModel.add(tf.layers.dense({ units: 8, inputShape: [4], activation: "relu" }));
      newModel.add(tf.layers.dense({ units: 4, activation: "relu" }));
      newModel.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
      
      newModel.compile({
        optimizer: "adam",
        loss: "binaryCrossentropy",
        metrics: ["accuracy"],
      });

      setModel(newModel);
    };

    loadModel();
  }, []);

  return model;
};

export default useModel;
