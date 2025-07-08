import { User } from "@common/entities"
import { UserRole } from "@common/enums"

export class AuthResponse {
    user: Omit<User, 'password'>
    accessToken: string
}

export class UserWithAuth {
    id: string
    role: UserRole
}