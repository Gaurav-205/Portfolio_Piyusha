import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Add your configuration here
  // database: {
  //   url: process.env.DATABASE_URL || '',
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET || '',
  // },
};
