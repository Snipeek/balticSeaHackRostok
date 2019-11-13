import {getInitialState} from "@/redusers/getInitialState";
import {ADD_UNSAVED_FORM, REMOVE_UNSAVED_FORM} from "@/actions/form";
import {Form} from "@/Forms/Forms";

const initialState: IStoreForm = getInitialState("form", {
    unsavedForm: {},
});

export interface IStoreForm {
    unsavedForm: {[key: string]: Form<any> };
}

export default function form(store = initialState, action: any): IStoreForm {
    switch (action.type) {
        case ADD_UNSAVED_FORM:
            return {...store, unsavedForm: {...store.unsavedForm, [action.name]: action.form}};
        case REMOVE_UNSAVED_FORM:
            delete store.unsavedForm[action.name];
            return {...store, unsavedForm: {...store.unsavedForm}};
        default:
            return store;
    }
}
