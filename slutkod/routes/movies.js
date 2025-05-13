import { Router } from 'express';
import { movies } from '../data/data.js';
import { v4 as uuid } from 'uuid';

const router = Router();

// GET movies & GET movies by category or year
router.get('/', (req, res) => {
    const { category, year } = req.query;
    let filtered = movies;
    if(category && year) {
        filtered = movies.filter(m => m.category === category && m.year === parseInt(year));
    } else if(category) {
        filtered = movies.filter(m => m.category === category);
    } else if(year) {
        filtered = movies.filter(m => m.year === parseInt(year));
    }
    
    res.json({
        success: true,
        movies : filtered
    });
});

// GET movie by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        res.json({
            success : true,
            movie : movie
        });
    } else {
        res.status(404).json({
            success : false,
            message : 'No movie with matching ID was found'
        });
    }
});

// POST new movie
router.post('/', (req, res) => {
    const { title, year, category } = req.body;
    if(title && year && category) {
        const newMovie = {
            id : uuid().substring(0, 5),
            title,
            year, 
            category
        }
        movies.push(newMovie);
        res.status(201).json({
            success : true,
            message : 'New movie added successfully',
            movie : newMovie
        });
    } else {
        res.status(401).json({
            success : false,
            message : 'title, year AND category must be provided'
        });
    }
});

// PUT movie by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, category } = req.body;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        if(title, year, category) {
            movie.title = title;
            movie.year = year;
            movie.category = category;
            res.json({
                success : true,
                message : 'Movie updated successfully',
                movie : movie
            });
        } else {
            res.status(401).json({
                success : false,
                message : 'title, year AND category must be provided'
            });
        }
    } else {
        res.status(404).json({
            success : false,
            message : 'No movie with matching ID was found'
        });
    }
});

// DELETE movie by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === id);
    if(movie) {
        const filtered = movies.filter(m => m.id !== id);
        movies.length = 0;
        movies.push(...filtered);
        res.json({
            success : true,
            message : 'Movie deleted succcessfully'
        });
    } else {
        res.status(404).json({
            success : false,
            message : 'No movie with matching ID was found'
        });
    }
});


export default router;