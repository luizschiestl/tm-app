import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1686574359937 implements MigrationInterface {
    name = 'Init1686574359937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(20) NOT NULL, \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`account_status\` enum ('ACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE', \`password_reset_token\` varchar(255) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_c0d176bcc1665dc7cb60482c81\` (\`password_reset_token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`login_attempts\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('SUCCESS', 'FAILURE') NOT NULL, \`created_at\` timestamp NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`login_attempts\` ADD CONSTRAINT \`FK_5f88175f39e2b2ebf9e2295a9fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`
            INSERT INTO users (id, first_name, last_name, email, password, phone, username)
            VALUES (
                UUID(),
                'Luiz',
                'Schiestl',
                'luiz@mail.com',
                '$2b$10$x9Z2eSsme7.EVAN1zeelmeOKx.N.Nm/mek5RThR9zhUjb0worwdwy',
                '1234567890',
                'luiz'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`login_attempts\` DROP FOREIGN KEY \`FK_5f88175f39e2b2ebf9e2295a9fd\``);
        await queryRunner.query(`DROP TABLE \`login_attempts\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0d176bcc1665dc7cb60482c81\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
