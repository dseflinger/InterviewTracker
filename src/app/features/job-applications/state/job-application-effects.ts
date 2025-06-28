import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobApplicationService } from "../services/job-application.service";
import { JobApplicationActions } from "./job-application-actions";
import { catchError, map, of, switchMap } from "rxjs";
import { inject, Injectable } from '@angular/core';

@Injectable()
export class JobApplicationEffects {
    private actions$ = inject(Actions);
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
}