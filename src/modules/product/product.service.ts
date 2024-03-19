import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product-dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

    async createProduct(product: ProductDto){
        const productExist: ProductDto = await this.findProduct(product.id);

        if(productExist){
            throw new ConflictException('El Producto con el id ' + product.id + ' existe');
        }

        return await this.productRepository.save(product);
    }
    async findProduct(id: number){
        return await this.productRepository.findOne({
            where:{ id }
        })
    }

    async findAll(){
        return await this.productRepository.find({
            where: {deleted: false}
        });
    }

    async findAllDeleted(){
        return await this.productRepository.find({
            where: {deleted: true}
        });
    }

    async updateProducto(product: ProductDto){
        return await this.productRepository.save(product);
    }
}
