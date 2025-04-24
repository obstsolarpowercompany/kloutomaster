import { RESOURCE_FETCHED } from "@modules/main/application/SystemMessages"
import { User } from "@modules/user/domain/entities/user.entity"

export function UsersToDTO(users: User[]) {
    return {
        message: RESOURCE_FETCHED('Users'),
        data: {
            users,
        },
    }
}