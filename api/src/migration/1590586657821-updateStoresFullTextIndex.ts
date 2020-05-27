import { MigrationInterface, QueryRunner } from "typeorm";

const table = "stores";

export class updateStoresFullTextIndex1590586657821
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE ${table} ADD FULLTEXT full_text_name(name) WITH PARSER ngram;`
    );
    await queryRunner.query(
      `ALTER TABLE ${table} ADD FULLTEXT full_text_genre(genre) WITH PARSER ngram;`
    );
    await queryRunner.query(
      `ALTER TABLE ${table} ADD FULLTEXT full_text_address(address) WITH PARSER ngram;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE ${table} DROP INDEX full_text_name`);
    await queryRunner.query(`ALTER TABLE ${table} DROP INDEX full_text_genre`);
    await queryRunner.query(
      `ALTER TABLE ${table} DROP INDEX full_text_address`
    );
  }
}
