using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Portfolio.Entities;

namespace Portfolio.Service
{
    public interface IProgettoService
    {
        Task<IEnumerable<Progetto>> GetAllAsync();
        Task<Progetto> GetByIdAsync(int id);
        Task<Progetto> CreateAsync(Progetto progetto);
        Task<bool> UpdateAsync(Progetto progetto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Progetto>> SearchAsync(string query);

        Task<Progetto> GetByTitleAsync(string title);
        Task<IEnumerable<Progetto>> GetByCreationDateAsync(DateTime date);
        Task<IEnumerable<Progetto>> GetByGitHubLinkAsync(string link);
        Task<IEnumerable<Progetto>> GetByDemoLinkAsync(string link);
        Task<IEnumerable<Progetto>> GetByDescriptionAsync(string description);
        Task<Progetto> GetDetailsAsync(int id);
        Task<IEnumerable<Progetto>> GetRecentProjectsAsync(int count);
    }
}