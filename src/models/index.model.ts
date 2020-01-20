import Archive from '@models/archive.model';
import Company from '@models/company.model';
import Country from '@models/country.model';
import PriceType from '@models/price-type.model';
import User from '@models/user.model';
import UserGroup from '@models/user-group.model';

const entities = [
  User,
  UserGroup,
  Company,
  Country,
  Archive,
  PriceType,
];

export default entities;
