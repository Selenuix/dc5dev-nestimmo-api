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

	async findAll() {
		return await this.categoryRepository.find({ relations: { posts: true } });
	}

	findOne(id: number) {
		try {
			return this.categoryRepository.findOne({ where: { id }, relations: { posts: true } });
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		try {
			return await this.categoryRepository.update({ id }, updateCategoryDto);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async remove(id: number) {
		try {
			const category: Category = await this.findOne(id);
			return await this.categoryRepository.remove(category);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
