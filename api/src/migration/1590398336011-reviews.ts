import { MigrationInterface, QueryRunner } from "typeorm";

const table = "reviews";

export class reviews1590398336011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ${table} (
              id              INT(11) NOT NULL AUTO_INCREMENT,
              storeId         INT(11) NOT NULL,
              score           FLOAT NOT NULL,
              title           TEXT NOT NULL,
              content         TEXT NOT NULL,
              created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              index reviews_storeId_index (storeId),
              PRIMARY KEY(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${table}`);
  }
}
