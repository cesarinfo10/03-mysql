import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product-dto';

@Controller('api/v1/products')
@ApiTags('productos')
export class ProductController {

    constructor(private productService: ProductService){  }

    @Post()
    createProduct(@Body() product: ProductDto){
        return this.productService.createProduct(product);
    }

    @Get()
    getProduct(){
       return  this.productService.findAll(); 
    }

    @Get('/deleted')
    getProductDeleted(){
       return  this.productService.findAllDeleted(); 
    }

    @Get('/:id')
    getProductById(@Param('id') id:number){
       return  this.productService.findProduct(id); 
    }

    @Put()
    updateProduct(@Body() produc: ProductDto){
        return  this.productService.updateProducto(produc); 
    }
}
