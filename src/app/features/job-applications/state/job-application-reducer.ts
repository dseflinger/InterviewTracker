import { createReducer, on } from "@ngrx/store";
import { JobApplicationState } from "./state";
import { JobApplicationActions } from "./job-application-actions";

const initialState: JobApplicationState = {
    jobApplications: [],
    selectedApplication: null,
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
    on(JobApplicationActions.loadApplication, state => ({ ...state, loading: true })),
    on(JobApplicationActions.loadApplicationSuccess, (state, { application }) => ({
        ...state,
        selectedApplication: application,
        loading: false
    })),
    on(JobApplicationActions.loadApplicationFailure, state => ({ ...state, loading: false })),
    on(JobApplicationActions.loadApplicationsFalure, state => ({ ...state, loading: false })),

    on(JobApplicationActions.updateApplication, state => ({ ...state, loading: true })),
    on(JobApplicationActions.updateApplicationSuccess, (state, { updatedApplication }) => ({ ...state, loading: false, selectedApplication: updatedApplication })),
    on(JobApplicationActions.updateApplicationFailure, (state) => ({ ...state, loading: false })),

    on(JobApplicationActions.createApplication, (state) => ({ ...state, loading: true })),
    on(JobApplicationActions.createApplicationSuccess, (state) => ({ ...state, loading: false })),
    on(JobApplicationActions.createApplicationFailure, (state) => ({ ...state, loading: false }))
)