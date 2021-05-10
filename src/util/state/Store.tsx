import { createStore, combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import { CheckoutReducer } from "./CheckoutReducer";
import { BasketReducer } from "./BasketReducer";

const persistConfig = {
    key: "checkout",
    storage: storage,
};

const Reducer = combineReducers({
    basket: BasketReducer,
    checkout: CheckoutReducer,
});

const Store = () => {
    if (typeof window === 'undefined') {
        return createStore(Reducer);
    }

    const { persistStore, persistReducer } = require("redux-persist");
    const persistedReducer = persistReducer(persistConfig, Reducer);

    const store = createStore(persistedReducer);

    store.__persistor = persistStore(store);

    return store;
};

const Wrapper = createWrapper(Store);

export {
    Wrapper,
    Store,
};
