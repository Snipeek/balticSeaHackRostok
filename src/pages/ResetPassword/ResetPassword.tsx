import * as React from "react";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Column, Row} from "@/modules/Grid";
import {Form} from "@/modules/Form/Form";
import {Input} from "@/components/Input";
import {Button, color, size} from "@/components/Button";
import * as Yup from "yup";
import "./reset-password.scss";
import {RouteComponentProps} from "react-router";

export interface IResetPasswordPageParams { id?: string; }

interface IResetPasswordPageProps extends RouteComponentProps<IResetPasswordPageParams> {
}


const validationSchema = Yup.object().shape({
    // TODO: match passwords
    password: Yup.string().min(6).required("Your password must be at least 6 characters long."),
    password_repeat: Yup.string().min(6).required("Your password must be at least 6 characters long."),
});

export const ResetPasswordPage = (props: IResetPasswordPageProps) => {
    return (
        <>
            <div className="reset-password__bg">
                <img src="/static/sign__bg.svg" />
            </div>
            <Wrapper className="reset-password__wrapper">
                <Row className="justify-content-center">
                    <Column md={6}>
                        <h1 className="h1 text-center">Reset password</h1>
                        <Form
                            initialValues={{}}
                            validationSchema={validationSchema}
                            onSubmit={() => {

                            }}
                        >
                            {({ controlDecorator }) => (
                                <div>
                                    <div>
                                        request id: {props.match.params.id}
                                    </div>
                                    {controlDecorator({name: "password"}, ( <Input
                                        label="Password"
                                        placeholder="********"
                                    />))}
                                    {controlDecorator({name: "password_repeat"}, ( <Input
                                        label="Repeat password"
                                        placeholder="********"
                                    />))}
                                    <div className="text-center">
                                        <Button className="reset-password__submit" color={color.primary} size={size.big}>
                                            Save
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
