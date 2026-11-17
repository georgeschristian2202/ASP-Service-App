ALTER TABLE "portfolio_items"
ADD COLUMN "service" TEXT NOT NULL DEFAULT '';

CREATE INDEX "portfolio_items_service_idx" ON "portfolio_items"("service");
