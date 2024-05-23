import { Address } from './entity/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Address
    ])
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
