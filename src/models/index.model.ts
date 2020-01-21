import Archive from '@models/archive.model';
import Company from '@models/company.model';
import Country from '@models/country.model';
import PriceType from '@models/price-type.model';
import Product from './product.model';
import ProductFolder from './product-folder';
import User from '@models/user.model';
import UserGroup from '@models/user-group.model';

const entities = [
  Archive,
  Company,
  Country,
  PriceType,
  Product,
  ProductFolder,
  User,
  UserGroup,
];

export default entities;
