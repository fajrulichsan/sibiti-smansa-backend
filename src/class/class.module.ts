import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { UserClass } from './entities/user-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, UserClass])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
