import { Optional, Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";

type UpdateUserDataInput = Optional<UserData, "email" | "name" | "password" | "role" >;

export interface UpdateUserRepository {
    updateUser(query: Query, data: UpdateUserDataInput): Promise<UserData | null>;
    incrementAppointmentsTotal(query: Query): Promise<UserData | null>;
}
