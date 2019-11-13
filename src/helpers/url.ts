import * as URLParse from "url-parse";
import {storage} from "@/lib/Storage";

export const objectToUrlParams = (object: { [name: string]: any }): string => {
    const result: string[] = [];
    Object.keys(object).forEach(key => {
        if (typeof object[key] === "object") {
            result.push(objectToUrlParam(object, key));
        } else {
            result.push(key + "=" + object[key]);
        }
    });
    return result.join("&");
};

export const objectToUrlParamsForFilters = (object: {[name: string]: string}, filtersName: string[], sort: string[], notFilterSlug: string[]): { params: string, filterSlug?: string } => {
    let filterSlugName: string = "";
    let filterSlug: string = "";
    const result: Array<{name: string, value: string}> = [];
    sort.forEach(sortItem => {
        if (filtersName.indexOf(sortItem) !== -1 && object[sortItem] && notFilterSlug.indexOf(sortItem) === -1) {
            filterSlugName = sortItem;
            if (object[sortItem].indexOf(",") === -1) {
                filterSlug = object[sortItem];
            } else {
                filterSlug = object[sortItem].split(",")[0];
            }
        }
    });
    Object.keys(object).forEach(key => {
        if (key !== filterSlugName) {
            result.push({
                name: key,
                value: object[key],
            });
        } else if (filterSlug !== object[key]) {
            const values = object[key].split(",").filter(item => {
                return item !== filterSlug;
            }).join(",");
            if (values) {
                result.push({
                    name: key,
                    value: values,
                });
            }
        }
    });

    return {
        filterSlug,
        params: result.sort((a, b) => {
            return sort.indexOf(a.name) > sort.indexOf(b.name) ? 1 : -1;
        }).map((item: {name: string, value: string}) => {
            return `${item.name}=${item.value}`;
        }).join("&"),
    };

};

export const objectToUrlParam = (object: any, key: string, level: number = 0): string => {
    let result = "";

    const currentObject = object[key];
    Object.keys(object[key]).forEach(objectKey => {
        if (!level) {
            result += key;
        }
        if (typeof currentObject[objectKey] === "object") {
            result += `[${objectKey}]` + objectToUrlParam(currentObject, objectKey, level + 1);
        } else {
            result += `[${objectKey}]=` + currentObject[objectKey];
        }
        if (!level) {
            result += "&";
        }

    });
    return !level ? result.substr(0, result.length - 1) : result;
};

export const urlParamsToObject = (url: string, keys?: string[]): { [name: string]: string | any } => {
    url = url.replace("?", "");
    url = decodeURI(url);
    const strParams = url.split("&");
    const params: { [name: string]: string | { [name: string]: string } } = {};
    strParams.forEach(strParam => {
        const param = strParam.split("=");
        if (param.length === 2) {
            if (param[0].indexOf("[") !== -1) {
                const arrayParams = param[0].split("[");
                if (!params[arrayParams[0]]) {
                    params[arrayParams[0]] = {};
                }
                const baseObject: any = {};
                let currentObject = baseObject;
                for (let i = 1; i < arrayParams.length; i++) {
                    const paramKey = arrayParams[i].replace("]", "");
                    if (i < arrayParams.length - 1) {
                        currentObject[paramKey] = {};
                        currentObject = currentObject[paramKey];
                    } else {
                        currentObject[paramKey] = param[1];
                    }
                }
                params[arrayParams[0]] = Object.assign(params[arrayParams[0]], baseObject);
            } else {
                params[param[0]] = param[1];
            }
        }
    });
    if (keys) {
        const result: { [name: string]: string | { [name: string]: string } } = {};
        keys.forEach(key => {
           if (params[key]) {
               result[key] = params[key];
           }
        });
        return result;
    }
    return params;
};

export const getCurrentUrl = () => {
    if (SERVER) {

        const context = storage.getItem("ctx");
        if (context && context.request && context.request.header) {
            if (context.request.header.referer) {
                return context.request.header.referer;
            }
            return `http://${context.request.header.host}${context.request.url}`;
        }
    } else {
        return location.href;
    }
};

export const getCurrentDomen = () => {
    const url = URLParse(getCurrentUrl());
    return url.origin;
};

export const getSubdomain = () => {
    const url = URLParse(getCurrentUrl());
    let hostname = url.hostname.replace("www.", "");
    const domainZone = url.hostname.split(".").pop();
    hostname = hostname.replace("." + domainZone, "");
    if (hostname.indexOf(".") !== -1) {
        return url.hostname.split(".").shift();
    }
    return "";
};

export const getParams = () => {
    const url = URLParse(getCurrentUrl());
    // @ts-ignore
    return urlParamsToObject(url.query as string);
};

export const redirectToSubDomain = (subdomains: string, currentUrl: string, uri: string | null = null, indcludeCustomDomain: boolean = true): string | boolean => {
    const domainTemplate = URL_TEMPLATE;
    const url = URLParse(currentUrl);
    if (subdomains) {
        subdomains = subdomains + ".";
    }
    const newDomain = domainTemplate.replace("{subdomains}", subdomains);
    if (newDomain === url.host) {
        return false;
    }
    if (uri) {
        url.set("pathname", uri);
    }
    let result = url.set("hostname", newDomain).toString();
    if (result !== currentUrl) {
        // @ts-ignore
        const params = urlParamsToObject(url.query as string);
        if (indcludeCustomDomain) {
            params.customDomain = "1";
        }
        const query = objectToUrlParams(params);
        url.set("query", "");
        result = url.toString() + "?" + query;
    }
    return result;
};
