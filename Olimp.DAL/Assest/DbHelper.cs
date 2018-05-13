using Olimp.DAL.DTO;
using Olimp.DAL.Enum;
using Olimp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Assest
{
    public class DbHelper
    {
        public static account SignInUser(AuthorizationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.login == request.Login && x.password == request.Password)
                    .FirstOrDefault();

                return account;
            }
        }

        public static admin SignInAdmin(AuthorizationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<admin> query = context.admins;

                var admin = query
                    .Where(x => x.login == request.Login && x.password == request.Password)
                    .FirstOrDefault();

                return admin;
            }
        }

        public static List<news> GetAllNews()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var allNews = query.ToList();

                return allNews;
            }
        }

        public static List<news> GetNewsActive(bool isTop)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var topNews = query.Where(x => isTop ? x.top == true && x.active == true : x.active == true).ToList();

                return topNews;
            }
        }

        public static news GetNews(Guid id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                return news;
            }
        }

        public static void SaveUserCode(int code, string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                DeletUserCode(email);

                email_code emailCode = new email_code
                {
                    id = Guid.NewGuid(),
                    email = email,
                    code_user = code
                };

                context.email_code.Add(emailCode);
                context.SaveChanges();
            }
        }

        public static void DeletUserCode(string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var emailCode = context.email_code
           .Where(x => x.email == email)
           .FirstOrDefault();
                if (emailCode == null)
                    return;

                context.email_code.Remove(emailCode);
                context.SaveChanges();
            }
        }

        public static bool CheckKode(string email, int code)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var emailCode = context.email_code
           .Where(x => x.email == email && x.code_user == code)
           .FirstOrDefault();
                if (emailCode == null)
                    return true;

                return false;
            }
        }

        public static account Registration(RegistrationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                account account = new account
                {
                    id = Guid.NewGuid(),
                    login = request.Login,
                    password = request.Password,
                    command_name = request.CommandName,
                    email = request.Email,
                    mobile = request.Mobile
                };

                context.accounts.Add(account);
                context.SaveChanges();

                return account;
            }
        }

        public static void ReplacePassvord(RegistrationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.email == request.Email && x.login == request.Login)
                    .FirstOrDefault();

                account.password = request.Password;

                context.SaveChanges();
            }
        }

        public static void CheckLodinInEmail(string login, string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.email == email && x.login == login)
                    .FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Почта не привязана к данному акаунту");
            }
        }

        public static account GetAccountInfo(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.id == Id)
                    .FirstOrDefault();

                return account;
            }
        }

        public static string GetAccountAvatar(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<avatar> query = context.avatars;

                var avatar = query
                    .Where(x => x.account_id == Id)
                    .FirstOrDefault();

                return avatar == null ? "url(./content/img/avatar.png)" : avatar.url_bd;
            }
        }

        public static List<player> GetPlayerForCommand(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var players = query.Where(x => x.id_command == Id).ToList();

                return players;
            }
        }

        public static string AddPlayer(Guid Id, string middleName, string name, string surname, int number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                player newPlayer = new player
                {
                    id = Guid.NewGuid(),
                    name = name,
                    surname = surname,
                    middleName = middleName,
                    number = number,
                    id_command = Id
                };

                context.players.Add(newPlayer);
                context.SaveChanges();

                return newPlayer.id.ToString();
            }
        }

        public static void CheckAddPlayer(Guid commandId, int number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_command == commandId && x.number == number).FirstOrDefault();

                if (player != null)
                    throw new ApplicationException("Игрок с таким номером уже существует");

            }
        }

        public static void DellPlayer(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id == Id).FirstOrDefault();

                if (player == null)
                    return;

                context.players.Remove(player);
                context.SaveChanges();
            }
        }

        public static void AddImageAvatar(Guid Id, string urlBd, string urlDir)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                avatar avatar = new avatar
                {
                    id = Guid.NewGuid(),
                    url_bd = urlBd,
                    url_dir = urlDir,
                    account_id = Id
                };

                context.avatars.Add(avatar);
                context.SaveChanges();
            }
        }

        public static void DellImageAvatar(Guid id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<avatar> query = context.avatars;

                var avatar = query.Where(x => x.account_id == id).FirstOrDefault();

                if (avatar == null)
                    return;

                context.avatars.Remove(avatar);
                context.SaveChanges();

                FileHelper.DellFile(avatar.url_dir);
            }
        }

        public static void EditAccountInfo(Guid id, EditAccountRequest accountInfo)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id == id).FirstOrDefault();

                if (account == null)
                    return;

                account.command_name = accountInfo.Name;
                account.email = accountInfo.Email;
                account.mobile = accountInfo.Phone;

                context.SaveChanges();

                if (accountInfo.Command.Any())
                    EditPlayertInfo(accountInfo.Command);
            }
        }

        public static void EditPlayertInfo(List<Player> players)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                foreach (Player item in players)
                {
                    var id = Guid.Parse(item.PlayerId);
                    var player = query.Where(x => x.id == id).FirstOrDefault();

                    if (player == null)
                        continue;

                    player.number = item.Number;

                    context.SaveChanges();
                }
            }
        }

        public static List<account> GetCommand()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var accounts = query.ToList();
                return accounts;
            }
        }

        public static string AddNews(int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                news news = new news
                {
                    id = Guid.NewGuid(),
                    date = DateTime.Now.Date,
                    type = type,
                    top = false,
                    active = false
                };

                context.news.Add(news);
                context.SaveChanges();

                return news.id.ToString();
            }
        }

        public static void SaveNews(string newsId, string title, string text, bool top, string CommandOne, string CommandTwo)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(newsId);

                IQueryable<news> query = context.news;

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                news.title = title;
                news.text = text;
                news.top = top;
                news.date = DateTime.Now.Date;
                if (CommandOne.Any())
                {
                    news.command_one = Guid.Parse(CommandOne);
                    BindingCommandForFoto(news.id, Guid.Parse(CommandOne), CommandNumber.One);
                }

                if (CommandTwo.Any())
                {
                    news.command_two = Guid.Parse(CommandTwo);
                    BindingCommandForFoto(news.id, Guid.Parse(CommandTwo), CommandNumber.Two);
                }

                context.SaveChanges();
            }
        }

        public static void BindingCommandForFoto(Guid newsId, Guid CommandId, CommandNumber number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                foreach (var photo in photos)
                {
                    switch (number)
                    {
                        case CommandNumber.One:
                            photo.id_command_one = CommandId;
                            break;
                        case CommandNumber.Two:
                            photo.id_command_two = CommandId;
                            break;
                    }
                }

                context.SaveChanges();
            }
        }

        public static List<img_for_news> GetPhotoForNews(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                return photos;
            }
        }

        public static string GetVideoForNews(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<video_for_news> query = context.video_for_news;

                var video = query.Where(x => x.id_news == newsId).FirstOrDefault();

                return video == null ? String.Empty : video.url_bd;
            }
        }

        public static List<string> GetPhotoForNewsDir(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                var urls = new List<string>();

                if (!photos.Any())
                    return urls;

                foreach (var photo in photos)
                {
                    urls.Add(photo.url_dir);
                    context.img_for_news.Remove(photo);
                    context.SaveChanges();
                }

                return urls;
            }
        }

        public static img_for_news AddImgForNews(string newsId, string urlDir, string urlBd)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                img_for_news img = new img_for_news
                {
                    id = Guid.NewGuid(),
                    id_news = Guid.Parse(newsId),
                    url_dir = urlDir,
                    url_bd = urlBd
                };

                context.img_for_news.Add(img);
                context.SaveChanges();

                return img;
            }
        }

        public static string AddVideoForNews(string videoId, string urlDir, string urlBd)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                video_for_news video = new video_for_news
                {
                    id = Guid.NewGuid(),
                    id_news = Guid.Parse(videoId),
                    url_dir = urlDir,
                    url_bd = urlBd
                };

                context.video_for_news.Add(video);
                context.SaveChanges();

                return video.url_bd;
            }
        }

        public static int DellNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var id = Guid.Parse(newsId);

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                context.news.Remove(news);
                context.SaveChanges();

                return news.type;
            }
        }

        public static void DellPhotoForNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var id = Guid.Parse(newsId);

                var photos = query.Where(x => x.id_news == id).ToList();

                if (!photos.Any())
                    return;

                foreach (var photo in photos)
                {
                    FileHelper.DellFile(photo.url_dir);
                    context.img_for_news.Remove(photo);
                    context.SaveChanges();
                }
            }
        }

        public static void DellVideoForNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<video_for_news> query = context.video_for_news;

                var id = Guid.Parse(newsId);

                var videos = query.Where(x => x.id_news == id).ToList();

                if (!videos.Any())
                    return;

                foreach (var video in videos)
                {
                    FileHelper.DellFile(video.url_dir);
                    context.video_for_news.Remove(video);
                    context.SaveChanges();
                }
            }
        }

        public static void DellPhoto(string photoId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var id = Guid.Parse(photoId);

                var photo = query.Where(x => x.id == id).FirstOrDefault();

                if (photo == null)
                    throw new ApplicationException("Фото не найдено");

                FileHelper.DellFile(photo.url_dir);
                context.img_for_news.Remove(photo);
                context.SaveChanges();
            }
        }

        public static bool ActiveNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var id = Guid.Parse(newsId);

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                news.active = !news.active;

                context.SaveChanges();

                return news.active;
            }
        }

        public static Tuple<List<img_for_news>, int, int> GetPhoto(int page, string commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var pageSize = 4;
                int totalPages;
                var photos = new List<img_for_news>();

                if (commandId == null)
                {
                    totalPages = (int)(Math.Ceiling(query.Count() / (decimal)pageSize));
                    photos = query.OrderBy(x => x.id).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                }
                else
                {
                    var id = Guid.Parse(commandId);
                    totalPages = (int)(Math.Ceiling(query.Where(c => c.id_command_one == id || c.id_command_two == id).Count() / (decimal)pageSize));
                    photos = query.Where(c => c.id_command_one == id || c.id_command_two == id).OrderBy(x => x.id).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                }

                return Tuple.Create(photos, totalPages, page);
            }
        }

        public static string AddTurnament(int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                turnament turnament = new turnament
                {
                    id = Guid.NewGuid(),
                    type = type,
                    state_code = true,
                    step = 0,
                    name = "Новый турнир",
                    description = string.Empty,
                    сontribution_game = 0,
                    сontribution_tournament = 0
                };

                context.turnaments.Add(turnament);
                context.SaveChanges();

                return turnament.id.ToString();
            }
        }

        public static List<turnament> GetAllTurnament()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnaments = query.ToList();

                return turnaments;
            }
        }

        public static void DellTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                context.turnaments.Remove(turnament);
                context.SaveChanges();
            }
        }

        public static turnament GetTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;
                var turnament = query.Where(x => x.id == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                return turnament;
            }
        }

        public static void SaveTurnamentInfo(string turnamentId, string name, string description, int type, int contribution_tournament, int contribution_game, DateTime? dateStart)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(turnamentId);

                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id == id).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                turnament.name = name;
                turnament.description = description;
                turnament.сontribution_game = contribution_game;
                turnament.сontribution_tournament = contribution_tournament;
                turnament.type = type;
                turnament.date_start = dateStart;

                context.SaveChanges();
            }
        }

        public static void ChangeStep(string turnamentId, int step)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(turnamentId);

                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id == id).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                turnament.step = step;

                context.SaveChanges();
            }
        }

        public static List<turnament> GetTurnamentsForUser()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                return query.Where(x => x.step == 1).ToList();
            }
        }

        public static void DeclareTournament(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_command == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament != null)
                    throw new ApplicationException("Ошибка: повторная заявка на турнир");

                command_for_turnament item = new command_for_turnament
                {
                    id = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    id_command = commandId,
                    status = false
                };

                context.command_for_turnament.Add(item);
                context.SaveChanges();
            }
        }

        public static List<Command> GetCommandForTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var query = from cm in context.command_for_turnament.Where(x => x.id_turnament == turnamentId)
                            join ac in context.accounts on cm.id_command equals ac.id into ps
                            from ac in ps.DefaultIfEmpty()
                            select new
                            {
                                ac.id,
                                ac.command_name,
                                cm.status
                            };

                var commands = query.ToList();

                var response = new List<Command>();

                foreach (var command in commands)
                {
                    var item = new Command
                    {
                        Id = command.id.ToString(),
                        Name = command.command_name,
                        Status = command.status
                    };

                    response.Add(item);
                }

                return response;
            }
        }

        public static void CheckCountCommand(Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_command == commandId).ToList();

                if (player.Count < 7)
                    throw new ApplicationException("Колличество игроков не соответствует регламенту");
            }
        }

        public static string GetEmail(Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id == commandId).FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Команда не найдена");

                return account.email;
            }
        }

        public static string GetTurnamentName(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                return turnament.name;
            }
        }

        public static string GetAccountEmail(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id == accountId).FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Команда не найдена");

                return account.email;
            }
        }

        public static void AcceptDeclare(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_command == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament == null)
                    throw new ApplicationException("Турнир не найден");

                commandForTurnament.status = true;

                context.SaveChanges();
            }
        }

        public static void RemoveDeclare(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_command == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament == null)
                    throw new ApplicationException("Турнир не найден");

                context.command_for_turnament.Remove(commandForTurnament);
                context.SaveChanges();
            }
        }

        public static void СreatePositionCommand(List<Command> commands, Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var index = 1;

                foreach (var command in commands)
                {
                    position_command_for_turnament position = new position_command_for_turnament
                    {
                        id = Guid.NewGuid(),
                        command_name = command.Name,
                        id_command = Guid.Parse(command.Id),
                        id_turnament = turnamentId,
                        position = index
                    };

                    index++;

                    context.position_command_for_turnament.Add(position);
                    context.SaveChanges();
                }
            }
        }

        public static void СreateGameForTurnament(Guid turnamentId, Guid commandOneId, Guid commandTwoId, int tout)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                game_for_turnament game = new game_for_turnament
                {
                    id = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    id_command_one = commandOneId,
                    id_command_two = commandTwoId,
                    number_tour = tout,
                    command_one_goals = 0,
                    command_two_goals = 0,
                    command_one_points = 0,
                    command_two_points = 0,
                    state_code = false
                };

                context.game_for_turnament.Add(game);
                context.SaveChanges();
            }
        }

        public static List<position_command_for_turnament> GetPositionCommand(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId).ToList();
            }
        }

        public static List<game_for_turnament> GetGameForTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId).ToList();
            }
        }
    }
}