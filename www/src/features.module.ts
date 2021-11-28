import {Module} from "@nestjs/common";
import {FeaturesController} from "./features.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'FEATURES_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://root:root@rabbit:5672'],
                    queue: 'billing_events',
                    queueOptions: {
                        durable: false
                    },
                },
            },
        ]),
    ],
    controllers: [FeaturesController],

})
export class FeaturesModule {
}

