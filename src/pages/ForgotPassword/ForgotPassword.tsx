import * as React from "react";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Column, Row} from "@/modules/Grid";
import {Form} from "@/modules/Form/Form";
import {Input} from "@/components/Input";
import {Button, color, size} from "@/components/Button";
import * as Yup from "yup";
import "./forgot-password.scss";

const validationSchema = Yup.object().shape({
    // TODO: match passwords
    password: Yup.string().min(6).required("Your password must be at least 6 characters long."),
    password_repeat: Yup.string().min(6).required("Your password must be at least 6 characters long."),
});

export const ForgotPasswordPage = () => {
    return (
        <>
            <div className="forgot-password__bg">
                <img src="/static/sign__bg.svg" />
            </div>
            <Wrapper className="forgot-password__wrapper">
                <Row className="justify-content-center">
                    <Column md={6}>
                        <h1 className="h1 text-center">Forgot your password?</h1>
                        <Form
                            initialValues={{}}
                            validationSchema={validationSchema}
                            onSubmit={() => {

                            }}
                        >
                            {({ controlDecorator }) => (
                                <div>
                                    {/* TODO: approving email */}
                                    {controlDecorator({name: "email"}, ( <Input
                                        label="Email address"
                                        placeholder="bruno@company.com"
                                    />))}
                                    <div className="text-center">
                                        <Button className="forgot-password__submit" color={color.primary} size={size.big}>
                                            Reset password
                                        </Button>
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
