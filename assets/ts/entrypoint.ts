import 'bootstrap';
import * as $ from 'jquery';
export namespace test {
    export async function render(id: string) {
        await $();
        let val = await $.get('test/get');
        $(`#${id}`).val(val);
    }
}
