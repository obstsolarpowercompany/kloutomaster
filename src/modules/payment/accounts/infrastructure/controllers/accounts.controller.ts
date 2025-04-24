import { Controller, Get, Query } from "@nestjs/common";
import { ListBanksCommand } from "../../application/use-cases/list-banks-command";
import { ListBanksService } from "../../application/use-cases/list-banks.service";
import { ListBanksDTO } from "./dto/list-bank.dto";
import { ApiTags } from "@nestjs/swagger";
import { ValidateAccountDTO } from "./dto/validate-account.dto";
import { ValidateAccountCommand } from "../../application/use-cases/validate-account.command";
import { ValidateAccountService } from "../../application/use-cases/validate-account.service";

@ApiTags("Payment -> Banks")
@Controller("payment/accounts")
export class AccountsController {
  constructor(
    private readonly listBanksService: ListBanksService,
    private readonly validateAccountService: ValidateAccountService,
  ) {}

  @Get("banks")
  getBanks(@Query() query: ListBanksDTO) {
    const command = new ListBanksCommand(query);
    return this.listBanksService.process(command);
  }

  @Get("validate")
  validate(@Query() query: ValidateAccountDTO) {
    const command = new ValidateAccountCommand(query);
    return this.validateAccountService.process(command);
  }
}
