const axios = require('axios')

const prompts = require('prompts');

(async () => {
  console.log('Starting Terminal scraper...')
  const response = await prompts({
    type: 'text',
    name: 'username',
    message: 'Which User you like to scrape??'
  });
  console.log('Starting to scrape')
  getFollowers(response.username)
})();

async function getFollowers(username) {
  try {
    const {
      data
    } = await axios.get(`https://www.instagram.com/${username}/?__a=1`)
    user = data.graphql.user
    let followers = user.edge_followed_by.count
    let following = user.edge_follow.count
    let fullname = user.full_name
    let user_name = user.username
    let profile_pic = user.profile_pic_url_hd
    console.log(`${user_name} has ${followers} and follows ${following}. His full name is ${fullname}. His pic is ${profile_pic}`)
  } catch (error) {
    console.log('USER NOT FOUND')
    // throw Error(error);
  }
}