import { notification as notificationAnt } from "antd";
import classNames from "classnames";
import "./notification.scss";

export enum notificationType {
    info = "info",
    danger = "danger",
    success = "success",
}

interface INotification {
    type?: notificationType;
    message?: string;
}

export const notification = (props: INotification) => {
    notificationAnt.open({
        message: props.message,
        icon: null,
        className: classNames("notification", `notification_${props.type || notificationType.info}`),
        // @ts-ignore
        placement: "topCenter",
        // duration: 10000
    });
};