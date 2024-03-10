import { Etask, ETaskDesc} from "./taks.enum";


describe('Etask should have correct values', () => {

    it('Etask" ', () => {
        expect(Etask.CREATE).toBe("PROCESS_CREATE");
        expect(Etask.LOAD_PARAM).toBe("CARGANDO_PARAMETROS");
        expect(Etask.LOAD_MESSAGE).toBe("CARGANDO_MENSAJES");
        expect(Etask.ERROR_LOAD_PARAM).toBe("ERROR_CARGANDO_PARAMETROS");
        expect(Etask.CHANNEL).toBe("VALIDATE_CHANNEL");
        expect(Etask.CONSUMED_SERVICE).toBe("CONSUMED_SERVICE");
        expect(Etask.PROCESS_KAFKA_ACCEPT_RETRY_TOPIC).toBe("PROCESS_KAFKA_ACCEPT_RETRY_TOPIC");
        expect(Etask.PROCESS_KAFKA_START_ORDER_RETRY_TOPIC).toBe("PROCESS_KAFKA_START_ORDER_RETRY_TOPIC");
        expect(Etask.PROCESS_KAFKA_RESERVE_NUMBER_RETRY_TOPIC).toBe("PROCESS_KAFKA_RESERVE_NUMBER_RETRY_TOPIC");
        expect(Etask.PROCESS_KAFKA_PAYMENT_CONF_RETRY_TOPIC).toBe("PROCESS_KAFKA_PAYMENT_CONF_RETRY_TOPIC");
        expect(Etask.VALIDATE_REQUEST).toBe("VALIDATE_REQUEST");
        expect(Etask.EXCEPTION_MANAGER).toBe("EXCEPTION_MANAGER");
        expect(Etask.HTTP_RESPONSE).toBe("HTTP_RESPONSE");
    });

});


describe('ETaskDesc should have correct values', () => {

    it('ETaskDesc" ', () => { 
        expect(ETaskDesc.CHANNEL).toBe("Validation of the channel");
        expect(ETaskDesc.ERROR_LOAD_PARAM).toBe("Error cargando parametros");
        expect(ETaskDesc.UPDATE_PARAM).toBe("Actualizando parametros");
        expect(ETaskDesc.ERROR_LOAD_MESSAGES).toBe("Error cargando mensajes");
        expect(ETaskDesc.ERROR_UPDATE_MESSAGES).toBe("Error actualizando mensajes");
        expect(ETaskDesc.CONSUMED_SERVICE).toBe("Result service");
    });

});