import {animateScroll as scroll} from "react-scroll/modules";
import {inputErrorClasses} from "@/data/errors";

let timeout: number = 0;

export function scrollToError(offsetTop = 80, container: HTMLElement | Document = document) {
    if (timeout) {
        clearTimeout(timeout);
    }
    // @ts-ignore
    timeout = setTimeout(() => {
        const element = container.querySelector(inputErrorClasses);
        if (element) {
            const doc = document.documentElement;
            const top = (window.pageYOffset || doc!.scrollTop) - (doc!.clientTop || 0);
            scroll.scrollTo(top + element.getBoundingClientRect().top - offsetTop - 50);
        }
    }, 100);
}
