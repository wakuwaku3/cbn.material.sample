import { Cbn } from "../../lib/shared/cbn";
import { AppStore } from "../models/actions/shared/app-store";
import { connect } from "undux";

const store = Cbn.Undux.initializeStore(new AppStore(), {
    withLocalStorage: ['auth', 'theme']
});
export const getStore = () => store;
export const withStore = connect(store);
