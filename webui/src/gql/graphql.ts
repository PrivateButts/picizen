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

export type Access = {
  __typename?: 'Access';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  level: Scalars['Int'];
  target?: Maybe<UserGroupTokenPublicRule>;
  updatedAt: Scalars['DateTime'];
};

export type AccessByType = {
  __typename?: 'AccessByType';
  groups: Array<Access>;
  persons: Array<Access>;
  public: Array<Access>;
  tokens: Array<Access>;
};

export type Album = {
  __typename?: 'Album';
  accessByType: AccessByType;
  accessRules: Array<Access>;
  coverPhoto?: Maybe<Photo>;
  createdAt: Scalars['DateTime'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  photoCount: Scalars['Int'];
  photos: Array<Photo>;
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

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: User;
  revokeRule: Scalars['Boolean'];
  shareObject: AccessByType;
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


export type MutationRevokeRuleArgs = {
  id: Scalars['ID'];
};


export type MutationShareObjectArgs = {
  groups?: InputMaybe<Array<Scalars['ID']>>;
  id: Scalars['ID'];
  objectType: ShareableObjects;
  persons?: InputMaybe<Array<Scalars['ID']>>;
  public?: InputMaybe<Scalars['Boolean']>;
  tokens?: InputMaybe<Array<Scalars['ID']>>;
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
  accessByType: AccessByType;
  accessRules: Array<Access>;
  aspectRatio: Scalars['Float'];
  blurhash?: Maybe<Scalars['String']>;
  cameraMake?: Maybe<Scalars['String']>;
  cameraModel?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creator: User;
  dateTaken?: Maybe<Scalars['DateTime']>;
  gpsLat?: Maybe<Scalars['Decimal']>;
  gpsLon?: Maybe<Scalars['Decimal']>;
  id: Scalars['ID'];
  image: DjangoImageType;
  imageUrl: Scalars['String'];
  isPublic: Scalars['Boolean'];
  lensMake?: Maybe<Scalars['String']>;
  lensModel?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PhotoDateGroup = {
  __typename?: 'PhotoDateGroup';
  photos: Array<Photo>;
  totalPhotos: Scalars['Int'];
  yearMonth: Scalars['String'];
};

export type PublicRule = {
  __typename?: 'PublicRule';
  public: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  album: Album;
  albums: Array<Album>;
  me?: Maybe<User>;
  photo: Photo;
  photoDateGroups: Array<PhotoDateGroup>;
  photos: Array<Photo>;
  shareAutocomplete: Array<User>;
  shareRules: Array<Access>;
  taskQueue: Scalars['Int'];
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


export type QueryShareAutocompleteArgs = {
  input: Scalars['String'];
};


export type QueryShareRulesArgs = {
  objectId: Scalars['ID'];
  objectType: ShareableObjects;
};

export enum ShareableObjects {
  Album = 'ALBUM',
  Photo = 'PHOTO'
}

export type Subscription = {
  __typename?: 'Subscription';
  taskQueueUpdated: Scalars['Int'];
};

export type Token = {
  __typename?: 'Token';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserGroupTokenPublicRule = Group | PublicRule | Token | User;

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TaskQueueQueryVariables = Exact<{ [key: string]: never; }>;


export type TaskQueueQuery = { __typename?: 'Query', taskQueue: number };

export type TaskQueueSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskQueueSubSubscription = { __typename?: 'Subscription', taskQueueUpdated: number };

export type ShareObjectQueryQueryVariables = Exact<{
  object_type: ShareableObjects;
  object_id: Scalars['ID'];
}>;


export type ShareObjectQueryQuery = { __typename?: 'Query', shareRules: Array<{ __typename?: 'Access', id: string, target?: { __typename?: 'Group', name: string } | { __typename?: 'PublicRule', public: boolean } | { __typename?: 'Token', token: string } | { __typename?: 'User', username: string } | null }> };

export type ShareAutoCompleteQueryQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type ShareAutoCompleteQueryQuery = { __typename?: 'Query', shareAutocomplete: Array<{ __typename?: 'User', id: string, username: string }> };

export type ShareMutationMutationVariables = Exact<{
  id: Scalars['ID'];
  persons?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type ShareMutationMutation = { __typename?: 'Mutation', shareObject: { __typename?: 'AccessByType', persons: Array<{ __typename?: 'Access', id: string, target?: { __typename?: 'Group' } | { __typename?: 'PublicRule' } | { __typename?: 'Token' } | { __typename?: 'User', id: string, username: string } | null }> } };

export type RevokeMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RevokeMutationMutation = { __typename?: 'Mutation', revokeRule: boolean };

export type UploadPhotoMutationVariables = Exact<{
  title: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'Photo', id: string } };

export type AlbumQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AlbumQuery = { __typename?: 'Query', album: { __typename?: 'Album', id: string, title: string, description: string, photos: Array<{ __typename?: 'Photo', id: string, title: string, blurhash?: string | null, imageUrl: string, image: { __typename?: 'DjangoImageType', width: number, height: number } }> } };

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', albums: Array<{ __typename?: 'Album', id: string, title: string, description: string, photoCount: number, createdAt: any, photos: Array<{ __typename?: 'Photo', id: string, title: string, blurhash?: string | null, imageUrl: string, image: { __typename?: 'DjangoImageType', width: number, height: number } }>, coverPhoto?: { __typename?: 'Photo', imageUrl: string } | null }> };

export type GetDateGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDateGroupsQuery = { __typename?: 'Query', photoDateGroups: Array<{ __typename?: 'PhotoDateGroup', yearMonth: string, totalPhotos: number, photos: Array<{ __typename?: 'Photo', id: string, title: string, blurhash?: string | null, imageUrl: string, image: { __typename?: 'DjangoImageType', width: number, height: number } }> }> };

export type PhotoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PhotoQuery = { __typename?: 'Query', photo: { __typename?: 'Photo', id: string, title: string, imageUrl: string, dateTaken?: any | null, gpsLat?: any | null, gpsLon?: any | null, cameraMake?: string | null, cameraModel?: string | null, lensMake?: string | null, lensModel?: string | null, image: { __typename?: 'DjangoImageType', width: number, height: number }, creator: { __typename?: 'User', username: string } } };

export type AlbumPhotoDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AlbumPhotoDetailQuery = { __typename?: 'Query', album: { __typename?: 'Album', title: string } };

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
export const ShareObjectQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"shareObjectQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShareableObjects"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareRules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objectType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object_type"}}},{"kind":"Argument","name":{"kind":"Name","value":"objectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PublicRule"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ShareObjectQueryQuery, ShareObjectQueryQueryVariables>;
export const ShareAutoCompleteQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"shareAutoCompleteQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<ShareAutoCompleteQueryQuery, ShareAutoCompleteQueryQueryVariables>;
export const ShareMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"shareMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"persons"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objectType"},"value":{"kind":"EnumValue","value":"PHOTO"}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"persons"},"value":{"kind":"Variable","name":{"kind":"Name","value":"persons"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ShareMutationMutation, ShareMutationMutationVariables>;
export const RevokeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"revokeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RevokeMutationMutation, RevokeMutationMutationVariables>;
export const UploadPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const AlbumDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"album"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<AlbumQuery, AlbumQueryVariables>;
export const GetAlbumsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlbums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"albums"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverPhoto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photoCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAlbumsQuery, GetAlbumsQueryVariables>;
export const GetDateGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoDateGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yearMonth"}},{"kind":"Field","name":{"kind":"Name","value":"totalPhotos"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetDateGroupsQuery, GetDateGroupsQueryVariables>;
export const PhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"photo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateTaken"}},{"kind":"Field","name":{"kind":"Name","value":"gpsLat"}},{"kind":"Field","name":{"kind":"Name","value":"gpsLon"}},{"kind":"Field","name":{"kind":"Name","value":"cameraMake"}},{"kind":"Field","name":{"kind":"Name","value":"cameraModel"}},{"kind":"Field","name":{"kind":"Name","value":"lensMake"}},{"kind":"Field","name":{"kind":"Name","value":"lensModel"}}]}}]}}]} as unknown as DocumentNode<PhotoQuery, PhotoQueryVariables>;
export const AlbumPhotoDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"albumPhotoDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<AlbumPhotoDetailQuery, AlbumPhotoDetailQueryVariables>;
export const UpdatePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdatePhotoMutation, UpdatePhotoMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
