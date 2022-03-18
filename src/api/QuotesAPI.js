const URL = 'https://type.fit/api/quotes'

const fetchQuote = async () => {
    try {
        let response = await fetch(URL)
        let data = await response.json();
        return data;
    } catch (error) {
        console.log('there was an error')
    }
};

export default {
    fetchQuote,
};