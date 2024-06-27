import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
	// importer repository and PostEntity
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
	) {}

	create(createPostDto: CreatePostDto) {
		console.log(createPostDto);
		try {
			const post = this.postRepository.create(createPostDto);
			return this.postRepository.save(post);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	findAll() {
		return this.postRepository.createQueryBuilder('post').getMany();
	}

	findOne(id: number) {
		try {
			return this.postRepository
				.createQueryBuilder('post')
				.where('post.id = :id', { id: id })
				.getOne();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		try {
			return await this.postRepository
				.createQueryBuilder('post')
				.where('post.id = :id', { id: id })
				.update(updatePostDto)
				.execute();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	remove(id: number) {
		try {
			return this.postRepository
				.createQueryBuilder('post')
				.where('post.id = :id', { id: id })
				.delete()
				.execute();
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
