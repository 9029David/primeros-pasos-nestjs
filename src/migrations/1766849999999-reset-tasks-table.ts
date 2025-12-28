import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResetTasksTable1766849999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar tabla vieja
    await queryRunner.query(`
      DROP TABLE IF EXISTS tasks;
    `);

    // Asegurar extensión para UUID
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

    // Crear tabla correcta
    await queryRunner.query(`
      CREATE TABLE tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        status VARCHAR NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE tasks;
    `);
  }
}
