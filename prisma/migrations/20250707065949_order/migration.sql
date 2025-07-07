/*
  Warnings:

  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Order] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [Order_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[status] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_status_df] DEFAULT 'pending',
[totalAmount] DECIMAL(10,2) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
