export function formInputOnChange(name: string, value: any): React.ChangeEvent<any> {
    // @ts-ignore
    return {
        target: {
            name,
            value,
        },
    };
}
