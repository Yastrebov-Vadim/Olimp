//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Olimp.DAL.DTO
{
    using System;
    using System.Collections.Generic;
    
    public partial class position_command_for_turnament
    {
        public System.Guid id_position_command_for_turnament { get; set; }
        public System.Guid id_turnament { get; set; }
        public int position { get; set; }
        public System.Guid id_account { get; set; }
        public string command_name { get; set; }
        public int points { get; set; }
        public int place { get; set; }
        public bool fake_code { get; set; }
    }
}
