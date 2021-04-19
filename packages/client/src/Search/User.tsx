import React from 'react';
import type { UserFragmentFragment } from './User.generated'

export function User(props: { item: UserFragmentFragment }) {
    const { item } = props;
    return (
        <div>
            <div>{item.username}, {item.role}</div>
            <div>{item.email}</div>
        </div>
    );
}