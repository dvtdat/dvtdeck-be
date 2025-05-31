import { Migration } from '@mikro-orm/migrations';

export class Migration20250531162834 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "email" varchar(255) not null, "password" varchar(255) not null, "username" varchar(255) not null);`);

    this.addSql(`create table "user_profile" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "user_id" int not null);`);
    this.addSql(`alter table "user_profile" add constraint "user_profile_user_id_unique" unique ("user_id");`);

    this.addSql(`alter table "user_profile" add constraint "user_profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_profile" drop constraint "user_profile_user_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "user_profile" cascade;`);
  }

}
