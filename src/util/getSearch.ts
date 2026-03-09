import { fetchSearchResults } from '../http/user.api';
import { UserLoginData } from '../interfaces/user';

async function getSearch(searchterm : string, accessToken: UserLoginData): Promise<string[] | void> {
    try {
        if (searchterm.trim() !== '') {
            const searchResults = await fetchSearchResults(searchterm, accessToken);
            if (searchResults) {
                return searchResults.split(',').map(result => result.trim());
            } 
        } else {

            }
        } catch (error) {
            console.error('Error fetching and setting decks:', error);
            return []
        };       

};
export default getSearch;