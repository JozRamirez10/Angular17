// Definición de las acciones de redux

import { createAction, props } from "@ngrx/store";
                                                                    
export const increment = createAction('[Counter Component] Increment', 
    props<{add: number}>() ); // parámetros de la función
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');