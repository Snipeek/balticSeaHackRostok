import * as React from "react";

interface IErrorProps {
    error?: object;
}

export const Error = (props: IErrorProps = {error: {}}) => {
    console.error(props.error);
    return (
        <div>
            <span>Error</span>
            <pre>{JSON.stringify(props.error, null, 2)}</pre>
        </div>
    );
};
