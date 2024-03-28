import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

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

    @Delete('/:id')
    deleteProduct(@Param('id') id: number){
        return this.productService.softDelete(id);
    }
    @Patch('/restore/:id') //SIMILAR A UN PUT
    restoreProduct(@Param('id')id:number){
        return this.productService.restoreProduct(id);
    }
    @Patch('/stock')
    updateStock(@Body() stock:StockDto){
        return this.productService.updateStock(stock);
    }
    @Patch('/increment-stock')
    incrementStock(@Body() stock:StockDto){
        return this.productService.incrementStock(stock);
    }

    @Patch('/decrement-stock')
    decrementStock(@Body() stock:StockDto){
        return this.productService.decrementStock(stock);
    }
}
