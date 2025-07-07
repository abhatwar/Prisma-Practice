BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CategoryDetails] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CategoryDetails_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CategoryDetails_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[_CategoryDetailsToProduct] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_CategoryDetailsToProduct_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_CategoryDetailsToProduct_B_index] ON [dbo].[_CategoryDetailsToProduct]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_CategoryDetailsToProduct] ADD CONSTRAINT [_CategoryDetailsToProduct_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[CategoryDetails]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CategoryDetailsToProduct] ADD CONSTRAINT [_CategoryDetailsToProduct_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Product]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
