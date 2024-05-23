import { Client } from './entity/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from './dto/client-dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>
    ){}


    createClient(client: ClientDto){
        return this.clientsRepository.save(client);
    }

}
