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
  /** Decimal (fixed-point) */
  Decimal: any;
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
  login?: Maybe<User>;
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
  aspectRatio: Scalars['Float'];
  blurhash?: Maybe<Scalars['String']>;
  cameraMake?: Maybe<Scalars['String']>;
  cameraModel?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creator?: Maybe<User>;
  dateTaken?: Maybe<Scalars['DateTime']>;
  gpsLat?: Maybe<Scalars['Decimal']>;
  gpsLon?: Maybe<Scalars['Decimal']>;
  id: Scalars['ID'];
  image: DjangoImageType;
  imageUrl: Scalars['String'];
  lensMake?: Maybe<Scalars['String']>;
  lensModel?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PhotoDateGroup = {
  __typename?: 'PhotoDateGroup';
  totalPhotos: Scalars['Int'];
  yearMonth: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  album: Album;
  albums: Array<Album>;
  getPhotosByDateGroup: Array<Photo>;
  me?: Maybe<User>;
  photo: Photo;
  photoDateGroups: Array<PhotoDateGroup>;
  photos: Array<Photo>;
  taskQueue: Scalars['Int'];
};


export type QueryAlbumArgs = {
  pk: Scalars['ID'];
};


export type QueryAlbumsArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryGetPhotosByDateGroupArgs = {
  yearMonth: Scalars['String'];
};


export type QueryPhotoArgs = {
  pk: Scalars['ID'];
};


export type QueryPhotosArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  taskQueueUpdated: Scalars['Int'];
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

export type TaskQueueQueryVariables = Exact<{ [key: string]: never; }>;


export type TaskQueueQuery = { __typename?: 'Query', taskQueue: number };

export type TaskQueueSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskQueueSubSubscription = { __typename?: 'Subscription', taskQueueUpdated: number };

export type GetPhotosQueryVariables = Exact<{
  yearMonth: Scalars['String'];
}>;


export type GetPhotosQuery = { __typename?: 'Query', photos: Array<{ __typename?: 'Photo', id: string, title: string, blurhash?: string | null, imageUrl: string, image: { __typename?: 'DjangoImageType', url: string, width: number, height: number } }>, photoIds: Array<{ __typename?: 'Photo', id: string }> };

export type UploadPhotoMutationVariables = Exact<{
  title: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'Photo', id: string } };

export type GetDateGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDateGroupsQuery = { __typename?: 'Query', photoDateGroups: Array<{ __typename?: 'PhotoDateGroup', yearMonth: string, totalPhotos: number }> };

export type PhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PhotoQuery = { __typename?: 'Query', photo: { __typename?: 'Photo', id: string, title: string, imageUrl: string, dateTaken?: any | null, gpsLat?: any | null, gpsLon?: any | null, cameraMake?: string | null, cameraModel?: string | null, lensMake?: string | null, lensModel?: string | null, image: { __typename?: 'DjangoImageType', width: number, height: number }, creator?: { __typename?: 'User', username: string } | null } };

export type UpdatePhotoMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type UpdatePhotoMutation = { __typename?: 'Mutation', updatePhoto: { __typename?: 'Photo', id: string, title: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, username: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };


export const TaskQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"taskQueue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskQueue"}}]}}]} as unknown as DocumentNode<TaskQueueQuery, TaskQueueQueryVariables>;
export const TaskQueueSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskQueueSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskQueueUpdated"}}]}}]} as unknown as DocumentNode<TaskQueueSubSubscription, TaskQueueSubSubscriptionVariables>;
export const GetPhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPhotos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"photos"},"name":{"kind":"Name","value":"getPhotosByDateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"yearMonth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"photoIds"},"name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetPhotosQuery, GetPhotosQueryVariables>;
export const UploadPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const GetDateGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoDateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yearMonth"}},{"kind":"Field","name":{"kind":"Name","value":"totalPhotos"}}]}}]}}]} as unknown as DocumentNode<GetDateGroupsQuery, GetDateGroupsQueryVariables>;
export const PhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"photo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTaken"}},{"kind":"Field","name":{"kind":"Name","value":"gpsLat"}},{"kind":"Field","name":{"kind":"Name","value":"gpsLon"}},{"kind":"Field","name":{"kind":"Name","value":"cameraMake"}},{"kind":"Field","name":{"kind":"Name","value":"cameraModel"}},{"kind":"Field","name":{"kind":"Name","value":"lensMake"}},{"kind":"Field","name":{"kind":"Name","value":"lensModel"}}]}}]}}]} as unknown as DocumentNode<PhotoQuery, PhotoQueryVariables>;
export const UpdatePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdatePhotoMutation, UpdatePhotoMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;