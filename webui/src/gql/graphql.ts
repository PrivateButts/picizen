/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
  Upload: any;
};

export type Album = {
  __typename?: 'Album';
  createdAt: Scalars['DateTime'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DjangoImageType = {
  __typename?: 'DjangoImageType';
  height: Scalars['Int'];
  name: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  logout: Scalars['Boolean'];
  register: User;
  updatePhoto: Photo;
  uploadPhoto: Photo;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: UserInput;
};


export type MutationUpdatePhotoArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  image: Scalars['Upload'];
  title: Scalars['String'];
};

export type OffsetPaginationInput = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Photo = {
  __typename?: 'Photo';
  blurhash?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  id: Scalars['ID'];
  image: DjangoImageType;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  album: Album;
  albums: Array<Album>;
  me?: Maybe<User>;
  photo: Photo;
  photos: Array<Photo>;
};


export type QueryAlbumArgs = {
  pk: Scalars['ID'];
};


export type QueryAlbumsArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryPhotoArgs = {
  pk: Scalars['ID'];
};


export type QueryPhotosArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UploadPhotoMutationVariables = Exact<{
  title: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'Photo', id: string } };

export type PhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PhotoQuery = { __typename?: 'Query', photo: { __typename?: 'Photo', id: string, title: string, image: { __typename?: 'DjangoImageType', url: string } } };

export type UpdatePhotoMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdatePhotoMutation = { __typename?: 'Mutation', updatePhoto: { __typename?: 'Photo', id: string, title: string } };

export type GetAllPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPhotosQuery = { __typename?: 'Query', photos: Array<{ __typename?: 'Photo', id: string, title: string, blurhash?: string | null, image: { __typename?: 'DjangoImageType', url: string, width: number, height: number } }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const UploadPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const PhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"photo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<PhotoQuery, PhotoQueryVariables>;
export const UpdatePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdatePhotoMutation, UpdatePhotoMutationVariables>;
export const GetAllPhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPhotos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPhotosQuery, GetAllPhotosQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;