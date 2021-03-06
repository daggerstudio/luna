/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
   *                                                                          *
   * Local disk storage for DEVELOPMENT ONLY                                  *
   *                                                                          *
   * Installed by default.                                                    *
   *                                                                          *
   ***************************************************************************/
  localDiskDb: {
    adapter: "sails-disk"
  },




  // Redis Connection

  redis: {
    adapter: "sails-redis",
    port: 14560,
    host: "pub-redis-14560.eu-west-1-1.1.ec2.garantiadata.com",
    user: "rediscloud",
    password: "v4O7TtBgWtThhkpL"
  },
  //redis://rediscloud:v4O7TtBgWtThhkpL@pub-redis-14560.eu-west-1-1.1.ec2.garantiadata.com:14560

  /***************************************************************************
   *                                                                          *
   * MySQL is the world's most popular relational database.                   *
   * http://en.wikipedia.org/wiki/MySQL                                       *
   *                                                                          *
   * Run: npm install sails-mysql                                             *
   *                                                                          *
   ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER',
  //   password: 'YOUR_MYSQL_PASSWORD',
  //   database: 'YOUR_MYSQL_DB'
  // },

  /***************************************************************************
   *                                                                          *
   * MongoDB is the leading NoSQL database.                                   *
   * http://en.wikipedia.org/wiki/MongoDB                                     *
   *                                                                          *
   * Run: npm install sails-mongo                                             *
   *                                                                          *
   ***************************************************************************/
  mongo: {
    adapter: "sails-mongo",
    host: "ds055935.mongolab.com",
    port: 55935,
    user: "heroku_hngsmdcb",
    password: "n9mvsqtulr3nthvpg3hl1v33r0",
    database: "heroku_hngsmdcb"

    //mongodb://heroku_hngsmdcb:n9mvsqtulr3nthvpg3hl1v33r0@ds055935.mongolab.com:55935/heroku_hngsmdcb
  },

  /***************************************************************************
   *                                                                          *
   * PostgreSQL is another officially supported relational database.          *
   * http://en.wikipedia.org/wiki/PostgreSQL                                  *
   *                                                                          *
   * Run: npm install sails-postgresql                                        *
   *                                                                          *
   *                                                                          *
   ***************************************************************************/
  // somePostgresqlServer: {
  //   adapter: 'sails-postgresql',
  //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_POSTGRES_USER',
  //   password: 'YOUR_POSTGRES_PASSWORD',
  //   database: 'YOUR_POSTGRES_DB'
  // }


  /***************************************************************************
   *                                                                          *
   * More adapters: https://github.com/balderdashy/sails                      *
   *                                                                          *
   ***************************************************************************/

};
