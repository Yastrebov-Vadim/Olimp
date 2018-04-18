using Olimp.BLL.DTO;
using Olimp.BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Assest
{
    public class DbHelper
    {
        private static OlimpEntities context = new OlimpEntities();

        public static command Login(AuthorizationRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.login == request.Login && x.password == request.Password)
                .FirstOrDefault();

            return command;
        }

        public static command GetAccount(Guid id)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.id == id)
                .FirstOrDefault();

            return command;
        }

        public static List<NewsBriefly> GetNewsBriefly()
        {
            // IQueryable<news> query = context.news;

            // var news = query.ToList();

            var response = new List<NewsBriefly>();

            //if (news == null)
            //    return response;

            //foreach (var element in news)
            //{
            //    var urlVideo = string.Empty;
            //    var urlFoto = new List<string>();

            //    response.Add(new NewsBriefly(element.foto, element.title, element.text, element.date.ToShortDateString(), element.type, urlVideo, urlFoto));
            //}

            return response;
        }

        public static void SaveUserCode(int code, string email)
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

        public static void DeletUserCode(string email)
        {
            var emailCode = context.email_code
           .Where(x => x.email == email)
           .FirstOrDefault();
            if (emailCode == null)
                return;

            context.email_code.Remove(emailCode);
            context.SaveChanges();
        }

        public static bool CheckKode(string email, int code)
        {
            var emailCode = context.email_code
           .Where(x => x.email == email && x.code_user == code)
           .FirstOrDefault();
            if (emailCode == null)
                return true;

            return false;
        }

        public static string Registration(RegistrationRequest request)
        {
            command command = new command
            {
                id = Guid.NewGuid(),
                login = request.Login,
                password = request.Password,
                command_name = request.CommandName,
                email = request.Email,
                mobile = request.Mobile,
                foto = null
            };

            context.commands.Add(command);
            context.SaveChanges();

            return command.id.ToString();
        }

        public static void ReplacePassvord(RegistrationRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.email == request.Email && x.login == request.Login)
                .FirstOrDefault();

            command.password = request.Password;

            context.SaveChanges();
        }

        public static void CheckLodinInEmail(SingCodeToEmailRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.email == request.Email && x.login == request.Login)
                .FirstOrDefault();

            if (command == null)
                throw new ApplicationException("Почта не привязана к данному акаунту");
        }

        public static command GetAccountInfo(Guid Id)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.id == Id)
                .FirstOrDefault();

            return command;
        }

        public static List<player> GetPlayerForCommand(Guid Id)
        {
            IQueryable<player> query = context.players;

            var players = query.Where(x => x.id_command == Id).ToList();

            return players;
        }

        public static string AddPlayer(Guid Id, PlayerRequest request)
        {
            player newPlayer = new player
            {
                id = Guid.NewGuid(),
                name = request.Name,
                surname = request.Surname,
                middleName = request.MiddleName,
                number = request.Number,
                id_command = Id
            };

            context.players.Add(newPlayer);
            context.SaveChanges();

            return newPlayer.id.ToString();
        }

        public static void DellPlayer(Guid Id)
        {
            IQueryable<player> query = context.players;

            var player = query.Where(x => x.id == Id).FirstOrDefault();

            if (player == null)
                return;

            context.players.Remove(player);
            context.SaveChanges();
        }

        public static void GetImageAvatar(Guid Id, string url)
        {
            IQueryable<command> query = context.commands;

            var command = query.Where(x => x.id == Id).FirstOrDefault();

            if (command == null)
                return;

            command.foto = url;
            context.SaveChanges();
        }

        public static void EditAccountInfo(Guid id, EditAccountRequest account)
        {
            IQueryable<command> query = context.commands;

            var command = query.Where(x => x.id == id).FirstOrDefault();

            if (command == null)
                return;

            command.command_name = account.Name;
            command.email = account.Email;
            command.mobile = account.Phone;

            context.SaveChanges();

            if (account.Command.Any())
                EditPlayertInfo(account.Command);
        }

        public static void EditPlayertInfo(List<Player> players)
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

        public static List<command> GetCommand()
        {
            IQueryable<command> query = context.commands;

            var commands = query.ToList();

            return commands;
        }
    }
}