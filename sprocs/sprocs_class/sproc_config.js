class Mysql_config{
  static get mysql_config(){
    return {
      connectionLimit:10,
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'test_database'
    };
  }
}
module.exports = Mysql_config.mysql_config;