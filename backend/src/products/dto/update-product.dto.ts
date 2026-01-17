import { PartialType } from '@nestjs/mapped-types'; // Note: usually @nestjs/swagger or mapped-types
import { CreateProductDto } from './create-product.dto';

// NestJS mapped-types is needed for PartialType if not using swagger plugin
// If @nestjs/mapped-types is not installed, I might need to install it or plain Partial
// Checking package.json... it's not there. I should install it or use class-validator PartialType equivalent if available?
// Actually, @nestjs/mapped-types is standard. I'll check if I installed it.
// I didn't install @nestjs/mapped-types. I will install it now or use a manual partial.
// To be safe and standard, I'll install @nestjs/mapped-types.

export class UpdateProductDto extends PartialType(CreateProductDto) { }
