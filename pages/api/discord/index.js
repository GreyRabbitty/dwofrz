export default async function handle(req, res) {

  // console.log('================== api / program / sol / send_accept ===================');

  const guildId = req.body.guildId; // Replace with the ID of the server you want to join
  const userId = req.body.userId; // Replace with the user ID you want to add
  const userAccessToken = req.body.accessToken; // Replace with the user's access tok

  console.log('req.body =>', {guildId, userId, userAccessToken });

  try {
    const response = await fetch(`https://discord.com/api/guilds/${guildId}/members/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${userAccessToken}`, // Use 'Bot' prefix for user access token
        'Content-Type': 'application/json',
        "Access-Control-Request-Headers": "*",
      },
      body: JSON.stringify({ access_token: `Bearer ${userAccessToken}` }),
    });

    if (response.ok) {
      console.log('Successfully added member to the server.');
      res.status(200).send(true);
    } else {
      console.error('Failed to add member to the server:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error adding member to the server:', error);
  }
}
