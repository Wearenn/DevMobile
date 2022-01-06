const API_KEY = '7ec9bfd18c7960d51de3d6a98916a64a';

export const SearchPerson = async (value, offset = 0) => {
    try {
		const myHeaders = new Headers({ 'user-key': API_KEY });
		const url = `https://api.themoviedb.org/3/search/person?&query=${value}`;
		const response = await fetch(url, { headers: myHeaders });
		return await response.json();
    } catch (error) {
		console.log(error);
		throw error;
    }
};

/*export async function GetPerson(searchTerm = '', offset = 0) {
	try {
	  let response;
	  switch (offset) {
		case 0:
		  console.log('0');
		  response = require('../helpers/SearchPeople-Pitt_p1.json');
		  break;
		case 20:
		  console.log('20');
		  response = require('../helpers/SearchPeople-Pitt_p2.json');
		  break;
		default:
		  console.log("default");
		  response = require('../helpers/SearchPeople-Pitt_p1.json');
	  }
	  return response;
	} catch (error) {
	  console.log(`Error with function getPerson ${error.message}`);
	  throw error;
	}
};*/

export const GetPersonByID = async (id) => {
	try {
		const myHeaders = new Headers({ 'user-key': API_KEY });
		const url = `https://api.themoviedb.org/3/person/${id}`;
		const response = await fetch(url, { headers: myHeaders });
		return await response.json();
	} catch (error) {
		console.log(error);
		throw error;
	}
}