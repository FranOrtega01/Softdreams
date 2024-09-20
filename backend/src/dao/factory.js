import config from '../config/config.js';
import mongoose from 'mongoose';

export default {};
export let Product;
export let User;

console.log(`PERSISTENCE: [${config.persistence}]`);
switch (config.persistence) {
    case "MONGO":
        mongoose.set('strictQuery', false);

        mongoose.connect(config.mongoURI, {
            dbName: config.mongoDBName
        })
        .then(() => console.log("DB Connected")
        )
        .catch((e) => console.log(e));

        const { default: ProductMongo } = await import('./mongo/products.mongo.js');
        const { default: UserMongo } = await import('./mongo/users.mongo.js');

        Product = ProductMongo;
        User = UserMongo;
        break;
    default:
        break;
}