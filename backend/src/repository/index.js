import { Product} from '../dao/factory.js'
import { User } from '../dao/factory.js';

import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js';

export const ProductService = new ProductRepository(new Product);
export const UserService = new UserRepository(new User);
