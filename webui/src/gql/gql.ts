/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                ": types.UploadPhotoDocument,
    "\n                query photo($id: ID!) {\n                    photo(pk: $id) {\n                        id\n                        title\n                        image {\n                            url\n                        }\n                    }\n                }\n            ": types.PhotoDocument,
    "\n                    mutation updatePhoto($id: ID!, $title: String!) {\n                        updatePhoto(id: $id, title: $title) {\n                            id\n                            title\n                        }\n                    }\n                ": types.UpdatePhotoDocument,
    "\n    query getAllPhotos{\n        photos {\n            id\n            title\n            blurhash\n            image {\n                url\n                width\n                height\n            }\n        }\n    }\n": types.GetAllPhotosDocument,
    "\n    mutation logout {\n        logout\n    }\n": types.LogoutDocument,
};

export function graphql(source: "\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                "): (typeof documents)["\n                    mutation uploadPhoto($title: String!, $file: Upload!){\n                        uploadPhoto(title: $title, image: $file){\n                            id\n                        }\n                    }\n                "];
export function graphql(source: "\n                query photo($id: ID!) {\n                    photo(pk: $id) {\n                        id\n                        title\n                        image {\n                            url\n                        }\n                    }\n                }\n            "): (typeof documents)["\n                query photo($id: ID!) {\n                    photo(pk: $id) {\n                        id\n                        title\n                        image {\n                            url\n                        }\n                    }\n                }\n            "];
export function graphql(source: "\n                    mutation updatePhoto($id: ID!, $title: String!) {\n                        updatePhoto(id: $id, title: $title) {\n                            id\n                            title\n                        }\n                    }\n                "): (typeof documents)["\n                    mutation updatePhoto($id: ID!, $title: String!) {\n                        updatePhoto(id: $id, title: $title) {\n                            id\n                            title\n                        }\n                    }\n                "];
export function graphql(source: "\n    query getAllPhotos{\n        photos {\n            id\n            title\n            blurhash\n            image {\n                url\n                width\n                height\n            }\n        }\n    }\n"): (typeof documents)["\n    query getAllPhotos{\n        photos {\n            id\n            title\n            blurhash\n            image {\n                url\n                width\n                height\n            }\n        }\n    }\n"];
export function graphql(source: "\n    mutation logout {\n        logout\n    }\n"): (typeof documents)["\n    mutation logout {\n        logout\n    }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;