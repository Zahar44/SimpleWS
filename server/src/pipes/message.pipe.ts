import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { UserMessage } from '../ws/services/chat.service';

export class MessagePipe implements PipeTransform {
  transform(value: UserMessage, metadata: ArgumentMetadata) {
    if (!value.msg) {
      throw new HttpException('Message should not be empty', 400);
    }
    return value;
  }
}
