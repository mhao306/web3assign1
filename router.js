const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supabase = supa.createClient(process.env.supaUrl, process.env.supaAnonKey);

app.get('/api/circuits', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('circuits')
            .select()

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found." })
        }

        resp.send(data);
    } catch (err) {
        console.error("Error fetching circuit results:", err.message);
    }
})

app.get('/api/circuits/:ref', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('circuits')
            .select()
            .eq('circuitRef', req.params.ref)

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for circuitRef: " + req.params.ref })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching circuit results:", err.message);
    }
})

app.get('/api/circuits/season/:year', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select('round, circuits (*), year')
            .eq('year', req.params.year)
            .order('round', { ascending: true });

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for year: " + req.params.year })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching circuit results:", err.message);
    }
})

app.get('/api/constructors', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('constructors')
            .select()

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for constructors" })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching constructor results:", err.message);
    }
})

app.get('/api/constructors/:ref', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('constructors')
            .select()
            .eq('constructorRef', req.params.ref)

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for constructorRef: " + req.params.ref })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching constructor results:", err.message);
    }
})

app.get('/api/drivers', async (req, resp) => {
    try {

        const { data, error } = await supabase
            .from('drivers')
            .select()

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for drivers" })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching driver results:", err.message);
    }
})

app.get('/api/drivers/:ref', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('drivers')
            .select()
            .eq('driverRef', req.params.ref)

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for driverRef: " + req.params.ref })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching driver results:", err.message);
    }
})

app.get('/api/drivers/search/:substring', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('drivers')
            .select()
            .ilike('surname', `${req.params.substring}%`)

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for surname substring: " + req.params.substring })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching driver results:", err.message);
    }
})

app.get('/api/drivers/race/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('results')
            .select('raceId, drivers (*)')
            .eq('raceId', req.params.raceId);

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            // error = {Error: "No results found for raceId: " + req.params.raceId }
            // resp.status(404)
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching driver results:", err.message);
    }
})

app.get('/api/races/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select('raceId, year, round, name, date, time, url, circuits (name, location, country)')
            .eq('raceId', req.params.raceId)

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching race results:", err.message);
    }
})

app.get('/api/races/season/:year', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select()
            .eq('year', req.params.year)
            .order('round', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for year: " + req.params.year })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching race results:", err.message);
    }
})

app.get('/api/races/season/:year/:round', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select()
            .eq('year', req.params.year)
            .order('round', { ascending: true })
            .eq('round', req.params.round)

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for year (" + req.params.year } + ") and round (" + req.params.round)
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching race results:", err.message);
    }
})

app.get('/api/races/circuits/:ref', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select('raceId, year, circuits!inner (circuitRef, name)')
            .eq('circuits.circuitRef', req.params.ref)
            .order('year', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for circuitRef: " + req.params.ref })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching race results:", err.message);
    }
})

app.get('/api/races/circuits/:ref/season/:start/:end', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('races')
            .select('raceId, year, date, circuits!inner (circuitId, circuitRef, name)')
            .eq('circuits.circuitRef', req.params.ref)
            .gte('year', req.params.start)
            .lte('year', req.params.end)
            .order('date', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (req.params.start > req.params.end) {
            return resp.status(404).json({ error: "Start year is later than end year" })
        }
        if (req.params.end < req.params.start) {
            return resp.status(404).json({ error: "End year is earlier than start year" })
        }
        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for circuitRef(" + req.params.ref + "), start (" + req.params.start + "), and end (" + req.params.end + ")" })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching race results:", err.message);
    }
})

app.get('/api/results/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('results')
            .select('grid, drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef, nationality)')
            .eq('raceId', req.params.raceId)
            .order('grid', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching result results:", err.message);
    }
})

app.get('/api/results/driver/:ref', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('results')
            .select('resultId, raceId, positionOrder, drivers!inner (driverRef, forename, surname)')
            .eq('drivers.driverRef', req.params.ref)

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for driverRef: " + req.params.ref })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching result results:", err.message);
    }
})

// need to fix ordering
app.get('/api/results/drivers/:ref/seasons/:start/:end', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('results')
            .select('resultId, raceId, positionOrder, drivers!inner (driverRef, forename, surname), races!inner (raceId, year, date)')
            .eq('drivers.driverRef', req.params.ref)
            .gte('races.year', req.params.start)
            .lte('races.year', req.params.end)
            .order('year', { referencedTable: 'races', ascending: true })
        // .order('date', { referencedTable: 'races', ascending: true});

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (req.params.start > req.params.end) {
            return resp.status(404).json({ error: "Start year is later than end year" })
        }
        if (req.params.end < req.params.start) {
            return resp.status(404).json({ error: "End year is earlier than start year" })
        }
        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for driverRef(" + req.params.ref + "), start (" + req.params.start + "), and end (" + req.params.end + ")" })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching result results:", err.message);
    }
})

app.get('/api/qualifying/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('qualifying')
            .select('qualifyId, number, position, races!inner (raceId, year, round, name, date), drivers!inner (driverRef, forename, surname), constructors!inner (constructorRef, name)')
            .eq('races.raceId', req.params.raceId)
            .order('position', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching qualifying results:", err.message);
    }
})

app.get('/api/standings/drivers/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('driver_standings')
            .select('raceId, drivers!inner (forename, surname), points, position, wins, races!inner (year, name)')
            .eq('races.raceId', req.params.raceId)
            .order('position', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching driver standing results:", err.message);
    }
})

app.get('/api/standings/constructors/:raceId', async (req, resp) => {
    try {
        const { data, error } = await supabase
            .from('constructor_standings')
            .select('raceId, points, position, constructors!inner (constructorRef, name), races!inner (year, name)')
            .eq('races.raceId', req.params.raceId)
            .order('position', { ascending: true })

        if (error) {
            console.error("Supabase error:", error);
            return resp.status(400).json({ error: error.message });
        }

        if (!data || data.length == 0) {
            return resp.status(404).json({ error: "No results found for raceId: " + req.params.raceId })
        }

        resp.send(data)
    } catch (err) {
        console.error("Error fetching constructor standing results:", err.message);
    }
})

app.listen(8080, () => {
    console.log('listening on port 8080');
});