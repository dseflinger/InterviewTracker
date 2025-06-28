// actions

import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateApplication as CreateApplication, JobApplication, UpdateApplication } from "./state";

// export const loadApplications = createAction('[Job Application] load applications');  // todo maybe add optional props like date, sort? should i try createActionGroup for success?


// export const getApplicationById = createAction('[Job Application] get application', props<{ id: string }>());
// export const createApplication = createAction('[Job Application] create application', props<{ createApp: CreateApplication }>());
// export const deleteApplication = createAction('[Job Application] delete application', props<{ id: string }>());
// export const updateApplication = createAction('[Job Application] delete application', props<{ updateApp: UpdateApplication }>());

export const JobApplicationActions = createActionGroup({
    source: 'Job Application',
    events: {
        'Load Applications': emptyProps(),
        'Load Applications Success': props<{ applications: JobApplication[] }>(),
        'Load Applications Falure': props<{ error: string }>(),

        'Load Application': props<{ id: string }>(),
        'Load Application Success': props<{ application: JobApplication }>(),
        'Load Application Failure': props<{ error: string }>(),

        'Create Application': props<{ createApp: CreateApplication }>(),
        'Create Application Success': props<{ id: string }>(),
        'Create Application Failure': props<{ error: string }>(),

        'Delete Application': props<{ id: string }>(),
        'Delete Application Success': props<{ id: string }>(),
        'Delete Application Failure': props<{ error: string }>(),

        'Select Application': props<{ id: string }>(),
    }
})