import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobApplicationService } from "../services/job-application.service";
import { JobApplicationActions } from "./job-application-actions";
import { catchError, map, of, switchMap } from "rxjs";
import { inject, Injectable } from '@angular/core';

@Injectable()
export class JobApplicationEffects {
    private actions$ = inject(Actions);
    private jobApplicationService = inject(JobApplicationService);
    // constructor(
    //     private actions$: Actions,
    //     private jobApplicationService: JobApplicationService
    // ) { }

    loadApplications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobApplicationActions.loadApplications),
            switchMap(() => {
                // return of(JobApplicationActions.loadApplicationsFalure({ error: 'test' }));
                return this.jobApplicationService.getAll().pipe(
                    map(applications => JobApplicationActions.loadApplicationsSuccess({ applications })),
                    catchError(error => of(JobApplicationActions.loadApplicationsFalure({ error })))
                )
            })
        )
    )
}