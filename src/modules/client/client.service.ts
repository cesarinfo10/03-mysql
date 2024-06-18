import { Client } from './entity/client.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from './dto/client-dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>
    ){}


 findClient(client:ClientDto){
        return  this.clientsRepository.findOne({
            where: [
                {id: client.id},
                {email: client.email}
            ]
        });
    }

    async createClient(client: ClientDto){
        const clientExists = await this.findClient(client);
        if(clientExists){
            if(clientExists.id === client.id){
                throw new ConflictException('El cliente con id ' + client.id + 'ya existe');
            }else{
                throw new ConflictException('El cliente con email ' + client.email + 'ya existe');
            }
        }

        return this.clientsRepository.save(client);
    }

}
