import {ReactChild, useState} from "react";
import {ObjectSchema} from "yup";
import * as React from "react";

export interface IControlDecoratorConfig {
    name: string;
}

export interface IFormRenderProps<Values> {
    values: Values;

    resetForm(): any;
    submitForm(): any;

    controlDecorator(config: IControlDecoratorConfig, component: any): any;
}

interface IFormProps<Values> {
    initialValues: Values;
    errors?: stateErrors<Values>;
    validationSchema?: ObjectSchema<{}>;
    onSubmit(args: any): any;
    handleClickOutside?(args: any): any;

    children(params: IFormRenderProps<Values>): ReactChild | ReactChild[] | null;
}

type stateErrors<Values> = {
    [K in keyof Values]?: string;
};

interface IFormState<Values> {
    values: Values;
    errors: stateErrors<Values>;
}

export function Form<Values>(props: IFormProps<Values>) {

    // const node = useRef(null);

    const initialState: IFormState<Values> = {
        values: { ...props.initialValues },
        errors: {},
    };

    const [state, setState] = useState(initialState);

    // if (props.handleClickOutside) {
    //     useEffect(() => {
    //         document.addEventListener("mousedown", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }, [ state ]);
    //
    //     const handleClickOutside = (e: any) => {
    //         if (props.handleClickOutside && !(node && node.current && (node.current as any).contains(e.target)) ) {
    //             props.handleClickOutside({
    //                 submitForm,
    //             });
    //         }
    //     };
    // }

    const resetForm = () => {
        setState({
            ...state,
            values: { ...props.initialValues },
        });
    };

    const formValidation = () => {
        const errors: stateErrors<Values> = {};

        if (props.validationSchema) {
            try {
                props.validationSchema.validateSync(state.values, {abortEarly: false});
            } catch (ValidationErrors) {
                ValidationErrors.inner.forEach((validateError: any) => {
                    const name = validateError.path;
                    if (name) {
                        errors[name as keyof Values] = validateError.message;
                    }
                });
            }
        }

        return errors;
    };

    const submitForm = () => {
        const errors = formValidation();

        if (Object.keys(errors).length) {
            setState({
                ...state,
                errors,
            });
            return;
        }

        props.onSubmit({
            values: {
                ...state.values,
            },
            resetForm,
        });
    };

    const onSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        submitForm();
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        const values: Values = {
            ...state.values,
            [e.target.name]: e.target.value,
        };
        if (state.errors[e.target.name as keyof Values]) {
            delete state.errors[e.target.name as keyof Values];
        }
        setState({
            ...state,
            values,
        });
    };

    const controlDecorator = (config: IControlDecoratorConfig, component: any): any => {
        return React.cloneElement(component, {
            onChange: handleChange,
            name: config.name,
            value: state.values[config.name as keyof Values],
            error: state.errors[config.name as keyof Values] || undefined,
            ...component.props,
        });
    };

    return (
        <form noValidate={true} onSubmit={onSubmit} className="form">
            {props.children({
                values: state.values,
                resetForm,
                submitForm,
                controlDecorator,
            })}
        </form>
    );
}
