import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem } from '../models';

const tableName = 'todoData';

enablePromise(true);
export const getDBConnection = async () => {
  return openDatabase({name: 'symposium-data.db', location: 'default'});
};