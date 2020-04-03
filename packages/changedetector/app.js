const on = {
    $on: (event)=> {

    }
}


export const changeDectector = (A, B, state) => {
    A.bind(state);
    B.bind(state);

    return async (e)=> {
        const a = A.$on(event);
        const b = B.$on(event);

        const Val1 = await a;
        const Val2 = await b;

        JSON.stringify(Val1)===JSON.stringify(Val2);
    }
}