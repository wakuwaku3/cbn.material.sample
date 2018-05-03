export namespace AjaxHelper {
  export const getTextAsync = async (url: string) => {
    const response = await fetch(url);
    return response.text();
  };
  export const getAsync = async <T>(url: string) => {
    const text = await getTextAsync(url);
    return JSON.parse(text);
  };
}
