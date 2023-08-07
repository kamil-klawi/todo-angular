import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TodoApiService } from 'src/app/core/services/todo-api.service';
import * as TodoListActions from './todo-list.action';

export const addToEffect = createEffect(
  (action$ = inject(Actions), todoApiService = inject(TodoApiService)) =>
    action$.pipe(
      ofType(TodoListActions.addTodo),
      switchMap((action) => {
        return todoApiService.postTodo(action.todo).pipe(
          map((todo) => TodoListActions.addTodoSuccess({ todo })),
          catchError((err) =>
            of(
              TodoListActions.addTodoFailed({
                errorMessage: 'Wystąpił błąd',
              })
            )
          )
        );
      })
    ),
  { functional: true }
);
