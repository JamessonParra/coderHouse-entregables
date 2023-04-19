import { openDatabase } from 'expo-sqlite';

let db = null;

try {
  db = openDatabase('database.db', () => {
    console.log('Base de datos abierta correctamente');
  });
} catch (error) {
  console.log('Error al abrir la base de datos', error);
}

if (!db) throw new Error('No se pudo abrir la base de datos');

export const insertData = (table, data) => {
  const columns = Object.keys(data).join(',');
  const placeholders = Object.keys(data).map(() => '?').join(',');
  const values = Object.values(data);
  
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
        values,
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('No se pudo insertar el registro.'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getAllData = (table, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
      successCallback(rows);
    }, (_, error) => {
      errorCallback(error);
    });
  });
};

export const getData = (table, column, value, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${table} WHERE ${column} = ?`, [value], (_, { rows }) => {
      successCallback(rows);
    }, (_, error) => {
      errorCallback(error);
    });
  });
};

export const deleteData = (table, column, value, successCallback, errorCallback) => {
  db.transaction((tx) => {
    tx.executeSql(`DELETE FROM ${table} WHERE ${column} = ?`, [value], (_, result) => {
      successCallback(result);
    }, (_, error) => {
      errorCallback(error);
    });
  });
};