import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  CustomerLoginReqDto,
  RegisterCustomerReqDto,
} from '../../dtos/customer/req/auth.customer.req.dto';
import { AuthCustomerService } from '../../services/customer/auth.customer.service';

@Controller(`${PrefixType.CUSTOMER}/auth`)
@ApiTags('Auth Customer')
export class AuthCustomerController {
  constructor(private authCustomerService: AuthCustomerService) {}

  @Post('login')
  login(@Body() body: CustomerLoginReqDto) {
    return this.authCustomerService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterCustomerReqDto) {
    return this.authCustomerService.register(body);
  }
}
