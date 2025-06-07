import { Migration } from '@mikro-orm/migrations';

export class Migration20250607092252 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "sport" add column "deleted_at" timestamptz null;`);

    this.addSql(`alter table "user" add column "deleted_at" timestamptz null;`);

    this.addSql(`alter table "user_profile" add column "deleted_at" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "sport" drop column "deleted_at";`);

    this.addSql(`alter table "user" drop column "deleted_at";`);

    this.addSql(`alter table "user_profile" drop column "deleted_at";`);
  }

}
