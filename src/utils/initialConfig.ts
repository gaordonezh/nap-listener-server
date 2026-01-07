import { UserRolesEnum } from 'src/user/user.enum';
import { User } from 'src/user/user.model';

class InitialConfig {
  globalUser(): User {
    return {
      name: 'SuperAdmin',
      lastname: 'SuperAdmin',
      username: 'netappperusac@gmail.com',
      password: 'Nap2026+',
      roles: [UserRolesEnum.SUPERADMIN, UserRolesEnum.CLIENT],
      isActive: true,
    };
  }
}

export default InitialConfig;
