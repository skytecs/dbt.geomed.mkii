using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;

namespace Dbt.Geomed.ViewModels
{
    public class CategoriesListViewModel
    {

        public List<CategoryItem> Categories { get; set; }

        public CategoriesListViewModel(List<Service> services)
        {
            Categories = new List<CategoryItem>();

            foreach (var category in services.GroupBy(x => x.Category))
            {
                var categoryItem = new CategoryItem
                {
                    Id = category.Key.Id,
                    Name = category.Key.Name,
                };

                categoryItem.Services.AddRange(category.Select(x => new CategoryServiceItem
                {
                    Id = x.Id,
                    Code = x.GetCode(),
                    Name = x.Name
                }).ToList());

                Categories.Add(categoryItem);
            }
        }
    }

    public class CategoryItem
    {
        private List<CategoryServiceItem> _services = new List<CategoryServiceItem>();
        public List<CategoryServiceItem> Services { get { return _services; } }

        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class CategoryServiceItem
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
