import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
	) {}

	async create(createPostDto: CreatePostDto) {
		try {
			const post: PostEntity = this.postRepository.create(createPostDto);
			return await this.postRepository.save(post);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findAll() {
		return await this.postRepository.find({ relations: { category: true } });
	}

	async findOne(id: number) {
		try {
			return await this.postRepository.findOne({
				where: { id },
				relations: { category: true },
			});
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		try {
			return await this.postRepository.update({ id }, updatePostDto);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async remove(id: number) {
		try {
			const post: PostEntity = await this.findOne(id);
			return await this.postRepository.remove(post);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
