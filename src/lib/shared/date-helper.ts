export namespace DateHelper {
  export const now = () => new Date(Date.now());
  export const format = (date: Date, formatter: string) => {
    if (!formatter) { formatter = 'YYYY-MM-DD hh:mm:ss.SSS'; }
    formatter = formatter.replace(/YYYY/g, date.getFullYear().toString());
    formatter = formatter.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    formatter = formatter.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    formatter = formatter.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    formatter = formatter.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    formatter = formatter.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (formatter.match(/S/g)) {
      const milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      const length = formatter.match(/S/g).length;
      for (let i = 0; i < length; i++) {
        formatter = formatter.replace(/S/, milliSeconds.substring(i, i + 1));
      }
    }
    return formatter;
  };
}
