import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Controller('api/v1/products')
@ApiTags('productos')
export class ProductController {

    constructor(private productService: ProductService){  }

    @Post()
    @ApiOperation({
        description: 'Crear un producto'
    })
    @ApiBody({
        description: 'Crear un producto mediante un ProductDto',
        type: ProductDto,
        examples:{
            ejemplo1: {
                     value:{
                        "id": 1,
                        "name": "Producto 1",
                        "price": 50,
                        "stock": 30
                    }  
                },
            ejemplo2: {
                value:{
                    "name": "Producto 1",
                    "price": 50,
                    "stock": 30
                }  
            }
                    
        }
    })
    createProduct(@Body() product: ProductDto){
        return this.productService.createProduct(product);
    }

    @Get()
    @ApiOperation({
        description: 'Obtener todos los productos no borrados'
    })
    getProduct(){
       return  this.productService.findAll(); 
    }

    @Get('/deleted')
    @ApiOperation({
        description: 'Obtener todos los productos borrados'
    })   
    getProductDeleted(){
       return  this.productService.findAllDeleted(); 
    }

    @Get('/:id')
    @ApiOperation({
        description: 'Obtiene un producto por ID'
    })
    @ApiParam({
        name:'id',
        description:'id del producto',
        required: true,
        type: Number
    })
    getProductById(@Param('id') id:number){
       return  this.productService.findProduct(id); 
    }

    @Put()
    @ApiOperation({
        description: 'Actualiza un producto, sino existe, se crea'
    })
    @ApiBody({
        description: 'Actualiza un producto mediante un ProductDto, sino existe, se crea',
        type: ProductDto,
        examples:{
            ejemplo1: {
                     value:{
                        "id": 1,
                        "name": "Producto 1",
                        "price": 50,
                        "stock": 30
                    }  
                },
                    
        }
    })
    updateProduct(@Body() produc: ProductDto){
        return  this.productService.updateProducto(produc); 
    }

    @Delete('/:id')
    @ApiOperation({
        description: 'Borra un producto por ID (Borrado suave)'
    })
    @ApiParam({
        name:'id',
        description:'id del producto',
        required: true,
        type: Number
    })
    deleteProduct(@Param('id') id: number){
        return this.productService.softDelete(id);
    }

    @Patch('/restore/:id') //SIMILAR A UN PUT
    @ApiOperation({
        description: 'Recupera un producto por ID'
    })
    @ApiParam({
        name:'id',
        description:'id del producto',
        required: true,
        type: Number
    })
    restoreProduct(@Param('id')id:number){
        return this.productService.restoreProduct(id);
    }

    @Patch('/stock')
    @ApiOperation({
        description: 'Actualiza el stock un producto'
    })
    @ApiBody({
        description: 'Actualiza el stock un producto, mediante un StockDto',
        type: StockDto,
        examples:{
            ejemplo1: {
                     value:{
                        "id": 1,
                        "stock": 30
                    }  
                },
                    
        }
    })
    updateStock(@Body() stock:StockDto){
        return this.productService.updateStock(stock);
    }

    @Patch('/increment-stock')
    @ApiOperation({
        description: 'Incrementa el stock un producto'
    })
    @ApiBody({
        description: 'Incrementa el stock un producto, mediante un StockDto, no mas de 1000',
        type: StockDto,
        examples:{
            ejemplo1: {
                     value:{
                        "id": 1,
                        "stock": 30
                    }  
                },
            
            ejemplo2: {
                value:{
                    "id": 1,
                    "stock": 1000
                }  
            },       
        }
    })
    incrementStock(@Body() stock:StockDto){
        return this.productService.incrementStock(stock);
    }

    @Patch('/decrement-stock')
    @ApiOperation({
        description: 'Decrementa el stock un producto'
    })
    @ApiBody({
        description: 'Decrementa el stock un producto, mediante un StockDto, no mens de 0',
        type: StockDto,
        examples:{
            ejemplo1: {
                     value:{
                        "id": 1,
                        "stock": 30
                    }  
                },
            
            ejemplo2: {
                value:{
                    "id": 1,
                    "stock": 0
                }  
            },       
        }
    })
    decrementStock(@Body() stock:StockDto){
        return this.productService.decrementStock(stock);
    }
}
