import {
  BaseResponseDtoParams,
  ResOptionDto,
} from '../../../../common/dtos/base.res';
import { FileResDto } from '../../../../file/dtos/res/file.res.dto';
import { Customer } from '../../../entities/customer.entity';
import { CustomerGender, CustomerStatus } from '../../../enums/customer.enum';
import { UserResDto } from './user.res.dto';

export interface CustomerResDtoParams extends BaseResponseDtoParams {
  dto?: CustomerResDto;
  data?: Customer;
  resOpts?: ResOptionDto;
}

export class CustomerResDto {
  id: number;
  address: string;
  email: string;
  name: string;
  birthDate: Date;
  user: UserResDto;
  avatar: FileResDto;
  gender: CustomerGender;
  createdAt: Date;
  userId: number;
  status: CustomerStatus;

  static mapProperty({ dto, data }: CustomerResDtoParams) {
    dto.id = data.id;
    dto.email = data.email;
    dto.name = data.name;
    dto.birthDate = data.birthDate;

    dto.createdAt = data.createdAt;
    dto.gender = data.gender;
  }

  static forCustomer({ data, resOpts }: CustomerResDtoParams) {
    if (!data) return null;

    const result = new CustomerResDto();

    this.mapProperty({
      dto: result,
      data: data,
    });

    result.avatar = FileResDto.forCustomer({ data: data.avatar, resOpts });

    return result;
  }

  static forAdmin(params: CustomerResDtoParams) {
    const { data, resOpts } = params;

    const result = new CustomerResDto();
    if (!data) return null;

    this.mapProperty({ dto: result, data: data });
    result.status = data.status;

    result.avatar = FileResDto.forAdmin({ data: data.avatar, resOpts });
    result.user = UserResDto.forAdmin({ data: data.user, resOpts });

    return result;
  }
}
