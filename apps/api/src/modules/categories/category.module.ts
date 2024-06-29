import { Module } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService, CategoryResolver, CategoryRepository],
})
export class CategoryModule {}
