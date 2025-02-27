import { UpdateRecordGeneric } from "src/helpers/UpdateRecordGeneric";
import UserInterface from "./entities/interfaces/UserInterface";
import UserIdentifierOptionsType from "./UserIdentifierOptions";


type UserUpdateRecord = Partial<UserInterface>;

type UpdateUserRecordOption = UpdateRecordGeneric<UserIdentifierOptionsType, UserUpdateRecord>;

export default UpdateUserRecordOption;
