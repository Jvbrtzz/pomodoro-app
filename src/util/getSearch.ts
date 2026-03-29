import { fetchAllUsers, fetchSearchResults } from '../http/user.api';
import { UsersList } from '../interfaces/user';

async function getSearch(searchterm: string, accessToken: string): Promise<UsersList[]> {
  try {
    if (!searchterm.trim()) {
        const getAllUsers = await fetchAllUsers(accessToken);
        if (Array.isArray(getAllUsers)) {
          console.log('All users:', getAllUsers);
          return getAllUsers;
        }
    }

    const searchResults = await fetchSearchResults(searchterm, accessToken);
    if (Array.isArray(searchResults)) {
      console.log('Search results:', searchResults);
      return searchResults;
    }

    return [];
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

export default getSearch;