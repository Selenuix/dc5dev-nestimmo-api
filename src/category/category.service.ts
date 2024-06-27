import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	create(createCategoryDto: CreateCategoryDto) {
		console.log(createCategoryDto);
		try {
			const category = this.categoryRepository.create(createCategoryDto);
			return this.categoryRepository.save(category);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	findAll() {
		return this.categoryRepository.createQueryBuilder('category').getMany();
	}

	findOne(id: number) {
		try {
			return this.categoryRepository
				.createQueryBuilder('category')
				.where('category.id = :id', { id: id })
				.getOne();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		try {
			return await this.categoryRepository
				.createQueryBuilder('category')
				.where('category.id = :id', { id: id })
				.update(updateCategoryDto)
				.execute();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	remove(id: number) {
		try {
			return this.categoryRepository
				.createQueryBuilder('category')
				.where('category.id = :id', { id: id })
				.delete()
				.execute();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
