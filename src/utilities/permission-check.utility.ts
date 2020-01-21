import User from '@models/user.model';
import {UserGroupType} from '@models/user-group.model';

export const isAdmin = async (id: number | undefined) => {
  if (!id) return false;
  const user = await User.findOne(id, {relations: ['userGroup']});
  if (user && user.userGroup && user.userGroup.type === UserGroupType.ADMIN) return true;
  return false;
};
