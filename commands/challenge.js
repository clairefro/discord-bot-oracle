module.exports = {
  name: 'challenge',
  description: 'The oracle will fetch you a challenge',
  execute(msg, args) {
    msg.reply('you are worthy of a challenge.');
    msg.channel.send('hear ye, hear ye! will you too rise to the challenge?');
  },
};
