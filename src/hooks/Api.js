import React, { useEffect, useState } from "react"
import { findBestMatch } from "string-similarity"

export function useAnimeSearch(query) {
    const [results, setResults] = useState([])
    const [matchedResults, setMatchedResults] = useState([])
    
    const oldQuery = query
    
    useEffect(() => {
        setTimeout(() => {
            if (query === oldQuery) {
                fetch(`https://api.jikan.moe/v4/anime?q=${query}`).then(res => res.json()).then(data => {
                    setResults(data.data)
                })
            }
        }, 500)
    }, [query])
    
    useEffect(() => {
        if (results && query) {
            fetch(`https://api.consumet.org/anime/gogoanime/${query}`).then(res => res.json()).then(data => {
                const matches = {}
                results.forEach(result => {
                    const {title, title_japanese, title_romanji} = result
                    data.results.forEach(consumetResult => {
                        const resultMatches = findBestMatch(consumetResult.title, [
                            title,
                            title_japanese,
                            title_romanji
                        ])
                    })
                })
            })
        }
    }, [results])
    
    return matchedResults || results
}