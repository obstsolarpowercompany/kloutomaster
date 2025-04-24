import { ICommand } from "@modules/shared/application/command/base.command";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ListBanksCommand implements ICommand {
  @IsOptional()
  perPage: number;

  @IsOptional()
  @IsBoolean()
  useCursor: boolean;

  @IsOptional()
  @IsString()
  next: string;

  @IsOptional()
  @IsString()
  prev: string;

  @IsString()
  country: string;

  constructor(opts: Partial<ListBanksCommand>) {
    Object.assign(this, opts);
  }
}
