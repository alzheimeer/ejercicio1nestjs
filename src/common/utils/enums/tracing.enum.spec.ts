import { EStatusTracingGeneral, ETaskTracingGeneral} from "./tracing.enum";

describe('EStatusTracingGeneral should have correct values', () => {

    it('EStatusTracingGeneral" ', () => {
        expect(EStatusTracingGeneral.STATUS_SUCCESS).toBe("SUCCESS");
        expect(EStatusTracingGeneral.STATUS_FAILED).toBe("FAILED");

    });
    it('total enums', () => {
        expect(Object.keys(EStatusTracingGeneral).length).toBe(10);
    });
});


describe('ETaskTracingGeneral should have correct values', () => {

    it('ETaskTracingGeneral" ', () => {
        expect(ETaskTracingGeneral.INVALID_CHANNEL).toBe("INVALID CHANNEL");
        expect(ETaskTracingGeneral.DOWNLOAD_DATA).toBe("DESCARGA DE DATOS");
        expect(ETaskTracingGeneral.SAVE_DATA_MOVIL).toBe("GUARDADO DE DATOS");
        expect(ETaskTracingGeneral.DELETE_DATA_MOVIL).toBe("ELIMINACION DE DATOS");
        expect(ETaskTracingGeneral.TASK_GENERAL).toBe("TEST");
        expect(ETaskTracingGeneral.EXEC_CRON).toBe("EJECUCION CRON");
        expect(ETaskTracingGeneral.EXEC_MANUAL).toBe("EJECUCION MANUAL");
        expect(ETaskTracingGeneral.SAVE_DATA).toBe("GUARDADO DE DATOS");
        expect(ETaskTracingGeneral.DELETE_DATA).toBe("ELIMINACION DE DATOS");
        expect(ETaskTracingGeneral.FILE_DOWNLOAD).toBe("DESCARGANDO ARCHIVO");

    });
    it('total enums', () => {
        expect(Object.keys(ETaskTracingGeneral).length).toBe(12);
    });
});