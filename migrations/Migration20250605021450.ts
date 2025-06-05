import { Migration } from '@mikro-orm/migrations';

export class Migration20250605021450 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "sport" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "name" varchar(50) not null, "description" varchar(500) null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "sport" cascade;`);
  }

}
