import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Deserializer, MicroserviceOptions, Transport} from "@nestjs/microservices";
import { Logger } from "@nestjs/common";
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import amqp from "amqp-connection-manager";

class OwnServer
    extends Server
    implements CustomTransportStrategy {

    private channel;


    /**
     * This method is triggered when you run "app.listen()".
     */
    listen(callback: (err?: unknown, ...optionalParams: unknown[]) => void): Promise<void> {
        const connection = amqp.connect(['amqp://root:root@rabbit:5672']);
        this.channel = connection.createChannel({
            json: true,
            setup: function (channel) {
                channel.assertQueue('equipment_events', { durable: true });
                channel.bindQueue('equipment_events', 'my-exchange', 'create');
                return channel;
            }
        });

        this.channel.consume('equipment_events', this.inboundProcess.bind(this))

        callback();

        return;
    }

    inboundProcess(data) {
        console.log('data',data);
        const {fields, properties, content} = data;
        console.log('fields',fields);
        console.log('properties',properties);
        const message = JSON.parse(content.toString());
        console.log('message',message)
        this.channel.ack(data);

    }

    /**
     * This method is triggered on application shutdown.
     */
    close() {}
}



const logger = new Logger();

class InbondDeserializer implements Deserializer {

    private logger:Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    deserialize(value: any, options?: Record<string, any>): any {
        this.logger.debug(value);
        value.pattern = 'billing';
        return value;
    }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'log', 'verbose', 'debug']});

  app.connectMicroservice<MicroserviceOptions>(
      {
          strategy: new OwnServer(),
      }
  )
  app.startAllMicroservices();


  app.listen(3000);
}
bootstrap();

