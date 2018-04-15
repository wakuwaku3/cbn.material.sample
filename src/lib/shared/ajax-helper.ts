export namespace AjaxHelper {
    export const getTextAsync = async (url: string) => {
        let response = await fetch(url);
        return response.text();
    };
    export const getAsync = async <T>(url: string) => {
        let text = await getTextAsync(url);
        return JSON.parse(text);
    };
}
