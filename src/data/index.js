import React, {createContext, useReducer} from 'react';
import {random} from "../scenes/space_2_0/Utils";

const initialData = {
    dps: '0000',
};
const store = createContext(initialData);
const {Provider} = store;

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FULL_DPS':
                return Object.assign({}, state, {
                    dps:
                        random(0, 9) * 1000 +
                        random(0, 9) * 100 +
                        random(0, 9) * 10 +
                        random(0, 9) * 1,
                });
            case 'RESET_DPS':
                return Object.assign({}, state, {
                    dps:
                        random(0, 9) * 1000 +
                        random(0, 9) * 100 +
                        random(0, 9) * 10 +
                        random(0, 9) * 1,
                });
            default:
                throw new Error('Reducer Action not found');
        }
    }, initialData);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};


export {store as default, StateProvider};
