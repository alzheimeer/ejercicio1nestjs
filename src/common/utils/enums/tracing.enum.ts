/**
 * Enumeraciones usadas internamente para la trazabilidad y descripción de tareas en los logs del microservicio
 * @author Fredy Santiago Martinez
 */

export enum EStatusTracingGeneral { 
    FAILED = 'FAILED',
    ERROR = 'ERROR',
    STATUS_SUCCESS = "SUCCESS",
    STATUS_FAILED = "FAILED",
    LEGACY_SUCCESS = 'LEGACY_SUCCESS',
    LEGACY_ERROR = 'LEGACY_ERROR',
    LEGACY_WARN = 'LEGACY_WARN',
    BD_SUCCESS = 'BD_SUCCESS',
    BD_ERROR = 'BD_ERROR',
    BD_WARN = 'BD_WARN'
}

export enum ETaskTracingGeneral {
    INVALID_CHANNEL = "INVALID CHANNEL",
    DOWNLOAD_DATA = "DESCARGA DE DATOS",
    SAVE_DATA_MOVIL = "GUARDADO DE DATOS",
    DELETE_DATA_MOVIL = "ELIMINACION DE DATOS",
    TASK_GENERAL="TEST",
    EXEC_CRON = "EJECUCION CRON",
    EXEC_MANUAL = "EJECUCION MANUAL",
    SAVE_DATA = "GUARDADO DE DATOS",
    DELETE_DATA = "ELIMINACION DE DATOS",
    FILE_DOWNLOAD = 'DESCARGANDO ARCHIVO',
    INICIO_REQUEST = 'INICIO_REQUEST',
    FINAL_REQUEST = 'FINAL_REQUEST',
}

