import * as React from "react";
import {useState} from "react";
import * as Yup from "yup";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Form} from "@/modules/Form/Form";
import {Input} from "@/components/Input";
import {Column, Row} from "@/modules/Grid";
import {Link} from "@/components/Link";
import "./sign-up.scss";
import {useRequestCodeMutation} from "@/mutations/RequestCodeMutation";
import gql from "graphql-tag";
import {useCompanyRegistrationMutation} from "@/mutations/CompanyRegistrationMutation";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {IStore} from "@/redusers";
import {IRouteSeo} from "@/redusers/seo";
import {actionChangeSeo} from "@/actions/seo";
import {useSignInMutation} from "@/mutations/SignInMutation";
import {useCookies} from "react-cookie";
import {Trans, useTranslation} from "react-i18next";
import {Button, message, Select} from "antd";

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please use a valid email address."),
    name: Yup.string().required("Please enter your full name."), // TODO имя
    password: Yup.string().min(6).required("Your password must be at least 6 characters long."),
});

const requestCodeMutation = gql`
    mutation requestCode($email: String!){
        requestCode(email: $email)
    }
`;

const companyRegistrationMutation = gql`
    mutation companyRegistration($request: RegisterCompanyInput!){
        companyRegistration(request: $request)
    }
`;

const signInMutation = gql`
    mutation signIn($credentials: Credentials!){
        signIn(credentials: $credentials, rememberMe: true)
    }
`;

interface ISignUpPageProps extends RouteComponentProps {
    user?: IProfile,
    changeSeo(seo: IRouteSeo): void;
}

export const SignUpPage = (props: ISignUpPageProps) => {

    if (props.user) {
        return null;
    }

    // Cookies

    // @ts-ignore
    const [cookies, setCookie] = useCookies([]);

    // Translation

    const [t] = useTranslation();

    // Step state

    let [step, setStep] = useState(1);

    /* ------ Mutation ------ */

    // onErrorHandle
    const onError = (error) => {
        message.error(`${("" + error).replace("Error: GraphQL error:", "")} 💁`)
    };

    let signInValues = {};

    const [signIn] = useSignInMutation(signInMutation, {
        onCompleted: ({ signIn }) => {
            if (signIn) {
                setCookie("auth-token", signIn);
                props.history.push("/dashboard");
            }
        },
        // refetchQueries: [""],
        onError,
    });

    const [companyRegistration] = useCompanyRegistrationMutation(companyRegistrationMutation, {
        onCompleted: ({ companyRegistration }) => {
            if (companyRegistration) {
                message.success(t("message.success.companyRegistration"));

                console.log(signInValues);
                // @ts-ignore
                signIn({
                    variables: {
                        credentials: {
                            ...signInValues,
                        }
                    }
                });
            }
        },
        onError,
    });

    const [requestCode] = useRequestCodeMutation(requestCodeMutation, {
        onCompleted: ({ requestCode }) => {
            if (requestCode) {
                message.success(t("message.success.requestCode"));
                setStep(step + 1);
            }
        },
        onError,
    });

    /* ------ End ------ */

    props.changeSeo({
        title: t("signUp.header.title"),
    });

    return (
        <>
            <Wrapper className="sign-up__wrapper">
                <Row className="justify-content-center">
                    <Column md={7} lg={4}>
                        <h2 className="sign-up__title">{t("signUp.content.title")}</h2>
                        <Form
                            initialValues={{}}
                            validationSchema={validationSchema}
                            onSubmit={({ values }) => {
                                if (step > 1) {

                                    signInValues = {
                                        ...values,
                                    };

                                    companyRegistration({
                                        variables: {
                                            request: {
                                                ...values,
                                            }
                                        }
                                    });
                                    return;
                                }

                                requestCode({ variables: { email: values.email } });
                            }}
                        >
                            {({ controlDecorator }) => (
                                <div>
                                    {controlDecorator({name: "email"}, ( <Input
                                        disabled={step > 1}
                                        placeholder={t("input.email.label")}
                                        // label={t("input.email.placeholder")}
                                    />))}
                                    {controlDecorator({name: "name"}, ( <Input
                                        disabled={step > 1}
                                        placeholder={t("input.name.label")}
                                        // label={t("input.name.placeholder")}
                                    />))}
                                    {controlDecorator({name: "password"}, ( <Input
                                        disabled={step > 1}
                                        component="Password"
                                        placeholder={t("input.password.label")}
                                        // placeholder={t("input.password.placeholder")}
                                    />))}
                                    <Select
                                        size="large"
                                        placeholder={t("input.userType.label")}
                                        optionFilterProp="children"
                                        disabled
                                    >
                                        <Select.Option value="d">{t("input.userType.values.maker")}</Select.Option>
                                        <Select.Option value="lucy">{t("input.userType.values.anal")}</Select.Option>
                                    </Select>
                                    {step > 1 ? (
                                        controlDecorator({name: "code"}, ( <Input
                                            placeholder={t("input.code.label")}
                                            // placeholder={t("input.code.placeholder")}
                                        />))
                                    ) : null}
                                    <Button
                                        type="primary"
                                        className="sign-up__submit"
                                        size="large"
                                        block
                                        htmlType="submit"
                                    >
                                        {t("common.continue")}
                                    </Button>
                                    <div className="sign-up__text">
                                        <Trans i18nKey="signUp.content.terms">
                                            By clicking "Continue" I agree to nrboom’s <a href="https://nrboom.com/terms" target="_blank">Terms of Service</a> and <a href="https://nrboom.com/privacy" target="_blank">Privacy Policy</a>.
                                        </Trans>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Column>
                </Row>
            </Wrapper>
        </>
    );
};


export const SignUpPageContainer = connect((store: IStore) => ({
    user: store.graphql.user,
}), dispatch => ({
    changeSeo: (seo: IRouteSeo) => dispatch(actionChangeSeo(seo))
}))(withRouter(SignUpPage));;