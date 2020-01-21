import Archive from '@models/archive.model';
import Category from './category.model';
import Company from '@models/company.model';
import Country from '@models/country.model';
import Media from './media.model';
import MediaFolder from './media-folder.model';
import MediaFolderAccess from './media-folder-access';
import Price from './price.model';
import PriceType from '@models/price-type.model';
import Product from './product.model';
import ProductFolder from './product-folder';
import ProductFolderAccess from './product-folder-access';
import User from '@models/user.model';
import UserGroup from '@models/user-group.model';

const entities = [
  Archive,
  Category,
  Company,
  Country,
  Media,
  MediaFolder,
  MediaFolderAccess,
  Price,
  PriceType,
  Product,
  ProductFolder,
  ProductFolderAccess,
  User,
  UserGroup,
];

export default entities;
