import { ICommand } from "../command/base.command";

export interface IApplicationService<T extends ICommand> {
    process(command: T): Promise<any>
}