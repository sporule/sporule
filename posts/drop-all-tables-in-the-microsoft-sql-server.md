---
title: "Drop All Tables in the Microsoft SQL Server"
author: "Sporule"
date: "2018-11-08"
categories: "coding"
tags: "sql"
coverimage: "http://www.wisetrack.com/wp-content/uploads/2018/05/1768.sql_logo.png"
---

## Main Topic

Sometimes it is a pain to drop the database and recreate it, now I found a script that can drop all tables in the database which is nice.

```bash
DECLARE @Sql NVARCHAR(500) DECLARE @Cursor CURSOR

SET @Cursor = CURSOR FAST_FORWARD FOR
SELECT DISTINCT sql = 'ALTER TABLE [' + tc2.TABLE_NAME + '] DROP [' + rc1.CONSTRAINT_NAME + ']'
FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc1
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc2 ON tc2.CONSTRAINT_NAME =rc1.CONSTRAINT_NAME

OPEN @Cursor FETCH NEXT FROM @Cursor INTO @Sql

WHILE (@@FETCH_STATUS = 0)
BEGIN
Exec sp_executesql @Sql
FETCH NEXT FROM @Cursor INTO @Sql
END

CLOSE @Cursor DEALLOCATE @Cursor
GO

EXEC sp_MSforeachtable 'DROP TABLE ?'
GO
```

## Credit

Original from [Here](https://social.msdn.microsoft.com/Forums/sqlserver/en-US/a512be8a-376f-4fc9-8243-78dbdbe59e55/how-to-deletedrop-all-the-tables-from-sql-server-database-without-using-enterprise-manager?forum=transactsql)
