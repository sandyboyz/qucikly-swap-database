import knex, { Knex } from 'knex';
import {RetrieveAllProductUseCase} from './core/services/Product/use-cases/RetrieveAllProduct/RetrieveAllProductUseCase';
import { RetrieveProductByIdUseCase } from './core/services/Product/use-cases/RetrieveProductById/RetrieveProductIdUseCase';
import { PrismaClient } from '@prisma/client'
import { PrimsaProductRepository } from './implementation/PrismaProductRepository';
import mongoose from 'mongoose';
import { Product } from './core/services/Product/domain/Product';
import { MongoProductRepository } from './implementation/MongoProductRepository';
import { KnexProductRepository } from './implementation/KnexProductRepository';

// Prisma Init
const prisma = new PrismaClient();


// Knex Init
const connection = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'sample-commerce',
  }
});


// Mongoose Init
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
  id: Number,
  nama: String,
  harga: Number,
});

const product = mongoose.model<Product>('Product', ProductSchema);



// Knex Case

const knexInstance = new KnexProductRepository(connection);

const retrieveAllProductUseCaseKnex = new RetrieveAllProductUseCase(knexInstance);
const retrieveProductByIdUseCaseKnex = new RetrieveProductByIdUseCase(knexInstance);

// Prisma Case
const prismaInstance = new PrimsaProductRepository(prisma.product);
const retrieveAllProductUseCasePrisma = new RetrieveAllProductUseCase(prismaInstance);
const retrieveProductByIdUseCasePrisma = new RetrieveProductByIdUseCase(prismaInstance);


// Mongo Case
const mongoInstance = new MongoProductRepository(product);

const retrieveAllProductUseCaseMongo = new RetrieveAllProductUseCase(mongoInstance);
const retrieveProductByIdUseCaseMongo = new RetrieveProductByIdUseCase(mongoInstance);


(async function(){

  try {
    const mongoConnection = await mongoose.connect('mongodb://localhost/sample-commerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: 'rootuser',
      pass: 'rootpass',
      authSource: 'admin'
      })

      
      console.log("\nKnex Start");
      await retrieveAllProductUseCaseKnex.execute();
      await retrieveProductByIdUseCaseKnex.execute({id: 1});
      console.log("Knex End\n");


      console.log("\nPrisma Start");
      await retrieveAllProductUseCasePrisma.execute();
      await retrieveProductByIdUseCasePrisma.execute({id: 1});
      console.log('Prisma End\n');

      console.log("\nMongo Start");
      await retrieveAllProductUseCaseMongo.execute();
      await retrieveProductByIdUseCaseMongo.execute({id: 1});
      console.log("Mongo End\n");

      await connection.destroy();
      await prisma.$disconnect();
      await mongoConnection.disconnect();

  } catch (error) {
    console.log(error);
  }
  

})();


// retrieveAllProductUseCaseKnex.execute();
// retrieveAllProductUseCasePrisma.execute();


// retrieveProductByIdUseCaseKnex.execute({id: 1});
// retrieveProductByIdUseCasePrisma.execute({id: 1});


