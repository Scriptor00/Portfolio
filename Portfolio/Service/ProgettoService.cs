using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Entities;


namespace Portfolio.Service
{
    public class ProgettoService : IProgettoService
    {

        private readonly PortfolioContext _context;

        public ProgettoService(PortfolioContext context)
        {
            _context = context;
        }

        public async Task<Progetto> CreateAsync(Progetto progetto)
        {
            if (progetto == null)
            {
                throw new ArgumentNullException(nameof(progetto), "Project cannot be null");
            }

            progetto.DataCreazione = DateTime.UtcNow; // Set creation date to now
            _context.Progetti.AddAsync(progetto);
            await _context.SaveChangesAsync();
            return progetto;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid project ID", nameof(id));
            }

            var progetto = await _context.Progetti.FindAsync(id);
            if (progetto == null)
            {
                return false; // Progetto non trovato
            }

            _context.Progetti.Remove(progetto);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Progetto>> GetAllAsync()
        {
            return await _context.Progetti.ToListAsync();
        }

        public Task<Progetto> GetByIdAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid project ID", nameof(id));
            }
            return _context.Progetti.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> UpdateAsync(Progetto progetto)
        {
            if (progetto == null)
            {
                throw new ArgumentNullException(nameof(progetto), "Project cannot be null");
            }

            if (progetto.Id <= 0)
            {
                throw new ArgumentException("Invalid project ID", nameof(progetto.Id));
            }

            _context.Progetti.Update(progetto);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<IEnumerable<Progetto>> SearchAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return await GetAllAsync();
            }

            return await _context.Progetti
                .Where(p => p.Titolo.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                            p.Descrizione.Contains(query, StringComparison.OrdinalIgnoreCase))
                .ToListAsync();
        }

        public async Task<Progetto> GetByTitleAsync(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException("Title cannot be null or empty", nameof(title));
            }

            var lowerCaseTitle = title.ToLower();

            return await _context.Progetti.FirstOrDefaultAsync(p => p.Titolo.ToLower().Contains(lowerCaseTitle));
        }

        public async Task<IEnumerable<Progetto>> GetByCreationDateAsync(DateTime date)
        {
            return await _context.Progetti
                .Where(p => p.DataCreazione.Date == date.Date)
                .ToListAsync();
        }
        public async Task<IEnumerable<Progetto>> GetByGitHubLinkAsync(string link)
        {
            if (string.IsNullOrWhiteSpace(link))
            {
                throw new ArgumentException("GitHub link cannot be null or empty", nameof(link));
            }

            var lowerCaseLink = link.ToLower();

            return await _context.Progetti
                .Where(p => p.LinkGitHub.ToLower()== lowerCaseLink)
                .ToListAsync();
        }
        public async Task<IEnumerable<Progetto>> GetByDemoLinkAsync(string link)
        {
            if (string.IsNullOrWhiteSpace(link))
            {
                throw new ArgumentException("Demo link cannot be null or empty", nameof(link));
            }

            var lowerCaseLink = link.ToLower();

            return await _context.Progetti
                .Where(p => p.LinkDemo.ToLower() == lowerCaseLink)
                .ToListAsync();
        }
        public async Task<IEnumerable<Progetto>> GetByDescriptionAsync(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
            {
                throw new ArgumentException("Description cannot be null or empty", nameof(description));
            }
            
            var lowerCaseDescription = description.ToLower();

            return await _context.Progetti
        // Modifica qui: converti la descrizione del progetto in minuscolo PRIMA di usare Contains
        .Where(p => p.Descrizione.ToLower().Contains(lowerCaseDescription))
        .ToListAsync();
        }
        public async Task<Progetto> GetDetailsAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid project ID", nameof(id));
            }

            return await _context.Progetti
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Progetto>> GetRecentProjectsAsync(int count)
        {
            if (count <= 0)
            {
                throw new ArgumentException("Count must be greater than zero", nameof(count));
            }

            var progetti = await _context.Progetti
                .Where(p => p.DataCreazione <= DateTime.UtcNow)
                .OrderByDescending(p => p.DataCreazione)
                .Take(count)
                .ToListAsync();

            return progetti;
        }

    }
}