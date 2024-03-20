/**
 * Se almacena la configuracion de los nombres de los métodos que se usan
 * @author Fredy Santiago Martinez
 */

export default {
  apiMapping: process.env.API_MAPPING || '/RSTemplateNestJS',
  apiVersion: process.env.API_VERSION || 'V1',
  controllerMessage: process.env.CONTROLLER_MESSAGE || '/Message',
  controllerUser: process.env.CONTROLLER_USER || '/User',
  controllerHttpProvider: process.env.CONTROLLER_HTTP_PROVIDER || '/HttpProvider',
  controllerError: process.env.CONTROLLER_ERROR || '/errors',
  controllerMockup: process.env.CONTROLLER_MOCKUP || '/Mockup',
  port: process.env.PORT || 8080,
  logLevel: process.env.LOG_LEVEL || 'ALL',
  ttlCache: Number(process.env.TTL_CACHE || 0)
}