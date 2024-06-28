import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('post')
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ type: 'text' })
	description: string;

	@ManyToOne(() => Category, (category) => category.posts)
	category: Category;
}
