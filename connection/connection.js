const { Sequelize } = require( "sequelize" );

const sequelize = new Sequelize( "postgres://postgres:7670@localhost:5432/imtihon_db",
  {
    logging: false
  }
);

module.exports = sequelize;


// const { Sequelize } = require( "sequelize" );

// const sequelize = new Sequelize(
//   "postgres://postgres:1001@localhost:5432/users ",
//   {
//     logging: false,
//   } );

// module.exports = sequelize;