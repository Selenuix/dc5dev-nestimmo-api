import { Category } from '../../category/entities/category.entity';

export class CreatePostDto {
	title: string;
	description: string;
	category: Category;
}
