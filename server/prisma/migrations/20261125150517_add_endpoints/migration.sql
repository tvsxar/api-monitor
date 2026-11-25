-- CreateTable
CREATE TABLE "endpoint" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "intervalSeconds" INTEGER NOT NULL DEFAULT 600,
    "timeoutMs" INTEGER NOT NULL DEFAULT 10000,
    "expectedStatus" INTEGER NOT NULL DEFAULT 200,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "endpoint_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "endpoint_intervalSeconds_check" CHECK ("intervalSeconds" >= 60),
    CONSTRAINT "endpoint_timeoutMs_check" CHECK ("timeoutMs" BETWEEN 1 AND 30000),
    CONSTRAINT "endpoint_expectedStatus_check" CHECK ("expectedStatus" BETWEEN 100 AND 599)
);

-- CreateIndex
CREATE INDEX "endpoint_projectId_idx" ON "endpoint"("projectId");

-- AddForeignKey
ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
