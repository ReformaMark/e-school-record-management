import * as tf from "@tensorflow/tfjs";
import { normalize } from "./utils";

interface StudentData {
  ComponentID: number;  // 1 = WW, 0 = PT
  ComponentRate: number;
  HPS: number;
  Avg: number;
  RemarksID: number;  // 1 = Pass, 0 = Fail
}

// Dataset
const data: StudentData[] = [
  { ComponentID: 1, ComponentRate: 4, HPS: 3.5, Avg: 90, RemarksID: 1 }, // Pass
  { ComponentID: 1, ComponentRate: 2, HPS: 2.5, Avg: 60, RemarksID: 0 }, // Fail
  { ComponentID: 0, ComponentRate: 3.5, HPS: 4.0, Avg: 85, RemarksID: 1 }, // Pass
  { ComponentID: 0, ComponentRate: 1.5, HPS: 2.0, Avg: 50, RemarksID: 0 }  // Fail
];

// Normalization ranges
const MIN_VALUES = { ComponentID: 0, ComponentRate: 1.5, HPS: 2, Avg: 50 };
const MAX_VALUES = { ComponentID: 1, ComponentRate: 4, HPS: 4, Avg: 90 };

// Convert data into normalized tensors
export const prepareData = () => {
  const inputs = data.map((d) => [
    normalize(d.ComponentID, MIN_VALUES.ComponentID, MAX_VALUES.ComponentID),
    normalize(d.ComponentRate, MIN_VALUES.ComponentRate, MAX_VALUES.ComponentRate),
    normalize(d.HPS, MIN_VALUES.HPS, MAX_VALUES.HPS),
    normalize(d.Avg, MIN_VALUES.Avg, MAX_VALUES.Avg),
  ]);

  const labels = data.map((d) => [d.RemarksID]);

  return {
    xs: tf.tensor2d(inputs),
    ys: tf.tensor2d(labels),
  };
};
