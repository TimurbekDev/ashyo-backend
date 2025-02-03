import { ApiProperty } from '@nestjs/swagger';
import { ICreateCartItemByUserID } from '../interfaces';

export class CreateCartItemByUserId  {
  @ApiProperty({
    type: Number,
  })
  count: number;
  @ApiProperty({
    type: Number,
  })

  productItemId: number;
}
