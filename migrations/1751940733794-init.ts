import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751940733794 implements MigrationInterface {
    name = 'Init1751940733794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quote\` (\`id\` varchar(36) NOT NULL, \`exchange_rate\` decimal(18,8) NOT NULL, \`calculated_fee\` decimal(18,8) NOT NULL, \`resulting_fiat_amount\` decimal(18,8) NOT NULL, \`timestamp\` timestamp NOT NULL, \`input_amount\` decimal(18,8) NOT NULL, \`fee\` decimal(18,8) NOT NULL, \`input_currency\` varchar(255) NOT NULL, \`output_currency\` varchar(255) NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_c8921e59393636e1dcfb537e052\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_c8921e59393636e1dcfb537e052\``);
        await queryRunner.query(`DROP TABLE \`quote\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
