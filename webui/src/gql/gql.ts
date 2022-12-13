/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query taskQueue{\n    taskQueue\n  }\n": types.TaskQueueDocument,
    "\nquery getPhotos($yearMonth: String!) {\n    photos: getPhotosByDateGroup(yearMonth: $yearMonth){\n        id\n        title\n        image{\n            url\n            width\n            height\n        }\n        blurhash\n        imageUrl\n    }\n}": types.GetPhotosDocument,
    "\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                ": types.UploadPhotoDocument,
    "\n    query getDateGroups {\n        photoDateGroups{\n            yearMonth\n            totalPhotos\n        }\n    }\n": types.GetDateGroupsDocument,
    "\n    query photo($id: ID!) {\n        photo(pk: $id) {\n            id\n            title\n            image {\n                width\n                height\n            }\n            imageUrl\n        }\n    }\n": types.PhotoDocument,
    "\n        mutation updatePhoto($id: ID!, $title: String!) {\n            updatePhoto(id: $id, title: $title) {\n                id\n                title\n            }\n        }\n    ": types.UpdatePhotoDocument,
    "\n        mutation login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                id\n                username\n            }\n        }\n    ": types.LoginDocument,
    "\n    mutation logout {\n        logout\n    }\n": types.LogoutDocument,
    "\n                query userQuery{\n                    me{\n                        id\n                        username\n                    }\n                }\n            ": types.UserQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query taskQueue{\n    taskQueue\n  }\n"): (typeof documents)["\n  query taskQueue{\n    taskQueue\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getPhotos($yearMonth: String!) {\n    photos: getPhotosByDateGroup(yearMonth: $yearMonth){\n        id\n        title\n        image{\n            url\n            width\n            height\n        }\n        blurhash\n        imageUrl\n    }\n}"): (typeof documents)["\nquery getPhotos($yearMonth: String!) {\n    photos: getPhotosByDateGroup(yearMonth: $yearMonth){\n        id\n        title\n        image{\n            url\n            width\n            height\n        }\n        blurhash\n        imageUrl\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                "): (typeof documents)["\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getDateGroups {\n        photoDateGroups{\n            yearMonth\n            totalPhotos\n        }\n    }\n"): (typeof documents)["\n    query getDateGroups {\n        photoDateGroups{\n            yearMonth\n            totalPhotos\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query photo($id: ID!) {\n        photo(pk: $id) {\n            id\n            title\n            image {\n                width\n                height\n            }\n            imageUrl\n        }\n    }\n"): (typeof documents)["\n    query photo($id: ID!) {\n        photo(pk: $id) {\n            id\n            title\n            image {\n                width\n                height\n            }\n            imageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation updatePhoto($id: ID!, $title: String!) {\n            updatePhoto(id: $id, title: $title) {\n                id\n                title\n            }\n        }\n    "): (typeof documents)["\n        mutation updatePhoto($id: ID!, $title: String!) {\n            updatePhoto(id: $id, title: $title) {\n                id\n                title\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                id\n                username\n            }\n        }\n    "): (typeof documents)["\n        mutation login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                id\n                username\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation logout {\n        logout\n    }\n"): (typeof documents)["\n    mutation logout {\n        logout\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                query userQuery{\n                    me{\n                        id\n                        username\n                    }\n                }\n            "): (typeof documents)["\n                query userQuery{\n                    me{\n                        id\n                        username\n                    }\n                }\n            "];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;