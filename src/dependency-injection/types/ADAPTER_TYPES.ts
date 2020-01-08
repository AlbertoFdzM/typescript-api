export const ADAPTER_TYPES = {
  DATE_TO_UNIX_TIME: Symbol.for('DateToUnixTimeAdapter'),
  POST_USERS_REQUEST_TO_USER_CREATION_QUERY: Symbol.for(
    'PostUsersRequestToUserCreationQueryAdapter'
  ),
  USER_API_CREATION_QUERY_TO_USER_CREATION_QUERY: Symbol.for(
    'UserApiCreationQueryToUserCreationQueryAdapter'
  ),
  USER_CREATION_QUERY_TO_INSERT_QUERY_BUILDER: Symbol.for('UserCreationQueryToInsertQueryBuilderAdapter'),
  USER_DB_TO_USER: Symbol.for('UserDbToUserAdapter'),
  USER_FIND_QUERY_TO_SELECT_QUERY_BUILDER: Symbol.for(
    'UserFindQueryToSelectQueryBuilderAdapter'
  ),
  USER_UPDATE_QUERY_TO_UPDATE_QUERY_BUILDER: Symbol.for('UserUpdateQueryToUpdateQueryBuilderAdapter'),
  USER_TO_USER_API: Symbol.for('UserToUserApiAdapter')
};

Object.freeze(ADAPTER_TYPES);
