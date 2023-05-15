const searchTag = document.getElementById('select_tag');
const tagText = document.getElementById('tag_input');
const qText = document.getElementById('q_input');
const qSubmit = document.getElementById('')

const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4f1ed0fff3msh85714f88b10e79cp1382ebjsn8477dee660d1',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}


const tag_url = 'https://tasty.p.rapidapi.com/tags/list';
const tag_options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4f1ed0fff3msh85714f88b10e79cp1382ebjsn8477dee660d1',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

try {
	const response = await fetch(tag_url, tag_options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}