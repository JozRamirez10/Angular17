import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./items.actions";

// Funciones definidas para las acciones de redux 

export const initialState = 0; // Estado inicial de las acciones

// switch sobre las funciones 
export const counterReducer = createReducer(
    initialState,
    // on(increment, (state, payload) => state + payload.add), // payload 1 -> Permite el paso de parametros
    on(increment, (state, {add}) => state + add), // payload 2 -> Permite el paso de parametros
    on(decrement, (state) => state - 1),
    on(reset, (state) => state = 0)
);