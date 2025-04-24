import { UserProfile } from "../userProfile.entity";

interface UserInterface {
  id: string;

  email: string;

  secret: string;

  profile: UserProfile;

  status: string;

  user_type: string;

  is_active: boolean;

  is_verified: boolean;

  created_at: Date;

  updated_at: Date;

}

export default UserInterface;
