export enum EStoreProcedureDB {
  TEST_SP = `
  DECLARE
    response SYS_REFCURSOR;
  BEGIN
    obtenerMensajes(:response);
  END;`,
}

export enum ECursorNameDB {
  TEST_SP = 'response',
}

export enum EStoredName {
  TEST_SP = 'obtenerMensajes',
}
