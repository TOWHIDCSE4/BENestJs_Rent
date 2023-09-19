import { ResOptionDto } from '../../../../common/dtos/base.res';
import { User } from '../../../entities/user.entity';
import { UserType } from '../../../enums/user.enum';
import { CustomerResDto } from './customer.res.dto';

export type UserResDtoParams = {
  data?: User;
  resOpts?: ResOptionDto;
  blockAccount?: boolean;
  blockAddPoint?: boolean;
};

export class UserResDto {
  id: number;
  type: UserType;
  customer: CustomerResDto;

  static mapProperty(dto: UserResDto, params: UserResDtoParams) {
    const { data } = params;

    dto.id = data.id;
  }

  static forAdmin(params: UserResDtoParams) {
    const { data, resOpts } = params;

    const result = new UserResDto();
    if (!data) return null;

    this.mapProperty(result, params);

    result.type = data.type;

    result.customer = CustomerResDto.forAdmin({ data: data.customer });

    return result;
  }
}
