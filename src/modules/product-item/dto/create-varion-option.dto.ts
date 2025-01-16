import { ApiProperty } from '@nestjs/swagger';
import { VarationOption } from '@prisma/client';

export class CreateVariationDemoDto implements Pick<VarationOption, "value"|"varationId"> {
    @ApiProperty({ example: '', description: "value",required: true })
    value: string;

    @ApiProperty({ example: 25, description: 'Variation id', required: true })
    varationId: number;
}
