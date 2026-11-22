CREATE TYPE "client_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "client_site_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "service_status" AS ENUM('asignado', 'aceptado', 'en_transito', 'en_sitio', 'pendiente', 'en_revision', 'correccion', 'finalizado', 'cancelado');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(150) NOT NULL,
	"contact_name" varchar(150),
	"email" varchar(255),
	"phone" varchar(30),
	"status" "client_status" DEFAULT 'active'::"client_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_sites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"affiliation_number" varchar(20),
	"street" varchar(150) NOT NULL,
	"number" varchar(20),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postal_code" varchar(10),
	"status" "client_site_status" DEFAULT 'active'::"client_site_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"folio" varchar(30) NOT NULL,
	"client_id" uuid NOT NULL,
	"site_id" uuid NOT NULL,
	"service_type" varchar(100) NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"description" text,
	"status" "service_status" DEFAULT 'asignado'::"service_status" NOT NULL,
	"created_by_user" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cancelled_at" timestamp,
	"cancelled_by_user" text,
	"cancellation_reason" text
);
--> statement-breakpoint
ALTER TABLE "client_sites" ADD CONSTRAINT "client_sites_client_id_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_client_id_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_site_id_client_sites_id_fkey" FOREIGN KEY ("site_id") REFERENCES "client_sites"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_created_by_user_user_id_fkey" FOREIGN KEY ("created_by_user") REFERENCES "user"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_cancelled_by_user_user_id_fkey" FOREIGN KEY ("cancelled_by_user") REFERENCES "user"("id") ON DELETE RESTRICT;