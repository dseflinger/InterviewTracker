import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobApplicationState } from "./state";

const featureState = createFeatureSelector<JobApplicationState>("jobApplication");

export const allApplications = createSelector(featureState, s => s.jobApplications);
export const selectedApplication = createSelector(featureState, s => s.selectedApplication);
