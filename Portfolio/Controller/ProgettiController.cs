using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Entities;
using Portfolio.Service;
using Microsoft.Extensions.Logging;

namespace Portfolio.Controller
{
    [ApiController]
    [Route("api/progetti")]
    public class ProgettiController : ControllerBase
    {
        private readonly IProgettoService _progettoService;
        private readonly ILogger<ProgettiController> _logger;

        public ProgettiController(IProgettoService progettoService, ILogger<ProgettiController> logger)
        {
            _progettoService = progettoService;
            _logger = logger;
        }

        // GET api/progetti
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Trovando tutti i progetti");
            var progetti = await _progettoService.GetAllAsync();
            _logger.LogInformation("Trovati {Count} progetti", progetti.Count());
            return Ok(progetti);
        }

        // GET api/progetti/1
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("ID del progetto non valido: {Id}", id);
                return BadRequest("Invalid project ID");
            }

            var progetto = await _progettoService.GetByIdAsync(id);
            if (progetto == null)
            {
                _logger.LogWarning("Progetto non trovato con ID: {Id}", id);
                return NotFound();
            }

            _logger.LogInformation("Trovato progetto con ID: {Id}", id);
            return Ok(progetto);
        }

        // POST api/progetti
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Progetto progetto)
        {
            if (progetto == null)
            {
                _logger.LogError("Tentativo di creare un progetto nullo");
                return BadRequest("Project cannot be null");
            }

            if (string.IsNullOrWhiteSpace(progetto.Titolo))
            {
                _logger.LogError("Tentativo di creare un progetto senza titolo");
                return BadRequest("Project title cannot be null or empty");
            }

            _logger.LogInformation("Creazione di un nuovo progetto: {Titolo}", progetto.Titolo);
            var createdProgetto = await _progettoService.CreateAsync(progetto);
            _logger.LogInformation("Progetto creato con ID: {Id}", createdProgetto.Id);
            return CreatedAtAction(nameof(GetById), new { id = createdProgetto.Id }, createdProgetto);
        }

        // PUT api/progetti/1
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Progetto progetto)
        {
            if (id <= 0)
            {
                _logger.LogWarning("ID del progetto non valido: {Id}", id);
                return BadRequest("Invalid project ID");
            }

            if (progetto == null || progetto.Id != id)
            {
                _logger.LogError("Tentativo di aggiornare un progetto con dati non validi");
                _logger.LogError("Progetto: {@Progetto}", progetto);
                return BadRequest("Project data is invalid");
            }

            if (string.IsNullOrWhiteSpace(progetto.Titolo))
            {
                _logger.LogError("Tentativo di aggiornare un progetto senza titolo");
                return BadRequest("Project title cannot be null or empty");
            }

            var existingProgetto = await _progettoService.GetByIdAsync(id);
            if (existingProgetto == null)
            {
                _logger.LogWarning("Progetto non trovato per l'aggiornamento con ID: {Id}", id);
                return NotFound("Project not found");
            }

            _logger.LogInformation("Aggiornamento progetto con ID: {Id}", id);
            existingProgetto.Titolo = progetto.Titolo;
            existingProgetto.Descrizione = progetto.Descrizione;
            existingProgetto.LinkDemo = progetto.LinkDemo;
            existingProgetto.LinkGitHub = progetto.LinkGitHub;

            var success = await _progettoService.UpdateAsync(existingProgetto);
            if (success)
            {
                _logger.LogInformation("Progetto aggiornato con successo: {Id}", id);
                return NoContent();
            }
            else
            {
                _logger.LogError("Errore durante l'aggiornamento del progetto con ID: {Id}", id);
                return StatusCode(500, "Errore durante l'aggiornamento del progetto");
            }
        }

        // DELETE api/progetti/1
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("ID del progetto non valido: {Id}", id);
                return BadRequest("Invalid project ID");
            }

            var existingProgetto = await _progettoService.GetByIdAsync(id);
            if (existingProgetto == null)
            {
                _logger.LogWarning("Progetto non trovato per l'eliminazione con ID: {Id}", id);
                return NotFound("Project not found");
            }

            _logger.LogInformation("Eliminazione progetto con ID: {Id}", id);
            var result = await _progettoService.DeleteAsync(id);

            if (result)
            {
                _logger.LogInformation("Progetto eliminato con successo: {Id}", id);
                return NoContent();
            }
            else
            {
                _logger.LogError("Errore durante l'eliminazione del progetto con ID: {Id}", id);
                return StatusCode(500, "Errore durante l'eliminazione del progetto");
            }
        }

        // GET api/progetti/search?query=test
        [HttpGet("search")]
        public async Task<IActionResult> SearchAsync([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                _logger.LogWarning("Ricerca con query vuota o nulla");
                return BadRequest("Query non valida");
            }

            var progetti = await _progettoService.GetAllAsync();
            var result = progetti.Where(p =>
                p.Titolo.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Descrizione.Contains(query, StringComparison.OrdinalIgnoreCase))
                .ToList();

            _logger.LogInformation("Trovati {Count} progetti per la ricerca", result.Count);
            return Ok(result);
        }


        [HttpGet("recenti/{count}")]
        public async Task<IActionResult> GetRecentProjects(int count)
        {
            if (count <= 0)
            {
                _logger.LogWarning("Numero di progetti recenti non valido: {Count}", count);
                return BadRequest("Il numero di progetti deve essere maggiore di zero.");
            }

            var progetti = await _progettoService.GetRecentProjectsAsync(count);
            _logger.LogInformation("Trovati {Count} progetti recenti", progetti.Count());

            if (progetti == null || !progetti.Any())
            {
                _logger.LogWarning("Nessun progetto trovato nella ricerca recenti.");
                return NotFound("Nessun progetto trovato.");
            }

            _logger.LogInformation("Progetti recenti trovati: {@Progetti}", progetti);
            if (progetti.Count() > count)
            {
                return Ok(progetti.Take(count));
            }

            return Ok(progetti);
        }

        [HttpGet("titolo/{title}")]
        public async Task<IActionResult> GetByTitle(string title)
        {
            _logger.LogInformation("Ricerca di un progetto per titolo: {Titolo}", title);

            var progetto = await _progettoService.GetByTitleAsync(title);
            if (progetto == null)
            {
                _logger.LogWarning("Nessun progetto trovato con questo titolo: {Titolo}", title);
                return NotFound("Nessun progetto trovato con questo titolo.");
            }
            _logger.LogInformation("Progetto trovato per titolo: {@Progetto}", progetto);
            if (string.IsNullOrWhiteSpace(progetto.Titolo))
            {
                _logger.LogWarning("Progetto trovato con titolo vuoto o nullo: {@Progetto}", progetto);
                return BadRequest("Il titolo del progetto non può essere vuoto o nullo.");
            }
            return Ok(progetto);
        }

        [HttpGet("data/{date}")]
        public async Task<IActionResult> GetByDate(string date)
        {
            if (!DateTime.TryParse(date, out var parsedDate))
            {
                _logger.LogWarning("Formato data non valido: {Date}", date);
                return BadRequest("Formato data non valido. Usa yyyy-MM-dd.");
            }

            var progetti = await _progettoService.GetByCreationDateAsync(parsedDate);
            _logger.LogInformation("Trovati {Count} progetti per la data: {Date}", progetti.Count(), parsedDate);
            if (progetti == null || !progetti.Any())
            {
                _logger.LogWarning("Nessun progetto trovato per la data: {Date}", parsedDate);
                return NotFound("Nessun progetto trovato per questa data.");
            }
            return Ok(progetti);
        }

        [HttpGet("github")]
        public async Task<IActionResult> GetByGitHubLink([FromQuery] string link)
        {
            _logger.LogInformation("Ricerca di progetti per link GitHub: {Link}", link);
            if (string.IsNullOrWhiteSpace(link))
            {
                _logger.LogWarning("Link GitHub non valido: {Link}", link);
                return BadRequest("Il link GitHub non può essere vuoto o nullo.");
            }

            var progetti = await _progettoService.GetByGitHubLinkAsync(link);
            _logger.LogInformation("Trovati {Count} progetti per il link GitHub: {Link}", progetti.Count(), link);
            if (progetti == null || !progetti.Any())
            {
                _logger.LogWarning("Nessun progetto trovato per il link GitHub: {Link}", link);
                return NotFound("Nessun progetto trovato con questo link GitHub.");
            }
            return Ok(progetti);
        }

        [HttpGet("demo")]
        public async Task<IActionResult> GetByDemoLink([FromQuery] string link)
        {
            _logger.LogInformation("Ricerca di progetti per link Demo: {Link}", link);
            if (string.IsNullOrWhiteSpace(link))
            {
                _logger.LogWarning("Link Demo non valido: {Link}", link);
                return BadRequest("Il link Demo non può essere vuoto o nullo.");
            }

            var progetti = await _progettoService.GetByDemoLinkAsync(link);
            if (progetti == null || !progetti.Any())
            {
                _logger.LogWarning("Nessun progetto trovato per il link Demo: {Link}", link);
                return NotFound("Nessun progetto trovato con questo link Demo.");
            }
            _logger.LogInformation("Trovati {Count} progetti per il link Demo: {Link}", progetti.Count(), link);

            return Ok(progetti);
        }

        [HttpGet("descrizione")]
        public async Task<IActionResult> GetByDescription([FromQuery] string descrizione)
        {
            if (string.IsNullOrWhiteSpace(descrizione))
            {
                _logger.LogWarning("Descrizione vuota o nulla: {Descrizione}", descrizione);
                return BadRequest("La descrizione non può essere vuota o nulla.");
            }

            _logger.LogInformation("Ricerca di progetti per descrizione: {Descrizione}", descrizione);
            var progetti = await _progettoService.GetByDescriptionAsync(descrizione);

            if (progetti == null || !progetti.Any())
            {
                _logger.LogWarning("Nessun progetto trovato per la descrizione: {Descrizione}", descrizione);
                return NotFound("Nessun progetto trovato con questa descrizione.");
            }

            _logger.LogInformation("Trovati {Count} progetti per la descrizione: {Descrizione}", progetti.Count(), descrizione);
            return Ok(progetti);
        }
        [HttpGet("dettaglio")]
        public async Task<IActionResult> GetDetailAsync([FromQuery] string dettaglio)
        {
            if (string.IsNullOrWhiteSpace(dettaglio))
            {
                _logger.LogWarning("Parametro 'dettaglio' mancante o vuoto");
                return BadRequest("Il parametro 'dettaglio' è obbligatorio.");
            }

            if (!int.TryParse(dettaglio, out int dettaglioId))
            {
                _logger.LogWarning("Parametro 'dettaglio' non è un numero intero: {Dettaglio}", dettaglio);
                return BadRequest("Il parametro 'dettaglio' deve essere un numero intero.");
            }

            var progetti = await _progettoService.GetDetailsAsync(dettaglioId);
            return Ok(progetti);
        }
    }
}