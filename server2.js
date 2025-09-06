import express from 'express';
import axios from 'axios';
import cors from 'cors';

// API Credentials
const OPENAI_API_KEY = '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';
const GOOGLE_API_KEY = 'AIzaSyBemnZPepikkAA6kG4zO-ERnm2SfvKkd3Q';
const GOOGLE_CSE_ID = '817cf8266748b4adc';
const WEATHER_API_KEY = '9c79aaf43cee942740c97fbefd70f97a';

const app = express();
app.use(cors());
app.use(express.json());

// Web Search Function (Google Custom Search API)
async function webSearch(query) {
    try {
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`;
        const response = await axios.get(url, { timeout: 10000 });
        const items = response.data.items || [];
        const priorityDomains = ['tripadvisor.com', 'booking.com', 'makemytrip.com', 'hotelscombined.com'];
        let result = 'Web search results:\n';
        items.sort((a, b) => {
            const aPriority = priorityDomains.some(domain => a.link.includes(domain)) ? 0 : 1;
            const bPriority = priorityDomains.some(domain => b.link.includes(domain)) ? 0 : 1;
            return aPriority - bPriority;
        }).slice(0, 5).forEach((item, index) => {
            result += ` ${item.title}\n${item.snippet}\nLink: ${item.link}\n\n`;
        });
        return result || 'No relevant results found for the query.';
    } catch (error) {
        console.error('Web search error:', error.message);
        return 'Unable to fetch web search results. Please try again later.';
    }
}

// Weather Data Function (OpenWeatherMap API)
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url, { timeout: 10000 });
        const data = response.data;
        return `Weather in ${data.name}: ${data.weather[0].description}. Temperature: ${data.main.temp}°C. Humidity: ${data.main.humidity}%. Wind: ${data.wind.speed} m/s.`;
    } catch (error) {
        console.error('Weather API error:', error.message);
        return 'Unable to fetch weather data. Please try again later.';
    }
}

// Cache for search results
const searchCache = new Map();

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    const { marked } = await import('marked'); // Dynamic import for marked

    // Perform web search or weather query
    let searchResult = '';
    let weatherResult = '';
    const isWeatherQuery = message.toLowerCase().includes('weather');
    if (isWeatherQuery) {
        const cityMatch = message.match(/weather in (\w+)/i);
        const city = cityMatch ? cityMatch[1] : 'Dubai';
        if (searchCache.has(`weather:${city}`)) {
            weatherResult = searchCache.get(`weather:${city}`);
        } else {
            weatherResult = await getWeather(city);
            searchCache.set(`weather:${city}`, weatherResult);
        }
    } else {
        const query = message.includes('Dubai') || message.toLowerCase().includes('hotel') || message.toLowerCase().includes('restaurant') ? `${message} Dubai` : message;
        if (searchCache.has(query)) {
            searchResult = searchCache.get(query);
        } else {
            searchResult = await webSearch(query);
            searchCache.set(query, searchResult);
        }
    }

    let systemPrompt = `Global Multilingual Hospitality Bot

Role: Advanced AI hotel assistant for Dubai hotels and restaurants. Respond in a professional, concise, friendly tone in the user's detected language. 
Rules:
- Respond in the same language as the user input.
- Use provided web search results or weather data for accurate details (pricing, amenities, reviews, weather, etc.).
- If a specific hotel (e.g., "The Leela Hotel") is mentioned, verify its existence in Dubai using web results. If not found, respond: "No results found for [query] in Dubai. May I suggest other options? [View Options]"
- If data is insufficient, state: "I couldn’t retrieve enough information for [specific detail]. Please contact the hotel directly."
- Include citations: [Source](link).
- Provide links for hotel websites or bookings. When giving links -> Use bold for links and before each link write "Click here to Book Now" or "Click here to Visit Site": [Book Now](link), [View Options](link) and use arrow or something to highlight it.
- Use proper formatting: paragraphs for descriptions, bullet points for lists, headings for sections.


Example Response Format (for hotel queries) Or Use better Format if u have:
**Best Hotels in Dubai:**
* **Four Seasons Resort Dubai at Jumeirah Beach**: Ultimate luxury with a private beach and exceptional service. [Book Now](https://www.fourseasons.com/dubaijb) [Source](https://www.fourseasons.com/dubaijb)
* **Mandarin Oriental Jumeirah**: Elegant design, world-class service. [Book Now](https://www.mandarinoriental.com/en/dubai/jumeirah-beach) [Source](https://www.mandarinoriental.com/en/dubai/jumeirah-beach)
* **Burj Al Arab Jumeirah**: Iconic luxury with opulent suites. [Book Now](https://www.jumeirah.com/en/stay/dubai/burj-al-arab-jumeirah) [Source](https://www.jumeirah.com/en/stay/dubai/burj-al-arab-jumeirah)
What is your budget per night? Do you prefer a lively or relaxing atmosphere?

Formatting: Use Markdown:
- **Bold** for headings.
- * Lists for hotels, amenities, reviews, etc.
- [Button](link) for actions (e.g., [Book Now], [View Options]).
- Citations: [Source](link).

Edge Cases:
- Unknown hotels: "No results found for [query] in Dubai. May I suggest Four Seasons Resort Dubai or other Options at Jumeirah Beach? [View Options]"
- Non-hotel queries: Provide your own concise answers or if u want use web search too.
`;

    let messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: `User query: ${message}\n\n${isWeatherQuery ? `Weather data: ${weatherResult}` : `Web search results: ${searchResult}`}\n\nImportant: Respond in the same language as the user input.` }
    ];

    try {
        console.log('Sending request to OpenAI ChatGPT API');
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-5-chat-latest',
            messages,
            temperature: 0.6,
            max_tokens: 3000
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });

        let aiResponse = response.data.choices[0].message.content.trim();
        console.log('Raw ChatGPT response:', aiResponse);

        // Convert Markdown to HTML for web display
        const htmlResponse = marked.parse(aiResponse);
        console.log('HTML response:', htmlResponse);
        res.json({ response: htmlResponse });
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error.message);
        res.status(500).json({ response: `Error: Unable to process your request. Please try again later.` });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
