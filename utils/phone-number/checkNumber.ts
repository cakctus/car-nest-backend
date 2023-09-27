import { HttpException, HttpStatus } from '@nestjs/common';
import { phone } from 'phone';

class CheckNumberService {
  checkNumber(countryCode: string, number: string, lang: any) {
    const result = phone(`${countryCode}${number}`);
    if (result.isValid) {
      return result.phoneNumber;
    } else {
      throw new HttpException('Incorrect number', HttpStatus.BAD_REQUEST);
    }
  }
}

export default new CheckNumberService();
