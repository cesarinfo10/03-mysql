import { ClientService } from './client.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {

    constructor(private clientService: ClientService) {}

    @Post()
    createClient(@Body() client: ClientDto){
        return this.clientService.createClient(client);
    }

}
