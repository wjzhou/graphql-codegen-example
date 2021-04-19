import express from 'express';

// The argument for context function depends on middleware
// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
type contextParams = {
    req: express.Request,
    res: express.Response
};

export type Context = {
    hasAuthorization: boolean
}

export const context: (param: contextParams) => Context = ({ req }) => {
    const hasAuthorization = !!req.header('Authorization');
    return {
        hasAuthorization
    };
}