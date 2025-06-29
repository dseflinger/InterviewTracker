import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobApplicationService } from "../services/job-application.service";
import { JobApplicationActions } from "./job-application-actions";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { inject, Injectable } from '@angular/core';
import { JobApplication } from "./state";
import { selectedApplication } from "./job-application-selectors";
import { Store } from "@ngrx/store";

@Injectable()
export class JobApplicationEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private jobApplicationService = inject(JobApplicationService);

    loadApplications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.loadApplications),
            switchMap(() => {
                return this.jobApplicationService.getAll().pipe(
                    map(applications => JobApplicationActions.loadApplicationsSuccess({ applications })),
                    catchError(error => of(JobApplicationActions.loadApplicationsFalure({ error })))
                )
            })
        )
    )

    createApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.createApplication),
            switchMap((action) => {
                return this.jobApplicationService.add(action.createApp).pipe(
                    map(id => JobApplicationActions.createApplicationSuccess({ id })),
                    catchError(error => of(JobApplicationActions.createApplicationFailure({ error })))
                )
            })
        )
    )

    getApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.loadApplication),
            switchMap((action) => {
                return this.jobApplicationService.getById(action.id).pipe(
                    map(application => JobApplicationActions.loadApplicationSuccess({ application })),
                    catchError(error => of(JobApplicationActions.loadApplicationFailure({ error })))
                )
            })
        )
    )

    deleteApplication = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.deleteApplication),
            switchMap((action) => {
                return this.jobApplicationService.delete(action.id)
                    .pipe(
                        map((isDeleted) => JobApplicationActions.deleteApplicationSuccess({ isDeleted })),
                        catchError((error) => of(JobApplicationActions.deleteApplicationFailure({ error })))
                    )
            })
        )
    )

    updateApplication = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.updateApplication),
            withLatestFrom(this.store.select(selectedApplication)),
            switchMap(([action, currentApp]) => {
                if (currentApp === null)
                    return of(JobApplicationActions.updateApplicationFailure({ error: 'no application selected' }));

                var updatedApp = action.updateApp;
                var updatedApplication: JobApplication = {
                    ...currentApp,
                    ...action.updateApp,
                    dateApplied: currentApp.dateApplied!,

                }
                return this.jobApplicationService.update(updatedApp.id, updatedApp).pipe(
                    map(() => JobApplicationActions.updateApplicationSuccess({ updatedApplication })),
                    catchError((error) => of(JobApplicationActions.updateApplicationFailure({ error })))
                )
            })
        )
    )
}