import { ApiProperty } from '@nestjs/swagger';

class UserDTO {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'First name of the user', nullable: true })
  first_name: string | null;

  @ApiProperty({ description: 'Last name of the user', nullable: true })
  last_name: string | null;

  @ApiProperty({ description: 'Username of the user' })
  username: string;

  @ApiProperty({
    description: 'URL to the avatar image of the user',
    nullable: true,
  })
  avatar_url: string | null;
}

export class GetFollowingResponseDTO {
  @ApiProperty({ description: 'Response status code' })
  status_code: number;

  @ApiProperty({ description: 'Followers retrieved successfully' })
  message: string;

  @ApiProperty({
    description: 'List of users the authenticated user is following',
    type: [UserDTO],
  })
  data: UserDTO[];
}

export class FollowUserResponseDTO {
  @ApiProperty({ description: 'Response status code' })
  status_code: number;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({
    description: 'Details of the user who is following and the followed user',
  })
  data: {
    follower: UserDTO;
    followingProfile: UserDTO;
    id: string;
    followedAt: string;
  };
}
