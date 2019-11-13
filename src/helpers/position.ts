export interface IPosition {
    top: number;
    left: number;
}

export function position(child: HTMLElement, parent?: HTMLElement): IPosition {
    if (parent) {
        return parentPosition(child, parent, {left: child.offsetLeft, top: child.offsetTop});
    }
    return {
        top: child.offsetTop,
        left: child.offsetLeft,
    };
}

function parentPosition(child: HTMLElement, parent: HTMLElement, position: IPosition): IPosition {
    if (SERVER) {
        return position;
    }
    // @ts-ignore
    const offsetParent: HTMLElement = child.offsetParent;
    if (offsetParent) {
        if (offsetParent.isEqualNode(parent)) {
            return position;
        } else {
            position.left += offsetParent.offsetLeft;
            position.top += offsetParent.offsetTop;
            return parentPosition(offsetParent, parent, position);
        }
    }
    return  position;
}
