import { DbType } from '../enums/DbType';

interface StringToDbTypeMap {
  readonly [key: string]: DbType;
}

export const stringToDbTypeMap: StringToDbTypeMap = {
  'mysql': DbType.mysql
};
