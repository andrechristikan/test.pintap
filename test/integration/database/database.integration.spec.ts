import { HttpStatus, INestApplication } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { INTEGRATION_DATABASE_URL } from './database.constant';
import { CommonModule } from 'src/common/common.module';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from 'src/health/controllers/health.controller';

describe('Database Integration', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CommonModule, TerminusModule, HttpModule],
            controllers: [HealthController],
        }).compile();

        app = moduleRef.createNestApplication();

        await app.init();
    });

    it(`GET ${INTEGRATION_DATABASE_URL} Success`, async () => {
        const response = await request(app.getHttpServer()).get(
            INTEGRATION_DATABASE_URL
        );

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    afterAll(async () => {
        await app.close();
    });
});
