
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodoSchema } from 'Schemas/Todo.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://urf9ay9ql9wvsglf3bp7:kWjqdF5j3g8ORzXsxe10@b7zz5kxwafkcpsl-mongodb.services.clever-cloud.com:27017/b7zz5kxwafkcpsl',
      { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: Todos.name, schema: TodoSchema }])
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}