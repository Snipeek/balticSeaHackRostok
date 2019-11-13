import * as React from "react";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Column, Row} from "@/modules/Grid";
import {Form} from "@/modules/Form/Form";
import {Input} from "@/components/Input";
import * as Yup from "yup";
import "./sign-in.scss";
import gql from "graphql-tag";
import {useCookies} from "react-cookie";
import {SignInMutation, useSignInMutation} from "@/mutations/SignInMutation";
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {IStore} from "@/redusers";
import {ErrorParser} from "@/components/Error/ErrorParser";
import {IRouteSeo} from "@/redusers/seo";
import {actionChangeSeo} from "@/actions/seo";
import {Button, message} from "antd";
import {useTranslation} from "react-i18next";

const validationSchema = Yup.object().shape({
    login: Yup.string().required("Please use a valid email address."),
    password: Yup.string().min(6).required("Your password must be at least 6 characters long."),
});

const signInMutation = gql`
    mutation signIn($credentials: Credentials!){
        signIn(credentials: $credentials, rememberMe: true)
    }
`;

interface ISignInPageProps extends RouteComponentProps {
    user?: IProfile,
    changeSeo(seo: IRouteSeo): void;
}

export const SignInPage = (props: ISignInPageProps) => {

    if (props.user) {
        return null;
    }

    // @ts-ignore
    const [cookies, setCookie] = useCookies([]);

    const [t] = useTranslation();

    props.changeSeo({
        title: t("signIn.header.title"),
    });

    const initialValues = {
        login: "",
        password: "",
    };

    const [signIn, { error }] = useSignInMutation(signInMutation, {
        onCompleted: ({ signIn }) => {
            if (signIn) {
                setCookie("auth-token", signIn);
                setTimeout(() => {
                    props.history.push("/dashboard");
                }, 500);
            }
        },
        refetchQueries: ["profile"],
        onError: error => {
            message.error(`${("" + error).replace("Error: GraphQL error:", "")} 💁`);
        }
    });

    return (
        <>
            <Wrapper className="sign-in__wrapper">
                <Row className="justify-content-center">
                    <Column md={7} lg={4}>
                        <h2 className="sign-up__title">{t("signIn.content.title")}</h2>
                        <Form
                            initialValues={initialValues}
                            errors={new ErrorParser(error, initialValues).getFormValidationErrors()}
                            validationSchema={validationSchema}
                            onSubmit={({ values }) => {
                                signIn({ variables: {
                                    credentials: {
                                        ...values,
                                    }
                                }});
                            }}
                        >
                            {({ controlDecorator }) => (
                                <div>
                                    {controlDecorator({name: "login"}, ( <Input
                                        placeholder={t("input.email.label")}
                                        // label={t("input.email.placeholder")}
                                    />))}
                                    {controlDecorator({name: "password"}, ( <Input
                                        placeholder={t("input.password.label")}
                                        component="Password"
                                        // placeholder={t("input.password.placeholder")}
                                    />))}
                                    <Button
                                        type="primary"
                                        className="sign-up__submit"
                                        size="large"
                                        block
                                        htmlType="submit"
                                    >
                                        {t("common.signIn")}
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </Column>
                </Row>
            </Wrapper>
        </>
    );
};

export const SignInPageContainer = connect((store: IStore) => ({
    user: store.graphql.user,
}), dispatch => ({
    changeSeo: (seo: IRouteSeo) => dispatch(actionChangeSeo(seo))
}))(withRouter(SignInPage));
