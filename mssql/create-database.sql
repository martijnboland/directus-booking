IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'directus-booking')
BEGIN
  CREATE DATABASE [directus-booking];
END;
GO