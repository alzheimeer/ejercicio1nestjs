/**
 * Se almacena la configuracion del APM
 * @author Fredy Santiago Martinez
 */
const protocol = `http://`; 
export default {
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'mstemplatenestjs',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL || `${protocol}100.69.7.130:8200`,
    environment: process.env.ELASTIC_APM_ENVIRONMENT || 'ecommercev9dev',
    captureBody: process.env.ELASTIC_APM_CAPTURE_BODY || 'all',
    captureHeaders: (process.env.ELASTIC_APM_CAPTURE_HEADERS === 'true'),
    logLevel: process.env.ELASTIC_APM_LOG_LEVEL || 'off',
    // Only activate the agent if it's running in production
    active: (process.env.ELASTIC_APM_ACTIVE === 'true'),
    errorOnAbortedRequests: false
}