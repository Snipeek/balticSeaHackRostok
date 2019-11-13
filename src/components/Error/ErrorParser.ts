import {ApolloError} from "apollo-client";
import {GraphQLError} from "graphql";
import * as _ from "lodash";
// @ts-ignore
import * as unFlatten from "unflatten";
// import {objectToMap} from "@/helpers/objectToMap";

interface IGraphQLValidationErrorItem {
    [name: string]: string[];
}

interface IGraphQLValidationError extends GraphQLError {
    validation: IGraphQLValidationErrorItem;
}

export class ErrorParser<Values> {

    // @ts-ignore
    public constructor(private error: ApolloError | undefined, private initialValue: Values) {
    }

    public getFormValidationErrors() {
        return parseServerError(this.error);
    }
}

interface IParseServerErrorOptions {
    scheme?: "default" | "crud";
}

// const q = {
//     graphQLErrors: [{
//         message: "validation",
//         type: "validation",
//         locations: [{line: 2, column: 3}],
//         validation: {create: [
//             [{resume_id: ["Портфолио уже привязано"]}],
//         ]},
//     }], networkError: null, message: "GraphQL error: validation",
// };

export function parseServerError(error: ApolloError | undefined, options?: IParseServerErrorOptions): stateErrors<any> | undefined {

    options = Object.assign({
        scheme: "default",
    }, options);
    let errors: stateErrors<any> = {};
    if (error) {
        switch (options.scheme) {
            case "default":
                errors = parseServerErrorDefault(error);
                break;
            case "crud":
                errors = parseServerErrorCrud(error);
                break;
        }
    }
    return Object.keys(errors).length ? errors : undefined;
}

function parseServerErrorDefault(error: ApolloError): stateErrors<any> {
    const errors: stateErrors<any> = {};
    error.graphQLErrors.forEach(error => {
        if (error.message === "validation") {

            if (Array.isArray((error as IGraphQLValidationError).validation)) {
                // @ts-ignore
                _.flattenDeep((error as IGraphQLValidationError).validation).forEach(item => {
                    if (_.isObject(item)) {
                        Object.keys(item).forEach(field => {
                            errors[field] = (item as any)[field];
                        });
                    }
                });
            } else {
                Object.keys((error as IGraphQLValidationError).validation).forEach(field => {
                    const errorItem = ((error as IGraphQLValidationError).validation as any)[field];
                    errors[field] = _.isArray(errorItem) ? errorItem[0] : errorItem;
                });
            }
        }
    });
    return errors;
}

function parseServerErrorCrud(error: ApolloError): stateErrors<any> {
    const errors: stateErrors<any> = {};
    error.graphQLErrors.forEach(error => {
        if (error.message === "validation") {
            let validation: any;

            if (Array.isArray((error as IGraphQLValidationError).validation)) {
                // @ts-ignore
                _.flattenDeep((error as IGraphQLValidationError).validation).forEach(item => {
                    if (_.isObject(item)) {
                        Object.keys(item).forEach(field => {
                            errors[field.replace(/^create.|^update.|^delete./, "")] = (item as any)[field];
                        });
                    }
                });
            } else {
                validation = _.cloneDeep((error as IGraphQLValidationError).validation);

                Object.keys(validation).forEach(fieldName => {
                    errors[fieldName.replace(/^create.|^update.|^delete./, "")] = validation[fieldName];
                });
            }
        }
    });
    return errors;
}
