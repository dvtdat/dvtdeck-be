import { Migration } from '@mikro-orm/migrations';

export class Migration20250607112558 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "venue" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "deleted_at" timestamptz null, "name" varchar(50) not null, "address" varchar(100) not null, "contact_info" varchar(50) not null, "description" varchar(255) null, "is_active" boolean not null default true);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "venue" cascade;`);
  }

}
