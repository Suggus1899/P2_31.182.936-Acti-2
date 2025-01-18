const axios = require('axios');

const getCountryByIp = async (ip) => {
  const apiKey = process.env.IPSTACK_API_KEY;
  const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`;

  try {
    console.log(`Haciendo solicitud a: ${url}`);
    const response = await axios.get(url);
    console.log(`Respuesta de IPStack: ${JSON.stringify(response.data)}`);
    return response.data.country_name;
  } catch (error) {
    console.error("Error al obtener el país:", error.message);
    return undefined;
  }
};

module.exports = { getCountryByIp };
