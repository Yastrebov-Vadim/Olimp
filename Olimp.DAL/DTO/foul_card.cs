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
    
    public partial class foul_card
    {
        public System.Guid id_foul_card { get; set; }
        public System.Guid id_turnament { get; set; }
        public System.Guid id_account { get; set; }
        public System.Guid id_game_for_turnament { get; set; }
        public System.Guid id_player { get; set; }
        public int type { get; set; }
    }
}
