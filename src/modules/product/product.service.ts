import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Injectable()
export class ProductService {

    private MIN_STOCK: number = 0;
    private MAX_STOCK: number = 1000;


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

    async softDelete(id:number ){
        const productExist: ProductDto = await this.findProduct(id);

        if(!productExist){
            throw new ConflictException('El Producto con el id ' + id + ' no existe');
        }

        if (productExist.deleted){
            throw new ConflictException('El Producto esta borrado');
        }

        const rows: UpdateResult= await this.productRepository.update(
            {id}, 
            {deleted: true}
        );

        return rows.affected == 1;
    }


    async restoreProduct(id: number){
        const productExist: ProductDto = await this.findProduct(id);

        if(!productExist){
            throw new ConflictException('El Producto con el id ' + id + ' no existe');
        }

        if (!productExist.deleted){
            throw new ConflictException('El Producto no esta borrado');
        }

        const rows: UpdateResult= await this.productRepository.update(
            {id}, 
            {deleted: false}
        );

        return rows.affected == 1;
    }

    async updateStock(s: StockDto){
        const produc: ProductDto = await this.findProduct(s.id);
        if (!produc){
            throw new ConflictException(`El Producto ${s.id} no esta existe`);
        }
        if (produc.deleted){
            throw new ConflictException(`El Producto ${s.id} no esta borrado`);
        }
        const rows: UpdateResult= await this.productRepository.update(
            {id: s.id}, 
            {stock: s.stock}
        );

        return rows.affected == 1;
    }


    async incrementStock(s: StockDto){
        const produc: ProductDto = await this.findProduct(s.id);
        if (!produc){
            throw new ConflictException(`El Producto ${s.id} no esta existe`);
        }
        if (produc.deleted){
            throw new ConflictException(`El Producto ${s.id} no esta borrado`);
        }

        let stock = 0;
        if(s.stock + produc.stock > this.MAX_STOCK){
            stock =this.MAX_STOCK;
        }else{
            stock = s.stock + produc.stock
        }
        const rows: UpdateResult= await this.productRepository.update(
            {id: s.id}, 
            {stock}
        );

        return rows.affected == 1;
    }

    async decrementStock(s: StockDto){
        const produc: ProductDto = await this.findProduct(s.id);
        if (!produc){
            throw new ConflictException(`El Producto ${s.id} no esta existe`);
        }
        if (produc.deleted){
            throw new ConflictException(`El Producto ${s.id} no esta borrado`);
        }

        let stock = 0;
        if(produc.stock - s.stock  > this.MIN_STOCK){
            stock =this.MIN_STOCK;
        }else{
            stock = produc.stock - s.stock 
        }
        const rows: UpdateResult= await this.productRepository.update(
            {id: s.id}, 
            {stock}
        );

        return rows.affected == 1;
    }
}
