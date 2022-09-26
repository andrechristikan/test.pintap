import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { INTEGRATION_DATABASE_URL } from './database.constant';
import { CommonModule } from 'src/common/common.module';
import { RouterModule } from 'src/router/router.module';
import { faker } from '@faker-js/faker';

describe('Database Integration', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CommonModule, RouterModule],
            controllers: [],
        }).compile();

        app = moduleRef.createNestApplication();

        await app.init();
    });

    it(`GET ${INTEGRATION_DATABASE_URL} Success`, async () => {
        const response = await request(app.getHttpServer())
            .get(INTEGRATION_DATABASE_URL)
            .set('user-agent', faker.internet.userAgent());

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.statusCode).toEqual(HttpStatus.OK);

        return;
    });

    afterAll(async () => {
        await app.close();
    });
});
