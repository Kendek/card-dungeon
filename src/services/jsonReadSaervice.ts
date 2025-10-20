import type { cardType } from "../App"

export async function loadData()
{
    try {
        const res = await fetch("cards.json")
        if (!res.ok)
        {
            console.error("Hiba a JSON beolvasásakor!")
            return[]
        }
        return await res.json() as cardType[]
    } catch(error){
        console.error("Fetchnél gatya van!")
        return []
    }
}