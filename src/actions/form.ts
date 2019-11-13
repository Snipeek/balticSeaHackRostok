import {Form} from "@/modules/Forms/Forms";

export const ADD_UNSAVED_FORM = "add_unsaved_form";
export const REMOVE_UNSAVED_FORM = "remove_unsaved_form";

export const actionAddUnsavedForm = (name: string, form: Form<any>) => {
    return {
        type: ADD_UNSAVED_FORM,
        name,
        form,
    };
};

export const actionRemoveUnsavedForm = (name: string) => {
    return {
        type: REMOVE_UNSAVED_FORM,
        name,
    };
};
