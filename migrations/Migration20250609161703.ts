import { Migration } from '@mikro-orm/migrations';

export class Migration20250609161703 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "venue_court" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "deleted_at" timestamptz null, "name" varchar(50) not null, "venue_id" int not null, "sport_id" int not null);`);

    this.addSql(`alter table "venue_court" add constraint "venue_court_venue_id_foreign" foreign key ("venue_id") references "venue" ("id") on update cascade;`);
    this.addSql(`alter table "venue_court" add constraint "venue_court_sport_id_foreign" foreign key ("sport_id") references "sport" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "venue_court" cascade;`);
  }

}
