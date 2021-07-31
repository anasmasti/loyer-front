import { createAction, props } from "@ngrx/store";

export const setLoadingAction = createAction('[Shared State] set loading',
    props<{ status: boolean }>())