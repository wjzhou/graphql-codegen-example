import { ChatMessage, QueryResolvers, Resolvers, Role, SearchResult, User } from "./types";
import { UserInputError, ApolloError, AuthenticationError } from "apollo-server";
import { dateScalar } from "./dateScalar";

const allUsers: User[] = [
    {
        id: 'user-Tux',
        username: 'Tux',
        email: 'Tux@example.com',
        role: Role.Admin
    },
];

const allChatMessages: ChatMessage[] = [
    {
        id: 'chatMessage-0',
        content: 'Tux: graphql is easy to use with typescript',
        time: new Date(),
        user: allUsers[0],
    }
]

// This demostrate how to type individual resolver functions
// In real project, we will move these to their own folder
// and may give them hierarchy names, e.g. userManager_me
const me: QueryResolvers["me"] = (_parents, _args, context, _info) => {
    if (allUsers.length == 0) {
        throw new ApolloError('Invalid argument value');
    }
    if (!context.hasAuthorization) {
        throw new AuthenticationError("Not authenticated");
    }
    return allUsers[0];
}

const user: QueryResolvers["user"] = (_parents, args, _context, _info) => {
    // find return undefined on not found, need to convert it to null for appolo
    return allUsers.find(u => u.id === args.id) ?? null;
}

const userManagerModule = {
    me,
    user,
    allUsers: (() => allUsers) as QueryResolvers["allUsers"],
}

const idToType = (obj: { id: string }) => {
    if (obj.id.startsWith('user')) {
        return 'User'
    } else if (obj.id.startsWith('chatMessage')) {
        return 'ChatMessage'
    } else {
        return null
    }
}

//the type here will verify that the underlying types matches
export const resolvers: Resolvers = {
    Query: {
        ...userManagerModule,
        search: (_, args) => {
            const term = args.term.toLowerCase();
            const matchedUsers: SearchResult[] = allUsers.filter(u => u.username.toLowerCase().includes(term));
            const matchedMessages = allChatMessages.filter(m => m.content.toLowerCase().includes(term));
            const results = matchedUsers.concat(matchedMessages);
            return results;
        }
    },
    Mutation: {
        addUser: (_, args) => {
            // no need to check that email is null, etc, it is checked by graphql
            const user: User = { ...args.user, id: 'user-' + args.user.email };
            if (allUsers.find(u => u.id === user.id)) {
                throw new UserInputError('Id already exist');
            }
            allUsers.push(user);
            return user;
        }
    },
    SearchResult: {
        __resolveType: idToType
    },
    Node: {
        __resolveType: idToType
    },
    Date: dateScalar,
};