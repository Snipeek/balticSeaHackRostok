import * as React from "react";

import "./header.scss";
// import {Button, mode} from "@/components/Button";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {Avatar} from "@/components/Avatar/Avatar";
import {Billing} from "@/components/Billing/Billing";
import {positionSeptum, Septum} from "@/components/Septum/Septum";
import {connect} from "react-redux";
import {IStore} from "@/redusers";
import {useCookies} from "react-cookie";
import {Button, Dropdown, Icon, Menu} from "antd";
import {useTranslation} from "react-i18next";

interface IHeader extends RouteComponentProps {
    title: string;
    user?: IProfile;
}

export const Header = (props: IHeader) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [t, i18n] = useTranslation();

    const menu = () => (
        <Menu>
            {i18n.store && Object.keys(i18n.store.data).map(lang => (
                <Menu.Item key={lang} onClick={() => {
                    i18n.changeLanguage(lang);
                }}>
                    {lang}
                </Menu.Item>
            ))}
        </Menu>
    );

    const renderLang = () => (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            className="header__lang"
        >
            <a className="header__lang-link" href="#">
                {i18n.language} <Icon type="down" />
            </a>
        </Dropdown>
    );

    return (
        <header className="header">
            <Link to={props.user ? "/" : "/"} className="header__logo">
                {/*<img src="/static/logo.svg" title={props.title}/>*/}
                {props.title}
            </Link>
            <div className="header__account">
                {!!props.user ? (
                    <>
                        {/*<Billing count={props.user.balance} />*/}
                        {/*<Septum position={positionSeptum.vertical} />*/}

                        {/*{renderLang()}*/}

                        {/*<Septum position={positionSeptum.vertical} />*/}

                        <Avatar onClick={() => {
                            removeCookie("auth-token");
                            setTimeout(() => {
                                location.reload();
                            }, 300);
                        }} name={props.user.login} />
                    </>
                ) : (
                    <>
                        {/*{renderLang()}*/}

                        {/*<Septum position={positionSeptum.vertical} />*/}

                        {props.history.location.pathname !== "/sign-in" ? (
                            <Button className="header__sign-in" type="link" onClick={() => {
                                props.history.push("/sign-in")
                            }}>
                                {t("common.signIn")}
                            </Button>
                        ) : (
                            <Button className="header__sign-in" type="link" onClick={() => {
                                props.history.push("/sign-up")
                            }}>
                                {t("common.signUp")}
                            </Button>
                        )}
                        {/*<Button to="/sign-in" mode={mode.link} className="header__sign-in">*/}
                            {/*Sign In*/}
                        {/*</Button>*/}
                        {/*<Button to="/sign-up">*/}
                            {/*Sign up*/}
                        {/*</Button>*/}
                    </>
                )}
            </div>
        </header>
    );
};

export const HeaderContainer = connect((store: IStore) => ({
    user: store.graphql.user,
}))(withRouter(Header));
