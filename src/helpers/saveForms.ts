import {getStore} from "@/redusers";
import {Form} from "@/modules/Forms/Forms";

interface ISaveUnsavedFormsOptions {
    baseName?: string;
}

export function saveUnsavedForms(options: ISaveUnsavedFormsOptions = {}): Promise<boolean> {
    const store = getStore();
    const promises: Array<Promise<any>> = [];
    const forms = filterFormsByOptions(store.getState().form.unsavedForm, options);
    if (Object.keys(forms).length) {
        Object.values(forms).forEach(form => {
            promises.push(form.submitForm());
        });
        return Promise.all(promises).then(() => {
            Form.scrollToError = false;
            return new Promise<boolean>(resolve => {
                setTimeout(() => {
                    Form.scrollToError = true;
                    const unsavedForms = filterFormsByOptions(store.getState().form.unsavedForm, options);
                    resolve(!Object.keys(unsavedForms).length);
                }, 200);
            });
        }).catch(() => {
            Form.scrollToError = true;
            return Promise.resolve(false);
        });
    }
    return Promise.resolve(true);
}

function filterFormsByOptions(forms: {[key: string]: Form<any> }, options: ISaveUnsavedFormsOptions = {}): {[key: string]: Form<any> } {
    const result: {[key: string]: Form<any> } = {};
    Object.keys(forms).filter(key => {
        return !options.baseName || key.indexOf(options.baseName) !== -1;
    }).forEach(key => {
        result[key] = forms[key];
    });
    return  result;
}
