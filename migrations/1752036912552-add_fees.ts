import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFees1752036912552 implements MigrationInterface {
    name = 'AddFees1752036912552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`country_fees\` (\`id\` varchar(36) NOT NULL, \`countryCode\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`country_fees\``);
    }

}
