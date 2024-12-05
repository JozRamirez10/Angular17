import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../app/services/user.service";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { add, addSuccess, findAllPageable, load, remove, removeSuccess, setErrors, update, updateSuccess } from "./users.action";
import { User } from "../app/models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects{
    
    loadUsers$;
    addUsers$;
    addSuccessUser$;
    updateUsers$;
    updateSuccessUser$;
    removeUsers$;
    removeSuccessUser$;

    constructor(
        private actions$: Actions,
        private service: UserService,
        private router: Router) { 
        
        this.loadUsers$ = createEffect(
            () => this.actions$.pipe(
                ofType(load),
                exhaustMap(action => this.service.findAllPageable(action.page)
                    .pipe(
                        map((pageable) => {
                            const users = pageable.content as User[];
                            const paginator = pageable;
                            
                            return findAllPageable({users, paginator});
                        }),
                        catchError((error) => of(error))
                    )
                )
            )
        );

        this.addUsers$ = createEffect(
            () => this.actions$.pipe(
                ofType(add),
                exhaustMap(action => this.service.create(action.userNew)
                    .pipe(
                        map((userNew) => addSuccess({userNew})),
                        catchError(error => (error.status == 400) ? of(setErrors({userForm: action.userNew, errors: error.error})) : of(error))
                    )
                )
            )
        );
    
        this.addSuccessUser$ = createEffect( 
            () => this.actions$.pipe(
                ofType(addSuccess),
                tap( () => {
                    this.router.navigate(['/users']);
                    Swal.fire({
                        title: "Usuario creado",
                        text: "¡Usuario creado con éxito!",
                        icon: "success"
                    });
                })
            ), 
            {dispatch: false} 
        );
    
        this.updateUsers$ = createEffect(
            () => this.actions$.pipe(
                ofType(update),
                exhaustMap(action => this.service.update(action.userUpdate)
                    .pipe(
                        map((userUpdate) => updateSuccess({userUpdate})),
                        catchError(error => (error.status == 400) ? of(setErrors({userForm: action.userUpdate, errors: error.error})) : of(error))
                    )
                )
            )
        );
    
        this.updateSuccessUser$ = createEffect( 
            () => this.actions$.pipe(
                ofType(updateSuccess),
                tap( () => {
                    this.router.navigate(['/users']);
                    Swal.fire({
                        title: "Usuario actualizado",
                        text: "¡Usuario editado con éxito!",
                        icon: "success"
                    });
                })
            ), 
            {dispatch: false} 
        );
    
        this.removeUsers$ = createEffect(
            () => this.actions$.pipe(
                ofType(remove),
                exhaustMap(action => this.service.remove(action.id)
                    .pipe(
                        map( () => removeSuccess({id: action.id}))
                    )
                )
            )
        );
    
        this.removeSuccessUser$ = createEffect( 
            () => this.actions$.pipe(
                ofType(removeSuccess),
                tap( () => {
                    this.router.navigate(['/users']);
                    Swal.fire({
                        title: "Eliminado",
                        text: "El usuario ha sido eliminado",
                        icon: "success"
                    });
                })
            ), 
            {dispatch: false} 
        );
    }
}