const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://bfkxfsozvqrijtkcfsgd.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJma3hmc296dnFyaWp0a2Nmc2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NzU1NjEsImV4cCI6MjA3NTQ1MTU2MX0.ILdJsta-8ppFd-Ji3fR5ZSjSTQkDiPQiKtpIjnhBAoc';

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/api/circuits', async (req, resp) => {
    const {data, err} = await supabase
        .from('circuits')
        .select()
    if (err) {
        console.error('Error fetching data:', err);
        return
    }
    resp.send(data);
})

app.get('/api/circuits/:ref', async (req, resp) => {
    const {data, err} = await supabase
        .from('circuits')
        .select()
        .eq('circuitRef', req.params.ref)
    resp.send(data)
})

app.get('/api/circuits/season/:year', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select('round, circuits (*), year')
        .eq('year', req.params.year)
        .order('round', {ascending: true});
    resp.send(data);
})

app.get('/api/constructors', async (req, resp) => {
    const {data, err} = await supabase
        .from('constructors')
        .select()
    resp.send(data)
})

app.get('/api/constructors/:ref', async (req, resp) => {
    const {data, err} = await supabase
        .from('constructors')
        .select()
        .eq('constructorRef', req.params.ref)
    resp.send(data)
})

app.get('/api/drivers', async (req, resp) => {
    const {data, err} = await supabase
        .from('drivers')
        .select()
    resp.send(data)
})

app.get('/api/drivers/:ref', async (req, resp) => {
    const {data, err} = await supabase
        .from('drivers')
        .select()
        .eq('driverRef', req.params.ref)
    resp.send(data)
})

app.get('/api/drivers/search/:substring', async (req, resp) => {
    const {data, err} = await supabase
        .from('drivers')
        .select()
        .ilike('surname', `${req.params.substring}%`)
    resp.send(data)
})

app.get('/api/drivers/race/:raceId', async (req, resp) => {
    const {data, err} = await supabase
        .from('results')
        .select('raceId, drivers (*)')
        .eq('raceId', req.params.raceId);
    resp.send(data)
})

app.get('/api/races/:raceId', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select('raceId, year, round, name, date, time, url, circuits (name, location, country)')
        .eq('raceId', req.params.raceId)
    resp.send(data)
})

app.get('/api/races/season/:year', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select()
        .eq('year', req.params.year)
        .order('round', {ascending: true})
    resp.send(data)
})

app.get('/api/races/season/:year/:round', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select()
        .eq('year', req.params.year)
        .order('round', {ascending: true})
        .eq('round', req.params.round)
    resp.send(data)
})

app.get('/api/races/circuits/:ref', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select('raceId, year, circuits!inner (circuitRef, name)')
        .eq('circuits.circuitRef', req.params.ref)
        .order('year', {ascending: true})
    resp.send(data)
})

app.get('/api/races/circuits/:ref/season/:start/:end', async (req, resp) => {
    const {data, err} = await supabase
        .from('races')
        .select('raceId, year, date, circuits!inner (circuitId, circuitRef, name)')
        .eq('circuits.circuitRef', req.params.ref)
        .gte('year', req.params.start)
        .lte('year', req.params.end)
        .order('date', {ascending: true})
    resp.send(data)
})

app.get('/api/results/:raceId', async (req, resp) => {
    const {data, err} = await supabase
        .from('results')
        .select('grid, drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef, nationality)')
        .eq('raceId', req.params.raceId)
        .order('grid', {ascending: true})
    resp.send(data)
})

app.get('/api/results/driver/:ref', async (req, resp) => {
    const {data, err} = await supabase
        .from('results')
        .select('resultId, raceId, positionOrder, drivers!inner (driverRef, forename, surname)')
        .eq('drivers.driverRef', req.params.ref)
    resp.send(data)
})

// left off here
app.get('/api/results/drivers/:ref/seasons/:start/:end', async (req, resp) => {
    const {data, err} = await supabase
        .from('results')
        .select('resultId, raceId, races!inner (year, date), positionOrder, drivers (driverRef, forename, surname)')
        .eq('drivers.driverRef', req.params.ref)
        .gte('races.year', req.params.start)
        .lte('races.year', req.params.end)
        .order('races.date', {referencedTable: 'results', ascending:true})
    resp.send(data)
})

app.get('', async (req, resp) => {
    const {data, err} = await supabase
        .from()
        .select()

    resp.send(data)
})

app.get('', async (req, resp) => {
    const {data, err} = await supabase
        .from()
        .select()

    resp.send(data)
})

app.get('', async (req, resp) => {
    const {data, err} = await supabase
        .from()
        .select()

    resp.send(data)
})

app.listen(8080, () => {
    console.log('listening on port 8080');
});