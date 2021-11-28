import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor() {}

  @EventPattern("billing")
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data);
  }
}

