import React, { ChangeEventHandler, ReactNode, useState } from 'react';
import { useSearchQuery } from './Search.generated';
import { User } from './User';

export function Search() {
    const [state, setState] = useState({ term: '' });
    const { loading, error, data } = useSearchQuery({ variables: { term: state.term } });
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setState({ ...state, term: e.target.value });
    }
    let result: ReactNode = null;
    if (!state.term) {
        result = null;
    } else if (loading) {
        result = 'Loading';
    } else if (error) {
        result = `Error! ${error.message}`
    }
    else if (data) {
        result = data.search.map((item) => {
            switch (item.__typename) {
                case 'User':
                    return <User item={item} key={item.id} />
                default:
                    return null;
            }
        })
    }

    return (
        <div>
            <div>Search:<input name="term" onChange={onChange} /></div>
            <div>{result}</div>
        </div>
    )
}

