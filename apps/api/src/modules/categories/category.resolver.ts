import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './category.entity';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { CategoryInput } from './category.input';
// biome-ignore lint: #caveat-with-typescript-experimental-decorators
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('data') data: CategoryInput) {
    return this.categoryService.create(data);
  }

  @Query(() => [Category])
  categories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { nullable: true })
  category(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('data') data: CategoryInput) {
    return this.categoryService.update(data);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id') id: string) {
    return this.categoryService.remove(id);
  }
}
