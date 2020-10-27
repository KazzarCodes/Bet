SET IDENTITY_INSERT [dbo].[EventDetailStatus] ON
GO
INSERT INTO [dbo].[EventDetailStatus] ([EventDetailStatusId], [EventDetailStatusName]) VALUES (1, 'Active')
INSERT INTO [dbo].[EventDetailStatus] ([EventDetailStatusId], [EventDetailStatusName]) VALUES (2, 'Scratched')
INSERT INTO [dbo].[EventDetailStatus] ([EventDetailStatusId], [EventDetailStatusName]) VALUES (3, 'Closed')
SET IDENTITY_INSERT [dbo].[EventDetailStatus] OFF
GO

SET IDENTITY_INSERT [dbo].[Tournament] ON
GO
INSERT INTO [dbo].[Tournament] ([TournamentId], [TournamentName], [TournamentDesc]) VALUES (1, 'Race 1', 'Juniors racing')
INSERT INTO [dbo].[Tournament] ([TournamentId], [TournamentName], [TournamentDesc]) VALUES (2, 'Race 2', 'Seniors')
INSERT INTO [dbo].[Tournament] ([TournamentId], [TournamentName], [TournamentDesc]) VALUES (3, 'Race 3', 'Advanced riders')
SET IDENTITY_INSERT [dbo].[Tournament] OFF
GO

SET IDENTITY_INSERT [dbo].[Event] ON
GO
INSERT INTO [dbo].[Event] ([EventId], [TournamentId], [EventName], [EventNumber], [EventDateTime], [EventEndDateTime], [AutoClose]) VALUES (3, 1, 'Raffle', 487436, '2020-10-29 00:00', '2020-10-30 00:00', 0)
INSERT INTO [dbo].[Event] ([EventId], [TournamentId], [EventName], [EventNumber], [EventDateTime], [EventEndDateTime], [AutoClose]) VALUES (4, 1, 'Altec group racing', 78573, '2020-11-06 00:00', '2020-11-07 00:00', 0)
INSERT INTO [dbo].[Event] ([EventId], [TournamentId], [EventName], [EventNumber], [EventDateTime], [EventEndDateTime], [AutoClose]) VALUES (5, 2, 'Bet', 478362, '2021-03-12 00:00', '2021-03-15 00:00', 1)
SET IDENTITY_INSERT [dbo].[Event] OFF
GO

SET IDENTITY_INSERT [dbo].[EventDetail] ON
GO
INSERT INTO [dbo].[EventDetail] ([EventDetailId], [EventId], [EventDetailStatusId], [EventDetailName], [EventDetailOdd], [FinishingPosition], [FirstTimer]) VALUES (1, 4, 2, 'Altec group race', 5.50, 10, 1)
INSERT INTO [dbo].[EventDetail] ([EventDetailId], [EventId], [EventDetailStatusId], [EventDetailName], [EventDetailOdd], [FinishingPosition], [FirstTimer]) VALUES (2, 4, 1, 'Chestnut', 10.00, 2, 0)
SET IDENTITY_INSERT [dbo].[EventDetail] OFF
GO
