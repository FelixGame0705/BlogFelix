using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class PostQueryObject
    {
        public string[]? Categories{get;set;} = null;
        public DateTime? UpdateTime {get; set;} = null;
        public string? PostName {get; set;} = null;
        public string? SortBy {get; set;} = null;
        public bool IsDecsending {get;set;} = false;
        public int PageNumber {get; set;} = 1;
        public int PageSize {get;set;} = 20;
    }
}