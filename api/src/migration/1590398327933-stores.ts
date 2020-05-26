import { MigrationInterface, QueryRunner } from "typeorm";

const table = "stores";

export class stores1590398327933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ${table} (
            id              INT(11) NOT NULL AUTO_INCREMENT,
            score           FLOAT NOT NULL,
            name            VARCHAR(255) NOT NULL,
            address         VARCHAR(255) NOT NULL,
            genre           VARCHAR(255) NOT NULL,
            created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            index stores_name_index (name),
            index stores_score_index (score),
            PRIMARY KEY(id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${table}`);
  }
}
