/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as appliedGradeWeigths from "../appliedGradeWeigths.js";
import type * as assessments from "../assessments.js";
import type * as attendance from "../attendance.js";
import type * as auth from "../auth.js";
import type * as classes from "../classes.js";
import type * as classRecords from "../classRecords.js";
import type * as classroom from "../classroom.js";
import type * as enrollments from "../enrollments.js";
import type * as files from "../files.js";
import type * as finalGrades from "../finalGrades.js";
import type * as gradeLevel from "../gradeLevel.js";
import type * as http from "../http.js";
import type * as interventions from "../interventions.js";
import type * as quarterlyGrades from "../quarterlyGrades.js";
import type * as registrar from "../registrar.js";
import type * as schedules from "../schedules.js";
import type * as schoolPeriod from "../schoolPeriod.js";
import type * as schoolYear from "../schoolYear.js";
import type * as sections from "../sections.js";
import type * as students from "../students.js";
import type * as subjects from "../subjects.js";
import type * as systemSettings from "../systemSettings.js";
import type * as users from "../users.js";
import type * as values from "../values.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  appliedGradeWeigths: typeof appliedGradeWeigths;
  assessments: typeof assessments;
  attendance: typeof attendance;
  auth: typeof auth;
  classes: typeof classes;
  classRecords: typeof classRecords;
  classroom: typeof classroom;
  enrollments: typeof enrollments;
  files: typeof files;
  finalGrades: typeof finalGrades;
  gradeLevel: typeof gradeLevel;
  http: typeof http;
  interventions: typeof interventions;
  quarterlyGrades: typeof quarterlyGrades;
  registrar: typeof registrar;
  schedules: typeof schedules;
  schoolPeriod: typeof schoolPeriod;
  schoolYear: typeof schoolYear;
  sections: typeof sections;
  students: typeof students;
  subjects: typeof subjects;
  systemSettings: typeof systemSettings;
  users: typeof users;
  values: typeof values;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
