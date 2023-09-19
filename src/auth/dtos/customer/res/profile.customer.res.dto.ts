import { Customer } from '../../../entities/customer.entity';
import { CustomerGender, CustomerStatus } from '../../../enums/customer.enum';

export class ProfileCustomerResDto {
  id: number;
  email: string;
  name?: string;
  birthDate?: Date;
  status: CustomerStatus;
  userId: number;
  gender?: CustomerGender;
  avatarUrl?: string;

  static mapProperty(dto: ProfileCustomerResDto, customer: Customer) {
    dto.id = customer.id;
    dto.email = customer.email;
    dto.name = customer.name;
    dto.birthDate = customer.birthDate;
    dto.status = customer.status;
    dto.userId = customer.userId;
    dto.gender = customer.gender;
    dto.avatarUrl = customer.avatar?.url;
  }
  static forCustomer(customer: Customer) {
    if (!customer) return null;

    const result = new ProfileCustomerResDto();
    this.mapProperty(result, customer);

    return result;
  }
}
