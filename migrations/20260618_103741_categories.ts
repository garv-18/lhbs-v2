import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_categories_target_page" AS ENUM('/courses', '/products');
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"target_page" "enum_categories_target_page" DEFAULT '/courses' NOT NULL,
  	"rank" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "coursenames" ADD COLUMN "category_id" integer;
  ALTER TABLE "coursenames" ADD COLUMN "description_rich_text" jsonb;
  ALTER TABLE "coursenames" DROP COLUMN IF EXISTS "course_type";
  
  ALTER TABLE "coursenames" ADD CONSTRAINT "coursenames_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "coursenames_category_idx" ON "coursenames" USING btree ("category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "coursenames" DROP CONSTRAINT "coursenames_category_id_categories_id_fk";
  DROP INDEX IF EXISTS "categories_slug_idx";
  DROP INDEX IF EXISTS "categories_updated_at_idx";
  DROP INDEX IF EXISTS "categories_created_at_idx";
  DROP INDEX IF EXISTS "coursenames_category_idx";
  ALTER TABLE "coursenames" DROP COLUMN IF EXISTS "category_id";
  ALTER TABLE "coursenames" DROP COLUMN IF EXISTS "description_rich_text";
  ALTER TABLE "coursenames" ADD COLUMN "course_type" "enum_coursenames_course_type";
  DROP TABLE "categories" CASCADE;
  DROP TYPE "public"."enum_categories_target_page";`)
}
