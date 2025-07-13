import { UserProfile } from "../userProfile.entity";

interface UserInterface {
  id: string;

  email: string;

  username: string;

  phone: string;

  secret: string;

  profile: UserProfile;

  status: string;

  user_type: string;

  two_factor_enabled: boolean;

  is_active: boolean;

  is_verified: boolean;

  created_at: Date;

  updated_at: Date;
}

export default UserInterface;
