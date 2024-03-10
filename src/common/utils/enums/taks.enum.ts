/**
 * Enumeraciones usadas internamente para la trazabilidad y descripción de tareas en los logs del microservicio
 * @author Fredy Santiago Martinez
 */
export enum Etask {
  CREATE = 'PROCESS_CREATE',
  FINDALL = 'CONSULTANDO_MOCKUPS',
  FINDONE = 'CONSULTANDO_MOCKUP',
  UPDATE = 'ACTUALIZANDO_MOCKUP',
  REMOVE = 'ELIMINANDO_MOCKUP',
  LOAD_MESSAGE = 'CARGANDO_MENSAJES',
  LOAD_PARAM = 'CARGANDO_PARAMETROS',
  ERROR_LOAD_PARAM = 'ERROR_CARGANDO_PARAMETROS',
  CHANNEL = 'VALIDATE_CHANNEL',
  CONSUMED_SERVICE = 'CONSUMED_SERVICE',
  PROCESS_KAFKA_ACCEPT_RETRY_TOPIC = 'PROCESS_KAFKA_ACCEPT_RETRY_TOPIC',
  PROCESS_KAFKA_START_ORDER_RETRY_TOPIC = 'PROCESS_KAFKA_START_ORDER_RETRY_TOPIC',
  PROCESS_KAFKA_RESERVE_NUMBER_RETRY_TOPIC = 'PROCESS_KAFKA_RESERVE_NUMBER_RETRY_TOPIC',
  PROCESS_KAFKA_PAYMENT_CONF_RETRY_TOPIC = 'PROCESS_KAFKA_PAYMENT_CONF_RETRY_TOPIC',
  PROCESS_KAFKA_UPDATE_BILL_MED_RETRY_TOPIC = 'PROCESS_KAFKA_UPDATE_BILL_MED_RETRY_TOPIC',
  PROCESS_KAFKA_RESERVE_NUMBER_CONFIRM_RETRY_TOPIC = 'PROCESS_KAFKA_RESERVE_NUMBER_CONFIRM_RETRY_TOPIC',
  PROCESS_KAFKA_CONTRACT_RETRY_TOPIC = 'PROCESS_KAFKA_CONTRACT_RETRY_TOPIC',
  PROCESS_KAFKA_UPDATE_ITEM_RETRY_TOPIC = 'PROCESS_KAFKA_UPDATE_ITEM_RETRY_TOPIC',
  PROCESS_KAFKA_SUBMIT_RETRY_TOPIC = 'PROCESS_KAFKA_SUBMIT_RETRY_TOPIC',
  PROCESS_KAFKA_PAYMENT_RETRY_TOPIC = 'PROCESS_KAFKA_PAYMENT_RETRY_TOPIC',
  EXCEPTION_MANAGER = 'EXCEPTION_MANAGER',
  VALIDATE_REQUEST = 'VALIDATE_REQUEST',
  HTTP_RESPONSE = 'HTTP_RESPONSE',
  REQUEST_HTTP = 'REQUEST_HTTS',
  FINDONE_HTTP_PRUEBA = 'CONSULTANDO_HTTP_PRUEBA',
  FINDALL_HTTP_PRUEBA = 'FINDALL_HTTP_PRUEBA',
  SERVICE_HTTP_PRUEBA = 'SERVICE_HTTP_PRUEBA',
  DATA_PROVIDER_HTTP_PRUEBA = 'DATA_PROVIDER_HTTP_PRUEBA',
  SERVICE_ERROR = 'SERVICE_ERROR',
  EXECUTE_SP_ORACLE = 'EXECUTE_SP_ORACLE',
}

//Descripción de las tareas que se realizan en el microservicio
export enum ETaskDesc {
  CHANNEL = 'Validation of the channel',
  ERROR_LOAD_PARAM = 'Error cargando parametros',
  UPDATE_PARAM = 'Actualizando parametros',
  ERROR_UPDATE_PARAM = 'Error actualizando parametros',
  ERROR_LOAD_MESSAGES = 'Error cargando mensajes',
  ERROR_UPDATE_MESSAGES = 'Error actualizando mensajes',
  CONSUMED_SERVICE = 'Result service',
  DATA_PROVIDER_HTTP_PRUEBA = 'Error http-prueba.provider,impl getById()',
  LOAD_MESSAGE = 'Cargando todos los mensajes de la base de datos',
  EXECUTE_SP_ORACLE = 'EXECUTE_SP_ORACLE',
}
