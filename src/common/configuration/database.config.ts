/**
 * Se almacena la configuracion de la base de datos
 * @author Fredy Santiago Martinez
 */
let user_db = process.env.BD_USER || '';
let password_db = process.env.BD_PASSWORD || '';
const MONGO = process.env.MONGO || 'mongodb://127.0.0.1:27017/DBTemplateNestJS_DE';

export default {
  database: MONGO.replace('bd_user', user_db).replace('bd_password', password_db),
  oracleConnection: {
    user: process.env.ORACLE_USER || 'system',
    password: process.env.ORACLE_PASS || 'EcommerceV9',
    connectString: process.env.ORACLECONNECTSTRING || 'localhost:1521',
  },
};
