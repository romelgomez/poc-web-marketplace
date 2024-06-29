import { Injectable } from '@nestjs/common';
import type { CategoryInput } from './category.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CategoryInput) {
    return this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  async update(data: CategoryInput) {
    return this.categoryRepository.update(data);
  }

  async remove(id: string) {
    return this.categoryRepository.remove(id);
  }
}
