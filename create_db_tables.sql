SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Tournament]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Tournament](
	[TournamentId] [int] IDENTITY(1,1) NOT NULL,
	[TournamentName] [nvarchar](max) NOT NULL,
	[TournamentDesc] [nvarchar](max) NULL,
 CONSTRAINT [PK_Tournament] PRIMARY KEY CLUSTERED 
(
	[TournamentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EventDetailStatus]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[EventDetailStatus](
	[EventDetailStatusId] [int] IDENTITY(1,1) NOT NULL,
	[EventDetailStatusName] [nvarchar](max) NULL,
 CONSTRAINT [PK_EventDetailStatus] PRIMARY KEY CLUSTERED 
(
	[EventDetailStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Event]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Event](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[TournamentId] [int] NOT NULL,
	[EventName] [nvarchar](max) NOT NULL,
	[EventNumber] [int] NOT NULL,
	[EventDateTime] [datetime2](7) NOT NULL,
	[EventEndDateTime] [datetime2](7) NOT NULL,
	[AutoClose] [bit] NOT NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Event_Tournament_TournamentId]') AND parent_object_id = OBJECT_ID(N'[dbo].[Event]'))
ALTER TABLE [dbo].[Event]  WITH NOCHECK ADD  CONSTRAINT [FK_Event_Tournament_TournamentId] FOREIGN KEY([TournamentId])
REFERENCES [dbo].[Tournament] ([TournamentId])
ON DELETE CASCADE
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Event_Tournament_TournamentId]') AND parent_object_id = OBJECT_ID(N'[dbo].[Event]'))
ALTER TABLE [dbo].[Event] CHECK CONSTRAINT [FK_Event_Tournament_TournamentId]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[EventDetail]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[EventDetail](
	[EventDetailId] [int] IDENTITY(1,1) NOT NULL,
	[EventId] [int] NOT NULL,
	[EventDetailStatusId] [int] NOT NULL,
	[EventDetailName] [nvarchar](max) NULL,
	[EventDetailOdd] [decimal](18, 2) NOT NULL,
	[FinishingPosition] [int] NOT NULL,
	[FirstTimer] [bit] NOT NULL,
 CONSTRAINT [PK_EventDetail] PRIMARY KEY CLUSTERED 
(
	[EventDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EventDetail_Event_EventId]') AND parent_object_id = OBJECT_ID(N'[dbo].[EventDetail]'))
ALTER TABLE [dbo].[EventDetail]  WITH NOCHECK ADD  CONSTRAINT [FK_EventDetail_Event_EventId] FOREIGN KEY([EventId])
REFERENCES [dbo].[Event] ([EventId])
ON DELETE CASCADE
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EventDetail_Event_EventId]') AND parent_object_id = OBJECT_ID(N'[dbo].[EventDetail]'))
ALTER TABLE [dbo].[EventDetail] CHECK CONSTRAINT [FK_EventDetail_Event_EventId]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EventDetail_EventDetailStatus_EventDetailStatusId]') AND parent_object_id = OBJECT_ID(N'[dbo].[EventDetail]'))
ALTER TABLE [dbo].[EventDetail]  WITH NOCHECK ADD  CONSTRAINT [FK_EventDetail_EventDetailStatus_EventDetailStatusId] FOREIGN KEY([EventDetailStatusId])
REFERENCES [dbo].[EventDetailStatus] ([EventDetailStatusId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_EventDetail_EventDetailStatus_EventDetailStatusId]') AND parent_object_id = OBJECT_ID(N'[dbo].[EventDetail]'))
ALTER TABLE [dbo].[EventDetail] CHECK CONSTRAINT [FK_EventDetail_EventDetailStatus_EventDetailStatusId]
GO

