import { createReducer, on } from "@ngrx/store";
import { JobApplicationState } from "./state";
import { JobApplicationActions } from "./job-application-actions";
// import * as Actions from "./job-application-actions";


const initialState: JobApplicationState = {
    jobApplications: [],
    selectedApplication: null,
    error: null,
    loading: false,
}

export const jobApplicationReducer = createReducer(
    initialState,
    on(JobApplicationActions.loadApplications, state => ({ ...state, loading: true })),
    on(JobApplicationActions.loadApplicationsSuccess, (state, { applications }) => ({
        ...state,
        jobApplications:
            applications,
        loading: false
    })),
    on(JobApplicationActions.loadApplicationsFalure, state => ({ ...state, loading: true })),

)
